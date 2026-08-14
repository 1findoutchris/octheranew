import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
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
    <>
      <PageHeader
        eyebrow="Talk to Sales"
        title="Let's talk about your business"
        description="Tell us where you are today and where you want to go. Message our team directly on Telegram and we'll follow up with the right next step."
      />

      <section className="pb-24 lg:pb-32">
        <Container>
          <Reveal className="relative mx-auto max-w-2xl px-6 py-16 text-center sm:px-16 sm:py-20">
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
        </Container>
      </section>
    </>
  );
}
