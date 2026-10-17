/**
 * Integration tests for the inquiry pipeline against a real PostgreSQL
 * database and fake mail adapters. Nothing is sent externally.
 *
 *   TEST_DATABASE_URL=postgres://postgres@localhost:55432/octhera_test npm run test:integration
 */
import { test, before, beforeEach, after } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { Pool } from "pg";
import { PgInquiryStore } from "../../src/lib/inquiry/pg-store";
import { submitInquiry, type SubmitDeps } from "../../src/lib/inquiry/service";
import { processOutbox } from "../../src/lib/inquiry/worker";
import { MailError, type Mailer } from "../../src/lib/inquiry/mailer";
import type { MailMessage } from "../../src/lib/inquiry/notification";
import type { InquiryStore } from "../../src/lib/inquiry/types";

const url = process.env.TEST_DATABASE_URL;
const skip = !url ? "TEST_DATABASE_URL not set" : false;

let pool: Pool;
let store: PgInquiryStore;
const mailConfig = { salesTo: "sales@octhera.org", from: "Octhera Website <website@notify.example>" };

class FakeMailer implements Mailer {
  sent: MailMessage[] = [];
  constructor(private behaviour: (n: number) => "ok" | "transient" | "permanent" | "hang" = () => "ok") {}
  async send(message: MailMessage) {
    const mode = this.behaviour(this.sent.length);
    if (mode === "transient") throw new MailError("SMTP 451", true);
    if (mode === "permanent") throw new MailError("SMTP 550", false);
    if (mode === "hang") await new Promise(() => {});
    this.sent.push(message);
    return { providerMessageId: `<fake-${this.sent.length}@test>` };
  }
}

const body = (overrides: Record<string, unknown> = {}) =>
  JSON.stringify({
    name: "Ada Operator",
    email: "ada@example.com",
    company: "Example Gaming",
    productInterest: "casino-aggregator",
    message: "We want aggregated content.",
    requestType: "walkthrough",
    sourcePath: "/products/casino-aggregator",
    idempotencyKey: randomUUID(),
    ...overrides,
  });

const request = (rawBody: string, extra: Partial<Parameters<typeof submitInquiry>[0]> = {}) => ({
  rawBody,
  contentType: "application/json",
  origin: "https://octhera.org",
  host: "octhera.org",
  clientIp: `203.0.113.${Math.floor(Math.random() * 250)}`,
  ...extra,
});

const deps = (overrides: Partial<SubmitDeps> = {}): SubmitDeps => ({
  store,
  allowedOrigins: ["https://octhera.org"],
  rateLimitSalt: "test-salt",
  acknowledgement: false,
  ...overrides,
});

const count = async (table: string) => Number((await pool.query(`SELECT count(*) FROM ${table}`)).rows[0].count);

before(async () => {
  if (skip) return;
  pool = new Pool({ connectionString: url });
  await pool.query("DROP TABLE IF EXISTS inquiry_outbox, inquiries, inquiry_rate_limits");
  await pool.query(readFileSync("migrations/001_inquiries.sql", "utf8"));
  store = new PgInquiryStore(pool);
});

beforeEach(async () => {
  if (skip) return;
  await pool.query("TRUNCATE inquiry_outbox, inquiries, inquiry_rate_limits RESTART IDENTITY CASCADE");
});

after(async () => {
  await pool?.end();
});

test("valid request is stored with one notification job before success is returned", { skip }, async () => {
  const res = await submitInquiry(request(body()), deps());
  assert.equal(res.status, 201);
  assert.ok("reference" in res.body);
  const { rows } = await pool.query("SELECT i.reference, o.kind, o.status FROM inquiries i JOIN inquiry_outbox o ON o.inquiry_id = i.id");
  assert.equal(rows.length, 1);
  assert.equal(rows[0].reference, res.body.reference);
  assert.deepEqual([rows[0].kind, rows[0].status], ["sales_notification", "pending"]);
});

test("retry with the same idempotency key returns the same reference and creates nothing new", { skip }, async () => {
  const raw = body();
  const first = await submitInquiry(request(raw), deps());
  const second = await submitInquiry(request(raw), deps());
  assert.equal(first.status, 201);
  assert.equal(second.status, 200);
  assert.deepEqual(second.body, first.body);
  assert.equal(await count("inquiries"), 1);
  assert.equal(await count("inquiry_outbox"), 1);
});

