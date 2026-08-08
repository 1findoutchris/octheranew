export type ProductIcon =
  | "aggregator"
  | "sportsbook"
  | "turnkey"
  | "white-label"
  | "api"
  | "back-office"
  | "payments"
  | "affiliate";

export type Product = {
  slug: string;
  name: string;
  icon: ProductIcon;
  tagline: string;
  description: string;
  features: string[];
  bestFor: string;
};

/**
 * Product catalog. Edit copy here — components render this data and do not
 * hard-code product content.
 */
export const products: Product[] = [
  {
    slug: "casino-aggregator",
    name: "Casino Aggregator",
    icon: "aggregator",
    tagline: "One API. Thousands of games.",
    description:
      "A single integration that gives operators access to thousands of games from multiple studios through one unified aggregation layer.",
    features: [
      "One API for the full game catalog",
      "Unified wallet architecture",
      "Centralized provider management",
      "Real-time reporting across all studios",
    ],
    bestFor: "Operators who want broad game content without integrating each studio individually.",
  },
  {
    slug: "sportsbook",
    name: "Sportsbook",
    icon: "sportsbook",
    tagline: "Pre-match and live betting infrastructure.",
    description:
      "Sports betting infrastructure covering pre-match and live betting, built to plug into an operator's existing platform or run as part of a turnkey solution.",
    features: [
      "Pre-match and live betting markets",
      "Risk and trading tooling",
      "Configurable odds and margins",
      "Multi-currency, multi-language support",
    ],
    bestFor: "Operators looking to launch or expand a sports betting offering.",
  },
  {
    slug: "turnkey-casino",
    name: "Turnkey Casino",
    icon: "turnkey",
    tagline: "A complete operator solution.",
    description:
      "The full stack: frontend, casino, sportsbook, back office and integrations delivered as one complete solution for operators who want everything managed under a single ecosystem.",
    features: [
      "Ready-to-launch frontend",
      "Integrated casino and sportsbook",
      "Full back-office suite",
      "Payments and affiliate tooling included",
    ],
    bestFor: "New brands or operators who want to launch without assembling a technology stack themselves.",
  },
  {
    slug: "white-label",
    name: "White Label",
    icon: "white-label",
    tagline: "A faster route to market.",
    description:
      "A ready-made technology solution for brands who want to move quickly, with the infrastructure, licensing groundwork and operations already in place.",
    features: [
      "Pre-built platform and branding tools",
      "Faster time to launch",
      "Shared infrastructure, lower overhead",
      "Ongoing platform updates included",
    ],
    bestFor: "Brands that want to launch fast without owning the underlying infrastructure.",
  },
  {
    slug: "casino-api",
    name: "Casino API",
    icon: "api",
    tagline: "Game aggregation for your platform.",
    description:
      "A game aggregation API that connects directly into an operator's existing platform, adding content without replacing what's already built.",
    features: [
      "Drop-in integration with existing platforms",
      "Standardized game launch and round data",
      "Provider catalog and metadata management",
      "Sandbox and certification support",
    ],
    bestFor: "Operators with an existing platform who want to expand game content.",
  },
  {
    slug: "back-office",
    name: "Back Office",
    icon: "back-office",
    tagline: "Operational control, in one place.",
    description:
      "A management interface covering players, games, reporting, bonuses and day-to-day operational controls for your team.",
    features: [
      "Player account and KYC management",
      "Game and provider catalog controls",
      "Bonus and promotion configuration",
      "Operational reporting and dashboards",
    ],
    bestFor: "Teams that need centralized visibility and control over daily operations.",
  },
  {
    slug: "payments",
    name: "Payments",
    icon: "payments",
    tagline: "Payment integration infrastructure.",
    description:
      "Infrastructure for connecting deposits, withdrawals and payment methods into your platform, built to support multiple markets and currencies.",
    features: [
      "Multiple payment method support",
      "Multi-currency processing",
      "Configurable risk and limits",
      "Centralized transaction reporting",
    ],
    bestFor: "Operators who need flexible, scalable payment infrastructure.",
  },
  {
    slug: "affiliate-system",
    name: "Affiliate System",
    icon: "affiliate",
    tagline: "Affiliate management and tracking.",
    description:
      "Tools to manage affiliate partners, track performance, and handle commission structures as part of your growth strategy.",
    features: [
      "Affiliate onboarding and management",
      "Click and conversion tracking",
      "Configurable commission models",
      "Performance reporting for partners",
    ],
    bestFor: "Operators and brands scaling acquisition through affiliate partnerships.",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}
