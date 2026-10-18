-- Website inquiries and their notification outbox.
-- The inquiry row is the source of truth; mail delivery state lives in
-- inquiry_outbox and never affects whether an inquiry is kept.

CREATE TABLE IF NOT EXISTS inquiries (
  id               BIGSERIAL PRIMARY KEY,
  reference        TEXT        NOT NULL UNIQUE,
  idempotency_key  UUID        NOT NULL UNIQUE,
  name             TEXT        NOT NULL,
  email            TEXT        NOT NULL,
  company          TEXT        NOT NULL,
  product_interest TEXT        NOT NULL,
  message          TEXT        NOT NULL,
  target_markets   TEXT,
  website          TEXT,
  timeline         TEXT,
  preferred_channel TEXT,
  request_type     TEXT        NOT NULL,
  plan             TEXT,
  provider         TEXT,
  source_path      TEXT,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS inquiry_outbox (
  id                  BIGSERIAL PRIMARY KEY,
  inquiry_id          BIGINT      NOT NULL REFERENCES inquiries(id) ON DELETE CASCADE,
  kind                TEXT        NOT NULL CHECK (kind IN ('sales_notification', 'acknowledgement')),
  -- pending: waiting; sending: leased by a worker; accepted: the mail
  -- provider accepted it (NOT proof of mailbox delivery); failed: will be
  -- retried; dead: retries exhausted, needs staff action.
  status              TEXT        NOT NULL DEFAULT 'pending'
                      CHECK (status IN ('pending', 'sending', 'accepted', 'failed', 'dead')),
  attempts            INTEGER     NOT NULL DEFAULT 0,
  next_attempt_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  locked_until        TIMESTAMPTZ,
  last_error          TEXT,
  provider_message_id TEXT,
  accepted_at         TIMESTAMPTZ,
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  -- One logical message of each kind per inquiry: duplicate submissions
  -- and concurrent workers can never create a second notification job.
  UNIQUE (inquiry_id, kind)
);

CREATE INDEX IF NOT EXISTS inquiry_outbox_due_idx
  ON inquiry_outbox (status, next_attempt_at);

-- Fixed-window counters for durable, shared rate limiting.
CREATE TABLE IF NOT EXISTS inquiry_rate_limits (
  bucket       TEXT        NOT NULL,
  window_start TIMESTAMPTZ NOT NULL,
  count        INTEGER     NOT NULL DEFAULT 0,
  PRIMARY KEY (bucket, window_start)
);
