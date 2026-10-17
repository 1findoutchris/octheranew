import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArchitectureIllustration } from "@/components/sections/ArchitectureIllustration";

export function Hero() {
  return (
    <section className="border-b border-border bg-background section-y">
      <Container className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-bright">
            B2B iGaming technology for licensed operators
          </p>
          <h1 className="type-h1 mt-4">Casino aggregation and platform technology for operators</h1>
          <p className="type-lead mt-6 text-muted">
            Connect your existing platform to multi-studio casino content through one API, or
            launch on a White Label or Turnkey platform. A sportsbook is available on your own
            platform or as part of Turnkey. Octhera supplies technology; it does not offer gambling
            to consumers.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button href="/products" size="lg" showArrow>
              Explore solutions
            </Button>
            <Button href="/contact" size="lg" variant="secondary">
              Talk to sales
            </Button>
          </div>
        </div>
        <ArchitectureIllustration />
      </Container>
    </section>
  );
}
