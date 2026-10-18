import { siteConfig } from "@/data/site";
import { contactHref, type ContactContext } from "@/lib/contact-context";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

/**
 * Closing contact panel shared across pages. The primary action carries
 * allowlisted context (product, plan, request type) to /contact.
 */
export function CTASection({
  title = "Talk to Octhera",
  description = "Tell us what you operate and what you want to launch. Someone from the team follows up by email or Telegram to agree next steps.",
  primaryLabel = "Talk to sales",
  context,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: {
  title?: string;
  description?: string;
  primaryLabel?: string;
  context?: Partial<ContactContext>;
  /** Overrides the contextual /contact link. */
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="theme-light section-y" aria-labelledby="cta-heading">
      <Container>
        <div className="rounded-xl border border-border bg-elevated p-6 md:p-10">
          <h2 id="cta-heading" className="type-h2">
            {title}
          </h2>
          <p className="type-lead mt-4 text-muted">{description}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href={primaryHref ?? contactHref(context)} size="lg">
              {primaryLabel}
            </Button>
            {secondaryLabel && secondaryHref && (
              <Button href={secondaryHref} size="lg" variant="secondary">
                {secondaryLabel}
              </Button>
            )}
          </div>
          <p className="mt-6 text-base text-muted">
            Prefer to write directly? Email{" "}
            <a href={`mailto:${siteConfig.salesEmail}`} className="link-inline">
              {siteConfig.salesEmail}
            </a>{" "}
            or{" "}
            <a href={siteConfig.telegram} target="_blank" rel="noopener noreferrer" className="link-inline">
              message our team on Telegram
            </a>
            .
          </p>
        </div>
      </Container>
    </section>
  );
}
