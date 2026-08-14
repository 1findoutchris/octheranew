import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Talk to Sales",
  description:
    "Message the Octhera team on Telegram about casino aggregation, sportsbook, turnkey, white label or enterprise gaming infrastructure.",
};

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
              our team directly on Telegram and we&apos;ll follow up with the
              right next step.
            </p>
          </Reveal>

          <Reveal delay={120} className="relative px-6 py-8 text-center sm:px-0">
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
                we&apos;ll get back to you directly — no forms, no waiting.
              </p>

              <div className="mt-10">
                <Button href={siteConfig.telegram} external size="lg" className="mx-auto">
                  <Icon name="telegram" className="size-5" />
                  Message on Telegram
                </Button>
              </div>

              <p className="mt-5 text-sm font-medium text-muted">@Noah_Octhera</p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
