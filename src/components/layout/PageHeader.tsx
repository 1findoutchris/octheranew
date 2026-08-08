import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden pt-40 pb-20 lg:pt-48 lg:pb-24">
      <div className="absolute inset-0 bg-grid opacity-[0.35] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_0%,black,transparent)]" />
      <div className="absolute inset-0 bg-radial-fade" />
      <Container className="relative">
        <Reveal className="max-w-3xl">
          <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary-bright">
            <span className="h-1.5 w-1.5 rounded-full dot-active" />
            {eyebrow}
          </span>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
              {description}
            </p>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
