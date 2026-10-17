import type { Metadata } from "next";
import { providers } from "@/data/providers";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProviderCatalog } from "@/components/providers/ProviderCatalog";
import { CTASection } from "@/components/sections/CTASection";
import { directoryProviderCount, directoryScope } from "@/data/catalog";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Casino Game Provider Directory",
  description:
    "Browse game studios in the Octhera provider directory by category: slots, live casino, crash, table games and more. Market availability confirmed on request.",
  path: "/providers",
});

export default function ProvidersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Game Providers"
        title="Casino game provider directory"
        description={`${directoryProviderCount} studios listed, filterable by game category. ${directoryScope}`}
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
