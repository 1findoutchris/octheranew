import type { Metadata } from "next";
import Link from "next/link";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = pageMetadata({
  title: "Contact Sales",
  description:
    "Contact Octhera sales on Telegram or at sales@octhera.org about casino aggregation, the casino API, sportsbook, white label, turnkey or enterprise plans.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="relative overflow-hidden pt-40 pb-24 lg:pt-48 lg:pb-32">
      <div className="absolute inset-0 bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
      <div className="absolute inset-0 bg-radial-fade" />
      <Container className="relative">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary-bright">
              <span className="h-1.5 w-1.5 rounded-full dot-active" />
              Talk to Sales
            </span>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              Let&apos;s talk about your business
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
              Tell us where you are today and where you want to go. Message
              our team on Telegram or email sales, and we&apos;ll follow up
              with the right next step.
            </p>
            <h2 className="mt-10 text-sm font-semibold uppercase tracking-[0.14em] text-primary-bright">
              To get a faster answer, include
            </h2>
            <ul className="mt-4 space-y-2 text-sm leading-relaxed text-muted">
              <li>Your company name and the markets and licences you operate under</li>
              <li>
                The product you&apos;re interested in, such as the{" "}
                <Link href="/products/casino-aggregator" className="text-primary-bright hover:underline">
                  casino aggregator
                </Link>
                ,{" "}
                <Link href="/products/sportsbook" className="text-primary-bright hover:underline">
                  sportsbook
                </Link>{" "}
                or a{" "}
                <Link href="/pricing" className="text-primary-bright hover:underline">
                  published plan
                </Link>
              </li>
              <li>Your current platform, if you have one, and the studios you need</li>
              <li>Your target launch timeline</li>
            </ul>
          </Reveal>

          <Reveal className="relative px-6 py-8 text-center sm:px-0">
            <div className="animate-pulse-glow absolute left-1/2 top-0 h-48 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-3xl" />
            <div className="relative">
              <div className="mx-auto flex size-20 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-amber text-white shadow-[0_8px_28px_-8px_var(--color-primary-glow)]">
                <Icon name="telegram" className="size-10" />
              </div>

              <h2 className="mt-7 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Chat with us on Telegram
              </h2>
              <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-muted">
                The fastest way to reach the Octhera team. Send a message and
                we&apos;ll get back to you directly.
              </p>

              <div className="mt-10">
                <Button href={siteConfig.telegram} external size="lg" className="mx-auto">
                  <Icon name="telegram" className="size-5" />
                  Message on Telegram
                </Button>
              </div>

              <div className="mx-auto mt-10 max-w-md border-t border-border pt-8">
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  Prefer email?
                </h2>
                <p className="mt-2 text-base text-muted">
                  Write to{" "}
                  <a
                    href={`mailto:${siteConfig.salesEmail}`}
                    className="font-medium text-primary-bright hover:underline"
                  >
                    {siteConfig.salesEmail}
                  </a>
                </p>
                <div className="mt-5">
                  <Button
                    href={`mailto:${siteConfig.salesEmail}?subject=${encodeURIComponent("Octhera enquiry")}`}
                    size="lg"
                    variant="secondary"
                    className="mx-auto"
                  >
                    <Icon name="mail" className="size-5" />
                    Email Sales
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
