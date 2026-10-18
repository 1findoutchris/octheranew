import { buildAcknowledgement, buildSalesNotification, type MailConfig } from "./notification";
import { MailError, type Mailer } from "./mailer";
import type { InquiryStore } from "./types";

export type WorkerOptions = {
  store: InquiryStore;
  mailer: Mailer;
  mail: MailConfig;
  /** Attempts before a job is dead-lettered. */
  maxAttempts?: number;
  /** First retry delay; doubles each attempt, capped at maxDelayMs. */
  baseDelayMs?: number;
  maxDelayMs?: number;
  /** Per-send timeout. */
  sendTimeoutMs?: number;
  batchSize?: number;
  now?: () => Date;
  /** Structured, PII-free event log (reference and status only). */
  log?: (event: Record<string, unknown>) => void;
};

export type WorkerResult = { accepted: number; failed: number; dead: number };

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new MailError(`Timed out after ${ms}ms`, true)), ms);
    promise.then(
      (v) => {
        clearTimeout(timer);
        resolve(v);
      },
      (e) => {
        clearTimeout(timer);
        reject(e);
      }
    );
  });
}

/**
 * Sends due outbox jobs once. Safe to run concurrently from several
 * processes: jobs are leased with FOR UPDATE SKIP LOCKED.
 */
export async function processOutbox(options: WorkerOptions): Promise<WorkerResult> {
  const {
    store,
    mailer,
    mail,
    maxAttempts = 6,
    baseDelayMs = 60_000,
    maxDelayMs = 6 * 60 * 60_000,
    sendTimeoutMs = 30_000,
    batchSize = 10,
    now = () => new Date(),
    log = () => {},
  } = options;

  const result: WorkerResult = { accepted: 0, failed: 0, dead: 0 };
  const jobs = await store.claimDueJobs(batchSize, sendTimeoutMs * 2);

  for (const job of jobs) {
    const message =
      job.kind === "sales_notification"
        ? buildSalesNotification(job.inquiry, mail)
        : buildAcknowledgement(job.inquiry, mail);
    try {
      const { providerMessageId } = await withTimeout(mailer.send(message), sendTimeoutMs);
      await store.markAccepted(job.id, providerMessageId);
      result.accepted++;
      log({ event: "inquiry_mail_accepted", reference: job.inquiry.reference, kind: job.kind, attempts: job.attempts });
    } catch (e) {
      const retryable = !(e instanceof MailError) || e.retryable;
      const errorText = e instanceof Error ? e.message : "Unknown error";
      if (retryable && job.attempts < maxAttempts) {
        const delay = Math.min(baseDelayMs * 2 ** (job.attempts - 1), maxDelayMs);
        await store.markFailed(job.id, errorText, new Date(now().getTime() + delay));
        result.failed++;
        log({ event: "inquiry_mail_failed", reference: job.inquiry.reference, kind: job.kind, attempts: job.attempts, retryInMs: delay });
      } else {
        await store.markFailed(job.id, errorText, null);
        result.dead++;
        // Alerting should watch for this event on a channel independent of the mail provider.
        log({ event: "inquiry_mail_dead", reference: job.inquiry.reference, kind: job.kind, attempts: job.attempts });
      }
    }
  }
  return result;
}
