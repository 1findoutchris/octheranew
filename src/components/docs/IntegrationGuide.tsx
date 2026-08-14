import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

type Token = { t: string; c?: "key" | "str" | "num" | "comment" | "var" };

const tone: Record<NonNullable<Token["c"]>, string> = {
  key: "text-foreground",
  str: "text-amber",
  num: "text-primary-bright",
  var: "text-primary-bright",
  comment: "text-muted",
};

function Code({ tokens }: { tokens: Token[] }) {
  return (
    <pre className="overflow-x-auto rounded-xl border border-border bg-elevated p-4 font-mono text-[13px] leading-relaxed text-foreground/90">
      <code>
        {tokens.map((tok, i) =>
          tok.c ? (
            <span key={i} className={tone[tok.c]}>
              {tok.t}
            </span>
          ) : (
            <span key={i}>{tok.t}</span>
          )
        )}
      </code>
    </pre>
  );
}

function WarningBanner({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex max-w-3xl items-center justify-center gap-2.5 rounded-full border border-amber/30 bg-amber/10 px-5 py-3 text-center text-sm font-medium text-amber">
      <Icon name="alert-triangle" className="size-4 shrink-0" />
      {children}
    </div>
  );
}

function StepHeading({
  number,
  stepTone,
  title,
}: {
  number: number;
  stepTone: "primary" | "amber";
  title: string;
}) {
  return (
    <div>
      <div className="flex items-center gap-4">
        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold",
            stepTone === "primary" ? "bg-primary-soft text-primary-bright" : "bg-amber/10 text-amber"
          )}
        >
          {number}
        </span>
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
      </div>
      <div className="mt-4 h-px bg-border" />
    </div>
  );
}

function InfoBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2 rounded-xl border border-border bg-elevated/60 p-5 text-sm leading-relaxed text-muted">
      <p className="font-semibold text-foreground">{title}</p>
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted">{children}</p>
  );
}

function EndpointBar({ method, path }: { method: string; path: string }) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-elevated/60 p-4">
      <span className="rounded-md bg-emerald-400/10 px-2 py-1 text-xs font-semibold text-emerald-400">
        {method}
      </span>
      <span className="font-mono text-sm text-primary-bright">{path}</span>
    </div>
  );
}

const authHeaderTokens: Token[] = [
  { t: "Content-Type", c: "key" },
  { t: ": " },
  { t: "application/json", c: "str" },
  { t: "\n" },
  { t: "Authorization", c: "key" },
  { t: ": " },
  { t: "Bearer {YOUR_API_KEY}", c: "str" },
];

const launchRequestTokens: Token[] = [
  { t: "{\n" },
  { t: "  " },
  { t: '"member_account"', c: "key" },
  { t: ": " },
  { t: '"player_001"', c: "str" },
  { t: "," },
  { t: "       // Your internal player ID", c: "comment" },
  { t: "\n  " },
  { t: '"game_uid"', c: "key" },
  { t: ": " },
  { t: '"JILI_SLOT_001"', c: "str" },
  { t: "," },
  { t: "    // Game identifier", c: "comment" },
  { t: "\n  " },
  { t: '"balance"', c: "key" },
  { t: ": " },
  { t: "500.00", c: "num" },
  { t: "," },
  { t: "             // Initial player balance", c: "comment" },
  { t: "\n  " },
  { t: '"home_url"', c: "key" },
  { t: ": " },
  { t: '"https://your-site.com"', c: "str" },
  { t: "  // Redirect after exit", c: "comment" },
  { t: "\n}" },
];

const launchResponseTokens: Token[] = [
  { t: "{\n  " },
  { t: '"code"', c: "key" },
  { t: ": " },
  { t: "0", c: "num" },
  { t: ",\n  " },
  { t: '"msg"', c: "key" },
  { t: ": " },
  { t: '"Success"', c: "str" },
  { t: ",\n  " },
  { t: '"payload"', c: "key" },
  { t: ": {\n    " },
  { t: '"game_launch_url"', c: "key" },
  { t: ": " },
  { t: '"https://api.octhera.com/play?token=SESSION_CODE_XYZ..."', c: "str" },
  { t: "\n  }\n}" },
];

