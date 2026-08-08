import type { Metadata } from "next";
import { pricingPlans } from "@/data/pricing";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { CTASection } from "@/components/sections/CTASection";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Octhera commercial models for game aggregation, white label, turnkey and enterprise operators. Custom, B2B pricing based on scope and scale.",
};

export default function PricingPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="Commercial models built around your business"
        description="Octhera pricing is custom and B2B by nature — structured around your scope, market and scale rather than a fixed subscription."
      />

      <section className="pb-24 lg:pb-32">
        <Container>
          <div className="grid gap-5 lg:grid-cols-4">
            {pricingPlans.map((plan, i) => (
              <Reveal
                key={plan.slug}
                delay={i * 70}
                className={cn(
                  "card-surface relative flex flex-col rounded-2xl p-6",
                  plan.highlighted && "border-glow"
                )}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-primary to-amber px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-black">
                    Popular
                  </span>
                )}
                <h2 className="text-lg font-semibold text-foreground">{plan.name}</h2>
                <p className="mt-1 text-xs text-muted">{plan.bestFor}</p>

                <p className="mt-6 text-3xl font-semibold text-gradient-accent">{plan.priceLabel}</p>
                <p className="mt-2 text-xs leading-relaxed text-muted">{plan.priceNote}</p>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5">
                      <Icon name="check" className="mt-0.5 size-4 shrink-0 text-primary-bright" />
                      <span className="text-sm text-muted">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  href="/contact"
                  size="md"
                  variant={plan.highlighted ? "primary" : "secondary"}
                  className="mt-7 w-full"
                >
                  {plan.cta}
                </Button>
              </Reveal>
            ))}
          </div>

          <p className="mt-10 text-center text-xs text-muted">
            All commercial terms are custom and confirmed directly with the Octhera team. Figures shown here are placeholders pending finalized terms.
          </p>
        </Container>
      </section>

      <CTASection
        eyebrow="Request Pricing"
        title="Get pricing tailored to your business"
        description="Share a few details about your business and our team will follow up with a commercial proposal."
        primaryLabel="Request Pricing"
      />
    </>
  );
}
