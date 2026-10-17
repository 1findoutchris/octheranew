# octhera.org SEO and conversion audit, October 2026

Scope: the `octheranew` Next.js 16 app, deployed by Railway from `main`. The Railway service has one custom domain, `octhera.org`, and no www domain.

The Search Console figures from October 17, 2026 are historical. Every finding below was re-checked against the current source, a local production build and Railway logs. I couldn't reach the live site from the audit environment, so the live checks are listed under post-deployment steps.

## 1. Findings by priority

### Confirmed defects (fixed in this change)

| # | Severity | Finding | Evidence | Files |
|---|---|---|---|---|
| 1 | Critical | The site's canonical origin was `https://www.octhera.com`, a different domain. The sitemap `<loc>`s, `robots.txt`'s `Sitemap:`, `metadataBase`, `og:url`, `og:image` and Organization `url` all pointed off-site. Search Console ignores sitemap URLs outside the property, which explains why no sitemap appeared. | Baseline `/sitemap.xml` and `/robots.txt` output | `src/data/site.ts` |
| 2 | High | No page had a `<link rel="canonical">`. | Baseline raw HTML | `src/lib/seo.ts`, all pages |
| 3 | High | All content wrapped in `Reveal` (nearly every section, including H1s) rendered with `opacity: 0` and became visible only after hydration. With JavaScript off the pages were blank. In lab tests the LCP element was the navbar logo. | `globals.css .reveal`, Lighthouse | `Reveal.tsx`, `globals.css` |
| 4 | High | Homepage stats rendered `0+`, `0+` and `0/7` in the server HTML. The counter parsed "24/7" as the number 24 followed by "/7". | Baseline raw HTML | `AnimatedStat.tsx` |
| 5 | High | The homepage claimed 200+ providers and 15,000+ games. The code comment said these were "not independently verified". The directory lists 50 studios, all with availability "Contact". The 120+/12,000+ pricing figures from the Search Console review are not in the current source or git history, so they were probably on an earlier deployment. | `src/data/site.ts`, `src/data/providers.ts` | `src/data/catalog.ts` (new single source of truth) |
| 6 | High | Product pages said "Commercial terms are custom", which contradicted the published plans and prices. | Product page source | `products/[slug]/page.tsx` |
| 7 | Medium | Sitemap `lastmod` was the build time on every URL. It now uses a maintained per-page date map. | Baseline sitemap | `src/data/sitemap.ts` |
| 8 | Medium | `/docs` was missing from the sitemap. | `sitemap.ts` | `sitemap.ts` |
| 9 | Medium | Titles and H1s were thin or generic, for example "Sportsbook \| Octhera" with H1 "Sportsbook", or the homepage H1 "Powering the Future of iGaming". They didn't match the observed queries ("sportsbook b2b platform", "casino aggregator", "casino api"). | Baseline HTML | `products.ts`, page metadata |
| 10 | Medium | Subpages had no `og:image`/`twitter:image`, because a page-level `openGraph` replaces the root one. | Raw HTML | `src/lib/seo.ts` |
| 11 | Medium | The `/docs` meta description and intro promised sportsbook, back office and webhook docs that don't exist. The homepage code sample used different field names (`operatorId`, `playerId`) from the documented API (`member_account`, `game_uid`). | Source | `docs/page.tsx`, `TechnologySection.tsx` |
| 12 | Medium | 50 provider pages had near-identical, generic copy, "—" game counts and availability "Contact", and all were indexable. These are likely candidates for "Crawled – currently not indexed", and they dilute the product pages. | `providers.ts` | `providers/[slug]/page.tsx` |
| 13 | Low | The White Label description claimed "licensing groundwork … already in place", which contradicts the licensing statement on About and in the footer (operators are responsible for licences). | `products.ts` | `products.ts` |
| 14 | Low | Provider pages showed the same availability value twice ("Availability" and "Integration Status"). | Source | provider page |
| 15 | Low | The `X-Powered-By: Next.js` header was sent. | Next default | `next.config.ts` |

