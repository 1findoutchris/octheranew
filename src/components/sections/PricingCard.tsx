import type { PricingPlan } from "@/data/pricing";
import { formatPrice, pricingOfferBadge } from "@/data/pricing";
import { contactHref } from "@/lib/contact-context";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

export function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <section
      id={plan.slug}
      aria-labelledby={`${plan.slug}-name`}
      className="card-surface flex scroll-mt-24 flex-col rounded-xl p-5 md:p-6"
    >
      <p className="w-fit rounded-md border border-border-strong px-2 py-0.5 text-sm font-medium text-muted">
        {pricingOfferBadge}
      </p>

      <h2 id={`${plan.slug}-name`} className="type-h3 mt-4 text-foreground">
        {plan.name}
      </h2>
      <p className="mt-1 text-base text-muted">{plan.bestFor}</p>

      <div className="mt-6">
        <p className="text-sm text-muted">
          <span className="sr-only">List price </span>
          <span className="line-through">{formatPrice(plan.originalPrice, plan.currency)}</span>
          <span aria-hidden="true"> list</span>
        </p>
        <p className="mt-1 text-4xl font-semibold tracking-tight text-foreground">
          <span className="sr-only">Launch price </span>
          {formatPrice(plan.currentPrice, plan.currency)}
        </p>
      </div>
      <p className="mt-2 text-sm text-muted">{plan.priceNote}</p>
      <p className="mt-2 text-base font-semibold text-foreground">
        {plan.ggrRate ? `+ ${plan.ggrRate} of GGR` : "GGR share not published"}
      </p>

      <h3 className="mt-6 text-sm font-semibold text-foreground">Listed in this plan</h3>
      <ul className="mt-3 flex-1 space-y-2">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-2.5">
            <Icon name="check" className="mt-1 size-4 shrink-0 text-primary-bright" />
            <span className="text-base text-muted">{feature}</span>
          </li>
        ))}
      </ul>

      <Button
        href={contactHref({ request: "quote", plan: plan.slug })}
        variant={plan.highlighted ? "primary" : "secondary"}
        className="mt-6 w-full"
      >
        Request a quote
      </Button>
    </section>
  );
}
