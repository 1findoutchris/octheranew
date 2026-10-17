import { Pool, type PoolClient } from "pg";
import type { InquiryInput } from "./validation";
import { createReference } from "./reference";
import type { CreateResult, InquiryStore, InquirySummary, OutboxJob, OutboxKind, OutboxStatus, StoredInquiry } from "./types";

type InquiryRow = {
  id: string;
  reference: string;
  idempotency_key: string;
  name: string;
  email: string;
  company: string;
  product_interest: string;
  message: string;
  target_markets: string | null;
  website: string | null;
  timeline: string | null;
  preferred_channel: string | null;
  request_type: string;
  plan: string | null;
  provider: string | null;
  source_path: string | null;
  created_at: Date;
};

function toInquiry(row: InquiryRow): StoredInquiry {
  return {
    id: Number(row.id),
    reference: row.reference,
    idempotencyKey: row.idempotency_key,
    name: row.name,
    email: row.email,
    company: row.company,
    productInterest: row.product_interest,
    message: row.message,
    targetMarkets: row.target_markets ?? undefined,
    website: row.website ?? undefined,
    timeline: row.timeline ?? undefined,
    preferredChannel: row.preferred_channel ?? undefined,
    requestType: row.request_type as StoredInquiry["requestType"],
    plan: row.plan ?? undefined,
    provider: row.provider ?? undefined,
    sourcePath: row.source_path ?? undefined,
    createdAt: row.created_at,
  };
}

const isUniqueViolation = (e: unknown, constraint: string) =>
  typeof e === "object" && e !== null && (e as { code?: string }).code === "23505" &&
  (e as { constraint?: string }).constraint === constraint;

export class PgInquiryStore implements InquiryStore {
  constructor(private readonly pool: Pool) {}

  private async tx<T>(fn: (client: PoolClient) => Promise<T>): Promise<T> {
    const client = await this.pool.connect();
    try {
      await client.query("BEGIN");
      const result = await fn(client);
      await client.query("COMMIT");
      return result;
    } catch (e) {
      await client.query("ROLLBACK").catch(() => {});
      throw e;
    } finally {
      client.release();
    }
  }

  async createInquiry(input: InquiryInput, reference: string, kinds: OutboxKind[]): Promise<CreateResult> {
    // A reference collision is astronomically rare, but retry with a fresh
    // suffix rather than failing the visitor's submission.
    for (let attempt = 0; attempt < 5; attempt++) {
      const ref = attempt === 0 ? reference : createReference();
      try {
        return await this.tx(async (client) => {
          const inserted = await client.query<{ id: string; reference: string }>(
            `INSERT INTO inquiries (reference, idempotency_key, name, email, company, product_interest, message,
               target_markets, website, timeline, preferred_channel, request_type, plan, provider, source_path)
             VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
             ON CONFLICT (idempotency_key) DO NOTHING
             RETURNING id, reference`,
            [ref, input.idempotencyKey, input.name, input.email, input.company, input.productInterest, input.message,
              input.targetMarkets ?? null, input.website ?? null, input.timeline ?? null, input.preferredChannel ?? null,
              input.requestType, input.plan ?? null, input.provider ?? null, input.sourcePath ?? null]
          );
          if (inserted.rowCount === 0) {
            const existing = await client.query<{ reference: string }>(
              "SELECT reference FROM inquiries WHERE idempotency_key = $1",
              [input.idempotencyKey]
            );
            return { reference: existing.rows[0].reference, created: false };
          }
          const id = inserted.rows[0].id;
          for (const kind of kinds) {
            await client.query(
              "INSERT INTO inquiry_outbox (inquiry_id, kind) VALUES ($1, $2) ON CONFLICT (inquiry_id, kind) DO NOTHING",
              [id, kind]
            );
          }
          return { reference: inserted.rows[0].reference, created: true };
        });
      } catch (e) {
        if (isUniqueViolation(e, "inquiries_reference_key")) continue;
        throw e;
      }
    }
    throw new Error("Could not allocate a unique inquiry reference");
  }

  async claimDueJobs(limit: number, leaseMs: number): Promise<OutboxJob[]> {
    const { rows } = await this.pool.query<InquiryRow & { job_id: string; kind: OutboxKind; status: OutboxStatus; attempts: number }>(
      `WITH due AS (
         SELECT id FROM inquiry_outbox
         WHERE (status IN ('pending', 'failed') AND next_attempt_at <= now())
            OR (status = 'sending' AND locked_until < now())
         ORDER BY next_attempt_at, id
         FOR UPDATE SKIP LOCKED
         LIMIT $1
       ), leased AS (
         UPDATE inquiry_outbox o
         SET status = 'sending', attempts = o.attempts + 1,
             locked_until = now() + ($2 || ' milliseconds')::interval, updated_at = now()
         FROM due WHERE o.id = due.id
         RETURNING o.id AS job_id, o.kind, o.status, o.attempts, o.inquiry_id
       )
       SELECT leased.job_id, leased.kind, leased.status, leased.attempts, i.*
       FROM leased JOIN inquiries i ON i.id = leased.inquiry_id
       ORDER BY leased.job_id`,
      [limit, String(leaseMs)]
    );
    return rows.map((row) => ({
      id: Number(row.job_id),
      kind: row.kind,
      status: row.status,
      attempts: row.attempts,
      inquiry: toInquiry(row),
    }));
  }

