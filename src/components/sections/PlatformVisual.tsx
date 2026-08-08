import { Icon } from "@/components/ui/Icon";

const bars = [42, 68, 54, 80, 62, 90, 74];
const sidebarIcons = ["grid", "users", "wallet", "bar-chart", "settings"] as const;

export function PlatformVisual() {
  return (
    <div className="card-surface card-glow relative overflow-hidden rounded-3xl p-2">
      <div className="absolute inset-0 bg-grid opacity-10" />
      <div className="relative flex overflow-hidden rounded-2xl border border-border">
        <div className="hidden w-14 flex-col items-center gap-4 border-r border-border bg-elevated py-5 sm:flex">
          {sidebarIcons.map((icon, i) => (
            <div
              key={icon}
              className={
                i === 0
                  ? "flex size-9 items-center justify-center rounded-lg bg-primary-soft text-primary-bright"
                  : "flex size-9 items-center justify-center rounded-lg text-muted"
              }
            >
              <Icon name={icon} className="size-4" />
            </div>
          ))}
        </div>

        <div className="flex-1 bg-background/60 p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-muted">Operator Dashboard</span>
            <span className="inline-flex items-center gap-1.5 text-[11px] text-muted">
              <span className="size-1.5 rounded-full dot-active animate-pulse-glow" />
              Live
            </span>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-3">
            <StatTile label="Players" trendUp />
            <StatTile label="GGR" trendUp />
            <StatTile label="Sessions" />
          </div>

          <div className="mt-6 flex h-28 items-end gap-2">
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-md bg-gradient-to-t from-primary to-primary-bright opacity-80"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>

          <div className="mt-6 space-y-2">
            <Row label="Player Management" />
            <Row label="Risk Controls" />
            <Row label="Bonus Engine" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatTile({ label, trendUp }: { label: string; trendUp?: boolean }) {
  return (
    <div className="rounded-xl border border-border bg-elevated/60 p-3">
      <p className="text-[10px] uppercase tracking-wide text-muted">{label}</p>
      <div className="mt-2 flex items-end justify-between">
        <span className="h-2 w-10 rounded-full bg-border" />
        {trendUp && <Icon name="trending-up" className="size-3.5 text-primary-bright" />}
      </div>
    </div>
  );
}

function Row({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-elevated/40 px-3 py-2">
      <span className="text-xs text-muted">{label}</span>
      <span className="h-1.5 w-16 overflow-hidden rounded-full bg-border">
        <span className="block h-full w-2/3 bg-gradient-to-r from-primary to-amber" />
      </span>
    </div>
  );
}