test("concurrent duplicate submissions produce one inquiry and one notification job", { skip }, async () => {
  const raw = body();
  const results = await Promise.all(Array.from({ length: 10 }, () => submitInquiry(request(raw), deps())));
  const refs = new Set(results.map((r) => ("reference" in r.body ? r.body.reference : "x")));
  assert.equal(refs.size, 1);
  assert.equal(results.filter((r) => r.status === 201).length, 1);
  assert.equal(await count("inquiries"), 1);
  assert.equal(await count("inquiry_outbox"), 1);
});

test("a genuine follow-up with identical text but a new key is kept", { skip }, async () => {
  await submitInquiry(request(body({ idempotencyKey: randomUUID() })), deps());
  await submitInquiry(request(body({ idempotencyKey: randomUUID() })), deps());
  assert.equal(await count("inquiries"), 2);
});

test("invalid, overlong and header-injection input is rejected and nothing is stored", { skip }, async () => {
  const cases = [
    body({ email: "nope" }),
    body({ name: "" }),
    body({ message: "x".repeat(2001) }),
    body({ company: "Evil\r\nBcc: a@b.com" }),
    body({ productInterest: "unknown" }),
    "{not json",
  ];
  for (const raw of cases) {
    const res = await submitInquiry(request(raw), deps());
    assert.equal(res.status, 400, raw.slice(0, 40));
  }
  assert.equal(await count("inquiries"), 0);
});

test("honeypot submissions are rejected without storing or mailing", { skip }, async () => {
  const res = await submitInquiry(request(body({ fax: "bot" })), deps());
  assert.equal(res.status, 422);
  assert.equal(await count("inquiries"), 0);
});

test("wrong origin, content type and oversize payload are refused", { skip }, async () => {
  assert.equal((await submitInquiry(request(body(), { origin: "https://evil.example" }), deps())).status, 403);
  assert.equal((await submitInquiry(request(body(), { origin: null }), deps())).status, 403);
  assert.equal((await submitInquiry(request(body(), { contentType: "text/plain" }), deps())).status, 415);
  assert.equal((await submitInquiry(request(body({ message: "x".repeat(20_000) })), deps())).status, 413);
  assert.equal(await count("inquiries"), 0);
});

test("same-host origin is accepted for preview deployments", { skip }, async () => {
  const res = await submitInquiry(request(body(), { origin: "https://preview.up.railway.app", host: "preview.up.railway.app" }), deps());
  assert.equal(res.status, 201);
});

test("durable rate limit: the sixth request in ten minutes from one address is refused", { skip }, async () => {
  const statuses = [];
  for (let i = 0; i < 6; i++) statuses.push((await submitInquiry(request(body(), { clientIp: "198.51.100.7" }), deps())).status);
  assert.deepEqual(statuses, [201, 201, 201, 201, 201, 429]);
  // A different address is unaffected.
  assert.equal((await submitInquiry(request(body(), { clientIp: "198.51.100.8" }), deps())).status, 201);
});

test("storage failure returns 503 and never a reference", { skip }, async () => {
  const broken: InquiryStore = {
    ...store,
    hitRateLimit: async () => 1,
    createInquiry: async () => {
      throw new Error("connection refused");
    },
  } as unknown as InquiryStore;
  const res = await submitInquiry(request(body()), deps({ store: broken }));
  assert.equal(res.status, 503);
  assert.equal("reference" in res.body, false);

  const deadPool = new Pool({ connectionString: "postgres://postgres@127.0.0.1:1/none", connectionTimeoutMillis: 500 });
  const res2 = await submitInquiry(request(body()), deps({ store: new PgInquiryStore(deadPool) }));
  assert.equal(res2.status, 503);
  await deadPool.end();
});

test("worker sends once, records provider acceptance and the correct envelope", { skip }, async () => {
  const res = await submitInquiry(request(body()), deps());
  const mailer = new FakeMailer();
  const r = await processOutbox({ store, mailer, mail: mailConfig });
  assert.deepEqual(r, { accepted: 1, failed: 0, dead: 0 });
  assert.equal(mailer.sent.length, 1);
  const m = mailer.sent[0];
  assert.equal(m.to, "sales@octhera.org");
  assert.equal(m.from, mailConfig.from);
  assert.equal(m.replyTo, "ada@example.com");
  assert.match(m.subject, /^\[Octhera enquiry OCT-\d{8}-[A-Z2-9]{4}\] Casino Aggregator — Example Gaming$/);
  const job = (await pool.query("SELECT status, provider_message_id, attempts FROM inquiry_outbox")).rows[0];
  assert.deepEqual([job.status, job.provider_message_id, job.attempts], ["accepted", "<fake-1@test>", 1]);
  // Running again sends nothing more.
  await processOutbox({ store, mailer, mail: mailConfig });
  assert.equal(mailer.sent.length, 1);
  assert.ok("reference" in res.body);
});

