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

  const filtered = query.trim().length > 0 || filter !== "All";
  const reset = () => {
    setQuery("");
    setFilter("All");
  };
  const summary = `${results.length} ${results.length === 1 ? "entry" : "entries"}${
    filter !== "All" ? ` in ${filter}` : ""
  }${query.trim() ? ` matching “${query.trim()}”` : ""}`;

  return (
    <div>
      <h2 className="type-h3 text-foreground">Browse the directory</h2>
      <div className="mt-4 flex flex-col gap-4">
        <div className="w-full sm:max-w-sm">
          <label htmlFor="provider-search" className="block text-sm font-medium text-foreground">
            Search the directory
          </label>
          <div className="relative mt-2">
            <Icon
              name="search"
              className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted"
            />
            <input
              id="provider-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
              className="min-h-11 w-full rounded-xl border border-border-strong bg-elevated pl-11 pr-4 text-base text-foreground"
            />
          </div>
        </div>

        <div role="group" aria-labelledby="provider-category-label">
          <p id="provider-category-label" className="text-sm font-medium text-foreground">
            Category
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {filters.map((item) => {
              const active = filter === item;
              return (
                <button
                  key={item}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setFilter(item)}
                  className={cn(
                    "inline-flex min-h-11 items-center gap-1.5 rounded-xl border px-4 text-sm font-medium whitespace-nowrap transition-colors",
                    active
                      ? "border-primary-bright bg-primary-soft text-foreground"
                      : "border-border-strong text-muted hover:text-foreground"
                  )}
                >
                  {active && <Icon name="check" className="size-4" />}
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <p role="status" aria-live="polite" className="text-sm text-muted">
          {summary}
        </p>
        {filtered && results.length > 0 && (
          <button type="button" onClick={reset} className="link-inline min-h-11 text-sm">
            Reset filters
          </button>
        )}
      </div>

      {results.length > 0 ? (
        <ul className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((provider) => (
            <li key={provider.slug}>
              <ProviderCard provider={provider} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="card-surface mt-4 rounded-xl p-8 text-center">
          <p className="text-base text-foreground">No directory entries match these filters.</p>
          <p className="mt-1 text-sm text-muted">
            Try another name or category, or ask us about a studio that isn&apos;t listed.
          </p>
          <button type="button" onClick={reset} className="btn-secondary mt-4 inline-flex min-h-11 items-center rounded-xl px-5 text-base font-medium">
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
