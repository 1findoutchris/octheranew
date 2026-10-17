import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, getProductBySlug, type Product, type ProductItem } from "@/data/products";
import { pricingPlans, formatPrice } from "@/data/pricing";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CTASection } from "@/components/sections/CTASection";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

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
  return pageMetadata({
    title: product.seoTitle,
    description: product.seoDescription,
    path: `/products/${product.slug}`,
  });
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3">
          <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary-bright">
            <Icon name="check" className="size-3.5" />
          </span>
          <span className="text-sm leading-relaxed text-muted">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ItemGrid({ items, columns = 3 }: { items: ProductItem[]; columns?: 2 | 3 }) {
  return (
    <div className={columns === 3 ? "grid gap-5 sm:grid-cols-2 lg:grid-cols-3" : "grid gap-5 sm:grid-cols-2"}>
      {items.map((item) => (
        <div key={item.title} className="card-surface rounded-2xl p-6">
          <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
        </div>
      ))}
    </div>
  );
}

function Steps({ steps }: { steps: ProductItem[] }) {
  return (
    <ol className="space-y-4">
      {steps.map((step, i) => (
        <li key={step.title} className="flex gap-4">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary-soft font-mono text-sm font-semibold text-primary-bright">
            {i + 1}
          </span>
          <div>
            <h3 className="text-base font-semibold text-foreground">{step.title}</h3>
            <p className="mt-1 text-sm leading-relaxed text-muted">{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function Section({
  title,
  intro,
  children,
  surface = false,
}: {
  title: string;
  intro?: string;
  children: React.ReactNode;
  surface?: boolean;
}) {
  return (
    <section className={surface ? "border-t border-border bg-surface py-20 lg:py-24" : "py-20 lg:py-24"}>
      <Container>
        <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{title}</h2>
        {intro && <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted">{intro}</p>}
        <div className="mt-10">{children}</div>
      </Container>
    </section>
  );
}

function ProductDetailSections({ product }: { product: Product }) {
  const detail = product.detail!;
  const plans = detail.pricing.planSlugs
    .map((slug) => pricingPlans.find((plan) => plan.slug === slug))
    .filter((plan) => plan !== undefined);

  return (
    <>
      <Section title="Who it's for">
        <ItemGrid items={detail.audience} />
      </Section>

      <Section title="What's included" surface>
        <ItemGrid items={detail.included} />
      </Section>

      <Section title="Integration and deployment options">
        <ItemGrid items={detail.deployment} columns={detail.deployment.length === 2 ? 2 : 3} />
      </Section>

      <Section title={detail.workflow.title} intro={detail.workflow.intro} surface>
        <div className="max-w-3xl">
          <Steps steps={detail.workflow.steps} />
        </div>
      </Section>

      <Section title="Onboarding steps">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <Steps steps={detail.onboarding} />
          <div className="card-surface h-fit rounded-2xl p-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-bright">
              What to prepare
            </h3>
            <div className="mt-5">
              <CheckList items={detail.prerequisites} />
            </div>
          </div>
        </div>
      </Section>

      <Section title="Who is responsible for what" surface>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="card-surface rounded-2xl p-6">
            <h3 className="text-base font-semibold text-foreground">Octhera provides</h3>
            <div className="mt-5">
              <CheckList items={detail.responsibilities.octhera} />
            </div>
          </div>
          <div className="card-surface rounded-2xl p-6">
            <h3 className="text-base font-semibold text-foreground">The operator is responsible for</h3>
            <div className="mt-5">
              <CheckList items={detail.responsibilities.operator} />
            </div>
          </div>
        </div>
      </Section>

      <Section title="Pricing model" intro={detail.pricing.summary}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <Link
              key={plan.slug}
              href={`/pricing#${plan.slug}`}
              className="card-surface card-glow rounded-2xl p-6 transition-transform hover:-translate-y-1"
            >
              <h3 className="text-base font-semibold text-foreground">{plan.name}</h3>
              <p className="mt-1 text-xs text-muted">{plan.bestFor}</p>
              <p className="mt-4 text-2xl font-semibold text-foreground">
                {formatPrice(plan.currentPrice, plan.currency)}{" "}
                <span className="text-sm font-normal text-muted">
                  launch price (list {formatPrice(plan.originalPrice, plan.currency)})
                </span>
              </p>
              <p className="mt-1 text-sm text-primary-bright">
                {plan.ggrRate ? `+ ${plan.ggrRate} of GGR` : "No GGR rate published"}
              </p>
            </Link>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">
          See the{" "}
          <Link href="/pricing" className="font-medium text-primary-bright hover:underline">
            pricing page
          </Link>{" "}
          for what each plan includes and how GGR share works.
        </p>
      </Section>

      <Section title="Frequently asked questions" surface>
        <div className="max-w-3xl divide-y divide-border">
          {detail.faqs.map((faq) => (
            <div key={faq.question} className="py-6 first:pt-0">
              <h3 className="text-base font-semibold text-foreground">{faq.question}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{faq.answer}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Related pages">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {detail.related.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="card-surface card-glow group rounded-2xl p-6 transition-transform hover:-translate-y-1"
            >
              <h3 className="text-sm font-semibold text-foreground group-hover:text-primary-bright">
                {link.label}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">{link.description}</p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}

function ProductSummarySections({ product }: { product: Product }) {
  return (
    <section className="pb-24 lg:pb-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <h2 className="text-xl font-semibold text-foreground">Key capabilities</h2>
            <div className="mt-6">
              <CheckList items={product.features} />
            </div>
          </Reveal>

          <Reveal delay={100} className="card-surface h-fit rounded-2xl p-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-bright">
              Best For
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">{product.bestFor}</p>
            <div className="mt-6 border-t border-border pt-6">
              <p className="text-xs text-muted">
                Published plans and GGR share are listed on the pricing page. Our team can confirm
                which plan includes this product for your business.
              </p>
              <Button href="/pricing" size="md" variant="secondary" className="mt-4 w-full">
                View Pricing
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
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
      <section className="relative overflow-hidden pt-40 pb-16 lg:pt-48 lg:pb-20">
        <div className="absolute inset-0 bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
        <div className="absolute inset-0 bg-radial-fade" />
        <Container className="relative">
          <Reveal>
            <Breadcrumbs
              crumbs={[
                { name: "Home", path: "/" },
                { name: "Products", path: "/products" },
                { name: product.name, path: `/products/${product.slug}` },
              ]}
            />

            <div className="mt-6 flex size-14 items-center justify-center rounded-2xl bg-primary-soft text-primary-bright">
              <Icon name={product.icon} className="size-7" />
            </div>

            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-primary-bright">
              {product.name}
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              {product.h1 ?? product.name}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted">
              {product.detail?.intro ?? product.description}
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

      {product.detail ? (
        <ProductDetailSections product={product} />
      ) : (
        <ProductSummarySections product={product} />
      )}

      {!product.detail && (
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
      )}

      <CTASection
        title={`Talk to us about the ${product.name}`}
        description="Message the team on Telegram with your markets, platform and timeline, and we'll confirm fit, availability and next steps."
        secondaryLabel="View Pricing"
        secondaryHref="/pricing"
      />
    </>
  );
}
