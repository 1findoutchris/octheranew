import { Icon, type IconName } from "@/components/ui/Icon";

const layers: { icon: IconName; title: string; description: string }[] = [
  { icon: "grid", title: "Game studios", description: "Slots, live casino, crash, table games and other categories." },
  { icon: "layers", title: "Aggregation layer", description: "Studio connections, wallet logic and catalog management in one place." },
  { icon: "api", title: "One API", description: "A single integration point for your platform team." },
  { icon: "server", title: "Operator platform", description: "Your platform, branding, accounts and wallet." },
  { icon: "users", title: "Players", description: "Play in your lobby." },
];

/** Concept diagram of an aggregation stack, labelled as an illustration. */
export function AggregationDiagram() {
  return (
    <figure className="rounded-xl border border-border bg-surface p-5">
      <p className="inline-flex rounded-md border border-border-strong px-2 py-0.5 text-sm font-medium text-muted">
        Illustration
      </p>
      <ol className="mt-4">
        {layers.map((layer, i) => (
          <li key={layer.title}>
            <div className="flex items-center gap-4 rounded-xl border border-border bg-elevated p-4">
              <span
                className={
                  i === 1
                    ? "flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary text-on-primary"
                    : "flex size-11 shrink-0 items-center justify-center rounded-lg border border-border-strong text-foreground"
                }
              >
                <Icon name={layer.icon} className="size-5" />
              </span>
              <span>
                <span className="block text-base font-semibold text-foreground">{layer.title}</span>
                <span className="block text-sm text-muted">{layer.description}</span>
              </span>
            </div>
            {i < layers.length - 1 && <span aria-hidden="true" className="ml-9 block h-4 w-px bg-border-strong" />}
          </li>
        ))}
      </ol>
      <figcaption className="mt-4 text-sm text-muted">
        Concept diagram: studios connect to the aggregation layer once, and your platform connects
        to it through one API.
      </figcaption>
    </figure>
  );
}
