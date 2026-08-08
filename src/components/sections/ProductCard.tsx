import Link from "next/link";
import type { Product } from "@/data/products";
import { Icon } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";

export function ProductCard({ product, delay = 0 }: { product: Product; delay?: number }) {
  return (
    <Reveal delay={delay}>
      <Link
        href={`/products/${product.slug}`}
        className="card-surface card-glow group flex h-full flex-col rounded-2xl p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7"
      >
        <div className="flex size-12 items-center justify-center rounded-xl bg-primary-soft text-primary-bright">
          <Icon name={product.icon} className="size-6" />
        </div>
        <h3 className="mt-5 text-lg font-semibold text-foreground">{product.name}</h3>
        <p className="mt-1 text-sm font-medium text-primary-bright">{product.tagline}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{product.description}</p>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors group-hover:text-primary-bright">
          Learn more
          <Icon
            name="arrow-right"
            className="size-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </Link>
    </Reveal>
  );
}
