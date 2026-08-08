import type { Metadata } from "next";
import { providers } from "@/data/providers";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProviderCatalog } from "@/components/providers/ProviderCatalog";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Game Providers",
  description:
    "Discover the studios and game categories available through the Octhera aggregation ecosystem, with search and filtering by category.",
};

export default function ProvidersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Game Providers"
        title="Game Providers"
        description="Discover the studios and game categories available through the Octhera aggregation ecosystem."
      />

      <section className="pb-24 lg:pb-32">
        <Container>
          <ProviderCatalog providers={providers} />
        </Container>
      </section>

      <CTASection
        title="Looking for a specific provider?"
        description="Reach out and our team will confirm current availability and integration timelines."
        primaryLabel="Request Provider Access"
      />
    </>
  );
}
