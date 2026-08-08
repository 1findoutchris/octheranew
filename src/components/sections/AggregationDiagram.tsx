import { Icon, type IconName } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

const layers: { icon: IconName; title: string; description: string }[] = [
  { icon: "grid", title: "Game Providers", description: "Slots, live casino, crash, table games and more from studios across the industry." },
  { icon: "layers", title: "Octhera Aggregation Layer", description: "Provider connections, wallet logic and catalog management unified in one layer." },
  { icon: "api", title: "Single API", description: "One integration point for your platform team, regardless of how many providers you add." },
  { icon: "server", title: "Operator Platform", description: "Your platform, branding and business logic — connected once, extended indefinitely." },
  { icon: "users", title: "Players", description: "A consistent, reliable game experience for the people playing on your product." },
];

export function AggregationDiagram() {
  return (
    <div className="relative mx-auto max-w-lg">
      {layers.map((layer, i) => (
        <Reveal key={layer.title} delay={i * 90} className="relative">
          <div className="card-surface card-glow flex items-center gap-4 rounded-2xl p-5">
            <div
              className={
                i === 1
                  ? "btn-primary flex size-12 shrink-0 items-center justify-center rounded-xl"
                  : "flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary-soft text-primary-bright"
              }
            >
              <Icon name={layer.icon} className="size-6" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">{layer.title}</h3>
              <p className="mt-0.5 text-xs leading-relaxed text-muted">{layer.description}</p>
            </div>
          </div>

          {i < layers.length - 1 && (
            <div className="flex justify-center py-2">
              <div className="flow-line-vertical h-8 w-px overflow-hidden bg-border" />
            </div>
          )}
        </Reveal>
      ))}
    </div>
  );
}
