import type { InquiryInput } from "./validation";

export type OutboxKind = "sales_notification" | "acknowledgement";
export type OutboxStatus = "pending" | "sending" | "accepted" | "failed" | "dead";

export type StoredInquiry = InquiryInput & {
  id: number;
  reference: string;
  createdAt: Date;
};

export type OutboxJob = {
  id: number;
  kind: OutboxKind;
  status: OutboxStatus;
  attempts: number;
  inquiry: StoredInquiry;
};

export type CreateResult = { reference: string; created: boolean };

export type InquirySummary = {
  reference: string;
  company: string;
  productInterest: string;
  createdAt: Date;
  jobs: { kind: OutboxKind; status: OutboxStatus; attempts: number; lastError: string | null; nextAttemptAt: Date }[];
};

/**
 * Persistence boundary. The Postgres implementation is in pg-store.ts;
 * tests run the same contract against a real local database.
 */
export interface InquiryStore {
  /**
   * Saves the inquiry and its outbox jobs in one transaction. A repeated
   * idempotency key returns the original reference with created=false and
   * creates nothing new.
   */
  createInquiry(input: InquiryInput, reference: string, kinds: OutboxKind[]): Promise<CreateResult>;
  /** Leases up to `limit` due jobs (pending, failed, or sending with an expired lease). */
  claimDueJobs(limit: number, leaseMs: number): Promise<OutboxJob[]>;
  markAccepted(jobId: number, providerMessageId: string | null): Promise<void>;
  markFailed(jobId: number, error: string, nextAttemptAt: Date | null): Promise<void>;
  /** Fixed-window counter; returns the count after incrementing. */
  hitRateLimit(bucket: string, windowMs: number): Promise<number>;
  listInquiries(filter: { status?: OutboxStatus; limit: number }): Promise<InquirySummary[]>;
  findByReference(reference: string): Promise<(StoredInquiry & { jobs: InquirySummary["jobs"] }) | null>;
  /** Puts failed/dead jobs for one inquiry back in the queue. Returns how many were requeued. */
  requeue(reference: string): Promise<number>;
  deleteInquiry(reference: string): Promise<boolean>;
}