test("concurrent workers never send the same job twice", { skip }, async () => {
  for (let i = 0; i < 5; i++) await submitInquiry(request(body()), deps());
  const mailer = new FakeMailer();
  await Promise.all(Array.from({ length: 4 }, () => processOutbox({ store, mailer, mail: mailConfig })));
  assert.equal(mailer.sent.length, 5);
  assert.equal(new Set(mailer.sent.map((m) => m.subject)).size, 5);
});

test("transient failures back off, then dead-letter after the attempt limit; the inquiry is kept", { skip }, async () => {
  await submitInquiry(request(body()), deps());
  const mailer = new FakeMailer(() => "transient");
  let now = Date.now();
  const r1 = await processOutbox({ store, mailer, mail: mailConfig, maxAttempts: 3, baseDelayMs: 1000, now: () => new Date(now) });
  assert.deepEqual(r1, { accepted: 0, failed: 1, dead: 0 });
  let job = (await pool.query("SELECT status, attempts, next_attempt_at, last_error FROM inquiry_outbox")).rows[0];
  assert.equal(job.status, "failed");
  assert.ok(new Date(job.next_attempt_at).getTime() > Date.now());
  assert.equal(job.last_error, "SMTP 451");

  // Not due yet: nothing happens.
  assert.deepEqual(await processOutbox({ store, mailer, mail: mailConfig, maxAttempts: 3 }), { accepted: 0, failed: 0, dead: 0 });

  for (let i = 0; i < 2; i++) {
    await pool.query("UPDATE inquiry_outbox SET next_attempt_at = now() - interval '1 second'");
    now = Date.now();
    await processOutbox({ store, mailer, mail: mailConfig, maxAttempts: 3, baseDelayMs: 1000 });
  }
  job = (await pool.query("SELECT status, attempts FROM inquiry_outbox")).rows[0];
  assert.deepEqual([job.status, job.attempts], ["dead", 3]);
  assert.equal(await count("inquiries"), 1);
});

test("permanent rejection dead-letters immediately", { skip }, async () => {
  await submitInquiry(request(body()), deps());
  const r = await processOutbox({ store, mailer: new FakeMailer(() => "permanent"), mail: mailConfig });
  assert.deepEqual(r, { accepted: 0, failed: 0, dead: 1 });
});

test("a hung provider times out and is retried", { skip }, async () => {
  await submitInquiry(request(body()), deps());
  const r = await processOutbox({ store, mailer: new FakeMailer(() => "hang"), mail: mailConfig, sendTimeoutMs: 50 });
  assert.deepEqual(r, { accepted: 0, failed: 1, dead: 0 });
});

test("staff recovery: find dead jobs, requeue and deliver", { skip }, async () => {
  const res = await submitInquiry(request(body()), deps());
  assert.ok("reference" in res.body);
  await processOutbox({ store, mailer: new FakeMailer(() => "permanent"), mail: mailConfig });
  const dead = await store.listInquiries({ status: "dead", limit: 10 });
  assert.equal(dead.length, 1);
  assert.equal(dead[0].reference, res.body.reference);

  assert.equal(await store.requeue(res.body.reference), 1);
  const mailer = new FakeMailer();
  await processOutbox({ store, mailer, mail: mailConfig });
  assert.equal(mailer.sent.length, 1);
  const found = await store.findByReference(res.body.reference);
  assert.equal(found?.jobs[0].status, "accepted");
  // Requeue ignores jobs that already succeeded.
  assert.equal(await store.requeue(res.body.reference), 0);
});

test("acknowledgement is a separate job, sent once, and limited per recipient", { skip }, async () => {
  for (let i = 0; i < 3; i++) await submitInquiry(request(body({ email: "same@example.com" })), deps({ acknowledgement: true }));
  const kinds = (await pool.query("SELECT kind, count(*)::int AS n FROM inquiry_outbox GROUP BY kind ORDER BY kind")).rows;
  assert.deepEqual(kinds, [
    { kind: "acknowledgement", n: 2 },
    { kind: "sales_notification", n: 3 },
  ]);
  const mailer = new FakeMailer((n) => (n === 0 ? "permanent" : "ok"));
  await processOutbox({ store, mailer, mail: mailConfig });
  // A failed acknowledgement never removes the inquiry.
  assert.equal(await count("inquiries"), 3);
});

test("deleting an inquiry removes its jobs", { skip }, async () => {
  const res = await submitInquiry(request(body()), deps());
  assert.ok("reference" in res.body);
  assert.equal(await store.deleteInquiry(res.body.reference), true);
  assert.equal(await count("inquiry_outbox"), 0);
});
