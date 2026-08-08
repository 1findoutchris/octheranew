import type { PricingPlan } from "@/data/pricing";
import { formatPrice, pricingOfferBadge } from "@/data/pricing";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

export function PricingCard({ plan, delay = 0 }: { plan: PricingPlan; delay?: number }) {
  return (
    <Reveal
      delay={delay}
      className={cn(
        "card-surface relative flex flex-col rounded-2xl p-6",
        plan.highlighted && "border-glow"
      )}
    >
      {plan.highlighted && (
        <span className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-primary to-amber px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-black">
          Popular
        </span>
      )}

      <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-primary-border bg-primary-soft px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary-bright">
        <Icon name="bolt" className="size-3" />
        {pricingOfferBadge}
      </span>

      <h2 className="mt-4 text-lg font-semibold text-foreground">{plan.name}</h2>
      <p className="mt-1 text-xs text-muted">{plan.bestFor}</p>

      <div className="mt-6">
        <span className="text-sm font-medium text-muted line-through decoration-muted/70">
          {formatPrice(plan.originalPrice, plan.currency)}
        </span>
        <div className="mt-1 text-4xl font-extrabold tracking-tight text-gradient-accent">
          {formatPrice(plan.currentPrice, plan.currency)}
        </div>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-muted">{plan.priceNote}</p>

      <ul className="mt-6 flex-1 space-y-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <Icon name="check" className="mt-0.5 size-4 shrink-0 text-primary-bright" />
            <span className="text-sm text-muted">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        href="/contact"
        size="md"
        variant={plan.highlighted ? "primary" : "secondary"}
        className="mt-7 w-full"
      >
        {plan.cta}
      </Button>
    </Reveal>
  );
}
