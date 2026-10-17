import { test } from "node:test";
import assert from "node:assert/strict";
import { readInquiryConfig } from "../../src/lib/inquiry/config";

const full = {
  INQUIRY_FORM_ENABLED: "true",
  DATABASE_URL: "postgres://x",
  INQUIRY_MAIL_FROM: "Website <w@example.com>",
  INQUIRY_PRIVACY_URL: "/privacy",
  INQUIRY_RATE_LIMIT_SALT: "salt",
  SMTP_HOST: "smtp.example.com",
  SMTP_PORT: "465",
  SMTP_USER: "u",
  SMTP_PASS: "p",
};

test("disabled by default", () => {
  assert.equal(readInquiryConfig({}).enabled, false);
});

test("stays disabled while any required setting is missing, including the privacy notice", () => {
  const { INQUIRY_PRIVACY_URL: _omit, ...rest } = full;
  void _omit;
  const c = readInquiryConfig(rest);
  assert.equal(c.enabled, false);
  if (!c.enabled) assert.deepEqual(c.missing, ["INQUIRY_PRIVACY_URL"]);
});

test("enabled only with every setting; recipient defaults to sales@octhera.org", () => {
  const c = readInquiryConfig(full);
  assert.equal(c.enabled, true);
  if (c.enabled) {
    assert.equal(c.salesTo, "sales@octhera.org");
    assert.equal(c.acknowledgement, false);
    assert.deepEqual(c.allowedOrigins, ["https://octhera.org"]);
  }
});
