"use client";

import { useMemo, useState } from "react";
import type { Provider, GameCategory } from "@/data/providers";
import { gameCategories } from "@/data/providers";
import { ProviderCard } from "@/components/providers/ProviderCard";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

type Filter = "All" | GameCategory;

export function ProviderCatalog({ providers }: { providers: Provider[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("All");

  const filters: Filter[] = ["All", ...gameCategories];

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return providers.filter((provider) => {
      const matchesFilter = filter === "All" || provider.categories.includes(filter);
      const matchesQuery = q.length === 0 || provider.name.toLowerCase().includes(q);
      return matchesFilter && matchesQuery;
    });
  }, [providers, query, filter]);

  return (
    <div>
      <div className="flex flex-col gap-4">
        <div className="relative w-full sm:max-w-sm">
          <Icon
            name="search"
            className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted"
          />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search providers..."
            aria-label="Search providers"
            className="h-11 w-full rounded-full border border-border bg-elevated pl-11 pr-4 text-sm text-foreground placeholder:text-muted focus:border-primary-border focus:outline-none"
          />
        </div>

        <div
          className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
          role="group"
          aria-label="Filter providers by category"
        >
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-xs font-medium whitespace-nowrap transition-colors",
                filter === item
                  ? "border-primary-border bg-primary-soft text-primary-bright"
                  : "border-border text-muted hover:border-border-strong hover:text-foreground"
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-muted">
        {results.length} {results.length === 1 ? "provider" : "providers"}
      </p>

      {results.length > 0 ? (
        <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((provider) => (
            <ProviderCard key={provider.slug} provider={provider} />
          ))}
        </div>
      ) : (
        <div className="card-surface mt-4 rounded-2xl p-12 text-center">
          <p className="text-sm text-muted">No providers match your search.</p>
        </div>
      )}
    </div>
  );
}
