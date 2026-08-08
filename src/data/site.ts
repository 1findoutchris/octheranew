export type NavItem = {
  label: string;
  href: string;
};

export const siteConfig = {
  name: "Octhera",
  legalName: "Octhera",
  tagline: "Powering the Future of iGaming",
  description:
    "Octhera is a B2B iGaming technology platform providing casino aggregation, sportsbook, turnkey and white-label infrastructure for operators worldwide.",
  url: "https://www.octhera.com",
  ogImage: "/og-image.png",
  email: "sales@octhera.com",
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Game Aggregation", href: "/game-aggregation" },
  { label: "Providers", href: "/providers" },
  { label: "Platform", href: "/platform" },
  { label: "Solutions", href: "/solutions" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
];

export type HomeStat = {
  value: string;
  label: string;
};

/**
 * Editable marketing content — not independently verified business claims.
 * Update these values as real figures become available.
 */
export const homeStats: HomeStat[] = [
  { value: "200+", label: "Game Providers" },
  { value: "15,000+", label: "Games" },
  { value: "Single API", label: "Integration" },
  { value: "24/7", label: "Technical Support" },
];

export type FooterLinkGroup = {
  title: string;
  links: NavItem[];
};

export const footerNav: FooterLinkGroup[] = [
  {
    title: "Products",
    links: [
      { label: "Casino Aggregator", href: "/products/casino-aggregator" },
      { label: "Sportsbook", href: "/products/sportsbook" },
      { label: "Turnkey Casino", href: "/products/turnkey-casino" },
      { label: "White Label", href: "/products/white-label" },
      { label: "Casino API", href: "/products/casino-api" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Startups", href: "/solutions#startups" },
      { label: "Existing Operators", href: "/solutions#existing-operators" },
      { label: "Casino Brands", href: "/solutions#casino-brands" },
      { label: "Sportsbook Operators", href: "/solutions#sportsbook-operators" },
      { label: "Affiliates", href: "/solutions#affiliates" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Platform", href: "/platform" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Game Aggregation", href: "/game-aggregation" },
      { label: "Providers", href: "/providers" },
      { label: "Talk to Sales", href: "/contact" },
    ],
  },
];

export const contactProductOptions = [
  "Casino Aggregation",
  "Sportsbook",
  "Turnkey",
  "White Label",
  "Casino API",
  "Enterprise",
] as const;

export const launchTimelineOptions = [
  "Immediately",
  "1–3 months",
  "3–6 months",
  "6-12 months",
  "Just exploring",
] as const;
