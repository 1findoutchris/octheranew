import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { CTASection } from "@/components/sections/CTASection";
import { IntegrationGuide, guideSections } from "@/components/docs/IntegrationGuide";

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
        <Container className="grid gap-10 lg:grid-cols-[220px_1fr]">
          <nav aria-label="On this page" className="lg:sticky lg:top-24 lg:self-start">
            <p className="text-sm font-semibold text-foreground">On this page</p>
            <ul className="mt-2">
              {guideSections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="flex min-h-11 items-center text-base text-muted hover:text-foreground hover:underline">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="min-w-0 max-w-[960px]">
            <IntegrationGuide />
          </div>
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