### Historical Search Console items (verified, no change needed)

- `/login`, `/register`, `/status`, `/api/v1/wallet/settlement`, `/api/v1/wallet/balance`, `/api/v1/games/launch`: none of these routes exist in this app. All return 404 with `noindex` for GET and POST. There's no equivalent public page, so a redirect would be wrong. The Railway project and service were created on August 8, 2026, so these URLs (and the 5xx on `/api/v1/games/launch`) almost certainly came from an earlier deployment on the domain. The documented API host is `api.octhera.com`, not `octhera.org`. Google will drop the 404s on its own.
- The two hashed `/_next/static/media/*.woff2` 404s: Next.js fingerprints fonts on each build, so old hashes 404 after redeploys. This is expected and harmless. Current fonts load from `/_next/static/media/` and `robots.txt` allows everything.
- `http://octhera.org/` 404: this can't be reproduced from source. The app never sees the scheme, because Railway terminates TLS. Verify after deployment (checklist below).
- Railway HTTP logs from September 20 to October 10 show only bots and vulnerability scanners (`/wp-admin`, `/.env`, `POST /`) hitting 404s. There were no 5xx responses on real routes.

### Hypotheses (not provable from the repo)

- Zero clicks on product pages at average position ~60 is a ranking problem first and a snippet problem second. Thin pages (about 100 words) and a canonical/sitemap pointing at another domain both plausibly suppressed rankings. Expect any recovery to take weeks to months, and it isn't guaranteed.
- The "6 crawled – not indexed" URLs are probably provider detail pages. Confirm in the Search Console page indexing report.

## 2. Implemented changes

- **Canonical domain:** `https://octhera.org` everywhere (metadataBase, canonical, `og:url`, sitemap, robots, JSON-LD).
- **www redirect:** `www.octhera.org` → `https://octhera.org` with a 308 (permanent), preserving path and query (`next.config.ts`). It takes effect only if www is attached to the service (see infrastructure work).
- **Metadata helper** (`src/lib/seo.ts`): every page has a unique title, description, self-canonical, Open Graph and Twitter tags, and an image.
- **Sitemap:** 18 canonical, indexable URLs that return 200, with truthful `lastmod` from `src/data/sitemap.ts`. Provider pages join automatically once their availability is no longer "contact".
- **Structured data:** Organization (name, URL, logo, description, sales contact point) and BreadcrumbList on product and provider pages, with visible breadcrumbs. No ratings, reviews or FAQ rich-result markup.
- **Rendering:** Reveal is now a CSS-only server component. Content is visible without JavaScript and with reduced motion. Stats render final values in the server HTML; the count-up animation is client-only and skipped under reduced motion.
- **Catalog counts:** `src/data/catalog.ts` is the single source of truth. Headline totals are `null` until confirmed, with scope. Until then the homepage shows the directory size (50) and other verifiable facts.
- **Priority product pages**, in this order: `/products/sportsbook`, `/products/casino-aggregator`, `/products/casino-api`. Each now has:
  - who it's for
  - what's included
  - integration and deployment options
  - a workflow (trading and risk, game round, or wallet-callback implementation)
  - onboarding steps and what to prepare
  - a responsibility split
  - a pricing model drawn live from `pricing.ts`
  - FAQs
  - contextual links

  All of it comes from `/docs`, existing product features, `pricing.ts` and the About and footer licensing statements.
- **Intent map:**
  - `/products/casino-aggregator`: commercial evaluation.
  - `/products/casino-api`: developer integration.
  - `/game-aggregation`: educational guide (aggregator vs direct integrations, and a selection checklist).

  The three pages cross-link, and nothing was consolidated.
- **Pricing:**
  - Plan anchors (`/pricing#game-aggregation-api` and so on).
  - A "How pricing works" section covering plan price, GGR share and scoped Enterprise extras.
  - A product-to-plan map.
  - Screen-reader labels for list price and launch price.
  - CTAs changed from "Request Pricing" to "Talk to Sales".
  - Commercial terms are unchanged.
