export type ProductIcon =
  | "aggregator"
  | "sportsbook"
  | "turnkey"
  | "white-label"
  | "api"
  | "back-office"
  | "payments"
  | "affiliate";

export type ProductItem = { title: string; description: string };

export type ProductFaq = { question: string; answer: string };

/**
 * Long-form buyer content for a product page. Every statement must be backed
 * by something Octhera actually provides (see /docs, src/data/pricing.ts and
 * the product features above). Facts we don't have yet belong in the owner
 * input checklist, never as placeholder copy here.
 */
export type ProductDetail = {
  /** Lead paragraph under the H1. */
  intro: string;
  audience: ProductItem[];
  included: ProductItem[];
  deployment: ProductItem[];
  workflow: { title: string; intro: string; steps: ProductItem[] };
  onboarding: ProductItem[];
  responsibilities: { octhera: string[]; operator: string[] };
  prerequisites: string[];
  /** Plans from src/data/pricing.ts that include this product. */
  pricing: { summary: string; planSlugs: string[] };
  faqs: ProductFaq[];
  related: { label: string; href: string; description: string }[];
};

export type Product = {
  slug: string;
  name: string;
  icon: ProductIcon;
  tagline: string;
  description: string;
  features: string[];
  bestFor: string;
  /** Search-facing title (the " | Octhera" suffix is added by the layout). */
  seoTitle: string;
  seoDescription: string;
  /** Descriptive page H1; defaults to the product name. */
  h1?: string;
  detail?: ProductDetail;
};

/** Shared operator-side responsibility used on several product pages. */
const operatorLicensing =
  "Hold the gaming licence for each market you operate in and meet its regulatory, KYC and responsible-gambling requirements. Octhera is a B2B technology supplier and does not offer gambling to consumers.";

/**
 * Product catalog. Edit copy here — components render this data and do not
 * hard-code product content.
 */
