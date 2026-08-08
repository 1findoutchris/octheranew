import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, getProductBySlug } from "@/data/products";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/sections/CTASection";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: { title: `${product.name} | Octhera`, description: product.description },
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden pt-40 pb-20 lg:pt-48 lg:pb-24">
        <div className="absolute inset-0 bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
        <div className="absolute inset-0 bg-radial-fade" />
        <Container className="relative">
          <Reveal>
            <nav className="text-sm text-muted">
              <Link href="/products" className="hover:text-primary-bright">
                Products
              </Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">{product.name}</span>
            </nav>

            <div className="mt-6 flex size-14 items-center justify-center rounded-2xl bg-primary-soft text-primary-bright">
              <Icon name={product.icon} className="size-7" />
            </div>

            <h1 className="mt-6 max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-3 text-lg font-medium text-primary-bright">{product.tagline}</p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              {product.description}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" size="lg" showArrow>
                Talk to Sales
              </Button>
              <Button href="/pricing" size="lg" variant="secondary">
                View Pricing
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="pb-24 lg:pb-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
            <Reveal>
              <h2 className="text-xl font-semibold text-foreground">Key capabilities</h2>
              <ul className="mt-6 space-y-4">
                {product.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-bright">
                      <Icon name="check" className="size-3.5" />
                    </span>
                    <span className="text-sm leading-relaxed text-muted">{feature}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={100} className="card-surface h-fit rounded-2xl p-6">
              <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-bright">
                Best For
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{product.bestFor}</p>
              <div className="mt-6 border-t border-border pt-6">
                <p className="text-xs text-muted">
                  Commercial terms are custom. Reach out for pricing tailored to your business.
                </p>
                <Button href="/contact" size="md" className="mt-4 w-full">
                  Request Access
                </Button>
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface py-24 lg:py-32">
        <Container>
          <h2 className="text-xl font-semibold text-foreground">Related products</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/products/${p.slug}`}
                className="card-surface card-glow group rounded-2xl p-6 transition-transform hover:-translate-y-1"
              >
                <div className="flex size-10 items-center justify-center rounded-lg bg-primary-soft text-primary-bright">
                  <Icon name={p.icon} className="size-5" />
                </div>
                <h3 className="mt-4 text-sm font-semibold text-foreground">{p.name}</h3>
                <p className="mt-1 text-xs text-muted">{p.tagline}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
