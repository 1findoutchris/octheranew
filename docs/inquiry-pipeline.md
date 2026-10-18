# Website inquiry pipeline

**Status: code complete on this branch and OFF by default.** The contact page keeps working through email (`sales@octhera.org`) and Telegram. Don't enable the form until each item under [Before enabling](#before-enabling) is approved. Real end-to-end delivery (Zoho receipt, a reply from sales, receipt by the visitor) has **not** been tested.

## Flow

```
Visitor submits form
  → POST /api/inquiries (origin, content type, size and durable rate-limit checks; server validation)
  → one DB transaction: inquiries row + inquiry_outbox job(s)        ← source of truth
  → 201 { reference: "OCT-20261017-A7K4" }                         (only after commit)
  → after(): worker leases due jobs and sends via SMTP
       accepted  = provider accepted it (NOT proof of mailbox delivery)
       failed    = retried with exponential backoff (1 min doubling, max 6 h, 6 attempts)
       dead      = needs staff action
  → sales@octhera.org receives "[Octhera enquiry REF] Product — Company"
       From: approved sender (INQUIRY_MAIL_FROM)   Reply-To: visitor
  → staff reply from sales@octhera.org (verify the From identity in Zoho)
```

| Situation | What the visitor sees | What is stored |
|---|---|---|
| Valid | "Your request has been recorded. Reference …" (polite status, focused) | Inquiry + pending job |
| Retry or double-click with the same key | The same reference | Nothing new |
| Same text, new submission | New reference | New inquiry (not silently discarded) |
| Validation error | Focused error summary, per-field errors, input kept | Nothing |
| Storage down | "We couldn't record your request…", input kept, email offered | Nothing |
| Mail provider down | Success with the reference (true: it was stored) | Job retries, then dead |
| Rate limited (5 per 10 min, 20 per day per IP) | Error with email fallback | Nothing |
| Honeypot filled | Rejected (422) | Nothing |

The server sets the recipient, sender and subject. The client can't supply To, From, headers or HTML. Single-line fields reject line breaks, and email is plain text only. Context (product, plan, provider, request type, source path) is allowlisted, and query strings are stripped from the source path. Logs carry reference and status only, never personal data.

## Code

| Path | Purpose |
|---|---|
| `migrations/001_inquiries.sql` | `inquiries`, `inquiry_outbox` (unique per inquiry and kind), `inquiry_rate_limits` |
| `src/lib/inquiry/validation.ts` | Server validation and allowlists |
| `src/lib/inquiry/service.ts` | Request handling: origin, size, rate limit, transactional save |
| `src/lib/inquiry/pg-store.ts` | PostgreSQL store; leases jobs with `FOR UPDATE SKIP LOCKED` |
| `src/lib/inquiry/worker.ts` | Outbox sender with backoff and dead-letter |
| `src/lib/inquiry/mailer.ts` | SMTP adapter (any approved transactional provider) |
| `src/lib/inquiry/notification.ts` | Notification and optional acknowledgement content |
| `src/app/api/inquiries/route.ts` | `POST` only; returns 404 while disabled |
| `src/components/contact/InquiryForm.tsx` | Accessible form; rendered only when fully configured |
| `scripts/inquiries.ts` | Staff CLI (below) |

## Configuration (Railway variables; never in source)

| Variable | Required | Notes |
|---|---|---|
| `INQUIRY_FORM_ENABLED` | yes | `true` to enable. The page reads it **at build time**, so it needs a redeploy. |
| `DATABASE_URL` | yes | Approved Postgres instance |
| `INQUIRY_MAIL_FROM` | yes | Owner-approved, authenticated sender, e.g. `Octhera Website <website@…>` |
| `INQUIRY_PRIVACY_URL` | yes | Published, reviewed privacy notice. The form won't render without it. |
| `INQUIRY_RATE_LIMIT_SALT` | yes | Random secret; IP addresses are stored only as salted hashes |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | yes | From the approved provider. `SMTP_SECURE=false` only for STARTTLS on port 587. |
| `INQUIRY_SALES_TO` | no | Defaults to `sales@octhera.org` |
| `INQUIRY_ACK_ENABLED` | no | `true` sends a one-off receipt to the visitor (max 2 per address per day) |
| `INQUIRY_ALLOWED_ORIGINS` | no | Extra allowed origins, comma separated |

Don't add DNS records (SPF/DKIM) for a sender without separate approval.

## Staff recovery (no public endpoint)

Run with the production variables, e.g. `railway run npm run inquiries -- <command>`. Access is limited to people with Railway project access.

```
npm run inquiries -- migrate                 # apply migrations
npm run inquiries -- list --status dead      # or pending | failed | accepted
npm run inquiries -- show OCT-20261017-A7K4
npm run inquiries -- retry OCT-20261017-A7K4 # requeue failed/dead and send now
npm run inquiries -- work                    # send due jobs once
npm run inquiries -- delete OCT-20261017-A7K4
```

Retries of `failed` jobs happen when the next inquiry arrives, or when `work` runs. **Schedule `work`** (for example a Railway cron service every 5 minutes) once approved. Without it, a failed notification waits until the next submission or a manual run.

**Alerting:** the worker logs `{"source":"inquiry","event":"inquiry_mail_dead",...}`. Point an alert at that event through a channel independent of the mail provider (needs approval).

## Before enabling

1. Privacy notice and terms published after legal review; retention period and deletion process agreed.
2. Transactional mail provider, plan and quota approved; sender authenticated (domain records approved separately).
3. Database provisioned, backups configured, and staff with access named.
4. Variables set in Railway, `migrate` run, `work` scheduled, dead-letter alert configured.
5. A controlled end-to-end test approved and run: one real submission → Zoho receipt with the correct reference and headers → reply From `sales@octhera.org` → visitor receives it (check authentication and spam placement).

## Tests

```
npm test                                                     # unit (validation, notification, config, context)
TEST_DATABASE_URL=postgres://… npm run test:integration       # real Postgres, fake mailer
TEST_DATABASE_URL=postgres://… npm run test:e2e:form          # browser + local SMTP sink, isolated build
```

None of these send email outside the machine.
