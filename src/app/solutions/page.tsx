import type { Metadata } from "next";
import { solutions } from "@/data/solutions";
import { products } from "@/data/products";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Octhera solutions for startups, existing operators, casino brands, sportsbook operators, affiliates, media companies and land-based operators.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Solutions"
        title="Built for every kind of gaming business"
        description="Different businesses need different combinations of Octhera's products. Find where you fit below."
      />

      <section className="pb-24 lg:pb-32">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution, i) => (
              <Reveal
                key={solution.slug}
                delay={i * 60}
                id={solution.slug}
                as="div"
                className="card-surface scroll-mt-28 flex flex-col rounded-2xl p-6"
              >
                <h2 className="text-lg font-semibold text-foreground">{solution.name}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{solution.summary}</p>
                <p className="mt-4 text-xs text-muted">
                  <span className="font-medium text-foreground">Best fit: </span>
                  {solution.fitFor}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {solution.relevantProducts.map((productName) => {
                    const product = products.find((p) => p.name === productName);
                    if (!product) return null;
                    return (
                      <Button
                        key={product.slug}
                        href={`/products/${product.slug}`}
                        variant="secondary"
                        size="md"
                        className="h-8 px-3 text-xs"
                      >
                        {product.name}
                      </Button>
                    );
                  })}
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="Not sure where you fit?"
        description="Tell us about your business and we'll help map the right Octhera products to your goals."
      />
    </>
  );
}
