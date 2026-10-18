import { test } from "node:test";
import assert from "node:assert/strict";
import { contactHref, describeInterest, emailSubject, parseContactContext } from "../../src/lib/contact-context";

test("builds and parses allowlisted context", () => {
  const href = contactHref({ request: "quote", plan: "turnkey" });
  assert.equal(href, "/contact?request=quote&plan=turnkey");
  const ctx = parseContactContext(new URLSearchParams(href.split("?")[1]));
  assert.deepEqual(ctx, { request: "quote", product: undefined, plan: "turnkey", provider: undefined });
  assert.equal(describeInterest(ctx), "Turnkey plan");
  assert.equal(emailSubject(ctx), "Octhera enquiry: Request a quote - Turnkey plan");
});

test("plain sales contact has no query string", () => {
  assert.equal(contactHref(), "/contact");
  assert.equal(contactHref({ request: "sales" }), "/contact");
});

test("drops unknown values", () => {
  const ctx = parseContactContext(new URLSearchParams("request=x&product=y&plan=z&provider=%3Cscript%3E"));
  assert.deepEqual(ctx, { request: "sales", product: undefined, plan: undefined, provider: undefined });
  assert.equal(describeInterest(ctx), undefined);
});