const signatureVerificationTokens: Token[] = [
  { t: "// 1. Get Payload & Header", c: "comment" },
  { t: "\n$payload", c: "var" },
  { t: " = file_get_contents(" },
  { t: "'php://input'", c: "str" },
  { t: ");\n$signature", c: "var" },
  { t: " = $_SERVER[" },
  { t: "'HTTP_X_SIGNATURE'", c: "str" },
  { t: "];\n$secret", c: "var" },
  { t: " = " },
  { t: "'{YOUR_SECRET_KEY}'", c: "str" },
  { t: ";\n\n" },
  { t: "// 2. Calculate Expected Signature", c: "comment" },
  { t: "\n$expected", c: "var" },
  { t: " = hash_hmac(" },
  { t: "'sha256'", c: "str" },
  { t: ", " },
  { t: "$payload", c: "var" },
  { t: ", " },
  { t: "$secret", c: "var" },
  { t: ");\n\n" },
  { t: "// 3. Compare Securely", c: "comment" },
  { t: "\nif (!hash_equals(" },
  { t: "$expected", c: "var" },
  { t: ", " },
  { t: "$signature", c: "var" },
  { t: ")) {\n  http_response_code(401);\n  die(" },
  { t: "'Invalid Signature'", c: "str" },
  { t: ");\n}" },
];

const callbackPayloadTokens: Token[] = [
  { t: "{\n  " },
  { t: '"serial_number"', c: "key" },
  { t: ": " },
  { t: '"uuid-txn-id-1234"', c: "str" },
  { t: ",\n  " },
  { t: '"currency"', c: "key" },
  { t: ": " },
  { t: '"USD"', c: "str" },
  { t: ",\n  " },
  { t: '"game_uid"', c: "key" },
  { t: ": " },
  { t: '"JILI_SLOT_001"', c: "str" },
  { t: ",\n  " },
  { t: '"member_account"', c: "key" },
  { t: ": " },
  { t: '"player_123"', c: "str" },
  { t: "," },
  { t: "    // Your local username", c: "comment" },
  { t: "\n  " },
  { t: '"win_amount"', c: "key" },
  { t: ": " },
  { t: '"150.00"', c: "str" },
  { t: "," },
  { t: "         // Add this to balance", c: "comment" },
  { t: "\n  " },
  { t: '"bet_amount"', c: "key" },
  { t: ": " },
  { t: '"100.00"', c: "str" },
  { t: "," },
  { t: "         // Deduct this from balance", c: "comment" },
  { t: "\n  " },
  { t: '"timestamp"', c: "key" },
  { t: ": " },
  { t: '"1631459081871"', c: "str" },
  { t: ",\n  " },
  { t: '"game_round"', c: "key" },
  { t: ": " },
  { t: '"round_id_555"', c: "str" },
  { t: ",\n  " },
  { t: '"data"', c: "key" },
  { t: ": null\n}" },
];

const callbackResponseTokens: Token[] = [
  { t: "{\n  " },
  { t: '"code"', c: "key" },
  { t: ": " },
  { t: "0", c: "num" },
  { t: ",\n  " },
  { t: '"msg"', c: "key" },
  { t: ": " },
  { t: '"Success"', c: "str" },
  { t: ",\n  " },
  { t: '"balance"', c: "key" },
  { t: ": " },
  { t: "550.00", c: "num" },
  { t: "\n}" },
];

