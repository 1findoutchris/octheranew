import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { AggregationDiagram } from "@/components/sections/AggregationDiagram";
import { CTASection } from "@/components/sections/CTASection";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "What Is Casino Game Aggregation? How It Works",
  description:
    "How casino game aggregation works, how it compares with integrating each studio directly, and what operators should check when choosing a game aggregator.",
  path: "/game-aggregation",
});

const comparison: { aspect: string; direct: string; aggregator: string }[] = [
  {
    aspect: "Technical integrations",
    direct: "One per studio, each with its own launch flow and API conventions.",
    aggregator: "One integration to the aggregator for every studio it carries.",
  },
  {
    aspect: "Wallet",
    direct: "A wallet integration to build and maintain for each studio.",
    aggregator: "One wallet callback contract, whichever studio the round came from.",
  },
  {
    aspect: "Adding a new studio",
    direct: "A new integration project.",
    aggregator: "Enabled through the existing integration once the aggregator carries it.",
  },
  {
    aspect: "Reconciliation and reporting",
    direct: "Data in each studio's own format.",
    aggregator: "Consolidated transaction and round data across studios.",
  },
  {
    aspect: "Commercial cost",
    direct: "Agreed with each studio directly.",
    aggregator: "Typically a platform fee and/or revenue share paid to the aggregator.",
  },
];

const checklist: { title: string; description: string }[] = [
  {
    title: "Provider availability in your markets",
    description:
      "A catalog list is not the same as availability for your licence and jurisdictions. Ask for confirmation for your specific markets.",
  },
  {
    title: "Wallet model and callback security",
    description:
      "Who holds the balance, how bets, wins and refunds are delivered, and how callbacks are signed and verified.",
  },
  {
    title: "Reconciliation data",
    description:
      "Whether every transaction carries stable transaction and round identifiers you can reconcile against your own ledger.",
  },
  {
    title: "Pricing structure",
    description:
      "How plan fees and GGR share combine, what GGR is calculated on, and which products each plan includes.",
  },
  {
    title: "Sandbox and onboarding",
    description: "Whether you can build and test against sandbox credentials before committing to production.",
  },
  {
    title: "Responsibility split",
    description:
      "What the aggregator operates versus what stays with you: licensing, player accounts, compliance and support.",
  },
];

export default function GameAggregationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Guide"
        title="How casino game aggregation works"
        description="A game aggregator connects to many game studios and exposes them to operators through one integration. This guide explains how that works, how it compares with integrating studios directly, and what to check when choosing an aggregator."
      />

      <section className="pb-24 lg:pb-32">
        <Container>
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <Reveal>
              <SectionHeading
                eyebrow="How it works"
                title="Every provider, behind one connection"
                description="Instead of integrating each game studio individually, the operator's platform connects once to the aggregator. The aggregator maintains the studio integrations, launches game sessions and reports every bet, win and refund back to the operator's wallet in one consistent format."
              />
              <p className="mt-6 text-base leading-relaxed text-muted">
                At Octhera, that connection is the{" "}
                <Link href="/products/casino-api" className="font-medium text-primary-bright hover:underline">
                  Casino API
                </Link>
                : one endpoint to launch a game and one signed wallet callback your platform
                implements.
              </p>
            </Reveal>
            <AggregationDiagram />
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-surface py-24 lg:py-32">
        <Container>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            Aggregator versus direct studio integrations
          </h2>
          <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted">
            Direct integrations can make sense for a handful of strategic studios. Aggregation
            matters most when you want broad content without growing your integration workload with
            every studio you add.
          </p>
          <div className="mt-10 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-elevated text-foreground">
                <tr>
                  <th scope="col" className="p-4 font-semibold">Aspect</th>
                  <th scope="col" className="p-4 font-semibold">Direct studio integrations</th>
                  <th scope="col" className="p-4 font-semibold">Through an aggregator</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-muted">
                {comparison.map((row) => (
                  <tr key={row.aspect}>
                    <th scope="row" className="p-4 font-medium text-foreground">{row.aspect}</th>
                    <td className="p-4">{row.direct}</td>
                    <td className="p-4">{row.aggregator}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      <section className="py-24 lg:py-32">
        <Container>
          <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            What to check when choosing a game aggregator
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {checklist.map((item) => (
              <Reveal key={item.title} className="card-surface rounded-2xl p-6">
                <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.description}</p>
              </Reveal>
            ))}
          </div>
          <p className="mt-10 max-w-3xl text-base leading-relaxed text-muted">
            To see how Octhera answers these questions, read the{" "}
            <Link href="/products/casino-aggregator" className="font-medium text-primary-bright hover:underline">
              casino aggregator overview
            </Link>{" "}
            for what&apos;s included and how it&apos;s priced, the{" "}
            <Link href="/products/casino-api" className="font-medium text-primary-bright hover:underline">
              Casino API page
            </Link>{" "}
            and{" "}
            <Link href="/docs" className="font-medium text-primary-bright hover:underline">
              documentation
            </Link>{" "}
            for the integration, and the{" "}
            <Link href="/providers" className="font-medium text-primary-bright hover:underline">
              provider directory
            </Link>{" "}
            for the studios we work with.
          </p>
        </Container>
      </section>

      <CTASection
        title="Evaluating an aggregator?"
        description="Tell us your markets and the studios you need, and we'll confirm availability and walk you through the integration."
        secondaryLabel="Casino Aggregator"
        secondaryHref="/products/casino-aggregator"
      />
    </>
  );
}
