import { Icon, type IconName } from "@/components/ui/Icon";

const nodes: { icon: IconName; title: string; detail: string }[] = [
  { icon: "users", title: "Player", detail: "Plays in your lobby" },
  { icon: "server", title: "Your platform", detail: "Accounts and wallet stay with you" },
  { icon: "layers", title: "Octhera", detail: "Game launch and signed wallet callbacks" },
  { icon: "grid", title: "Game studios", detail: "Aggregated content" },
];

/**
 * Concept diagram of the documented integration (see /docs). It is labelled
 * as an illustration because it is not a product screenshot or live data.
 */
export function ArchitectureIllustration() {
  return (
    <figure className="rounded-xl border border-border bg-surface p-5 md:p-6">
      <p className="inline-flex rounded-md border border-border-strong px-2 py-0.5 text-sm font-medium text-muted">
        Illustration
      </p>
      <ol className="mt-5 space-y-3">
        {nodes.map((node, i) => (
          <li key={node.title}>
            <div className="flex items-center gap-4 rounded-xl border border-border bg-elevated p-4">
              <span
                className={
                  node.title === "Octhera"
                    ? "flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary text-on-primary"
                    : "flex size-11 shrink-0 items-center justify-center rounded-lg border border-border-strong text-foreground"
                }
              >
                <Icon name={node.icon} className="size-5" />
              </span>
              <span>
                <span className="block text-base font-semibold text-foreground">{node.title}</span>
                <span className="block text-sm text-muted">{node.detail}</span>
              </span>
            </div>
            {i < nodes.length - 1 && (
              <span aria-hidden="true" className="ml-9 block h-3 w-px bg-border-strong" />
            )}
          </li>
        ))}
      </ol>
      <figcaption className="mt-4 text-sm text-muted">
        How a casino integration connects: your platform launches games through Octhera and settles
        every bet, win and refund in its own wallet. Concept diagram, not a product screenshot.
      </figcaption>
    </figure>
  );
}
