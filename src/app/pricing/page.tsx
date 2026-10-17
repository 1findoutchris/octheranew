import type { Metadata } from "next";
import Link from "next/link";
import { pricingPlans } from "@/data/pricing";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { PricingCard } from "@/components/sections/PricingCard";
import { CTASection } from "@/components/sections/CTASection";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Pricing: Aggregation API, White Label & Turnkey Plans",
  description:
    "Published USD launch pricing for Octhera's Game Aggregation API, White Label, Turnkey and Enterprise plans, including the GGR share for each plan where listed.",
  path: "/pricing",
});

const pricingComponents = [
  {
    title: "Plan price",
    description:
      "Each plan shows a list price and the current launch price in USD. The launch price is the one that applies while the offer runs.",
  },
  {
    title: "GGR share",
    description:
      "Where listed, plans also include a percentage of gross gaming revenue (GGR). The rate differs by plan. GGR generally means total player stakes minus player winnings; confirm the exact calculation basis for your plan with our team before signing.",
  },
  {
    title: "Scoped extras (Enterprise)",
    description:
      "Enterprise deployments with additional infrastructure or support needs may incur further costs, scoped with you before you sign.",
  },
];

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Plans and pricing for game aggregation, white label and turnkey"
        description="Octhera publishes its plan prices. Each plan combines a USD plan price with, where listed, a share of gross gaming revenue. Pick the plan that matches how much of the stack you need."
      />

      <div className="theme-light">
        <section className="section-y" aria-label="Plans">
          <Container>
            <div className="mb-8 max-w-[65ch] rounded-xl border border-border bg-elevated p-5 text-base text-muted">
              <p className="font-semibold text-foreground">Not published yet</p>
              <p className="mt-1">
                Billing frequency (one-off or recurring), minimums, taxes, third-party provider
                charges and the end date of the launch offer aren&apos;t published. Confirm them
                with sales before you commit. &ldquo;GGR share not published&rdquo; does not mean 0%.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {pricingPlans.map((plan) => (
                <PricingCard key={plan.slug} plan={plan} />
              ))}
            </div>
            <p className="mt-8 text-sm text-muted">
              Launch pricing shown in USD is available for a limited time. Enterprise deployments
              with additional infrastructure or support needs may incur further scoped costs.
            </p>
          </Container>
        </section>

        <section className="section-y border-t border-border" aria-labelledby="how-heading">
          <Container>
            <h2 id="how-heading" className="type-h2">How pricing works</h2>
            <ul className="mt-8 grid gap-5 md:grid-cols-3">
              {pricingComponents.map((item) => (
                <li key={item.title} className="card-surface rounded-xl p-5 md:p-6">
                  <h3 className="text-lg font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-base text-muted">{item.description}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>

        <section className="section-y border-t border-border" aria-labelledby="map-heading">
          <Container>
            <h2 id="map-heading" className="type-h2">Which plan includes which product</h2>
            <ul className="mt-6 max-w-[65ch] space-y-3 text-base text-muted">
              <li>
                <Link href="/products/casino-aggregator" className="link-inline">Casino aggregator</Link>{" "}
                and <Link href="/products/casino-api" className="link-inline">Casino API</Link>: the
                Game Aggregation API plan for operators with their own platform. Aggregation is
                also listed in White Label and Turnkey.
              </li>
              <li>
                <Link href="/products/white-label" className="link-inline">White Label</Link>: lists
                a ready-made platform with game aggregation, payments and back office.
              </li>
              <li>
                <Link href="/products/sportsbook" className="link-inline">Sportsbook</Link>: listed
                in <Link href="/products/turnkey-casino" className="link-inline">Turnkey</Link> with
                the casino, back office, payments and affiliate tools. Standalone sportsbook
                pricing is quoted on request.
              </li>
            </ul>
          </Container>
        </section>
      </div>

      <CTASection
        title="Questions about a plan?"
        description="Tell us about your markets and platform and we'll confirm which plan fits and what it includes for your business."
        primaryLabel="Request a quote"
        context={{ request: "quote" }}
      />
    </>
  );
}
