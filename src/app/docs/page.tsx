import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { IntegrationGuide } from "@/components/docs/IntegrationGuide";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Integrate with Octhera: API reference, guides and webhooks for game aggregation, sportsbook, wallet and back office.",
};

export default function DocsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Documentation"
        title="Everything you need to integrate with Octhera"
        description="API references, guides and webhook events for game aggregation, sportsbook, wallet and back office — one platform, a single set of docs."
      />

      <section className="py-24 lg:py-32">
        <Container>
          <Reveal id="getting-started" className="scroll-mt-28">
            <IntegrationGuide />
          </Reveal>
        </Container>
      </section>

      <CTASection
        eyebrow="API Access"
        title="Ready to start integrating?"
        description="Talk to our team to get sandbox credentials and access to the full Octhera API reference."
        primaryLabel="Talk to Sales"
        primaryHref="/contact"
        secondaryLabel="Explore Platform"
        secondaryHref="/platform"
      />
    </>
  );
}
