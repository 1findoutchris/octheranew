import { Icon } from "@/components/ui/Icon";

const providerDots = Array.from({ length: 6 });

export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-md lg:max-w-none">
      <div className="absolute -inset-8 -z-10 rounded-[2.5rem] bg-primary/10 blur-3xl" />
      <div className="card-surface card-glow relative overflow-hidden rounded-3xl p-6 sm:p-8">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="relative flex flex-col gap-6">
          <div className="flex items-center justify-between text-xs text-muted">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-1.5 rounded-full dot-active animate-pulse-glow" />
              Live network
            </span>
            <span className="font-mono">octhera.api/v1</span>
          </div>

          <div className="grid grid-cols-3 items-center gap-2 sm:gap-4">
            <VisualNode icon="server" label="Operator" />
            <VisualNode icon="layers" label="Octhera" primary />
            <VisualNode icon="users" label="Players" />
          </div>

          <div className="flow-line h-px w-full bg-border" />

          <div>
            <p className="mb-3 text-center text-xs font-medium uppercase tracking-[0.18em] text-muted">
              Connected Providers
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {providerDots.map((_, i) => (
                <div
                  key={i}
                  className="animate-float flex size-11 items-center justify-center rounded-xl border border-border bg-elevated text-primary-bright sm:size-12"
                  style={{ animationDelay: `${i * 0.35}s` }}
                >
                  <Icon name="grid" className="size-4" />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 border-t border-border pt-6 text-center">
            <MiniStat label="Uptime" value="High" />
            <MiniStat label="Latency" value="Low" />
            <MiniStat label="Coverage" value="Global" />
          </div>
        </div>
      </div>
    </div>
  );
}

function VisualNode({
  icon,
  label,
  primary,
}: {
  icon: "server" | "layers" | "users";
  label: string;
  primary?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className={
          primary
            ? "btn-primary flex size-14 items-center justify-center rounded-2xl sm:size-16"
            : "flex size-14 items-center justify-center rounded-2xl border border-border bg-elevated text-foreground sm:size-16"
        }
      >
        <Icon name={icon} className="size-6" />
      </div>
      <span className="text-[11px] font-medium text-muted sm:text-xs">{label}</span>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-sm font-semibold text-foreground">{value}</p>
      <p className="text-[11px] text-muted">{label}</p>
    </div>
  );
}
