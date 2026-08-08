export type PricingPlan = {
  slug: string;
  name: string;
  bestFor: string;
  currency: "USD";
  /** Struck-through reference price. */
  originalPrice: number;
  /** Current discounted price, shown prominently. */
  currentPrice: number;
  priceNote: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
};

/**
 * Single source of truth for Octhera commercial pricing. Both the homepage
 * pricing section and /pricing page render from this file — update prices
 * here and they change everywhere.
 */
export const pricingOfferBadge = "Launch Offer";

export const pricingPlans: PricingPlan[] = [
  {
    slug: "game-aggregation-api",
    name: "Game Aggregation API",
    bestFor: "Operators with an existing platform",
    currency: "USD",
    originalPrice: 1500,
    currentPrice: 999,
    priceNote: "Limited-time launch pricing for new operators.",
    features: [
      "Single API access to the aggregated catalog",
      "Provider and game catalog management",
      "Reporting and reconciliation tooling",
      "Onboarding and integration support",
    ],
    cta: "Request Pricing",
  },
  {
    slug: "white-label",
    name: "White Label",
    bestFor: "Brands that want faster launch",
    currency: "USD",
    originalPrice: 4000,
    currentPrice: 2499,
    priceNote: "Limited-time launch pricing for new brands.",
    features: [
      "Ready-made platform and branding tools",
      "Game aggregation included",
      "Payments and back office included",
      "Faster time to market",
    ],
    cta: "Request Pricing",
    highlighted: true,
  },
  {
    slug: "turnkey",
    name: "Turnkey",
    bestFor: "Full platform and infrastructure",
    currency: "USD",
    originalPrice: 10000,
    currentPrice: 7999,
    priceNote: "Limited-time launch pricing on the full stack.",
    features: [
      "Complete casino and sportsbook stack",
      "Back office, payments and affiliate tools",
      "Dedicated onboarding",
      "Ongoing platform updates",
    ],
    cta: "Request Pricing",
  },
  {
    slug: "enterprise",
    name: "Enterprise",
    bestFor: "Larger operators needing custom infrastructure",
    currency: "USD",
    originalPrice: 35000,
    currentPrice: 29999,
    priceNote: "Limited-time launch pricing for large-scale deployments.",
    features: [
      "Custom infrastructure and architecture",
      "Dedicated account and technical support",
      "Tailored SLAs",
      "Flexible commercial structuring",
    ],
    cta: "Contact Sales",
  },
];

export function formatPrice(amount: number, currency: PricingPlan["currency"] = "USD") {
  const symbol = currency === "USD" ? "$" : "";
  return `${symbol}${amount.toLocaleString("en-US")}`;
}
