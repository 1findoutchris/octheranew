import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Icon, type IconName } from "@/components/ui/Icon";
import { PlatformVisual } from "@/components/sections/PlatformVisual";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Platform",
  description:
    "The Octhera platform is the technology layer underneath your operation — player management, wallet, risk, bonuses, CRM, affiliates, reporting and more.",
};

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
        title="The technology layer underneath your operation"
        description="Octhera sits beneath your brand, handling the operational and technical layers so your team can focus on growing the business."
      />

      <section className="pb-24 lg:pb-32">
        <Container>
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <Reveal>
              <SectionHeading
                eyebrow="Operator Dashboard"
                title="Everything your team needs to run the business"
                description="Player accounts, wallets, risk, bonuses and reporting — managed from a single operational surface, built for teams running live operations."
              />
            </Reveal>
            <Reveal delay={120}>
              <PlatformVisual />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface py-24 lg:py-32">
        <Container>
          <SectionHeading
            eyebrow="Capabilities"
            title="A complete operational toolkit"
            align="center"
            className="mx-auto"
          />

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((capability, i) => (
              <Reveal key={capability.title} delay={i * 50} className="card-surface rounded-2xl p-6">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary-soft text-primary-bright">
                  <Icon name={capability.icon} className="size-5" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-foreground">{capability.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{capability.description}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="See the platform in action"
        description="Request a walkthrough of the Octhera platform with our team."
      />
    </>
  );
}
