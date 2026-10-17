import { Icon } from "@/components/ui/Icon";

const bars = [42, 68, 54, 80, 62, 90, 74];
const sidebarIcons = ["grid", "users", "wallet", "bar-chart", "settings"] as const;

/**
 * Concept drawing of an operator console. It contains no product data and
 * is visibly labelled so it can't be mistaken for a real screenshot.
 */
export function PlatformVisual() {
  return (
    <figure className="rounded-xl border border-border bg-surface p-3">
      <p className="mb-3 inline-flex rounded-md border border-border-strong px-2 py-0.5 text-sm font-medium text-muted">
        Illustration — not live product data
      </p>
      <div aria-hidden="true" className="flex overflow-hidden rounded-lg border border-border">
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
            <span className="text-xs font-medium text-muted">Operator console (concept)</span>
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
                className="flex-1 rounded-t-md bg-border-strong"
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
      <figcaption className="mt-3 text-sm text-muted">
        Concept layout of the operator console areas described on this page. Real, redacted
        screenshots will replace it once approved.
      </figcaption>
    </figure>
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
        <span className="block h-full w-2/3 bg-border-strong" />
      </span>
    </div>
  );
}
