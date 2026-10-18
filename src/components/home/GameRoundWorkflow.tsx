const steps = [
  {
    title: "Launch",
    body: "Your server calls POST /v1/games/launch with your player ID, the game ID, the player's balance and a return URL.",
  },
  {
    title: "Play",
    body: "Octhera returns a game session URL that you open in your game frame. The upstream provider is masked.",
  },
  {
    title: "Settle",
    body: "Each bet, win and refund is posted to your callback URL, signed with HMAC-SHA256 using your secret key.",
  },
  {
    title: "Reply and reconcile",
    body: "You verify the signature, update your own wallet and return the new balance. Transaction and round IDs support reconciliation.",
  },
];

/** The documented integration flow (source: /docs). Text only; no simulated screens. */
export function GameRoundWorkflow() {
  return (
    <ol className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
      {steps.map((step, i) => (
        <li key={step.title} className="rounded-xl border border-border bg-elevated p-5">
          <p className="font-mono text-sm text-primary-bright">Step {i + 1}</p>
          <h3 className="mt-2 text-lg font-semibold text-foreground">{step.title}</h3>
          <p className="mt-2 text-base text-muted">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
