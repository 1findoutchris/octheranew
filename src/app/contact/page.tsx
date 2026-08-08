import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Icon } from "@/components/ui/Icon";
import { ContactForm } from "@/components/sections/ContactForm";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "Talk to Sales",
  description:
    "Talk to the Octhera team about casino aggregation, sportsbook, turnkey, white label or enterprise gaming infrastructure.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Talk to Sales"
        title="Let's talk about your business"
        description="Tell us where you are today and where you want to go. Our team will follow up with the right next step."
      />

      <section className="pb-24 lg:pb-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
            <Reveal>
              <h2 className="text-lg font-semibold text-foreground">Get in touch</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Whether you&apos;re evaluating a first launch or looking to add
                aggregation, payments or a sportsbook to an existing platform,
                our team can help you scope the right solution.
              </p>

              <div className="mt-8 flex items-center gap-3 text-sm text-muted">
                <span className="flex size-9 items-center justify-center rounded-lg bg-primary-soft text-primary-bright">
                  <Icon name="headset" className="size-4" />
                </span>
                <span>{siteConfig.email}</span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <ContactForm />
            </Reveal>
          </div>
        </Container>
      </section>
    </>
  );
}
