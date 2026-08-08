import Link from "next/link";
import type { Provider } from "@/data/providers";
import { availabilityLabels } from "@/data/providers";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

const availabilityStyles: Record<Provider["availability"], string> = {
  available: "bg-primary-soft text-primary-bright border-primary-border",
  planned: "bg-elevated text-muted border-border-strong",
  contact: "bg-elevated text-muted border-border-strong",
};

export function ProviderCard({ provider }: { provider: Provider }) {
  return (
    <Link
      href={`/providers/${provider.slug}`}
      className="card-surface card-glow group flex flex-col rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex size-11 items-center justify-center rounded-xl border border-border bg-elevated font-mono text-xs font-semibold uppercase text-primary-bright">
          {provider.name.slice(0, 2)}
        </div>
        <span
          className={cn(
            "rounded-full border px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide",
            availabilityStyles[provider.availability]
          )}
        >
          {availabilityLabels[provider.availability]}
        </span>
      </div>

      <h3 className="mt-4 text-base font-semibold text-foreground">{provider.name}</h3>
      <p className="mt-1 text-xs text-muted">{provider.categories.join(" • ")}</p>

      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
        <div>
          <p className="text-[10px] uppercase tracking-wide text-muted">Games</p>
          <p className="text-sm font-medium text-foreground">
            {provider.gameCount ?? "—"}
          </p>
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-foreground transition-colors group-hover:text-primary-bright">
          View Provider
          <Icon name="arrow-right" className="size-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
