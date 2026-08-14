import type { IconName } from "@/components/ui/Icon";

export type DocEndpoint = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  path: string;
  description: string;
};

export type DocCategory = {
  slug: string;
  icon: IconName;
  title: string;
  description: string;
  topics: string[];
  endpoints?: DocEndpoint[];
};

export const docCategories: DocCategory[] = [
  {
    slug: "getting-started",
    icon: "rocket",
    title: "Getting Started",
    description: "Set up your Octhera account, generate credentials and make your first request.",
    topics: [
      "Creating a sandbox account",
      "Environments — sandbox vs. production",
      "Making your first API call",
      "Rate limits and error handling",
    ],
  },
  {
    slug: "authentication",
    icon: "key",
    title: "Authentication",
    description: "Secure your integration with API keys, signed requests and scoped access.",
    topics: [
      "API keys and secrets",
      "Request signing (HMAC)",
      "Scopes and permissions",
      "Rotating and revoking credentials",
    ],
  },
  {
    slug: "game-aggregation-api",
    icon: "layers",
    title: "Game Aggregation API",
    description: "Integrate the single API to launch games from 200+ providers.",
    topics: [
      "Game catalog and metadata",
      "Launching a game session",
      "Freeplay and demo mode",
      "Jackpot and bonus feeds",
    ],
    endpoints: [
      { method: "GET", path: "/v1/games", description: "List available games and providers" },
      { method: "POST", path: "/v1/games/launch", description: "Create a signed game launch URL" },
      { method: "GET", path: "/v1/games/{id}", description: "Get metadata for a single game" },
    ],
  },
  {
    slug: "sportsbook-api",
    icon: "activity",
    title: "Sportsbook API",
    description: "Odds feeds, bet placement and risk controls for the Octhera sportsbook.",
    topics: [
      "Pre-match and live odds feeds",
      "Bet slip and settlement",
      "Risk and trading limits",
      "Event and market mapping",
    ],
  },
  {
    slug: "wallet-payments-api",
    icon: "wallet",
    title: "Wallet & Payments API",
    description: "Manage the unified wallet layer, deposits, withdrawals and transaction history.",
    topics: [
      "Seamless wallet integration",
      "Transaction reconciliation",
      "Currency and conversion handling",
      "Payment provider connections",
    ],
    endpoints: [
      { method: "GET", path: "/v1/wallet/{playerId}", description: "Get a player's wallet balance" },
      { method: "POST", path: "/v1/wallet/transactions", description: "Submit a debit or credit" },
    ],
  },
  {
    slug: "back-office-reporting",
    icon: "bar-chart",
    title: "Back Office & Reporting",
    description: "Operational and reporting endpoints behind the Octhera platform dashboard.",
    topics: [
      "Player and account management",
      "Reporting and export endpoints",
      "Roles and permissions",
      "Audit logs",
    ],
  },
  {
    slug: "sdks-libraries",
    icon: "puzzle",
    title: "SDKs & Libraries",
    description: "Client libraries and reference implementations to speed up integration.",
    topics: [
      "Server-side SDKs",
      "Postman collection",
      "Sample integrations",
      "Changelog and versioning",
    ],
  },
];
