import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import type { IconName } from "@/components/ui/Icon";
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
    label: "White Label",
    href: "/products/white-label",
    description: "a ready-made platform; the published plan lists game aggregation, payments and back office.",
  },
  {
    label: "Turnkey",
    href: "/products/turnkey-casino",
    description: "the fuller stack; the published plan lists casino, sportsbook, back office, payments and affiliate tools.",
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

      <section className="theme-light section-y" aria-labelledby="approach-heading">
        <Container>
          <h2 id="approach-heading" className="type-h2">Our approach</h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {pillars.map((pillar) => (
              <li key={pillar.title} className="card-surface rounded-xl p-5 md:p-6">
                <h3 className="text-lg font-semibold text-foreground">{pillar.title}</h3>
                <p className="mt-2 text-base text-muted">{pillar.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="theme-light section-y border-t border-border">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <h2 className="type-h2">What Octhera supplies</h2>
              <ul className="mt-6 space-y-4 text-base text-muted">
                {supplies.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="link-inline">
                      {item.label}
                    </Link>
                    : {item.description}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal>
              <h2 className="type-h2">How we work with operators</h2>
              <ul className="mt-6 space-y-4 text-base text-muted">
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
                  <Link href="/pricing" className="link-inline">
                    pricing page
                  </Link>
                  .
                </li>
                <li>
                  The integration is documented publicly in our{" "}
                  <Link href="/docs" className="link-inline">
                    developer documentation
                  </Link>
                  , and sandbox credentials are issued before go-live.
                </li>
                <li>
                  You can reach the team directly on Telegram from our{" "}
                  <Link href="/contact" className="link-inline">
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
