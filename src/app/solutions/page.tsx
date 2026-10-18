import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { solutions } from "@/data/solutions";
import { products } from "@/data/products";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import Link from "next/link";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = pageMetadata({
  title: "iGaming Solutions by Operator Type",
  description:
    "Which Octhera products fit startups, existing operators, casino brands, sportsbook operators, affiliates, media companies and land-based operators.",
  path: "/solutions",
});

export default function SolutionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Solutions"
        title="Which Octhera products fit your business"
        description="Different businesses need different combinations of Octhera's products. Find where you fit below."
      />

      <section className="theme-light section-y">
        <Container>
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {solutions.map((solution) => (
              <li
                key={solution.slug}
                id={solution.slug}
                className="card-surface flex scroll-mt-24 flex-col rounded-xl p-5 md:p-6"
              >
                <h2 className="type-h3 text-foreground">{solution.name}</h2>
                <p className="mt-3 flex-1 text-base text-muted">{solution.summary}</p>
                <p className="mt-4 text-base text-muted">
                  <span className="font-semibold text-foreground">Best fit: </span>
                  {solution.fitFor}
                </p>
                <h3 className="mt-5 text-sm font-semibold text-foreground">Relevant products</h3>
                <ul className="mt-2 space-y-1">
                  {solution.relevantProducts.map((productName) => {
                    const product = products.find((p) => p.name === productName);
                    if (!product) return null;
                    return (
                      <li key={product.slug}>
                        <Link href={`/products/${product.slug}`} className="link-inline inline-flex min-h-11 items-center text-base">
                          {product.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CTASection
        title="Not sure where you fit?"
        description="Tell us about your business and we'll help map the right Octhera products to your goals."
      />
    </>
  );
}