export const products: Product[] = [
  {
    slug: "casino-aggregator",
    name: "Casino Aggregator",
    icon: "aggregator",
    tagline: "One integration for multi-studio casino content.",
    description:
      "A single integration that gives operators access to games from multiple studios through one unified aggregation layer and one wallet model.",
    features: [
      "One API for the full game catalog",
      "Unified wallet architecture",
      "Centralized provider management",
      "Real-time reporting across all studios",
    ],
    bestFor: "Operators who want broad game content without integrating each studio individually.",
    seoTitle: "Casino Game Aggregator for Online Casino Operators",
    seoDescription:
      "Evaluate Octhera's casino game aggregator: one integration for multi-studio content, a seamless wallet model, provider controls and published pricing.",
    h1: "Casino game aggregator for online casino operators",
    detail: casinoAggregatorDetail(),
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
    seoTitle: "B2B Sportsbook Platform for Pre-Match & Live Betting",
    seoDescription:
      "Octhera's B2B sportsbook: pre-match and live betting, risk and trading tools, and configurable odds and margins, in your platform or as part of a turnkey stack.",
    h1: "B2B sportsbook platform for pre-match and live betting",
    detail: sportsbookDetail(),
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
    seoTitle: "Turnkey Casino & Sportsbook Platform",
    seoDescription:
      "Octhera Turnkey: frontend, casino, sportsbook, back office, payments and affiliate tooling delivered as one operator platform, with published USD launch pricing.",
    h1: "Turnkey casino and sportsbook platform",
  },
  {
    slug: "white-label",
    name: "White Label",
    icon: "white-label",
    tagline: "A faster route to market.",
    description:
      "A ready-made technology solution for brands who want to move quickly, with the platform, game aggregation, payments and back office already in place.",
    features: [
      "Pre-built platform and branding tools",
      "Faster time to launch",
      "Shared infrastructure, lower overhead",
      "Ongoing platform updates included",
    ],
    bestFor: "Brands that want to launch fast without owning the underlying infrastructure.",
    seoTitle: "White Label iGaming Platform",
    seoDescription:
      "Octhera White Label: a ready-made casino platform with game aggregation, payments and back office included, for brands launching without owning infrastructure.",
    h1: "White label iGaming platform",
  },
  {
    slug: "casino-api",
    name: "Casino API",
    icon: "api",
    tagline: "Game launch and seamless wallet for your platform.",
    description:
      "The integration interface to Octhera's game aggregation: launch game sessions and settle bets, wins and refunds against your own wallet, without replacing what's already built.",
    features: [
      "Drop-in integration with existing platforms",
      "Standardized game launch and round data",
      "Provider catalog and metadata management",
      "Sandbox and certification support",
    ],
    bestFor: "Operators with an existing platform who want to expand game content.",
    seoTitle: "Casino API: Game Launch & Seamless Wallet Integration",
    seoDescription:
      "How Octhera's casino API works: Bearer-authenticated game launch, a seamless wallet callback for bets, wins and refunds, HMAC-SHA256 signatures and onboarding steps.",
    h1: "Casino API for game launch and seamless wallet integration",
    detail: casinoApiDetail(),
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
    seoTitle: "iGaming Back Office for Operators",
    seoDescription:
      "Octhera Back Office: player and KYC management, game and provider controls, bonus configuration and operational reporting in one interface.",
    h1: "iGaming back office for operators",
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
    seoTitle: "iGaming Payments Integration",
    seoDescription:
      "Octhera Payments: connect deposits, withdrawals and payment methods to your platform with configurable limits and centralized transaction reporting.",
    h1: "Payments integration for iGaming operators",
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
    seoTitle: "iGaming Affiliate Management System",
    seoDescription:
      "Octhera Affiliate System: onboard affiliate partners, track clicks and conversions, configure commission models and report performance.",
    h1: "Affiliate management system for iGaming",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

/*
 * Detail content for the priority product pages. Sources: the integration
 * guide on /docs (launch endpoint, wallet callback, signatures, settings),
 * the product features above, src/data/pricing.ts, and the licensing
 * position stated on /about and in the footer.
 */

function casinoAggregatorDetail(): ProductDetail {
  return {
    intro:
      "Octhera's casino aggregator gives operators content from multiple game studios through one technical integration, instead of building and maintaining a separate integration for each studio. This page is the commercial overview: who it suits, what's included, how it fits your platform and what it costs. Developers can go straight to the Casino API page for the integration details.",
    audience: [
      {
        title: "Operators with an existing casino platform",
        description:
          "Add studios to your lobby through one integration while keeping your own player accounts, wallet and frontend.",
      },
      {
        title: "Operators consolidating direct integrations",
        description:
          "Replace several studio-by-studio integrations with one launch flow and one wallet callback to maintain.",
      },
      {
        title: "New brands that need a full platform",
        description:
          "If you don't have a platform yet, game aggregation is included in the White Label and Turnkey plans.",
      },
    ],
    included: [
      {
        title: "One integration for the aggregated catalog",
        description:
          "Games are launched through a single API call that returns a game session URL. Studios added to the aggregation become available through the same integration.",
      },
      {
        title: "Seamless wallet model",
        description:
          "Your platform stays the system of record for balances. Bets, wins and refunds are posted to your callback URL in real time and you respond with the updated balance.",
      },
      {
        title: "White-labelled game sessions",
        description:
          "Players are sent to a white-labelled session URL that masks the upstream provider.",
      },
      {
        title: "Provider and game catalog management",
        description:
          "Enable, disable and organise providers and games centrally rather than per integration.",
      },
      {
        title: "Reporting and reconciliation tooling",
        description:
          "Every wallet event carries a transaction ID and game round ID, so you can reconcile your ledger against Octhera's data.",
      },
      {
        title: "Onboarding and integration support",
        description:
          "Sandbox credentials and technical support from the Octhera team while you integrate.",
      },
    ],
    deployment: [
      {
        title: "Added to your existing platform",
        description:
          "Connect through the Casino API: your backend calls the launch endpoint and implements one wallet callback. This is the Game Aggregation API plan.",
      },
      {
        title: "Included in White Label",
        description:
          "Use aggregation as part of a ready-made platform that also includes payments and back office.",
      },
      {
        title: "Included in Turnkey",
        description:
          "Use aggregation inside the full casino and sportsbook stack with back office, payments and affiliate tooling.",
      },
    ],
    workflow: {
      title: "How a game round flows through the aggregator",
      intro:
        "The aggregator sits between your platform and the game studios. Your platform keeps the player and the balance; Octhera handles the session and the studio side.",
      steps: [
        {
          title: "Player opens a game in your lobby",
          description:
            "Your server calls the launch endpoint with your internal player ID, the game identifier, the player's balance and a return URL.",
        },
        {
          title: "Octhera returns a game session URL",
          description:
            "You open it in your game frame. A provider-safe player name and a unique transfer ID are generated for you.",
        },
        {
          title: "Each bet, win or refund is sent to your wallet",
          description:
            "Octhera posts the transaction to your callback URL, signed with HMAC-SHA256 using your secret key.",
        },
        {
          title: "Your platform settles and replies",
          description:
            "You verify the signature, update the balance in your database and return the new balance.",
        },
        {
          title: "Reconcile and report",
          description:
            "Use the transaction and round identifiers on every event to reconcile your ledger and report across studios.",
        },
      ],
    },
    onboarding: [
      {
        title: "Discovery call",
        description:
          "Tell us your markets, licences, currencies, existing platform and the studios you need, so availability can be confirmed for your markets.",
      },
      {
        title: "Choose a plan",
        description:
          "Game Aggregation API for an existing platform, or White Label or Turnkey if you need the platform too.",
      },
      {
        title: "Sandbox access",
        description: "Receive API credentials and a secret key for signature verification.",
      },
      {
        title: "Configure settings",
        description: "Set your callback URL and whitelist your server IPs in the settings tab.",
      },
      {
        title: "Integrate and test",
        description:
          "Implement game launch and the wallet callback, then test bet, win and refund flows end to end.",
      },
      {
        title: "Go live",
        description: "Switch to production with the providers confirmed for your markets.",
      },
    ],
    responsibilities: {
      octhera: [
        "Integrations with the aggregated game studios",
        "Game session launch and white-labelled session URLs",
        "Signed wallet callbacks for every bet, win and refund",
        "Provider and catalog management tooling",
        "Reporting, reconciliation tooling and integration support",
      ],
      operator: [
        operatorLicensing,
        "Player accounts and balances: your wallet is the system of record",
        "A public HTTPS callback endpoint that verifies signatures and returns the updated balance",
        "Your lobby and frontend, unless you take White Label or Turnkey",
      ],
    },
    prerequisites: [
      "A gaming licence for each market you plan to offer games in",
      "A platform with player accounts and a wallet you control",
      "A public HTTPS callback URL that resolves in DNS",
      "Fixed server IP addresses to whitelist",
      "Your target markets and currencies, and a shortlist of studios you need",
    ],
    pricing: {
      summary:
        "The aggregator is sold as the Game Aggregation API plan for operators with their own platform, and is included in White Label and Turnkey. Plans combine a published plan price with a share of gross gaming revenue (GGR) where listed.",
      planSlugs: ["game-aggregation-api", "white-label", "turnkey"],
    },
    faqs: [
      {
        question: "What's the difference between the casino aggregator and the Casino API?",
        answer:
          "They are the same service seen from two angles. This page is the commercial overview of what you get. The Casino API page explains how your developers connect to it: authentication, the launch request and the wallet callback.",
      },
      {
        question: "Do I need to integrate each game studio separately?",
        answer:
          "No. You integrate once with Octhera. Games from the aggregated studios are launched through the same endpoint and settled through the same wallet callback.",
      },
      {
        question: "Which providers are available in my market?",
        answer:
          "It depends on the market and your licence. Our provider directory lists the studios we work with; tell us your markets and we'll confirm which are available to you before you sign.",
      },
      {
        question: "Who holds the player's balance?",
        answer:
          "You do. Octhera sends each bet, win and refund to your callback URL, and your platform updates its own balance and replies with the new figure.",
      },
      {
        question: "How is the aggregator priced?",
        answer:
          "The Game Aggregation API plan has a published USD plan price plus a percentage of GGR. White Label includes aggregation at a different plan price and GGR rate. Current figures are on the pricing page.",
      },
      {
        question: "Does Octhera provide the gaming licence?",
        answer:
          "No. Operators are responsible for holding the licences for their markets and for regulatory compliance, including responsible gambling.",
      },
    ],
    related: [
      {
        label: "Casino API",
        href: "/products/casino-api",
        description: "The developer view: endpoints, wallet callback and signature verification.",
      },
      {
        label: "How game aggregation works",
        href: "/game-aggregation",
        description: "Aggregator versus direct studio integrations, and what to evaluate.",
      },
      {
        label: "Provider directory",
        href: "/providers",
        description: "Studios we work with, filterable by game category.",
      },
      {
        label: "Pricing",
        href: "/pricing",
        description: "Plan prices and GGR share for each plan.",
      },
    ],
  };
}

function casinoApiDetail(): ProductDetail {
  return {
    intro:
      "The Casino API is how your platform connects to Octhera's game aggregation. You call one endpoint to launch a game session, and implement one callback that settles bets, wins and refunds against your own wallet. This page is for engineering teams scoping the work. Full request and response examples are in the documentation.",
    audience: [
      {
        title: "Backend and platform engineers",
        description:
          "Teams who will implement game launch and the wallet callback on an existing operator platform.",
      },
      {
        title: "Technical leads scoping integration effort",
        description:
          "Use the API summary and prerequisites below to plan the work before requesting sandbox access.",
      },
      {
        title: "CTOs comparing aggregator APIs",
        description:
          "See how authentication, the wallet model and callback security work before talking commercials.",
      },
    ],
    included: [
      {
        title: "Authentication",
        description:
          "JSON over HTTPS, with your API key sent as a Bearer token in the Authorization header.",
      },
      {
        title: "Game launch: POST /v1/games/launch",
        description:
          "Send member_account (your player ID), game_uid, the player's balance and a home_url. You get back a game_launch_url to open in your game frame.",
      },
      {
        title: "Wallet callback: POST to your URL",
        description:
          "Each event carries serial_number, currency, game_uid, member_account, bet_amount, win_amount, game_round and timestamp. You reply with code 0 and the updated balance.",
      },
      {
        title: "Signed callbacks",
        description:
          "Every callback includes an X-Signature header: an HMAC-SHA256 of the raw JSON body using your secret key.",
      },
      {
        title: "Network controls",
        description:
          "Your callback URL and whitelisted IPs are configured in the settings tab before integration starts.",
      },
      {
        title: "Player identity handling",
        description:
          "Your member_account stays your internal ID. Octhera generates a provider-safe player name and a unique transfer_id for each launch.",
      },
    ],
    deployment: [
      {
        title: "Server-to-server integration",
        description:
          "Launch requests are made from your backend with your API key. Never expose the key or secret in a browser or mobile app.",
      },
      {
        title: "Your wallet stays authoritative",
        description:
          "There is no balance to transfer in and out. Your platform answers each callback with the balance from its own database.",
      },
      {
        title: "Sandbox before production",
        description:
          "Integrate and test against sandbox credentials, then move to production once your flows pass.",
      },
    ],
    workflow: {
      title: "Wallet callback: implementation notes",
      intro:
        "The callback is where most integration effort goes. Beyond what the documentation requires, these are the practices we recommend.",
      steps: [
        {
          title: "Verify against the raw body",
          description:
            "Compute the HMAC-SHA256 over the exact bytes you received, before any JSON parsing. Re-serialised JSON may not match the signature.",
        },
        {
          title: "Compare in constant time",
          description:
            "Use a timing-safe comparison such as crypto.timingSafeEqual, and reject mismatches with 401.",
        },
        {
          title: "Process each transaction once",
          description:
            "Store serial_number with each ledger entry. If the same serial_number arrives again, return the current balance instead of applying the amount twice.",
        },
        {
          title: "Apply bet and win amounts atomically",
          description:
            "Deduct bet_amount and add win_amount in one database transaction, then return the resulting balance.",
        },
        {
          title: "Keep the endpoint reachable",
          description:
            "The callback must be a public HTTPS URL that resolves in DNS. If it can't be reached, settlement with the provider fails.",
        },
      ],
    },
    onboarding: [
      {
        title: "Request sandbox access",
        description: "Contact the team to receive an API key and a secret key.",
      },
      {
        title: "Configure settings",
        description: "Set your callback URL and whitelist your server IPs in the settings tab.",
      },
      {
        title: "Implement game launch",
        description: "Call POST /v1/games/launch from your backend and open the returned game_launch_url.",
      },
      {
        title: "Implement the wallet callback",
        description: "Verify signatures, settle bets, wins and refunds, and return the updated balance.",
      },
      {
        title: "Test end to end",
        description:
          "Exercise bet, win and refund events in sandbox, including duplicate deliveries and signature failures.",
      },
      {
        title: "Go live",
        description: "Switch to production credentials for the providers confirmed for your markets.",
      },
    ],
    responsibilities: {
      octhera: [
        "API credentials, sandbox access and integration support",
        "Game sessions and white-labelled launch URLs",
        "Signed callbacks for every bet, win and refund",
        "Studio-side integrations and provider settlement",
      ],
      operator: [
        operatorLicensing,
        "Keeping the API key and secret key server-side",
        "A reachable HTTPS callback that verifies signatures and returns the updated balance",
        "Player accounts, balances and your own transaction ledger",
      ],
    },
    prerequisites: [
      "A backend able to make authenticated server-to-server HTTPS requests",
      "Access to the raw request body in your callback handler, for signature verification",
      "A public HTTPS callback URL that resolves in DNS",
      "Fixed outbound IP addresses to whitelist",
      "A wallet or ledger that can apply transactions atomically",
    ],
    pricing: {
      summary:
        "API access is the Game Aggregation API plan: a published USD plan price plus a percentage of gross gaming revenue (GGR).",
      planSlugs: ["game-aggregation-api"],
    },
    faqs: [
      {
        question: "Is this a seamless wallet or a transfer wallet?",
        answer:
          "Your platform stays the system of record. You send the player's balance when launching a game, and each bet, win or refund is posted to your callback, which replies with the updated balance from your database.",
      },
      {
        question: "How are wallet callbacks secured?",
        answer:
          "Each callback carries an X-Signature header: an HMAC-SHA256 of the raw JSON body using your secret key. Callbacks go only to the HTTPS URL configured in your settings, and your server IPs are whitelisted for API access.",
      },
      {
        question: "Can we test before going live?",
        answer:
          "Yes. The team issues sandbox credentials so you can build and test the launch and callback flows before switching to production.",
      },
      {
        question: "What happens if our callback endpoint is down?",
        answer:
          "Settlement with the provider fails, so the callback must be a reachable public HTTPS URL. Monitor it like any other payment-critical endpoint.",
      },
      {
        question: "Where is the full API reference?",
        answer:
          "The documentation has request and response examples for game launch and the wallet callback, including signature-verification code in JavaScript.",
      },
      {
        question: "What does API access cost?",
        answer:
          "It is the Game Aggregation API plan: a published USD plan price plus a share of GGR. Current figures are on the pricing page.",
      },
    ],
    related: [
      {
        label: "Integration documentation",
        href: "/docs",
        description: "Request and response examples, plus signature-verification code.",
      },
      {
        label: "Casino Aggregator",
        href: "/products/casino-aggregator",
        description: "The commercial overview: what's included, deployment options and plans.",
      },
      {
        label: "How game aggregation works",
        href: "/game-aggregation",
        description: "What an aggregator does and how to compare one with direct integrations.",
      },
      {
        label: "Pricing",
        href: "/pricing",
        description: "Game Aggregation API plan price and GGR share.",
      },
    ],
  };
}

function sportsbookDetail(): ProductDetail {
  return {
    intro:
      "Octhera's sportsbook gives operators the betting infrastructure to add sports betting to an existing platform, or to launch it alongside a casino as part of the Turnkey stack: pre-match and live markets, configurable odds and margins, and risk and trading tools. Licensing, choosing which markets and sports to offer, and responsible-gambling obligations stay with the operator.",
    audience: [
      {
        title: "Casino operators adding sports betting",
        description:
          "Add pre-match and live betting next to your casino without building a sportsbook in-house.",
      },
      {
        title: "Operators upgrading an existing sportsbook",
        description:
          "Bring in configurable odds, margins and risk tooling while keeping your player base and brand.",
      },
      {
        title: "New brands launching casino and sports together",
        description:
          "Take the sportsbook as part of Turnkey, which also includes casino, back office, payments and affiliate tools.",
      },
    ],
    included: [
      {
        title: "Pre-match and live betting",
        description: "Markets for betting both before events start and while they are in play.",
      },
      {
        title: "Configurable odds and margins",
        description: "Set the margins and odds rules that match your commercial strategy.",
      },
      {
        title: "Risk and trading tooling",
        description: "Tools to monitor and manage exposure across markets.",
      },
      {
        title: "Multi-currency and multi-language support",
        description: "Serve players in more than one currency and language from the same sportsbook.",
      },
      {
        title: "Back office pairing",
        description:
          "Run sportsbook operations alongside player management, bonuses and reporting in Octhera Back Office.",
      },
    ],
    deployment: [
      {
        title: "Integrated into your existing platform",
        description:
          "Add the sportsbook to the platform you already run, keeping your accounts and brand.",
      },
      {
        title: "Part of the Turnkey stack",
        description:
          "Launch the sportsbook together with casino, back office, payments and affiliate tooling as one platform.",
      },
    ],
    workflow: {
      title: "Trading and risk workflow",
      intro:
        "Running a sportsbook is an ongoing trading operation, not a one-off integration. The tooling supports this cycle.",
      steps: [
        {
          title: "Set your pricing rules",
          description: "Configure margins and odds rules for the sports and markets you offer.",
        },
        {
          title: "Offer pre-match and live markets",
          description: "Publish markets before events and keep live markets running while events are in play.",
        },
        {
          title: "Manage exposure",
          description: "Use the risk and trading tools to monitor liabilities and adjust as betting patterns change.",
        },
        {
          title: "Review performance",
          description: "Track results in reporting and refine margins and market selection over time.",
        },
      ],
    },
    onboarding: [
      {
        title: "Discovery call",
        description:
          "Share your licensed markets, priority sports, currencies, languages and current platform.",
      },
      {
        title: "Choose a deployment model",
        description: "Integrate into your platform, or launch on Turnkey with casino and sportsbook together.",
      },
      {
        title: "Commercial agreement",
        description: "Agree the plan: Turnkey has a published price; standalone sportsbook terms are quoted.",
      },
      {
        title: "Configuration",
        description: "Set margins, odds rules, limits, currencies and languages for launch.",
      },
      {
        title: "Testing and launch",
        description: "Test betting and settlement flows end to end, then go live.",
      },
    ],
    responsibilities: {
      octhera: [
        "Sportsbook technology for pre-match and live betting",
        "Odds, margin and risk configuration tooling",
        "Onboarding and technical support",
      ],
      operator: [
        operatorLicensing,
        "Deciding which sports and markets to offer in each jurisdiction",
        "Setting your margins, limits and risk appetite",
        "Player accounts, funds and customer support, unless you take Turnkey",
      ],
    },
    prerequisites: [
      "A licence that covers sports betting in each market you plan to serve",
      "Your priority sports, competitions and target markets",
      "Currencies and languages you need at launch",
      "Details of your existing platform and wallet, if you are integrating rather than taking Turnkey",
      "Who will manage trading and risk on your side",
    ],
    pricing: {
      summary:
        "The sportsbook is included in the Turnkey plan, which has a published USD launch price. Pricing for the sportsbook on its own, integrated into your platform, is quoted on request.",
      planSlugs: ["turnkey"],
    },
    faqs: [
      {
        question: "Can I add the sportsbook to my existing casino platform?",
        answer:
          "Yes. The sportsbook is built to plug into an operator's existing platform, or it can run as part of the Turnkey stack if you need the full platform.",
      },
      {
        question: "Does it include live betting?",
        answer: "Yes. It covers both pre-match and live (in-play) betting markets.",
      },
      {
        question: "Can I set my own margins?",
        answer:
          "Yes. Odds and margins are configurable, and risk and trading tools help you manage exposure.",
      },
      {
        question: "Is the sportsbook priced separately?",
        answer:
          "Turnkey, which includes the sportsbook, has a published launch price on the pricing page. Standalone sportsbook pricing is quoted after a discovery call.",
      },
      {
        question: "Who is responsible for licensing and compliance?",
        answer:
          "The operator. Octhera supplies B2B technology. You must hold the licences for the markets you serve and meet their regulatory and responsible-gambling requirements.",
      },
    ],
    related: [
      {
        label: "Turnkey Casino",
        href: "/products/turnkey-casino",
        description: "Sportsbook and casino together, with back office, payments and affiliates.",
      },
      {
        label: "Back Office",
        href: "/products/back-office",
        description: "Player management, bonuses and reporting for daily operations.",
      },
      {
        label: "Solutions for sportsbook operators",
        href: "/solutions#sportsbook-operators",
        description: "How operators typically combine the sportsbook with other products.",
      },
      {
        label: "Pricing",
        href: "/pricing",
        description: "Published plans, including Turnkey.",
      },
    ],
  };
}
