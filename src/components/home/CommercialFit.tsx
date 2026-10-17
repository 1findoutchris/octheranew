import Link from "next/link";
import { formatPrice, pricingPlans } from "@/data/pricing";

/**
 * Compact plan comparison from the single pricing source. Billing cadence,
 * minimums and taxes are not approved for publication yet, so the note
 * says so instead of implying a complete quote.
 */
export function CommercialFit() {
  return (
    <div>
      <div className="overflow-x-auto rounded-xl border border-border" role="region" aria-label="Plan comparison" tabIndex={0}>
        <table className="w-full min-w-[640px] text-left text-base">
          <thead className="bg-surface text-foreground">
            <tr>
              <th scope="col" className="p-4 font-semibold">Plan</th>
              <th scope="col" className="p-4 font-semibold">Best for</th>
              <th scope="col" className="p-4 font-semibold">Launch price (USD)</th>
              <th scope="col" className="p-4 font-semibold">GGR share</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-elevated text-muted">
            {pricingPlans.map((plan) => (
              <tr key={plan.slug}>
                <th scope="row" className="p-4 font-medium text-foreground">
                  <Link href={`/pricing#${plan.slug}`} className="link-inline">
                    {plan.name}
                  </Link>
                </th>
                <td className="p-4">{plan.bestFor}</td>
                <td className="p-4">
                  {formatPrice(plan.currentPrice, plan.currency)}{" "}
                  <span className="text-sm">(list {formatPrice(plan.originalPrice, plan.currency)})</span>
                </td>
                <td className="p-4">{plan.ggrRate ? `${plan.ggrRate} of GGR` : "Not published"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-4 max-w-[65ch] text-sm text-muted">
        Billing frequency, minimums, taxes and third-party charges aren&apos;t published yet. Confirm
        them with sales before you commit. A plan without a published GGR rate does not mean 0%.
      </p>
    </div>
  );
}
