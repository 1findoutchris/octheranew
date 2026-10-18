import type { Metadata } from "next";
import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { CTASection } from "@/components/sections/CTASection";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { BuyerRoutes } from "@/components/home/BuyerRoutes";
import { GameRoundWorkflow } from "@/components/home/GameRoundWorkflow";
import { EngagementProcess } from "@/components/home/EngagementProcess";
import { CommercialFit } from "@/components/home/CommercialFit";
import { contactHref } from "@/lib/contact-context";

export const metadata: Metadata = {
  title: { absolute: "Octhera | B2B iGaming Platform, Casino Aggregator & Sportsbook" },
  description:
    "B2B iGaming technology for licensed operators: casino game aggregation through one API, a sportsbook, and white label and turnkey platforms, with published pricing.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Octhera",
    url: "/",
    title: "Octhera | B2B iGaming Platform, Casino Aggregator & Sportsbook",
    description:
      "B2B iGaming technology for licensed operators: casino game aggregation, sportsbook, white label and turnkey platforms.",
  },
};

export default function Home() {
  return (
    <>
      <Hero />

      <section className="theme-light section-y" aria-labelledby="routes-heading">
        <Container>
          <SectionHeading
            id="routes-heading"
            eyebrow="Choose your route"
            title="Which situation are you in?"
            description="Each route lists what you need before starting and what stays with you as the licensed operator."
          />
          <div className="mt-10">
            <BuyerRoutes />
          </div>
        </Container>
      </section>

      <section className="section-y" aria-labelledby="workflow-heading">
        <Container>
          <SectionHeading
            id="workflow-heading"
            eyebrow="How the integration works"
            title="One game round, from launch to reconciliation"
            description="This is the documented casino integration. Screens from the operator back office will be added once approved for publication."
          />
          <div className="mt-10">
            <GameRoundWorkflow />
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/docs" variant="secondary">
              View API guide
            </Button>
            <Button href="/platform" variant="secondary">
              View platform
            </Button>
          </div>
        </Container>
      </section>

      <section className="theme-light section-y" aria-labelledby="engagement-heading">
        <Container>
          <SectionHeading
            id="engagement-heading"
            eyebrow="How engagement works"
            title="From first conversation to launch"
            description="Timelines depend on your scope and are agreed during discovery."
          />
          <div className="mt-10">
            <EngagementProcess />
          </div>
          <div className="mt-8">
            <Button href={contactHref({ request: "walkthrough" })}>Request a walkthrough</Button>
          </div>
        </Container>
      </section>

      <section className="theme-light section-y border-t border-border" aria-labelledby="commercial-heading">
        <Container>
          <SectionHeading
            id="commercial-heading"
            eyebrow="Commercial fit"
            title="Published plans"
            description="Plans combine a USD plan price with, where listed, a share of gross gaming revenue."
          />
          <div className="mt-10">
            <CommercialFit />
          </div>
          <div className="mt-6">
            <Button href="/pricing" variant="secondary">
              View pricing
            </Button>
          </div>
        </Container>
      </section>

      <section className="section-y" aria-labelledby="company-heading">
        <Container>
          <SectionHeading
            id="company-heading"
            eyebrow="Company"
            title="How Octhera works with operators"
          />
          <ul className="mt-8 grid max-w-4xl gap-4 text-base text-muted md:grid-cols-2">
            <li>Octhera is a business-to-business technology supplier and does not offer gambling to consumers.</li>
            <li>Operators hold the licences for their markets and are responsible for regulatory and responsible-gambling compliance.</li>
            <li>Plan prices and GGR share are published on the pricing page.</li>
            <li>The casino integration is documented publicly, and sandbox credentials are issued before go-live.</li>
          </ul>
          <Link href="/about" className="link-inline mt-6 inline-block text-base">
            About Octhera
          </Link>
        </Container>
      </section>

      <CTASection
        title="Tell us what you want to launch"
        primaryLabel="Request a walkthrough"
        context={{ request: "walkthrough" }}
        secondaryLabel="Talk to sales"
        secondaryHref="/contact"
      />
    </>
  );
}
