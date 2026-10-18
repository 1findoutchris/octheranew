import Link from "next/link";
import { siteConfig } from "@/data/site";
import * as snippets from "@/data/docs-snippets";
import { CopyButton } from "@/components/docs/CopyButton";

/** Last content change to this guide. Update when the documented contract changes. */
export const guideUpdated = "17 October 2026";

function CodeBlock({ code, label, language }: { code: string; label: string; language: string }) {
  return (
    <figure className="overflow-hidden rounded-xl border border-border bg-[#0b1018] text-[#f5f7fa]">
      <figcaption className="flex items-center justify-between gap-3 border-b border-[#465468] px-4 py-1">
        <span className="text-sm text-[#b8c2cf]">
          {label} <span className="font-mono">({language})</span>
        </span>
        <span className="[&_button]:border-[#7a889c] [&_button]:text-[#f5f7fa]">
          <CopyButton text={code} label={label} />
        </span>
      </figcaption>
      <pre tabIndex={0} aria-label={`${label}, scrollable`} className="overflow-x-auto p-4 font-mono text-sm leading-relaxed">
        <code>{code}</code>
      </pre>
    </figure>
  );
}

function FieldTable({ caption, rows }: { caption: string; rows: [string, string, string][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border" role="region" aria-label={caption} tabIndex={0}>
      <table className="w-full min-w-[560px] text-left text-base">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-surface text-foreground">
          <tr>
            <th scope="col" className="p-3 font-semibold">Field</th>
            <th scope="col" className="p-3 font-semibold">Type in example</th>
            <th scope="col" className="p-3 font-semibold">Meaning</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border bg-elevated text-muted">
          {rows.map(([field, type, meaning]) => (
            <tr key={field}>
              <th scope="row" className="p-3 font-mono text-sm font-medium text-foreground">{field}</th>
              <td className="p-3 font-mono text-sm">{type}</td>
              <td className="p-3">{meaning}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DocSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="scroll-mt-24 space-y-5 border-t border-border pt-10">
      <h2 id={`${id}-heading`} className="type-h2">
        {title}
      </h2>
      {children}
    </section>
  );
}

export const guideSections = [
  { id: "prerequisites", label: "Prerequisites" },
  { id: "authentication", label: "Authentication" },
  { id: "launch", label: "Launch a game" },
  { id: "wallet-callback", label: "Wallet callback" },
  { id: "signatures", label: "Verify signatures" },
  { id: "callback-response", label: "Respond to callbacks" },
  { id: "not-yet-documented", label: "Not yet documented" },
  { id: "support", label: "Support" },
];

/**
 * The casino integration guide. Content mirrors the previously published
 * guide; examples now render from src/data/docs-snippets.ts, which tests run.
 */
export function IntegrationGuide() {
  return (
    <div className="space-y-12">
      <DocSection id="prerequisites" title="Before you start">
        <ul className="list-disc space-y-2 pl-5 text-base text-muted">
          <li>An API key and a secret key, issued with sandbox access by the Octhera team.</li>
          <li>
            Your callback URL and whitelisted server IPs, set in the settings tab before integration starts. The
            callback must be a public HTTPS URL that resolves in DNS.
          </li>
          <li>A backend that can read the raw request body of the callback (needed for signature checks).</li>
        </ul>
        <p className="max-w-[65ch] text-base text-muted">
          The examples below use the base URL from the current guide. Confirm the base URL for your sandbox and
          production environments with the team when you receive credentials.
        </p>
      </DocSection>

      <DocSection id="authentication" title="Authentication">
        <p className="max-w-[65ch] text-base text-muted">Send JSON over HTTPS with your API key as a Bearer token.</p>
        <CodeBlock code={snippets.authHeaders} label="Request headers" language="HTTP" />
      </DocSection>

      <DocSection id="launch" title="Launch a game">
        <p className="max-w-[65ch] text-base text-muted">
          Get a white-labelled game session URL for a player. The player is sent straight to the game frame, and the
          upstream provider is masked. Octhera generates a provider-safe player name internally, and a unique{" "}
          <code className="font-mono text-sm">transfer_id</code> for each launch; your{" "}
          <code className="font-mono text-sm">member_account</code> stays your own player ID.
        </p>
        <p className="font-mono text-base break-all text-foreground">
          POST https://api.octhera.com/v1/games/launch
        </p>
        <CodeBlock code={snippets.launchRequest} label="Launch request body" language="JSON" />
        <FieldTable
          caption="Launch request fields"
          rows={[
            ["member_account", "string", "Your internal player ID."],
            ["game_uid", "string", "Game identifier."],
            ["balance", "number", "The player's balance at launch."],
            ["home_url", "string", "Where the player returns after leaving the game."],
          ]}
        />
        <CodeBlock code={snippets.launchResponse} label="Success response" language="JSON" />
      </DocSection>

      <DocSection id="wallet-callback" title="Wallet callback">
        <p className="max-w-[65ch] text-base text-muted">
          When gameplay happens, Octhera posts transaction events (bet, win, refund) to your configured callback URL:{" "}
          <code className="font-mono text-sm">POST {"{YOUR_CALLBACK_URL}"}</code>. If your callback can&apos;t be
          reached, settlement with the provider fails.
        </p>
        <CodeBlock code={snippets.callbackPayload} label="Callback request body" language="JSON" />
        <FieldTable
          caption="Callback fields"
          rows={[
            ["serial_number", "string", "Transaction ID. Store it with your ledger entry and apply each one once."],
            ["currency", "string", "Currency code."],
            ["game_uid", "string", "Game identifier."],
            ["member_account", "string", "Your player ID."],
            ["bet_amount", "string (decimal)", "Deduct from the balance."],
            ["win_amount", "string (decimal)", "Add to the balance."],
            ["timestamp", "string (ms epoch)", "Event time."],
            ["game_round", "string", "Round ID for reconciliation."],
            ["data", "null", "Shown as null in the current example."],
          ]}
        />
      </DocSection>

      <DocSection id="signatures" title="Verify signatures">
        <p className="max-w-[65ch] text-base text-muted">
          Every callback has an <code className="font-mono text-sm">X-Signature</code> header: an HMAC-SHA256 of the
          raw JSON body using your secret key, as hex. Verify it against the exact bytes you received, before parsing
          JSON. This example checks the header&apos;s type, format and length first, so malformed input is rejected
          instead of throwing, then compares in constant time.
        </p>
        <CodeBlock code={snippets.verifySignatureFunction} label="Signature verification" language="JavaScript, Node.js" />
        <CodeBlock code={snippets.verifySignatureUsage} label="Using it in a handler" language="JavaScript, Express" />
      </DocSection>

      <DocSection id="callback-response" title="Respond to callbacks">
        <p className="max-w-[65ch] text-base text-muted">
          Reply with <code className="font-mono text-sm">200 OK</code> and the player&apos;s updated balance from your
          database.
        </p>
        <CodeBlock code={snippets.callbackResponse} label="Your expected response" language="JSON" />
      </DocSection>

      <DocSection id="not-yet-documented" title="Not yet documented">
        <p className="max-w-[65ch] text-base text-muted">
          The following aren&apos;t published in this guide yet. Ask the team for them before going live:
        </p>
        <ul className="list-disc space-y-2 pl-5 text-base text-muted">
          <li>Sandbox and production base URLs</li>
          <li>Error codes and their meaning</li>
          <li>Callback retry behaviour, and how refunds are distinguished in the payload</li>
          <li>Rate limits and versioning policy</li>
        </ul>
      </DocSection>

      <DocSection id="support" title="Support">
        <p className="max-w-[65ch] text-base text-muted">
          For integration questions,{" "}
          <a href={siteConfig.telegram} target="_blank" rel="noopener noreferrer" className="link-inline">
            message our team on Telegram
          </a>{" "}
          or email{" "}
          <a href={`mailto:${siteConfig.salesEmail}`} className="link-inline">
            {siteConfig.salesEmail}
          </a>
          . For scope and onboarding, see the{" "}
          <Link href="/products/casino-api" className="link-inline">
            Casino API overview
          </Link>
          .
        </p>
        <p className="text-sm text-muted">Guide last updated {guideUpdated}.</p>
      </DocSection>
    </div>
  );
}
