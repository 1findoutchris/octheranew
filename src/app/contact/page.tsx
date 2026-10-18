import type { Metadata } from "next";
import { Suspense } from "react";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { ContactActions, ContactActionsPanel } from "@/components/contact/ContactActions";
import { InquirySection } from "@/components/contact/InquirySection";

export const metadata: Metadata = pageMetadata({
  title: "Contact Sales",
  description:
    "Contact Octhera sales by email at sales@octhera.org or on Telegram about casino aggregation, the casino API, sportsbook, white label, turnkey or enterprise plans.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <section className="border-b border-border bg-background section-y">
        <Container>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-bright">
            Contact
          </p>
          <h1 className="type-h1 mt-4">Talk to Octhera sales</h1>
          <p className="type-lead mt-6 text-muted">
            Tell us what you operate today and what you want to launch. Someone from the team
            follows up by email or Telegram to agree next steps. A walkthrough request asks us to
            contact you; it doesn&apos;t book a meeting.
          </p>
          <div className="mt-8 max-w-3xl">
            <Suspense fallback={<ContactActionsPanel />}>
              <ContactActions />
            </Suspense>
          </div>
        </Container>
      </section>

      <InquirySection />

      <section className="theme-light section-y">
        <Container>
          <details className="max-w-3xl rounded-xl border border-border bg-elevated p-5">
            <summary className="min-h-11 cursor-pointer content-center text-base font-semibold text-foreground">
              What to include so we can help sooner (optional)
            </summary>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-base text-muted">
              <li>Your company name and the markets and licences you operate under</li>
              <li>The product or plan you&apos;re interested in</li>
              <li>Your current platform, if you have one, and the studios you need</li>
              <li>Your target launch timeline</li>
            </ul>
          </details>
        </Container>
      </section>
    </>
  );
}
