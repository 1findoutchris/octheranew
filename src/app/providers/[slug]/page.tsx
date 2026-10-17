import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  providers,
  getProviderBySlug,
  getRelatedProviders,
  availabilityLabels,
  isProviderIndexable,
} from "@/data/providers";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { directoryScope } from "@/data/catalog";
import { pageMetadata } from "@/lib/seo";
import { contactHref } from "@/lib/contact-context";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ProviderCard } from "@/components/providers/ProviderCard";

export const dynamicParams = false;

export function generateStaticParams() {
  return providers.map((provider) => ({ slug: provider.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const provider = getProviderBySlug(slug);
  if (!provider) return {};
  return pageMetadata({
    title: `${provider.name} Games via Octhera`,
    description: `${provider.name} (${provider.categories.join(", ")}) in the Octhera provider directory. Availability for your markets is confirmed on request.`,
    path: `/providers/${provider.slug}`,
    noindex: !isProviderIndexable(provider),
  });
}

export default async function ProviderDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const provider = getProviderBySlug(slug);
  if (!provider) notFound();

  const related = getRelatedProviders(provider);

  return (
    <>
      <section className="border-b border-border bg-background section-y">
        <Container>
          <Breadcrumbs
            crumbs={[
              { name: "Home", path: "/" },
              { name: "Providers", path: "/providers" },
              { name: provider.name, path: `/providers/${provider.slug}` },
            ]}
          />
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.14em] text-primary-bright">
            Provider directory entry
          </p>
          <h1 className="type-h1 mt-4">{provider.name}</h1>
          <p className="type-lead mt-4 text-muted">{provider.categories.join(" · ")}</p>
        </Container>
      </section>

      <section className="theme-light section-y">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <h2 className="type-h3">Overview</h2>
              <p className="mt-4 max-w-[65ch] text-base text-muted">{provider.description}</p>

              <h2 className="type-h3 mt-10">Listed categories</h2>
              <ul className="mt-4 flex flex-wrap gap-2">
                {provider.categories.map((category) => (
                  <li
                    key={category}
                    className="rounded-lg border border-border-strong bg-elevated px-3 py-1.5 text-sm font-medium text-foreground"
                  >
                    {category}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-surface h-fit rounded-xl p-5 md:p-6">
              <dl className="space-y-4">
                {/* Unknown counts are omitted rather than shown as a dash. */}
                {provider.gameCount !== null && (
                  <div className="flex items-center justify-between gap-4">
                    <dt className="text-base text-muted">Games</dt>
                    <dd className="text-base font-medium text-foreground">{provider.gameCount}</dd>
                  </div>
                )}
                <div className="flex items-center justify-between gap-4">
                  <dt className="text-base text-muted">Availability</dt>
                  <dd className="rounded-md border border-border-strong px-2 py-0.5 text-sm font-medium text-foreground">
                    {availabilityLabels[provider.availability]}
                  </dd>
                </div>
              </dl>
              <p className="mt-5 text-sm text-muted">{directoryScope}</p>

              <Button
                href={contactHref({ request: "provider-access", provider: provider.slug })}
                className="mt-6 w-full"
              >
                Ask about {provider.name}
              </Button>
              <Link href="/products/casino-aggregator" className="link-inline mt-4 inline-block text-base">
                How the casino aggregator works
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="theme-light section-y border-t border-border">
          <Container>
            <h2 className="type-h3">Related directory entries</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              {related.map((p) => (
                <ProviderCard key={p.slug} provider={p} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
