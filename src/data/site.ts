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
  /** Canonical origin. The only custom domain attached to the Railway service. */
  url: "https://octhera.org",
  telegram: "https://t.me/Noah_Octhera",
};

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Game Aggregation", href: "/game-aggregation" },
  { label: "Providers", href: "/providers" },
  { label: "Platform", href: "/platform" },
  { label: "Solutions", href: "/solutions" },
  { label: "Pricing", href: "/pricing" },
  { label: "Docs", href: "/docs" },
  { label: "About", href: "/about" },
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
      { label: "Documentation", href: "/docs" },
      { label: "How Aggregation Works", href: "/game-aggregation" },
      { label: "Providers", href: "/providers" },
      { label: "Talk to Sales", href: "/contact" },
    ],
  },
];
