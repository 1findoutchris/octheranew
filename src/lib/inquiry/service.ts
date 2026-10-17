import { createHash } from "node:crypto";
import { createReference } from "./reference";
import { validateInquiry, limits, type FieldErrors } from "./validation";
import type { InquiryStore, OutboxKind } from "./types";

export type SubmitResponse =
  | { status: 201 | 200; body: { reference: string } }
  | { status: 400 | 403 | 413 | 415 | 422; body: { error: string; fields?: FieldErrors } }
  | { status: 429; body: { error: "rate_limited"; retryAfterSeconds: number } }
  | { status: 503; body: { error: "storage_unavailable" } };

export type SubmitRequest = {
  rawBody: string;
  contentType: string | null;
  origin: string | null;
  host: string | null;
  clientIp: string;
};

export type SubmitDeps = {
  store: InquiryStore;
  allowedOrigins: string[];
  rateLimitSalt: string;
  acknowledgement: boolean;
  now?: () => Date;
  log?: (event: Record<string, unknown>) => void;
};

/** Per-IP: 5 submissions per 10 minutes and 20 per day. */
const ipLimits = [
  { windowMs: 10 * 60_000, max: 5 },
  { windowMs: 24 * 60 * 60_000, max: 20 },
];
/** Acknowledgements per recipient address per day (keeps the form from being a mail relay). */
const ackLimit = { windowMs: 24 * 60 * 60_000, max: 2 };

const hash = (salt: string, value: string) => createHash("sha256").update(`${salt}:${value}`).digest("hex").slice(0, 32);

function originAllowed(origin: string | null, host: string | null, allowed: string[]): boolean {
  if (!origin) return false;
  if (allowed.includes(origin)) return true;
  // Same-origin requests on preview/staging hosts.
  try {
    return !!host && new URL(origin).host === host;
  } catch {
    return false;
  }
}

/**
 * Handles one submission: origin, size and type checks, durable rate
 * limiting, validation, then a single transaction that stores the inquiry
 * with its outbox jobs. Success is reported only after that commit; mail
 * is sent later by the worker.
 */
export async function submitInquiry(req: SubmitRequest, deps: SubmitDeps): Promise<SubmitResponse> {
  const log = deps.log ?? (() => {});

  if (!originAllowed(req.origin, req.host, deps.allowedOrigins)) {
    return { status: 403, body: { error: "origin_not_allowed" } };
  }
  if (!req.contentType?.toLowerCase().startsWith("application/json")) {
    return { status: 415, body: { error: "unsupported_media_type" } };
  }
  if (Buffer.byteLength(req.rawBody, "utf8") > limits.body) {
    return { status: 413, body: { error: "payload_too_large" } };
  }

  try {
    const ipBucket = hash(deps.rateLimitSalt, req.clientIp);
    for (const { windowMs, max } of ipLimits) {
      const count = await deps.store.hitRateLimit(`ip:${windowMs}:${ipBucket}`, windowMs);
      if (count > max) {
        log({ event: "inquiry_rate_limited", windowMs });
        return { status: 429, body: { error: "rate_limited", retryAfterSeconds: Math.ceil(windowMs / 1000) } };
      }
    }
  } catch {
    return { status: 503, body: { error: "storage_unavailable" } };
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(req.rawBody);
  } catch {
    return { status: 400, body: { error: "invalid_json" } };
  }

  const result = validateInquiry(parsed);
  if (!result.ok) {
    if (result.spam) {
      log({ event: "inquiry_spam_rejected" });
      return { status: 422, body: { error: "rejected" } };
    }
    return { status: 400, body: { error: "validation_failed", fields: result.errors } };
  }

  try {
    const kinds: OutboxKind[] = ["sales_notification"];
    if (deps.acknowledgement) {
      const count = await deps.store.hitRateLimit(`ack:${hash(deps.rateLimitSalt, result.data.email.toLowerCase())}`, ackLimit.windowMs);
      if (count <= ackLimit.max) kinds.push("acknowledgement");
    }
    const { reference, created } = await deps.store.createInquiry(result.data, createReference(deps.now?.()), kinds);
    log({ event: created ? "inquiry_saved" : "inquiry_duplicate_key", reference });
    return { status: created ? 201 : 200, body: { reference } };
  } catch {
    log({ event: "inquiry_storage_failed" });
    return { status: 503, body: { error: "storage_unavailable" } };
  }
}
