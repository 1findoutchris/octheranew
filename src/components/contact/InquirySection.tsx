import { Suspense } from "react";
import { readInquiryConfig } from "@/lib/inquiry/config";
import { channelOptions, productInterestOptions, timelineOptions } from "@/lib/inquiry/validation";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { InquiryForm } from "@/components/contact/InquiryForm";

/**
 * Website inquiry form. Renders nothing unless INQUIRY_FORM_ENABLED=true and
 * every required setting (database, approved sender, SMTP, privacy notice)
 * is configured at build time, so a half-configured form is never shown.
 * Email and Telegram remain available either way.
 */
export function InquirySection() {
  const config = readInquiryConfig();
  if (!config.enabled) return null;

  return (
    <section className="theme-light section-y" aria-labelledby="inquiry-heading">
      <Container>
        <div className="max-w-3xl">
          <h2 id="inquiry-heading" className="type-h2">
            Send a request
          </h2>
          <p className="type-lead mt-3 text-muted">
            We save your request and give you a reference, then a member of the sales team follows up.
          </p>
          <div className="relative mt-8">
            <Suspense fallback={null}>
              <InquiryForm
                privacyUrl={config.privacyUrl}
                salesEmail={siteConfig.salesEmail}
                productOptions={productInterestOptions}
                timelineOptions={timelineOptions}
                channelOptions={channelOptions}
              />
            </Suspense>
          </div>
        </div>
      </Container>
    </section>
  );
}
