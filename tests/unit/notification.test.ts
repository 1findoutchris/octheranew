import { test } from "node:test";
import assert from "node:assert/strict";
import { buildAcknowledgement, buildSalesNotification } from "../../src/lib/inquiry/notification";
import type { StoredInquiry } from "../../src/lib/inquiry/types";

const inquiry: StoredInquiry = {
  id: 1,
  reference: "OCT-20261017-A7K4",
  idempotencyKey: "1b4e28ba-2fa1-41d2-883f-0016d3cca427",
  name: "Ada <script>alert(1)</script>",
  email: "ada@example.com",
  company: "Example Gaming",
  productInterest: "sportsbook",
  message: "Hello\nworld <b>bold</b>",
  requestType: "walkthrough",
  plan: "turnkey",
  sourcePath: "/products/sportsbook",
  createdAt: new Date("2026-10-17T12:00:00Z"),
};
const mail = { salesTo: "sales@octhera.org", from: "Octhera Website <website@notifications.example>" };

test("sales notification uses server recipient, approved sender and visitor Reply-To", () => {
  const m = buildSalesNotification(inquiry, mail);
  assert.equal(m.to, "sales@octhera.org");
  assert.equal(m.from, mail.from);
  assert.equal(m.replyTo, "ada@example.com");
  assert.equal(m.subject, "[Octhera enquiry OCT-20261017-A7K4] Sportsbook — Example Gaming");
  assert.match(m.text, /Request: Request a walkthrough/);
  assert.match(m.text, /Plan: turnkey/);
  // Plain text only: markup is passed through as inert text, never rendered.
  assert.match(m.text, /<script>alert\(1\)<\/script>/);
  assert.equal(m.idempotencyKey, "OCT-20261017-A7K4:sales_notification");
});

test("subject can never contain a line break", () => {
  const m = buildSalesNotification({ ...inquiry, company: "A\r\nBcc: x@y.com" }, mail);
  assert.doesNotMatch(m.subject, /[\r\n]/);
});

test("the visitor is never the From address", () => {
  assert.notEqual(buildSalesNotification(inquiry, mail).from, inquiry.email);
  assert.notEqual(buildAcknowledgement(inquiry, mail).from, inquiry.email);
});

test("acknowledgement contains the reference and no links or response-time promise", () => {
  const m = buildAcknowledgement(inquiry, mail);
  assert.equal(m.to, "ada@example.com");
  assert.match(m.text, /OCT-20261017-A7K4/);
  assert.doesNotMatch(m.text, /https?:\/\//);
  assert.doesNotMatch(m.text, /within|hours|business day/i);
});
