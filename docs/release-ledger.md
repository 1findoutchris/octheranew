# Release ledger: buyer-experience implementation

Branch `claude/zen-edison-bhobo6`, based on `main` at `d3ddb861` (PR #8). Prepared 17 October 2026. **Not merged. Not deployed.**

## Verification levels (kept separate)

| Level | Status |
|---|---|
| Code exists on branch | Yes: commits 17eed09 → this commit |
| Merged | **No.** Awaiting your review |
| Tests pass | Yes, locally (below) |
| Deployed | **No** |
| Public version confirmed | **No.** This environment can't reach octhera.org |
| Inquiry form end to end | **No.** Disabled; only local tests with a fake SMTP sink. No real Zoho receipt or reply tested |

## Tests run (local, 17 October 2026)

| Suite | Command | Result |
|---|---|---|
| Lint | `npm run lint` | clean |
| Types | `npm run typecheck` | clean |
| Production build | `npm run build` | 76 pages |
| Unit | `npm test` | 27/27: validation, header injection, context allowlist, notification envelope, config gating, docs signature snippet (valid, uppercase, missing, non-string, non-hex, short, long, wrong secret, tampered), JSON validity |
| Integration (Postgres 16) | `npm run test:integration` | 18/18: atomic save, idempotent retry, 10 concurrent duplicates → 1 inquiry and 1 job, follow-up kept, invalid/overlong/injection/honeypot/origin/type/size refusal, durable rate limit, storage failure → 503, worker envelope, concurrent workers send once, backoff → dead-letter, permanent failure, timeout, staff requeue, acknowledgement limit, delete |
| E2E + axe (Chromium 390/1440) | `npm run test:e2e` | 76 passed, 18 viewport-skipped: keyboard menu and dropdowns, inert background, focus restore, filters with aria-pressed and status, buyer journeys with context, illustration labels, sitemap, canonical, noindex, 404, www 308, links and anchors, overflow on 20 pages at 390/768/1440, **0 axe WCAG 2.x A/AA violations on 17 pages + open menus** |
| Form E2E (isolated build, local SMTP sink) | `npm run test:e2e:form` | 5/5: error summary focus, double-click → one inquiry, notification From/Reply-To/subject, server rejection, storage failure fallback, 405/403 |
| 200% zoom equivalents | manual script, 640/720px | no overflow; open menu reachable at 450px height |

Automated accessibility checks complement manual review. **No** full screen-reader pass or real-device test was done.

## Lab performance (Lighthouse 12.8.2, mobile emulation, simulated throttling, local `next start`; median of 3; not field data)

| Page | main d3ddb86 perf / LCP / TBT | branch perf / LCP / TBT | CLS |
|---|---|---|---|
| `/` | 0.97 / 2.47 s / 112 ms | 0.98 / 2.28 s / 76 ms | 0 / 0 |
| `/products/sportsbook` | 0.98 / 2.16 s / 66 ms | 0.97 / 2.45 s / 85 ms | 0 / 0 |
| `/contact` | 0.98 / 2.19 s / 71 ms | 0.99 / 2.26 s / 57 ms | 0 / 0 |
| `/providers` | 0.98 / 2.29 s / 82 ms | 0.98 / 2.28 s / 39 ms | 0 / 0 |

These are within run-to-run noise; there's no meaningful change either way. No field (CrUX) data is available.

## Completed

- Phase 0: claim register, owner decisions, route baseline (`docs/`).
- Phase 1: AA tokens and buttons; grouped, keyboard-accessible header; mobile menu fixed (no focusable hidden links, Escape and focus restore, inert background); provider filter semantics; motion reduced.
- Phase 2: homepage and product overview by buyer route; product templates; contextual contact; labelled illustrations; unsupported live and performance implications removed.
- Phase 4: inquiry pipeline, disabled until configured (`docs/inquiry-pipeline.md`).
- Phase 5: docs rewritten with a safe and tested signature example and valid JSON; SEO safeguards under test.

## Blocked on owner input (nothing placeholder-published)

See `docs/owner-decisions.md`. In short:
1. Legal and trading identity, privacy notice and terms (also blocks the form).
2. Fee cadence, minimums, taxes, GGR basis, Turnkey GGR, offer end date, ownership and exit terms. **The published numbers are unchanged.**
3. White Label vs Turnkey responsibility matrix (custody, KYC, support, trading).
4. Real redacted screenshots and permissioned evidence.
5. Mail provider, sender, database, staff, retention, alerting.
6. `api.octhera.com` and environment URLs, client portal, analytics.

## Remaining risks and notes

- Product capability claims marked "owner-unverified" in the claim register remain public as long-standing copy; confirm or remove them.
- `next start` logs `NoFallbackError` when unknown product or provider slugs are requested (404 is returned correctly). This is existing behaviour with `dynamicParams = false`.
- The form E2E builds into `.next-form-test`; `tsconfig.json` includes its type paths so Next.js doesn't rewrite the file.
- Enabling the form requires a redeploy (the contact page reads the flag at build time).

## After separate production approval

1. Record the intended commit, the merge commit and the Railway deployment ID; confirm the deployment SUCCESS and the domain read-only.
2. From a fresh client: `robots.txt`, `sitemap.xml` (18 URLs), canonical and H1 on `/products/sportsbook`, contact page actions, `/providers/evolution` noindex, `http`→`https` and www 308.
3. If anything doesn't match, investigate routing and cache first. Don't change DNS blindly.
