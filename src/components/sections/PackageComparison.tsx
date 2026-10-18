import Link from "next/link";
import { formatPrice, pricingPlans } from "@/data/pricing";

const packageSlugs = ["white-label", "turnkey"] as const;

/**
 * White Label vs Turnkey, using only what the published plans list. Hosting,
 * ownership, customisation and exit terms are not approved for publication,
 * so they are named as open questions rather than filled in.
 */
export function PackageComparison() {
  const plans = packageSlugs.map((slug) => pricingPlans.find((p) => p.slug === slug)!);
  const productHref: Record<(typeof packageSlugs)[number], string> = {
    "white-label": "/products/white-label",
    turnkey: "/products/turnkey-casino",
  };

  return (
    <div>
      <div className="grid gap-5 md:grid-cols-2">
        {plans.map((plan, i) => (
          <section key={plan.slug} className="card-surface rounded-xl p-5 md:p-6" aria-labelledby={`pkg-${plan.slug}`}>
            <h3 id={`pkg-${plan.slug}`} className="type-h3 text-foreground">
              {plan.name}
            </h3>
            <p className="mt-2 text-base text-muted">{plan.bestFor}</p>
            <p className="mt-4 text-sm font-semibold text-foreground">Listed in the published plan</p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-base text-muted">
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <p className="mt-4 text-base text-muted">
              Launch price {formatPrice(plan.currentPrice, plan.currency)} (list{" "}
              {formatPrice(plan.originalPrice, plan.currency)}),{" "}
              {plan.ggrRate ? `${plan.ggrRate} of GGR` : "GGR share not published"}.
            </p>
            <Link href={productHref[packageSlugs[i]]} className="link-inline mt-4 inline-block text-base">
              View {plan.name}
            </Link>
          </section>
        ))}
      </div>
      <p className="mt-6 max-w-[65ch] text-base text-muted">
        Hosting, customisation, ownership, data export and exit terms for each package, and which
        operational responsibilities Octhera takes on, are confirmed with sales during discovery.
        Licensing stays with the operator in both cases.
      </p>
    </div>
  );
}
