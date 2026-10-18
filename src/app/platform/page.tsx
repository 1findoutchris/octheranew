import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { contactHref } from "@/lib/contact-context";
import { Icon, type IconName } from "@/components/ui/Icon";
import { PlatformVisual } from "@/components/sections/PlatformVisual";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = pageMetadata({
  title: "iGaming Platform & Operator Back Office",
  description:
    "The Octhera platform layer: player and wallet management, game controls, risk, bonuses, CRM, affiliates, reporting and role-based access for operator teams.",
  path: "/platform",
});

const capabilities: { icon: IconName; title: string; description: string }[] = [
  { icon: "users", title: "Player Management", description: "Player accounts, KYC status and lifecycle in one place." },
  { icon: "wallet", title: "Wallet Management", description: "A unified wallet layer across every game and payment method." },
  { icon: "gamepad", title: "Game Management", description: "Control which games and providers are live, by market or brand." },
  { icon: "shield", title: "Risk Controls", description: "Configurable limits, fraud and responsible-gambling controls." },
  { icon: "gift", title: "Bonus Management", description: "Build and manage promotions, free spins and bonus rules." },
  { icon: "headset", title: "CRM", description: "Player segmentation and engagement tools for retention teams." },
  { icon: "affiliate", title: "Affiliate Management", description: "Track and manage affiliate partners and commission structures." },
  { icon: "bar-chart", title: "Reporting", description: "Operational reporting across players, games and revenue." },
  { icon: "trending-up", title: "Analytics", description: "Performance insight to guide product and marketing decisions." },
  { icon: "layers", title: "Content Management", description: "Manage catalog structure, merchandising and category layout." },
  { icon: "api", title: "API Management", description: "Manage keys, scopes and access across your integrations." },
  { icon: "key", title: "User Roles & Permissions", description: "Granular access control for internal teams and partners." },
];

export default function PlatformPage() {
  return (
    <>
      <PageHeader
        eyebrow="Platform"
        title="The operator platform layer"
        description="The back office and services underneath White Label and Turnkey deployments: player and wallet management, game controls, risk, bonuses and reporting."
      />

      <section className="section-y" aria-labelledby="console-heading">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionHeading
                id="console-heading"
                eyebrow="Operator console"
                title="Where your team runs daily operations"
                description="Player accounts, wallets, risk, bonuses and reporting are managed from one operational surface. Ask for a walkthrough to see the current product."
              />
              <div className="mt-8">
                <Button href={contactHref({ request: "walkthrough", product: "back-office" })}>
                  Request a walkthrough
                </Button>
              </div>
            </div>
            <PlatformVisual />
          </div>
        </Container>
      </section>

      <section className="theme-light section-y" aria-labelledby="capabilities-heading">
        <Container>
          <SectionHeading
            id="capabilities-heading"
            title="Capabilities"
            description="Which capabilities are included, and how they are configured for your markets, is confirmed for your package during discovery."
          />
          <ul className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((capability) => (
              <li key={capability.title} className="card-surface rounded-xl p-5 md:p-6">
                <Icon name={capability.icon} className="size-5 text-primary-bright" />
                <h3 className="mt-3 text-lg font-semibold text-foreground">{capability.title}</h3>
                <p className="mt-2 text-base text-muted">{capability.description}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CTASection
        title="See the platform with our team"
        description="Request a walkthrough of the Octhera platform. We'll contact you to arrange it."
        primaryLabel="Request a walkthrough"
        context={{ request: "walkthrough", product: "back-office" }}
      />
    </>
  );
}