  async markAccepted(jobId: number, providerMessageId: string | null): Promise<void> {
    await this.pool.query(
      `UPDATE inquiry_outbox SET status = 'accepted', provider_message_id = $2, accepted_at = now(),
         locked_until = NULL, last_error = NULL, updated_at = now() WHERE id = $1`,
      [jobId, providerMessageId]
    );
  }

  async markFailed(jobId: number, error: string, nextAttemptAt: Date | null): Promise<void> {
    await this.pool.query(
      `UPDATE inquiry_outbox SET status = $2, last_error = $3, next_attempt_at = COALESCE($4, next_attempt_at),
         locked_until = NULL, updated_at = now() WHERE id = $1`,
      [jobId, nextAttemptAt ? "failed" : "dead", error.slice(0, 500), nextAttemptAt]
    );
  }

  async hitRateLimit(bucket: string, windowMs: number): Promise<number> {
    const { rows } = await this.pool.query<{ count: number }>(
      `INSERT INTO inquiry_rate_limits (bucket, window_start, count)
       VALUES ($1, to_timestamp(floor(extract(epoch FROM now()) * 1000 / $2) * $2 / 1000), 1)
       ON CONFLICT (bucket, window_start) DO UPDATE SET count = inquiry_rate_limits.count + 1
       RETURNING count`,
      [bucket, windowMs]
    );
    // Opportunistic cleanup of old windows keeps the table small.
    await this.pool.query("DELETE FROM inquiry_rate_limits WHERE window_start < now() - interval '2 days'");
    return rows[0].count;
  }

  private async jobsFor(inquiryIds: number[]) {
    if (inquiryIds.length === 0) return new Map<number, InquirySummary["jobs"]>();
    const { rows } = await this.pool.query<{ inquiry_id: string; kind: OutboxKind; status: OutboxStatus; attempts: number; last_error: string | null; next_attempt_at: Date }>(
      "SELECT inquiry_id, kind, status, attempts, last_error, next_attempt_at FROM inquiry_outbox WHERE inquiry_id = ANY($1) ORDER BY id",
      [inquiryIds]
    );
    const map = new Map<number, InquirySummary["jobs"]>();
    for (const r of rows) {
      const list = map.get(Number(r.inquiry_id)) ?? [];
      list.push({ kind: r.kind, status: r.status, attempts: r.attempts, lastError: r.last_error, nextAttemptAt: r.next_attempt_at });
      map.set(Number(r.inquiry_id), list);
    }
    return map;
  }

  async listInquiries(filter: { status?: OutboxStatus; limit: number }): Promise<InquirySummary[]> {
    const { rows } = await this.pool.query<InquiryRow>(
      filter.status
        ? `SELECT * FROM inquiries WHERE id IN (SELECT inquiry_id FROM inquiry_outbox WHERE status = $2)
           ORDER BY created_at DESC LIMIT $1`
        : "SELECT * FROM inquiries ORDER BY created_at DESC LIMIT $1",
      filter.status ? [filter.limit, filter.status] : [filter.limit]
    );
    const jobs = await this.jobsFor(rows.map((r) => Number(r.id)));
    return rows.map((r) => ({
      reference: r.reference,
      company: r.company,
      productInterest: r.product_interest,
      createdAt: r.created_at,
      jobs: jobs.get(Number(r.id)) ?? [],
    }));
  }

  async findByReference(reference: string) {
    const { rows } = await this.pool.query<InquiryRow>("SELECT * FROM inquiries WHERE reference = $1", [reference]);
    if (!rows[0]) return null;
    const jobs = await this.jobsFor([Number(rows[0].id)]);
    return { ...toInquiry(rows[0]), jobs: jobs.get(Number(rows[0].id)) ?? [] };
  }

  async requeue(reference: string): Promise<number> {
    const { rowCount } = await this.pool.query(
      `UPDATE inquiry_outbox SET status = 'pending', attempts = 0, next_attempt_at = now(), locked_until = NULL, updated_at = now()
       WHERE status IN ('failed', 'dead') AND inquiry_id = (SELECT id FROM inquiries WHERE reference = $1)`,
      [reference]
    );
    return rowCount ?? 0;
  }

  async deleteInquiry(reference: string): Promise<boolean> {
    const { rowCount } = await this.pool.query("DELETE FROM inquiries WHERE reference = $1", [reference]);
    return (rowCount ?? 0) > 0;
  }
}
