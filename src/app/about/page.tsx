import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = pageMetadata({
  title: "About Us: B2B iGaming Technology Supplier",
  description:
    "Octhera is a B2B iGaming technology supplier of casino aggregation, sportsbook, white label and turnkey platforms to licensed operators. No consumer gambling.",
  path: "/about",
});

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

const supplies: { label: string; href: string; description: string }[] = [
  {
    label: "Casino aggregator",
    href: "/products/casino-aggregator",
    description: "multi-studio game content through one integration and a seamless wallet model.",
  },
  {
    label: "Casino API",
    href: "/products/casino-api",
    description: "the game launch and signed wallet callback interface for operators with their own platform.",
  },
  {
    label: "Sportsbook",
    href: "/products/sportsbook",
    description: "pre-match and live betting with configurable odds, margins and risk tooling.",
  },
  {
    label: "White label and turnkey platforms",
    href: "/products/turnkey-casino",
    description: "a complete operator platform with back office, payments and affiliate tools.",
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
            {pillars.map((pillar) => (
              <Reveal key={pillar.title} className="card-surface rounded-2xl p-7">
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
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">What Octhera supplies</h2>
              <ul className="mt-6 space-y-4 text-sm leading-relaxed text-muted">
                {supplies.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="font-medium text-primary-bright hover:underline">
                      {item.label}
                    </Link>
                    : {item.description}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">How we work with operators</h2>
              <ul className="mt-6 space-y-4 text-sm leading-relaxed text-muted">
                <li>
                  Octhera is a business-to-business supplier. We do not offer gambling services to
                  consumers.
                </li>
                <li>
                  Operators hold the licences for their markets and are responsible for regulatory
                  compliance, including responsible-gambling requirements.
                </li>
                <li>
                  Plan prices and GGR share are published on our{" "}
                  <Link href="/pricing" className="font-medium text-primary-bright hover:underline">
                    pricing page
                  </Link>
                  .
                </li>
                <li>
                  The integration is documented publicly in our{" "}
                  <Link href="/docs" className="font-medium text-primary-bright hover:underline">
                    developer documentation
                  </Link>
                  , and sandbox credentials are issued before go-live.
                </li>
                <li>
                  You can reach the team directly on Telegram from our{" "}
                  <Link href="/contact" className="font-medium text-primary-bright hover:underline">
                    contact page
                  </Link>
                  .
                </li>
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      <CTASection />
    </>
  );
}
