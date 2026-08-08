export type PricingPlan = {
  slug: string;
  name: string;
  bestFor: string;
  priceLabel: string;
  priceNote: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
};

/**
 * Commercial terms are placeholders. Replace priceLabel / priceNote / features
 * with actual Octhera commercial terms when available — nothing here should
 * be treated as a live quote.
 */
export const pricingPlans: PricingPlan[] = [
  {
    slug: "game-aggregation-api",
    name: "Game Aggregation API",
    bestFor: "Operators with an existing platform",
    priceLabel: "Custom",
    priceNote: "Typically structured as a setup/integration fee plus a revenue-share arrangement.",
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
    priceLabel: "Custom",
    priceNote: "Commercial terms depend on scope, market and launch timeline.",
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
    priceLabel: "Custom",
    priceNote: "Commercial terms depend on scope, market and infrastructure requirements.",
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
    priceLabel: "Contact Sales",
    priceNote: "Scoped individually based on scale, infrastructure and support requirements.",
    features: [
      "Custom infrastructure and architecture",
      "Dedicated account and technical support",
      "Tailored SLAs",
      "Flexible commercial structuring",
    ],
    cta: "Contact Sales",
  },
];
