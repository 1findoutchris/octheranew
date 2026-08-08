import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function CTASection({
  eyebrow = "Get Started",
  title = "Ready to talk to Octhera?",
  description = "Tell us about your business and our team will help you find the right product to launch or grow with.",
  primaryLabel = "Talk to Sales",
  primaryHref = "/contact",
  secondaryLabel = "Explore Products",
  secondaryHref = "/products",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <section className="py-24 lg:py-32">
      <Container>
        <Reveal className="card-surface border-glow relative overflow-hidden rounded-3xl px-6 py-16 text-center sm:px-16">
          <div className="absolute inset-0 bg-radial-fade" />
          <div className="animate-pulse-glow absolute left-1/2 top-0 h-40 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/20 blur-3xl" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary-bright">
              <span className="h-1.5 w-1.5 rounded-full dot-active" />
              {eyebrow}
            </span>
            <h2 className="mx-auto mt-5 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">
              {description}
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href={primaryHref} size="lg" showArrow>
                {primaryLabel}
              </Button>
              <Button href={secondaryHref} size="lg" variant="secondary">
                {secondaryLabel}
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