- **Providers:** detail pages are `noindex, follow` while availability is "contact". They stay reachable, and a directory scope note explains what the list means.
- **About and contact:** About lists the products supplied and how Octhera works with operators. Contact keeps Telegram and adds "what to include in your message" to qualify leads. No form was added, because there is no verified destination for submissions.
- **Copy:** removed "thousands of games", "fast integration" and "global content" claims, and fixed the White Label licensing wording.

## 3. Validation results (local production build)

- `npm run lint`, `tsc --noEmit` and `npm run build` all pass (75 static pages).
- A crawl from `/` covered 68 pages with 0 broken internal links or assets. Every JSON-LD block parses.
- All 18 sitemap URLs return 200, are self-canonical and indexable. No duplicate titles or descriptions. Titles are ≤ 65 characters and descriptions ≤ 170.
- `Host: www.octhera.org` returns 308 to `https://octhera.org/…` with the query string intact.
- Unknown product and provider slugs return 404, and the historical URLs return 404 with `noindex`.
- In Chromium (Pixel 7 profile) with JS disabled, with reduced motion, and with JS on: H1 and all Reveal content end fully visible, with 0 px horizontal overflow.
- Lighthouse mobile lab results (simulated throttling, local server; not field data):

| Page | Before | After |
|---|---|---|
| Home | Perf 0.89, LCP 2.6 s, TBT 340 ms, CLS 0 | Perf 0.93–0.97, LCP 2.4–2.6 s, TBT 90–250 ms, CLS 0 |
| Sportsbook | Perf 0.98, LCP 2.4 s | Perf 0.98–0.99, LCP 2.1–2.4 s |
| Casino aggregator | n/a | Perf 0.97–0.98, LCP 2.3–2.5 s |

No field data (CrUX) was available. With traffic this low, the site probably has none, so INP couldn't be assessed. Performance isn't the bottleneck, and no further optimization was done without evidence.

## 4. Owner input checklist (missing business facts)

Nothing below is published until it's confirmed.

**Commercial**
1. Is each plan price one-time, monthly or annual? What do setup and recurring fees cover?
2. How is GGR calculated (bonus treatment, NGR vs GGR)? How often is it invoiced, and is there a minimum fee?
3. Turnkey has no published GGR rate. Is that intentional?
4. When does the "limited-time" launch offer end? Strikethrough reference prices with an open-ended "limited time" can be seen as misleading in some jurisdictions.
5. Standalone sportsbook pricing model.

**Catalog**

6. Total providers and games, and the scope of each figure (whole aggregated catalog, per plan, or per market). Fill these into `src/data/catalog.ts`.
7. Per-provider availability (`available` or `planned`), verified game counts, and original descriptions. Changing availability automatically indexes the page and adds it to the sitemap. Confirm that you have permission to list each studio name.

**Sportsbook** (the most-searched page has the fewest facts)

8. Sports, leagues and market coverage. Data or odds feed sources and live latency.
9. Trading model (managed trading vs operator self-trading) and bet types (singles, multiples, cash-out, bet builder).
10. Integration method (iframe or API), wallet model, and settlement.
11. Supported currencies and languages.

**API**

12. Is `api.octhera.com` the real production API host? Is there a separate sandbox host?
13. Error codes, retry policy for failed callbacks, rate limits, and how refunds are distinguished in the callback payload.
14. Typical integration timeline. Publish it only if it can be supported.

**Company and trust**

15. Legal entity name, registered address, year founded, team or leadership, and certifications or testing-lab approvals (if any).
16. Real product screenshots or a short demo video of the back office, lobby or sportsbook.
17. A business email address or CRM-backed demo form with a monitored destination. Until then, Telegram (`t.me/Noah_Octhera`, a personal handle) is the only contact route. Consider a company channel.
18. Privacy policy and terms of use. No legal pages exist.

