import { test } from "node:test";
import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { createRequire } from "node:module";
import vm from "node:vm";
import * as snippets from "../../src/data/docs-snippets";

// Run the exact code shown on /docs.
const sandbox: { require: NodeRequire; Buffer: typeof Buffer; verifySignature?: (b: unknown, s: unknown, k: string) => boolean } = {
  require: createRequire(import.meta.url),
  Buffer,
};
vm.runInNewContext(`${snippets.verifySignatureFunction}\nthis.verifySignature = verifySignature;`, sandbox);
const verify = sandbox.verifySignature!;

const secret = "test-secret";
const body = Buffer.from(snippets.callbackPayload);
const good = createHmac("sha256", secret).update(body).digest("hex");

test("accepts a valid signature (any hex case, surrounding whitespace)", () => {
  assert.equal(verify(body, good, secret), true);
  assert.equal(verify(body, good.toUpperCase(), secret), true);
  assert.equal(verify(body, ` ${good} `, secret), true);
});

test("rejects without throwing for missing, malformed, short and wrong signatures", () => {
  const cases: unknown[] = [undefined, null, "", ["a"], 123, "zz".repeat(32), good.slice(0, 63), good.slice(0, 62), good + "00", "0".repeat(64)];
  for (const sig of cases) assert.doesNotThrow(() => assert.equal(verify(body, sig, secret), false), String(sig));
});

test("rejects a wrong secret and a tampered body", () => {
  assert.equal(verify(body, good, "other-secret"), false);
  assert.equal(verify(Buffer.from(snippets.callbackPayload.replace("150.00", "999.00")), good, secret), false);
});

test("JSON examples labelled as JSON are valid JSON", () => {
  for (const key of ["launchRequest", "launchResponse", "callbackPayload", "callbackResponse"] as const) {
    assert.doesNotThrow(() => JSON.parse(snippets[key]), key);
  }
});
