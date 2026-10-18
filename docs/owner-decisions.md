# Owner decisions needed

Structural work proceeds without these answers. Nothing below is published until you supply it. Send credentials only through Railway variables or a secret store, never in chat, issues or source.

## 1. Identity and legal (blocks About identity, footer, `/privacy`, `/terms` and the inquiry form)
- Registered and trading company name, jurisdiction and registration number.
- Approved public address and contact. Who handles sales?
- Privacy contact, governing law, and which counsel reviews privacy and terms.

## 2. Products and operations
- Which capabilities are live today, which are optional, and which are in development (see `docs/claim-register.md`).
- Sportsbook: supported integration modes (iframe, API, both), sports and markets coverage, odds and data sources, and who trades and manages risk (Octhera or the operator).
- Supported markets, currencies and languages per product.
- Support hours and escalation path.
- Unique studio count and direct-relationship status per directory entry. Do the Evolution / Evolution Live entries stay separate?

## 3. Commercial (numbers stay unchanged until you decide)
- For each USD 999 / 2,499 / 7,999 / 29,999 price: is it setup, monthly, annual or another basis?
- Recurring, minimum, hosting, support and third-party provider charges, and taxes.
- GGR basis (stakes minus wins? bonus treatment? NGR?), invoicing cadence, and the **Turnkey GGR terms** (currently unpublished; this is not 0%).
- Launch-offer end date and eligibility.
- White label vs turnkey: hosting, customisation, ownership, source code, data export and exit rights. Which modules each includes (affiliates? sportsbook?).
- Responsibility matrix, especially: under Turnkey, who holds player accounts, player funds (custody), KYC, player support and trading? The current sportsbook copy says these stay with the operator "unless you take Turnkey", and nothing explains that exception.

## 4. Evidence
- Redacted real screenshots (back office, provider enablement, reconciliation, sportsbook trading), with permission to publish, plus the product version and date for captions.
- A safe demo environment, if one exists.
- Permissioned customer references, or a factual release history.

## 5. Inquiry form (code is ready on the branch behind `INQUIRY_FORM_ENABLED`, which is off)
- Approve the fields: name, email, company, product interest and message are required; markets, website, timeline and preferred channel are optional.
- Transactional mail service and plan (for example SMTP via an approved provider). Don't assume free Zoho SMTP/API access.
- Approved From sender address. Replies go to the visitor via Reply-To.
- Database: approve a Railway Postgres (or other) instance. Who may access inquiries (the staff recovery CLI runs with database credentials)?
- Retention period, deletion process and backups.
- Optional acknowledgement email to the visitor (yes or no) and its wording.
- Independent failure-alert channel (something other than the same mail service).
- Confirm that replies are sent with From `sales@octhera.org` in Zoho.

## 6. Technical destinations
- Is `api.octhera.com` correct? What are the sandbox and production base URLs, and is there a client portal URL?
- Are any analytics or cookies used? (None exist in the code today.)
