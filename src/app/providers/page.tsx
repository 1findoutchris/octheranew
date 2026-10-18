import type { Metadata } from "next";
import { providers } from "@/data/providers";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProviderCatalog } from "@/components/providers/ProviderCatalog";
import { CTASection } from "@/components/sections/CTASection";
import { directoryBrandCount, directoryEntryCount, directoryScope } from "@/data/catalog";
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
        description={`${directoryEntryCount} directory entries covering ${directoryBrandCount} brand names (some studios have a separate live-casino entry). ${directoryScope}`}
      />

      <section className="theme-light section-y">
        <Container>
          <ProviderCatalog providers={providers} />
        </Container>
      </section>

      <CTASection
        title="Looking for a specific provider?"
        description="Tell us your markets and the studios you need, and we'll confirm what is available to you."
        primaryLabel="Ask about provider access"
        context={{ request: "provider-access" }}
      />
    </>
  );
}
