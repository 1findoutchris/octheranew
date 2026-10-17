import { test } from "node:test";
import assert from "node:assert/strict";
import { validateInquiry } from "../../src/lib/inquiry/validation";
import { createReference, referencePattern } from "../../src/lib/inquiry/reference";

const valid = {
  name: "Ada Operator",
  email: "ada@example-casino.com",
  company: "Example Gaming Ltd",
  productInterest: "sportsbook",
  message: "We want to add live betting to our platform.",
  idempotencyKey: "1b4e28ba-2fa1-41d2-883f-0016d3cca427",
};

test("accepts a minimal valid inquiry", () => {
  const r = validateInquiry(valid);
  assert.equal(r.ok, true);
  if (r.ok) {
    assert.equal(r.data.requestType, "sales");
    assert.equal(r.data.plan, undefined);
  }
});

test("accepts free-mail addresses and optional fields", () => {
  const r = validateInquiry({ ...valid, email: "ada@gmail.com", website: "example.com", timeline: "3-6-months", preferredChannel: "telegram", targetMarkets: "Malta, Brazil" });
  assert.equal(r.ok, true);
  if (r.ok) assert.equal(r.data.website, "https://example.com/");
});

test("reports each missing required field", () => {
  const r = validateInquiry({ idempotencyKey: valid.idempotencyKey });
  assert.equal(r.ok, false);
  if (!r.ok) assert.deepEqual(Object.keys(r.errors).sort(), ["company", "email", "message", "name", "productInterest"]);
});

test("rejects invalid email, unknown product and bad selects", () => {
  const r = validateInquiry({ ...valid, email: "not-an-email", productInterest: "poker-bots", timeline: "yesterday", preferredChannel: "fax" });
  assert.equal(r.ok, false);
  if (!r.ok) {
    assert.ok(r.errors.email);
    assert.ok(r.errors.productInterest);
    assert.ok(r.errors.timeline);
    assert.ok(r.errors.preferredChannel);
  }
});

test("rejects overlong fields", () => {
  const r = validateInquiry({ ...valid, name: "x".repeat(121), message: "y".repeat(2001), company: "z".repeat(161) });
  assert.equal(r.ok, false);
  if (!r.ok) {
    assert.ok(r.errors.name);
    assert.ok(r.errors.message);
    assert.ok(r.errors.company);
  }
});

test("rejects header injection in single-line fields", () => {
  for (const field of ["name", "email", "company"] as const) {
    const r = validateInquiry({ ...valid, [field]: "Evil\r\nBcc: victim@example.com" });
    assert.equal(r.ok, false, field);
    if (!r.ok) assert.match(r.errors[field] ?? "", /one line/);
  }
  const unicode = validateInquiry({ ...valid, company: "Evil Bcc: x@y.com" });
  assert.equal(unicode.ok, false);
});

test("keeps multi-line messages but strips control characters", () => {
  const r = validateInquiry({ ...valid, message: "Line one\nLine two\u0000\u0007" });
  assert.equal(r.ok, true);
  if (r.ok) assert.equal(r.data.message, "Line one\nLine two");
});

test("drops unknown context instead of trusting it", () => {
  const r = validateInquiry({ ...valid, requestType: "admin", plan: "free-forever", provider: "<script>", sourcePath: "/products/sportsbook?token=secret#x" });
  assert.equal(r.ok, true);
  if (r.ok) {
    assert.equal(r.data.requestType, "sales");
    assert.equal(r.data.plan, undefined);
    assert.equal(r.data.provider, undefined);
    assert.equal(r.data.sourcePath, "/products/sportsbook");
  }
  const bad = validateInquiry({ ...valid, sourcePath: "https://evil.example/x" });
  assert.equal(bad.ok && bad.data.sourcePath, undefined);
});

test("keeps allowlisted context", () => {
  const r = validateInquiry({ ...valid, requestType: "quote", plan: "turnkey", provider: "evolution" });
  assert.equal(r.ok, true);
  if (r.ok) assert.deepEqual([r.data.requestType, r.data.plan, r.data.provider], ["quote", "turnkey", "evolution"]);
});

test("requires a well-formed idempotency key", () => {
  const r = validateInquiry({ ...valid, idempotencyKey: "123" });
  assert.equal(r.ok, false);
  if (!r.ok) assert.ok(r.errors.form);
});

test("flags the honeypot as spam", () => {
  const r = validateInquiry({ ...valid, fax: "+1 555" });
  assert.equal(r.ok, false);
  if (!r.ok) assert.equal(r.spam, true);
});

test("rejects non-object bodies", () => {
  for (const body of [null, "x", 42, []]) assert.equal(validateInquiry(body).ok, false);
});

test("references use the documented format", () => {
  const ref = createReference(new Date("2026-10-17T12:00:00Z"));
  assert.match(ref, /^OCT-20261017-/);
  assert.match(ref, referencePattern);
});
