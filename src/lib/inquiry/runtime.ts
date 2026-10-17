import { Pool } from "pg";
import { PgInquiryStore } from "./pg-store";
import { SmtpMailer } from "./mailer";
import type { InquiryConfig } from "./config";

type Enabled = Extract<InquiryConfig, { enabled: true }>;

let cached: { store: PgInquiryStore; mailer: SmtpMailer; pool: Pool } | null = null;

/** Lazily creates one pool and mailer per server process. */
export function inquiryRuntime(config: Enabled) {
  if (!cached) {
    const pool = new Pool({ connectionString: config.databaseUrl, max: 5, connectionTimeoutMillis: 5_000 });
    cached = { pool, store: new PgInquiryStore(pool), mailer: new SmtpMailer(config.smtp) };
  }
  return cached;
}

/** PII-free structured log line for Railway's log stream. */
export function logEvent(event: Record<string, unknown>) {
  console.log(JSON.stringify({ source: "inquiry", ...event }));
}
