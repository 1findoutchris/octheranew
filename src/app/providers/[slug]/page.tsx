import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  providers,
  getProviderBySlug,
  getRelatedProviders,
  availabilityLabels,
} from "@/data/providers";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ProviderCard } from "@/components/providers/ProviderCard";

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
  return {
    title: provider.name,
    description: `${provider.name} on Octhera — ${provider.categories.join(", ")} content available through the Octhera aggregation ecosystem.`,
  };
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
      <section className="relative overflow-hidden pt-40 pb-16 lg:pt-48 lg:pb-20">
        <div className="absolute inset-0 bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
        <div className="absolute inset-0 bg-radial-fade" />
        <Container className="relative">
          <Reveal>
            <nav className="text-sm text-muted">
              <Link href="/providers" className="hover:text-primary-bright">
                Providers
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">{provider.name}</span>
            </nav>

            <div className="mt-6 flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <div className="flex size-16 items-center justify-center rounded-2xl border border-border bg-elevated font-mono text-lg font-semibold uppercase text-primary-bright">
                {provider.name.slice(0, 2)}
              </div>
              <div>
                <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  {provider.name}
                </h1>
                <p className="mt-1 text-sm text-muted">{provider.categories.join(" • ")}</p>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="pb-24 lg:pb-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
            <Reveal>
              <h2 className="text-xl font-semibold text-foreground">Overview</h2>
              <p className="mt-4 text-base leading-relaxed text-muted">{provider.description}</p>

              <h2 className="mt-10 text-xl font-semibold text-foreground">Supported Categories</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {provider.categories.map((category) => (
                  <span
                    key={category}
                    className="rounded-full border border-border bg-elevated px-3.5 py-1.5 text-xs font-medium text-foreground"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={100} className="card-surface h-fit rounded-2xl p-6">
              <dl className="space-y-5">
                <div className="flex items-center justify-between border-b border-border pb-5">
                  <dt className="text-xs uppercase tracking-wide text-muted">Game Count</dt>
                  <dd className="text-sm font-medium text-foreground">
                    {provider.gameCount ?? "—"}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-b border-border pb-5">
                  <dt className="text-xs uppercase tracking-wide text-muted">Availability</dt>
                  <dd className="rounded-full border border-primary-border bg-primary-soft px-3 py-1 text-xs font-medium text-primary-bright">
                    {availabilityLabels[provider.availability]}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-xs uppercase tracking-wide text-muted">Integration Status</dt>
                  <dd className="text-sm font-medium text-foreground">
                    {availabilityLabels[provider.availability]}
                  </dd>
                </div>
              </dl>

              <Button href="/contact" size="md" className="mt-6 w-full">
                Request Provider Access
              </Button>
            </Reveal>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="border-t border-border bg-surface py-24 lg:py-32">
          <Container>
            <h2 className="text-xl font-semibold text-foreground">Related providers</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
