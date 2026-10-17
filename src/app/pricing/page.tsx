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

      <section className="pb-20 lg:pb-24">
        <Container>
          <div className="grid gap-5 lg:grid-cols-4">
            {pricingPlans.map((plan, i) => (
              <PricingCard key={plan.slug} plan={plan} delay={i * 70} />
            ))}
          </div>

          <p className="mt-10 text-center text-xs text-muted">
            Launch pricing shown in USD is available for a limited time. Enterprise deployments with
            additional infrastructure or support needs may incur further scoped costs. Contact our
            team for details.
          </p>
        </Container>
      </section>

      <section className="border-t border-border bg-surface py-20 lg:py-24">
        <Container>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">How pricing works</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {pricingComponents.map((item) => (
              <div key={item.title} className="card-surface rounded-2xl p-6">
                <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
            ))}
          </div>

          <h2 className="mt-16 text-2xl font-semibold tracking-tight sm:text-3xl">
            Which plan includes which product
          </h2>
          <ul className="mt-6 max-w-3xl space-y-3 text-sm leading-relaxed text-muted">
            <li>
              <Link href="/products/casino-aggregator" className="font-medium text-primary-bright hover:underline">
                Casino aggregator
              </Link>{" "}
              and{" "}
              <Link href="/products/casino-api" className="font-medium text-primary-bright hover:underline">
                Casino API
              </Link>
              : the Game Aggregation API plan for operators with their own platform. Aggregation is
              also included in White Label and Turnkey.
            </li>
            <li>
              <Link href="/products/white-label" className="font-medium text-primary-bright hover:underline">
                White Label
              </Link>
              : ready-made platform with game aggregation, payments and back office included.
            </li>
            <li>
              <Link href="/products/sportsbook" className="font-medium text-primary-bright hover:underline">
                Sportsbook
              </Link>
              : included in{" "}
              <Link href="/products/turnkey-casino" className="font-medium text-primary-bright hover:underline">
                Turnkey
              </Link>{" "}
              with the casino, back office, payments and affiliate tools. Standalone sportsbook
              pricing is quoted on request.
            </li>
          </ul>
        </Container>
      </section>

      <CTASection
        eyebrow="Launch Offer"
        title="Questions about a plan?"
        description="Tell us about your markets and platform and we'll confirm which plan fits and what it includes for your business."
        primaryLabel="Talk to Sales"
      />
    </>
  );
}
