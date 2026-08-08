import type { Metadata } from "next";
import { pricingPlans } from "@/data/pricing";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { PricingCard } from "@/components/sections/PricingCard";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Octhera launch pricing for game aggregation, white label, turnkey and enterprise operators — limited-time discounted rates in USD.",
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Launch pricing for every stage of your business"
        description="For a limited time, Octhera products are available at discounted launch pricing — straightforward B2B rates in USD, no negotiation required to get started."
      />

      <section className="pb-24 lg:pb-32">
        <Container>
          <div className="grid gap-5 lg:grid-cols-4">
            {pricingPlans.map((plan, i) => (
              <PricingCard key={plan.slug} plan={plan} delay={i * 70} />
            ))}
          </div>

          <p className="mt-10 text-center text-xs text-muted">
            Launch pricing shown in USD is available for a limited time. Enterprise deployments with additional infrastructure or support needs may incur further scoped costs — contact our team for details.
          </p>
        </Container>
      </section>

      <CTASection
        eyebrow="Launch Offer"
        title="Lock in launch pricing before it ends"
        description="Share a few details about your business and our team will help you get started at today's discounted rate."
        primaryLabel="Talk to Sales"
      />
    </>
  );
}
