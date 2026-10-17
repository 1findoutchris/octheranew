import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, getProductBySlug, type Product, type ProductItem } from "@/data/products";
import { pricingPlans, formatPrice } from "@/data/pricing";
import { Container } from "@/components/ui/Container";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { CTASection } from "@/components/sections/CTASection";
import { PackageComparison } from "@/components/sections/PackageComparison";
import { contactHref } from "@/lib/contact-context";
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
          <Icon name="check" className="mt-1 size-4 shrink-0 text-primary-bright" />
          <span className="text-base text-muted">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ItemGrid({ items, columns = 3 }: { items: ProductItem[]; columns?: 2 | 3 }) {
  return (
    <ul className={columns === 3 ? "grid gap-5 md:grid-cols-2 lg:grid-cols-3" : "grid gap-5 md:grid-cols-2"}>
      {items.map((item) => (
        <li key={item.title} className="card-surface rounded-xl p-5 md:p-6">
          <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
          <p className="mt-2 text-base text-muted">{item.description}</p>
        </li>
      ))}
    </ul>
  );
}

function Steps({ steps }: { steps: ProductItem[] }) {
  return (
    <ol className="space-y-5">
      {steps.map((step, i) => (
        <li key={step.title} className="flex gap-4">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-border-strong font-mono text-sm font-semibold text-foreground">
            {i + 1}
          </span>
          <div>
            <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
            <p className="mt-1 text-base text-muted">{step.description}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

function Section({
  id,
  title,
  intro,
  children,
  divider = true,
}: {
  id: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
  divider?: boolean;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className={divider ? "section-y scroll-mt-20 border-t border-border" : "section-y scroll-mt-20"}
    >
      <Container>
        <h2 id={`${id}-heading`} className="type-h2">
          {title}
        </h2>
        {intro && <p className="type-lead mt-3 text-muted">{intro}</p>}
        <div className="mt-8">{children}</div>
      </Container>
    </section>
  );
}

function PlanCards({ planSlugs }: { planSlugs: string[] }) {
  const plans = planSlugs
    .map((slug) => pricingPlans.find((plan) => plan.slug === slug))
    .filter((plan) => plan !== undefined);
  return (
    <>
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <li key={plan.slug}>
            <Link href={`/pricing#${plan.slug}`} className="card-surface card-glow block h-full rounded-xl p-5 md:p-6">
              <h3 className="text-lg font-semibold text-foreground">{plan.name}</h3>
              <p className="mt-1 text-sm text-muted">{plan.bestFor}</p>
              <p className="mt-4 text-2xl font-semibold text-foreground">
                {formatPrice(plan.currentPrice, plan.currency)}{" "}
                <span className="text-sm font-normal text-muted">
                  launch price (list {formatPrice(plan.originalPrice, plan.currency)})
                </span>
              </p>
              <p className="mt-1 text-base text-foreground">
                {plan.ggrRate ? `+ ${plan.ggrRate} of GGR` : "GGR share not published"}
              </p>
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-6 max-w-[65ch] text-base text-muted">
        Billing frequency, minimums, taxes and third-party charges aren&apos;t published yet; confirm
        them with sales. See the{" "}
        <Link href="/pricing" className="link-inline">
          pricing page
        </Link>{" "}
        for what each plan lists and how GGR share works.
      </p>
    </>
  );
}

const detailIndex = [
  { id: "audience", label: "Who it's for" },
  { id: "included", label: "What's included" },
  { id: "deployment", label: "Deployment" },
  { id: "workflow", label: "Workflow" },
  { id: "onboarding", label: "Onboarding" },
  { id: "responsibilities", label: "Responsibilities" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
];

function ProductDetailSections({ product }: { product: Product }) {
  const detail = product.detail!;
  return (
    <div className="theme-light">
      <nav aria-label="On this page" className="border-b border-border bg-elevated">
        <Container>
          <ul className="flex gap-x-1 overflow-x-auto py-2 text-sm">
            {detailIndex.map((item) => (
              <li key={item.id} className="shrink-0">
                <a
                  href={`#${item.id}`}
                  className="inline-flex min-h-11 items-center rounded-lg px-3 font-medium text-muted hover:bg-surface hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </Container>
      </nav>

      <Section id="audience" title="Who it's for" divider={false}>
        <ItemGrid items={detail.audience} />
      </Section>

      <Section id="included" title="What's included">
        <ItemGrid items={detail.included} />
      </Section>

      <Section id="deployment" title="Integration and deployment options">
        <ItemGrid items={detail.deployment} columns={detail.deployment.length === 2 ? 2 : 3} />
      </Section>

      <Section id="workflow" title={detail.workflow.title} intro={detail.workflow.intro}>
        <div className="max-w-3xl">
          <Steps steps={detail.workflow.steps} />
        </div>
      </Section>

      <Section id="onboarding" title="Onboarding steps">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <Steps steps={detail.onboarding} />
          <div className="card-surface h-fit rounded-xl p-5 md:p-6">
            <h3 className="text-lg font-semibold text-foreground">What to prepare</h3>
            <div className="mt-4">
              <CheckList items={detail.prerequisites} />
            </div>
          </div>
        </div>
      </Section>

      <Section id="responsibilities" title="Who is responsible for what">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="card-surface rounded-xl p-5 md:p-6">
            <h3 className="text-lg font-semibold text-foreground">Octhera provides</h3>
            <div className="mt-4">
              <CheckList items={detail.responsibilities.octhera} />
            </div>
          </div>
          <div className="card-surface rounded-xl p-5 md:p-6">
            <h3 className="text-lg font-semibold text-foreground">The operator is responsible for</h3>
            <div className="mt-4">
              <CheckList items={detail.responsibilities.operator} />
            </div>
          </div>
        </div>
      </Section>

      <Section id="pricing" title="Pricing model" intro={detail.pricing.summary}>
        <PlanCards planSlugs={detail.pricing.planSlugs} />
      </Section>

      <Section id="faq" title="Frequently asked questions">
        <div className="max-w-3xl divide-y divide-border">
          {detail.faqs.map((faq) => (
            <div key={faq.question} className="py-6 first:pt-0">
              <h3 className="text-lg font-semibold text-foreground">{faq.question}</h3>
              <p className="mt-2 text-base text-muted">{faq.answer}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="related" title="Related pages">
        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {detail.related.map((link) => (
            <li key={link.href}>
              <Link href={link.href} className="card-surface card-glow block h-full rounded-xl p-5">
                <span className="text-base font-semibold text-foreground underline underline-offset-4">{link.label}</span>
                <span className="mt-2 block text-sm text-muted">{link.description}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </div>
  );
}

function ProductSummarySections({ product }: { product: Product }) {
  const related = products
    .filter(
      (p) =>
        p.slug !== product.slug &&
        p.includedInPlans.some((plan) => product.includedInPlans.includes(plan))
    )
    .slice(0, 4);
  const isPackage = product.slug === "white-label" || product.slug === "turnkey-casino";

  return (
    <div className="theme-light">
      <Section id="scope" title="Scope" divider={false}>
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <CheckList items={product.features} />
          <div className="card-surface h-fit rounded-xl p-5 md:p-6">
            <h3 className="text-lg font-semibold text-foreground">Best for</h3>
            <p className="mt-2 text-base text-muted">{product.bestFor}</p>
          </div>
        </div>
      </Section>

      <Section
        id="plans"
        title="Included in these published plans"
        intro={
          isPackage
            ? undefined
            : "This module is part of the platform packages below. Ask sales whether it is available on its own."
        }
      >
        <PlanCards planSlugs={product.includedInPlans} />
      </Section>

      {isPackage && (
        <Section id="packages" title="White Label or Turnkey?">
          <PackageComparison />
        </Section>
      )}

      <Section id="responsibilities" title="Responsibilities">
        <p className="max-w-[65ch] text-base text-muted">
          Octhera supplies the technology. You hold the gaming licence for each market you operate
          in and are responsible for regulatory, KYC and responsible-gambling compliance. Which
          operational tasks Octhera&apos;s platform covers for this product is confirmed in your
          agreement.
        </p>
      </Section>

      {related.length > 0 && (
        <Section id="related" title="Related products">
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`} className="card-surface card-glow block h-full rounded-xl p-5">
                  <span className="text-base font-semibold text-foreground underline underline-offset-4">{p.name}</span>
                  <span className="mt-2 block text-sm text-muted">{p.tagline}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </div>
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

  return (
    <>
      <section className="border-b border-border bg-background section-y">
        <Container>
          <Breadcrumbs
            crumbs={[
              { name: "Home", path: "/" },
              { name: "Products", path: "/products" },
              { name: product.name, path: `/products/${product.slug}` },
            ]}
          />
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.14em] text-primary-bright">
            {product.name}
          </p>
          <h1 className="type-h1 mt-4">{product.h1 ?? product.name}</h1>
          <p className="type-lead mt-6 text-muted">{product.detail?.intro ?? product.description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={contactHref({ product: product.slug })} size="lg">
              Talk to sales
            </Button>
            <Button
              href={contactHref({ request: "walkthrough", product: product.slug })}
              size="lg"
              variant="secondary"
            >
              Request a walkthrough
            </Button>
          </div>
        </Container>
      </section>

      {product.detail ? (
        <ProductDetailSections product={product} />
      ) : (
        <ProductSummarySections product={product} />
      )}

      <CTASection
        title={`Talk to us about ${product.name}`}
        description="Share your markets, platform and timeline, and we'll confirm fit, availability and next steps."
        context={{ product: product.slug }}
        secondaryLabel="View pricing"
        secondaryHref="/pricing"
      />
    </>
  );
}
