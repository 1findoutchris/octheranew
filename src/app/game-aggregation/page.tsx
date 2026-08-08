import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";
import { AggregationDiagram } from "@/components/sections/AggregationDiagram";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Game Aggregation",
  description:
    "Integrate once and access games from many studios through the Octhera aggregation layer — a single API, unified wallet and centralized provider management.",
};

const benefits: { icon: IconName; title: string; description: string }[] = [
  { icon: "api", title: "Single API Integration", description: "One connection to access the full aggregated game catalog." },
  { icon: "wallet", title: "Unified Wallet Architecture", description: "A consistent wallet flow across every provider, no per-studio logic required." },
  { icon: "sliders", title: "Provider Management", description: "Enable, disable and configure providers centrally from one control point." },
  { icon: "grid", title: "Game Catalog Management", description: "Organize, tag and merchandise games across categories and providers." },
  { icon: "bar-chart", title: "Reporting", description: "Consolidated reporting across providers for finance and operations." },
  { icon: "globe", title: "Flexible Currencies", description: "Support multiple currencies across your provider catalog." },
  { icon: "users", title: "Multi-Language Support", description: "Localized game experiences for players across markets." },
  { icon: "activity", title: "Provider Updates", description: "New games and provider updates delivered through the same integration." },
  { icon: "server", title: "Scalable Infrastructure", description: "Infrastructure built to support growth in providers, games and traffic." },
];

export default function GameAggregationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Game Aggregation"
        title="Thousands of Games. One Integration."
        description="Connect once through Octhera's aggregation layer and gain access to a growing catalog of game studios — without managing each integration yourself."
      />

      <section className="pb-24 lg:pb-32">
        <Container>
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <Reveal>
              <SectionHeading
                eyebrow="How it works"
                title="Every provider, behind one connection"
                description="Instead of integrating each game studio individually, operators connect once to Octhera. New providers and games become available through the same API, with no additional integration work."
              />
            </Reveal>
            <AggregationDiagram />
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface py-24 lg:py-32">
        <Container>
          <SectionHeading
            eyebrow="Benefits"
            title="Built for operators managing content at scale"
            align="center"
            className="mx-auto"
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, i) => (
              <Reveal key={benefit.title} delay={i * 60} className="card-surface rounded-2xl p-6">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary-soft text-primary-bright">
                  <Icon name={benefit.icon} className="size-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">{benefit.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{benefit.description}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="Ready to expand your game catalog?"
        description="Talk to our team about connecting to the Octhera aggregation layer."
        secondaryLabel="Browse Providers"
        secondaryHref="/providers"
      />
    </>
  );
}
