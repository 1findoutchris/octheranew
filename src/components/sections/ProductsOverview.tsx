import { products } from "@/data/products";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/sections/ProductCard";
import { Button } from "@/components/ui/Button";

export function ProductsOverview() {
  const featured = products.slice(0, 6);

  return (
    <section className="py-24 lg:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Products"
            title="A full technology ecosystem for operators"
            description="From aggregation to a complete turnkey stack, every Octhera product is built to plug into your business at the stage you need it."
          />
          <Button href="/products" variant="secondary" showArrow className="shrink-0">
            View All Products
          </Button>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product, i) => (
            <ProductCard key={product.slug} product={product} delay={i * 60} />
          ))}
        </div>
      </Container>
    </section>
  );
}
