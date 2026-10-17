import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/** Charcoal page hero: eyebrow, H1 (56/44/34) and lead paragraph. */
export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Optional actions or breadcrumbs rendered under the lead. */
  children?: React.ReactNode;
}) {
  return (
    <section className="border-b border-border bg-background section-y">
      <Container>
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-bright">
            {eyebrow}
          </p>
          <h1 className="type-h1 mt-4">{title}</h1>
          {description && <p className="type-lead mt-6 text-muted">{description}</p>}
          {children}
        </Reveal>
      </Container>
    </section>
  );
}
