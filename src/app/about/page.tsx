import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "About",
  description:
    "Octhera is a technology company building infrastructure for the next generation of iGaming businesses — casino aggregation, sportsbook and platform technology.",
};

const pillars: { icon: IconName; title: string; description: string }[] = [
  {
    icon: "rocket",
    title: "Mission",
    description:
      "To give operators of any size the infrastructure to launch, run and grow a gaming business without building everything themselves.",
  },
  {
    icon: "globe",
    title: "Vision",
    description:
      "A gaming industry where the best products win because the technology behind them is accessible, not because of who can afford to build it in-house.",
  },
  {
    icon: "layers",
    title: "Technology Philosophy",
    description:
      "Modular by design. Operators should be able to adopt what they need — aggregation, platform, payments — without being locked into a single monolith.",
  },
  {
    icon: "trending-up",
    title: "Global Ambition",
    description:
      "We're building Octhera to support operators across markets, with infrastructure designed to scale as those markets grow.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Octhera"
        title="Technology infrastructure for the next generation of gaming businesses"
        description="Octhera is a B2B technology company. We build the aggregation, platform and infrastructure layer that operators and brands run on — we do not operate consumer-facing gambling products ourselves."
      />

      <section className="pb-24 lg:pb-32">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2">
            {pillars.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 70} className="card-surface rounded-2xl p-7">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary-soft text-primary-bright">
                  <Icon name={pillar.icon} className="size-6" />
                </div>
                <h2 className="mt-5 text-lg font-semibold text-foreground">{pillar.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{pillar.description}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface py-24 lg:py-32">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Built by people who understand operations
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted">
              Octhera is built by a team focused on the practical realities of
              running an iGaming business — integration timelines, operational
              controls and the day-to-day needs of operators. Licensing and
              regulatory compliance remain the responsibility of each
              operator in their respective markets.
            </p>
          </Reveal>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
