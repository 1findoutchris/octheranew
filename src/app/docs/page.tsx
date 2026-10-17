import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { IntegrationGuide } from "@/components/docs/IntegrationGuide";

export const metadata: Metadata = pageMetadata({
  title: "Casino API Documentation: Game Launch & Wallet Callback",
  description:
    "Octhera integration guide: authenticate with a Bearer API key, launch games with POST /v1/games/launch and verify HMAC-SHA256 signed wallet callbacks.",
  path: "/docs",
});

export default function DocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Documentation"
        title="Casino API integration guide"
        description={
          <>
            How to connect your platform to Octhera game aggregation: launch a game session, then
            settle bets, wins and refunds through a signed wallet callback. For a summary of the
            integration and onboarding steps, see the{" "}
            <Link href="/products/casino-api" className="link-inline">
              Casino API overview
            </Link>
            .
          </>
        }
      />

      <section className="theme-light section-y">
        <Container>
          <Reveal id="getting-started" className="scroll-mt-28">
            <IntegrationGuide />
          </Reveal>
        </Container>
      </section>

      <CTASection
        title="Ready to start integrating?"
        description="Sandbox credentials are issued after a short conversation about your platform and markets."
        primaryLabel="Discuss sandbox access"
        context={{ request: "sandbox", product: "casino-api" }}
        secondaryLabel="View API pricing"
        secondaryHref="/pricing#game-aggregation-api"
      />
    </>
  );
}
