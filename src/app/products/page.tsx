import type { Metadata } from "next";
import { products } from "@/data/products";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/layout/PageHeader";
import { ProductCard } from "@/components/sections/ProductCard";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Explore Octhera's B2B iGaming products: casino aggregation, sportsbook, turnkey casino, white label, casino API, back office, payments and affiliate systems.",
};

export default function ProductsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Products"
        title="Technology for every stage of your business"
        description="Whether you're launching a new brand or extending an existing platform, Octhera's product suite is built to plug in where you need it."
      />

      <section className="pb-24 lg:pb-32">
        <Container>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <ProductCard key={product.slug} product={product} delay={i * 50} />
            ))}
          </div>
        </Container>
      </section>

      <CTASection
        title="Not sure which product fits?"
        description="Tell us about your business and our team will help you map the right combination of Octhera products."
      />
    </>
  );
}
