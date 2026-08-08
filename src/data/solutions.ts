export type Solution = {
  slug: string;
  name: string;
  summary: string;
  fitFor: string;
  relevantProducts: string[];
};

export const solutions: Solution[] = [
  {
    slug: "startups",
    name: "Startups",
    summary:
      "New brands entering iGaming without existing infrastructure can launch on a complete, ready-made technology stack.",
    fitFor: "Founders who need to move from idea to launch without building infrastructure from scratch.",
    relevantProducts: ["Turnkey Casino", "White Label"],
  },
  {
    slug: "existing-operators",
    name: "Existing Operators",
    summary:
      "Operators with a platform already in place can extend their game catalog through a single aggregation integration.",
    fitFor: "Operators who want more content and better provider management without replatforming.",
    relevantProducts: ["Casino Aggregator", "Casino API"],
  },
  {
    slug: "casino-brands",
    name: "Casino Brands",
    summary:
      "Casino-focused brands can combine aggregation, back office and payments into one operating environment.",
    fitFor: "Brands building or scaling a dedicated online casino product.",
    relevantProducts: ["Casino Aggregator", "Back Office", "Payments"],
  },
  {
    slug: "sportsbook-operators",
    name: "Sportsbook Operators",
    summary:
      "Operators adding or upgrading sports betting can plug in pre-match and live betting infrastructure.",
    fitFor: "Operators expanding beyond casino into sports betting, or upgrading an existing sportsbook.",
    relevantProducts: ["Sportsbook", "Back Office"],
  },
  {
    slug: "affiliates",
    name: "Affiliates",
    summary:
      "Affiliates and media partners can track performance and manage partnerships through a dedicated affiliate system.",
    fitFor: "Affiliate networks and partners driving acquisition for Octhera-powered brands.",
    relevantProducts: ["Affiliate System"],
  },
  {
    slug: "media-companies",
    name: "Media Companies",
    summary:
      "Media companies looking to enter iGaming can launch a branded product without building technology in-house.",
    fitFor: "Media brands exploring a gaming product as a new revenue line.",
    relevantProducts: ["White Label", "Turnkey Casino"],
  },
  {
    slug: "land-based-operators",
    name: "Land-Based Operators",
    summary:
      "Land-based operators expanding online can extend their brand into digital casino and sportsbook without replacing existing operations.",
    fitFor: "Retail and land-based operators building a complementary online offering.",
    relevantProducts: ["Turnkey Casino", "Sportsbook", "Casino Aggregator"],
  },
];
