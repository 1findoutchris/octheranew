export type NavItem = {
  label: string;
  href: string;
};

export const siteConfig = {
  name: "Octhera",
  legalName: "Octhera",
  tagline: "Powering the Future of iGaming",
  description:
    "Octhera is a B2B iGaming technology supplier providing casino game aggregation, sportsbook, white-label and turnkey platforms to licensed operators.",
  /** Canonical origin. The only custom domain attached to the Railway service. */
  url: "https://octhera.org",
  telegram: "https://t.me/Noah_Octhera",
  salesEmail: "sales@octhera.org",
};

/** A top-level header entry: a direct link, or a group opened as a dropdown. */
export type NavGroup =
  | { label: string; href: string; links?: undefined }
  | { label: string; href?: undefined; links: (NavItem & { description?: string })[] };

export const navGroups: NavGroup[] = [
  {
    label: "Products",
    links: [
      { label: "All products", href: "/products", description: "Compare routes and modules" },
      { label: "Casino Aggregator", href: "/products/casino-aggregator", description: "Multi-studio casino content" },
      { label: "Sportsbook", href: "/products/sportsbook", description: "Pre-match and live betting" },
      { label: "White Label", href: "/products/white-label", description: "Ready-made branded platform" },
      { label: "Turnkey", href: "/products/turnkey-casino", description: "Casino and sportsbook stack" },
      { label: "Back Office", href: "/products/back-office", description: "Operational tooling" },
      { label: "Platform overview", href: "/platform", description: "Operator platform layer" },
      { label: "Provider directory", href: "/providers", description: "Studios listed in our directory" },
    ],
  },
  {
    label: "Solutions",
    links: [
      { label: "All solutions", href: "/solutions" },
      { label: "Existing operators", href: "/solutions#existing-operators" },
      { label: "New brands and startups", href: "/solutions#startups" },
      { label: "Sportsbook operators", href: "/solutions#sportsbook-operators" },
      { label: "How game aggregation works", href: "/game-aggregation" },
    ],
  },
  { label: "Pricing", href: "/pricing" },
  {
    label: "Developers",
    links: [
      { label: "Integration guide", href: "/docs", description: "Game launch and wallet callback" },
      { label: "Casino API overview", href: "/products/casino-api", description: "Scope, prerequisites and onboarding" },
    ],
  },
  {
    label: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact sales", href: "/contact" },
    ],
  },
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
      { label: "White Label", href: "/products/white-label" },
      { label: "Turnkey", href: "/products/turnkey-casino" },
      { label: "Back Office", href: "/products/back-office" },
      { label: "All products", href: "/products" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { label: "Existing operators", href: "/solutions#existing-operators" },
      { label: "New brands", href: "/solutions#startups" },
      { label: "Sportsbook operators", href: "/solutions#sportsbook-operators" },
      { label: "How aggregation works", href: "/game-aggregation" },
      { label: "Provider directory", href: "/providers" },
    ],
  },
  {
    title: "Developers",
    links: [
      { label: "Integration guide", href: "/docs" },
      { label: "Casino API overview", href: "/products/casino-api" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Pricing", href: "/pricing" },
      { label: "Contact sales", href: "/contact" },
    ],
  },
];