## 5. Remaining infrastructure work

- **www:** decide whether `www.octhera.org` should exist. If yes, add it as a custom domain on the Railway `octheranew` service; the app then 308s it to the apex. If no, make sure there's no DNS record pointing somewhere stale.
- **HTTP → HTTPS:** confirm after deployment that `http://octhera.org/` returns 301 or 308 to `https://octhera.org/`. Railway terminates TLS at its edge, so the app can't enforce this safely without risking a redirect loop. If Railway doesn't redirect, raise it with Railway or put a proxy or CDN in front.
- Do not change or remove the Google verification DNS record.

## 6. Post-deployment Search Console checklist

1. `curl -I` the following and confirm the results:
   - `http://octhera.org/` → redirect to `https://octhera.org/`
   - `https://octhera.org/robots.txt` → `Sitemap: https://octhera.org/sitemap.xml`
   - `https://octhera.org/sitemap.xml` → 18 octhera.org URLs
2. In the domain property, open Sitemaps and submit `https://octhera.org/sitemap.xml`. Confirm the status is "Success" with 18 discovered URLs.
3. In URL Inspection, run "Test live URL" and then "Request indexing" for `/products/sportsbook`, `/products/casino-aggregator`, `/products/casino-api`, `/game-aggregation`, `/pricing` and `/`. Check that "User-declared canonical" and "Google-selected canonical" are both the octhera.org URL.
4. Run the Rich Results Test on a product page and confirm Organization and BreadcrumbList are detected without errors.
5. In Page indexing, confirm that the "Not found (404)" historical URLs are left as is (validation isn't needed). Check which URLs are "Crawled – currently not indexed". Provider pages should move to "Excluded by noindex".
6. Re-check Page indexing and Sitemaps two and four weeks after deployment.

## 7. Measurement plan

- **Baseline:** the 28 days before deployment. **Comparison:** the first full 28 days starting one week after deployment, to allow recrawl. Then repeat month over month. Use equivalent weekday-aligned windows, and annotate the deployment date.
- **Branded vs non-branded:** in Search Console Performance, filter queries containing "octhera" (branded) and not containing "octhera" (non-branded). Report the two separately. Branded clicks reflect demand created elsewhere; non-branded clicks reflect SEO.
- **Page-level** (Performance with a Page filter): impressions, clicks, CTR and average position for the three priority product pages, `/game-aggregation` and `/pricing`.
- **Query clusters to track:**
  - casino aggregator
  - sportsbook b2b platform / sportsbook b2b / b2b sportsbook solutions
  - casino api

  Watch the position trend first (positions around 60 need to reach the top 20 before clicks are realistic), then CTR.
- **Qualified enquiries:** there is no analytics on the site. Track Telegram conversations manually: date, landing page (ask "how did you find us"), product, market, and whether the lead is a licensed operator. Count only licensed or launching operators as qualified. If you add privacy-respecting analytics later (for example, outbound clicks on Telegram and Talk to Sales), add a consent banner if your audience requires one.
- **Sample size caveat:** at roughly 5–20 clicks a month, week-to-week changes are noise. Judge on 28-day windows and on impressions and position, which move first.

## 8. Editorial backlog

Publish only when someone with real expertise can supply specifics.

1. **How to choose a casino game aggregator.** Expand the checklist on `/game-aggregation` with real onboarding experience: provider availability by market, wallet models, reconciliation.
2. **Casino API integration guide: seamless wallet callbacks in practice.** Idempotency, signature verification against the raw body, refund handling, testing checklist. Needs the API facts (items 12 and 13).
3. **What drives casino API and aggregator pricing.** Plan fees vs GGR share, what GGR is calculated on, provider fees. Needs the commercial facts (items 1–4).
4. **Integrating a B2B sportsbook into an existing casino platform.** Deployment models, trading responsibilities, licensing. Needs the sportsbook facts (items 8–11).
