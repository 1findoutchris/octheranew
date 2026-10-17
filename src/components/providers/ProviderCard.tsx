import Link from "next/link";
import type { Provider } from "@/data/providers";
import { availabilityLabels } from "@/data/providers";
import { Icon } from "@/components/ui/Icon";

export function ProviderCard({ provider }: { provider: Provider }) {
  return (
    <Link
      href={`/providers/${provider.slug}`}
      className="card-surface card-glow group flex h-full flex-col rounded-xl p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <h3 className="text-base font-semibold text-foreground">{provider.name}</h3>
        <span className="shrink-0 rounded-lg border border-border-strong px-2 py-0.5 text-xs font-medium text-muted">
          {availabilityLabels[provider.availability]}
        </span>
      </div>
      <p className="mt-1 text-sm text-muted">{provider.categories.join(" · ")}</p>

      {/* Unknown counts are omitted rather than shown as a dash. */}
      {provider.gameCount !== null && (
        <dl className="mt-4 flex items-baseline gap-2">
          <dt className="text-sm text-muted">Games</dt>
          <dd className="text-sm font-medium text-foreground">{provider.gameCount}</dd>
        </dl>
      )}
      <span className="flex-1" />

      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-foreground group-hover:underline">
        View entry
        <Icon name="arrow-right" className="size-4" />
      </span>
    </Link>
  );
}