export function IntegrationGuide() {
  return (
    <div className="space-y-14">
      <div className="text-center">
        <div className="flex items-center justify-center gap-3">
          <Icon name="code" className="size-7 text-amber" />
          <h2 className="text-3xl font-semibold tracking-tight text-foreground">Getting Started</h2>
        </div>
        <div className="mt-6">
          <WarningBanner>
            Make sure to set your Callback URL and Whitelist IP in the settings tab before starting
            integration.
          </WarningBanner>
        </div>
      </div>

      {/* Step 1 */}
      <div className="space-y-6">
        <StepHeading number={1} stepTone="primary" title="Launch Game URL" />

        <p className="text-sm leading-relaxed text-muted">
          Get a whitelabeled game session URL for your players. Your players will be redirected
          directly to the game frame, masking the upstream provider.
        </p>

        <InfoBox title="Important:">
          <p>
            We generate a provider-safe player name internally (alphanumeric + length limits). Your{" "}
            <span className="font-semibold text-foreground">member_account</span> remains your own
            internal player ID.
          </p>
          <p>
            A unique <span className="font-semibold text-foreground">transfer_id</span> is generated
            automatically for each launch request. No changes are required on your side.
          </p>
        </InfoBox>

        <EndpointBar method="POST" path="https://api.octhera.com/v1/games/launch" />

        <div>
          <Label>Authentication Headers</Label>
          <Code tokens={authHeaderTokens} />
        </div>

        <div>
          <Label>Request JSON</Label>
          <Code tokens={launchRequestTokens} />
        </div>

        <div>
          <Label>Success Response</Label>
          <Code tokens={launchResponseTokens} />
        </div>
      </div>

      {/* Step 2 */}
      <div className="space-y-6">
        <StepHeading number={2} stepTone="amber" title="Wallet Callback" />

        <p className="text-sm leading-relaxed text-muted">
          Receive real-time transaction events (Bet, Win, Refund) seamlessly. When gameplay happens,
          we push events to your configured endpoint.
        </p>

        <InfoBox title="Callback URL requirement:">
          <p>
            Your callback URL must be a valid public HTTPS URL and resolvable by DNS (example:{" "}
            <span className="font-semibold text-foreground">https://example.com/callback</span>). If
            your callback is unreachable, the provider settlement will fail.
          </p>
        </InfoBox>

        <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border bg-elevated/60 p-4">
          <span className="rounded-md border border-amber/30 bg-amber/10 px-2 py-1 text-xs font-semibold text-amber">
            CALLBACK
          </span>
          <span className="font-mono text-sm text-amber">POST {"{YOUR_CALLBACK_URL}"}</span>
        </div>

        <p className="text-sm leading-relaxed text-muted">
          <span className="font-semibold text-foreground">Signature verification required:</span>{" "}
          Validate the X-Signature header using your{" "}
          <span className="rounded-md border border-border bg-elevated px-1.5 py-0.5 font-mono text-[13px] font-semibold text-foreground">
            Secret Key
          </span>{" "}
          to ensure authenticity. The signature is calculated dynamically using{" "}
          <span className="font-mono text-xs text-foreground">HMAC-SHA256</span> against the raw JSON
          string content of the webhook HTTP body.
        </p>

        <div>
          <Label>Signature Verification (PHP)</Label>
          <Code tokens={signatureVerificationTokens} />
        </div>

        <div>
          <Label>Request Payload</Label>
          <Code tokens={callbackPayloadTokens} />
        </div>

        <div>
          <Label>Your Expected Response</Label>
          <p className="mb-3 text-sm leading-relaxed text-muted">
            Respond with <span className="font-mono text-xs text-foreground">200 OK</span> and your
            updated database balance inside the JSON payload parameters.
          </p>
          <Code tokens={callbackResponseTokens} />
        </div>
      </div>

      <div className="border-t border-border pt-8 text-center text-sm text-muted">
        Need help integrating?{" "}
        <Link href="/contact" className="font-medium text-primary-bright hover:underline">
          Contact Tech Support
        </Link>
      </div>
    </div>
  );
}
