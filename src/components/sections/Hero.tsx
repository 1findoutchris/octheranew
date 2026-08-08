import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { HeroVisual } from "@/components/sections/HeroVisual";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-36 pb-20 lg:pt-44 lg:pb-28">
      <div className="absolute inset-0 bg-grid opacity-[0.3] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black,transparent)]" />
      <div className="absolute inset-0 bg-radial-fade" />
      <div className="animate-float absolute right-[8%] top-24 hidden size-72 rounded-full bg-primary/10 blur-3xl lg:block" />

      <Container className="relative grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-border bg-primary-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary-bright">
            <span className="h-1.5 w-1.5 rounded-full dot-active" />
            B2B iGaming Technology
          </span>

          <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight text-balance sm:text-5xl lg:text-6xl">
            Powering the{" "}
            <span className="text-gradient-accent">Future of iGaming</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            Octhera provides scalable infrastructure for operators to launch
            and grow casino and sportsbook businesses through one technology
            ecosystem — aggregation, platform, payments and back office,
            unified behind a single API.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="/products" size="lg" showArrow>
              Explore Products
            </Button>
            <Button href="/contact" size="lg" variant="secondary">
              Talk to Sales
            </Button>
          </div>
        </Reveal>

        <Reveal delay={150}>
          <HeroVisual />
        </Reveal>
      </Container>
    </section>
  );
}
