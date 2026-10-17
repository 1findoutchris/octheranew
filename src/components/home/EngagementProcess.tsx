const stages = [
  {
    title: "Discovery",
    body: "You share your markets, licences, current platform and the products you're considering.",
  },
  {
    title: "Scope and agreement",
    body: "Choose a plan and confirm in writing what's included, what it costs and who is responsible for what.",
  },
  {
    title: "Sandbox and configuration",
    body: "Receive credentials, set your callback URL and whitelisted IPs, or configure your platform.",
  },
  {
    title: "Acceptance",
    body: "Test launch, bet, win and refund flows end to end before anything goes live.",
  },
  {
    title: "Launch and support",
    body: "Move to production with the providers confirmed for your markets, with our team's support.",
  },
];

/** How an engagement runs. No durations are given because none are approved. */
export function EngagementProcess() {
  return (
    <ol className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {stages.map((stage, i) => (
        <li key={stage.title} className="border-t-2 border-primary pt-4">
          <p className="font-mono text-sm text-muted">{String(i + 1).padStart(2, "0")}</p>
          <h3 className="mt-1 text-lg font-semibold text-foreground">{stage.title}</h3>
          <p className="mt-2 text-base text-muted">{stage.body}</p>
        </li>
      ))}
    </ol>
  );
}
