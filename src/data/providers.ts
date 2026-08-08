export type GameCategory =
  | "Slots"
  | "Live Casino"
  | "Table Games"
  | "Crash"
  | "Instant"
  | "Virtual Sports"
  | "Bingo"
  | "Poker"
  | "Lottery"
  | "Casual"
  | "Jackpot";

export const gameCategories: GameCategory[] = [
  "Slots",
  "Live Casino",
  "Table Games",
  "Crash",
  "Instant",
  "Virtual Sports",
  "Bingo",
  "Poker",
  "Lottery",
  "Casual",
  "Jackpot",
];

export type ProviderAvailability = "available" | "planned" | "contact";

export type Provider = {
  name: string;
  slug: string;
  categories: GameCategory[];
  /**
   * Manually entered number, or null when no verified figure exists.
   * Never auto-generate this value — leave null until confirmed.
   */
  gameCount: number | null;
  /**
   * "available" — live and integrated today
   * "planned" — integration in progress / roadmap
   * "contact" — status not yet published; reach out for current access
   * Defaults to "contact" across this seed dataset until the Octhera team
   * confirms real integration status per provider.
   */
  availability: ProviderAvailability;
  featured: boolean;
  description: string;
};

/**
 * Seed provider catalog. This structure is designed to scale to hundreds of
 * entries without any change to the UI — add rows here, nothing else.
 * Game counts and availability are placeholders pending confirmation from
 * the Octhera commercial team and must not be presented as verified figures.
 */
export const providers: Provider[] = [
  { name: "Pragmatic Play", slug: "pragmatic-play", categories: ["Slots", "Live Casino", "Crash"], gameCount: null, availability: "contact", featured: true, description: "A leading multi-product content provider spanning slots, live casino and instant games." },
  { name: "Evolution", slug: "evolution", categories: ["Live Casino"], gameCount: null, availability: "contact", featured: true, description: "A major live casino provider known for studio-based live dealer tables." },
  { name: "NetEnt", slug: "netent", categories: ["Slots"], gameCount: null, availability: "contact", featured: true, description: "A long-established slots studio known for high-production video slots." },
  { name: "Red Tiger", slug: "red-tiger", categories: ["Slots", "Jackpot"], gameCount: null, availability: "contact", featured: true, description: "A slots studio known for jackpot mechanics and fast-paced titles." },
  { name: "Play'n GO", slug: "playn-go", categories: ["Slots"], gameCount: null, availability: "contact", featured: true, description: "A slots studio with a large, globally distributed game portfolio." },
  { name: "Playtech", slug: "playtech", categories: ["Slots", "Live Casino", "Table Games"], gameCount: null, availability: "contact", featured: true, description: "A multi-vertical technology and content supplier across slots, live and table games." },
  { name: "Relax Gaming", slug: "relax-gaming", categories: ["Slots"], gameCount: null, availability: "contact", featured: true, description: "A slots studio and content aggregation network for third-party studios." },
  { name: "Hacksaw Gaming", slug: "hacksaw-gaming", categories: ["Slots"], gameCount: null, availability: "contact", featured: true, description: "A slots studio known for high-volatility, entertainment-driven titles." },
  { name: "BGaming", slug: "bgaming", categories: ["Slots", "Crash"], gameCount: null, availability: "contact", featured: false, description: "A content studio producing slots and crash-style instant games." },
  { name: "ELK Studios", slug: "elk-studios", categories: ["Slots"], gameCount: null, availability: "contact", featured: false, description: "A slots studio focused on distinctive visual design and mechanics." },
  { name: "Blueprint Gaming", slug: "blueprint-gaming", categories: ["Slots"], gameCount: null, availability: "contact", featured: false, description: "A slots studio with a portfolio including licensed and branded titles." },
  { name: "Spinomenal", slug: "spinomenal", categories: ["Slots"], gameCount: null, availability: "contact", featured: false, description: "A slots studio with a broad, frequently updated catalog." },
  { name: "Games Global", slug: "games-global", categories: ["Slots", "Jackpot"], gameCount: null, availability: "contact", featured: true, description: "A large-scale content network including progressive jackpot slots." },
  { name: "Big Time Gaming", slug: "big-time-gaming", categories: ["Slots"], gameCount: null, availability: "contact", featured: true, description: "A slots studio known for originating widely licensed mechanics." },
  { name: "Nolimit City", slug: "nolimit-city", categories: ["Slots"], gameCount: null, availability: "contact", featured: true, description: "A slots studio known for high-volatility, narrative-driven titles." },
  { name: "Push Gaming", slug: "push-gaming", categories: ["Slots"], gameCount: null, availability: "contact", featured: false, description: "A slots studio focused on polished, player-tested mechanics." },
  { name: "Quickspin", slug: "quickspin", categories: ["Slots"], gameCount: null, availability: "contact", featured: false, description: "A slots studio with a design-forward, character-driven catalog." },
  { name: "Yggdrasil", slug: "yggdrasil", categories: ["Slots"], gameCount: null, availability: "contact", featured: false, description: "A slots studio and technology provider with a flexible content framework." },
  { name: "Thunderkick", slug: "thunderkick", categories: ["Slots"], gameCount: null, availability: "contact", featured: false, description: "A slots studio known for distinctive art direction." },
  { name: "Betsoft", slug: "betsoft", categories: ["Slots", "Table Games"], gameCount: null, availability: "contact", featured: false, description: "A content studio spanning cinematic slots and table games." },
  { name: "Amatic", slug: "amatic", categories: ["Slots"], gameCount: null, availability: "contact", featured: false, description: "A slots studio with a catalog popular across European markets." },
  { name: "Endorphina", slug: "endorphina", categories: ["Slots"], gameCount: null, availability: "contact", featured: false, description: "A slots studio with a broad, regularly refreshed portfolio." },
  { name: "Evoplay", slug: "evoplay", categories: ["Slots", "Crash", "Instant"], gameCount: null, availability: "contact", featured: false, description: "A studio producing slots alongside crash and instant-win formats." },
  { name: "Habanero", slug: "habanero", categories: ["Slots"], gameCount: null, availability: "contact", featured: false, description: "A slots studio with a globally localized content catalog." },
  { name: "Wazdan", slug: "wazdan", categories: ["Slots"], gameCount: null, availability: "contact", featured: false, description: "A slots studio known for customizable volatility settings." },
  { name: "Playson", slug: "playson", categories: ["Slots"], gameCount: null, availability: "contact", featured: false, description: "A slots studio with a catalog geared toward European operators." },
  { name: "Booongo", slug: "booongo", categories: ["Slots"], gameCount: null, availability: "contact", featured: false, description: "A slots studio producing high-volatility, feature-driven titles." },
  { name: "Fugaso", slug: "fugaso", categories: ["Slots"], gameCount: null, availability: "contact", featured: false, description: "A slots studio with a varied, multi-theme catalog." },
  { name: "1X2 Network", slug: "1x2-network", categories: ["Slots", "Table Games"], gameCount: null, availability: "contact", featured: false, description: "A content network spanning multiple in-house studio brands." },
  { name: "Gaming Realms", slug: "gaming-realms", categories: ["Slots", "Jackpot"], gameCount: null, availability: "contact", featured: false, description: "A studio known for its distinctive Slingo-style game format." },
  { name: "Inspired Entertainment", slug: "inspired-entertainment", categories: ["Slots", "Virtual Sports"], gameCount: null, availability: "contact", featured: false, description: "A content and technology provider spanning slots and virtual sports." },
  { name: "Ezugi", slug: "ezugi", categories: ["Live Casino"], gameCount: null, availability: "contact", featured: false, description: "A live casino studio operating dealer-hosted tables." },
  { name: "Authentic Gaming", slug: "authentic-gaming", categories: ["Live Casino"], gameCount: null, availability: "contact", featured: false, description: "A live casino provider specializing in live roulette formats." },
  { name: "Vivo Gaming", slug: "vivo-gaming", categories: ["Live Casino"], gameCount: null, availability: "contact", featured: false, description: "A live casino studio offering dealer-hosted table games." },
  { name: "BetGames", slug: "betgames", categories: ["Live Casino", "Instant"], gameCount: null, availability: "contact", featured: false, description: "A studio producing live and betting-style instant games." },
  { name: "TVBet", slug: "tvbet", categories: ["Live Casino", "Instant"], gameCount: null, availability: "contact", featured: false, description: "A studio producing televised live betting games." },
  { name: "Spribe", slug: "spribe", categories: ["Crash", "Instant"], gameCount: null, availability: "contact", featured: true, description: "A studio best known for originating the crash game format." },
  { name: "Turbo Games", slug: "turbo-games", categories: ["Crash", "Instant"], gameCount: null, availability: "contact", featured: false, description: "A studio focused on fast, provably-fair instant games." },
  { name: "SmartSoft Gaming", slug: "smartsoft-gaming", categories: ["Crash", "Instant"], gameCount: null, availability: "contact", featured: false, description: "A studio producing crash and instant-win style titles." },
  { name: "PopOK Gaming", slug: "popok-gaming", categories: ["Slots"], gameCount: null, availability: "contact", featured: false, description: "A slots studio with a catalog covering multiple markets." },
  { name: "Mascot Games", slug: "mascot-games", categories: ["Slots"], gameCount: null, availability: "contact", featured: false, description: "A slots studio with a growing, character-focused catalog." },
  { name: "Belatra Games", slug: "belatra-games", categories: ["Slots"], gameCount: null, availability: "contact", featured: false, description: "A slots studio with a long-standing content library." },
  { name: "KA Gaming", slug: "ka-gaming", categories: ["Slots", "Table Games"], gameCount: null, availability: "contact", featured: false, description: "A studio spanning Asian-market-focused slots and table games." },
  { name: "PG Soft", slug: "pg-soft", categories: ["Slots"], gameCount: null, availability: "contact", featured: true, description: "A slots studio known for animated, mobile-first titles." },
  { name: "JDB Gaming", slug: "jdb-gaming", categories: ["Slots"], gameCount: null, availability: "contact", featured: false, description: "A slots studio with a catalog geared toward Asian markets." },
  { name: "CQ9 Gaming", slug: "cq9-gaming", categories: ["Slots"], gameCount: null, availability: "contact", featured: false, description: "A slots studio with a catalog geared toward Asian markets." },
  { name: "Spadegaming", slug: "spadegaming", categories: ["Slots"], gameCount: null, availability: "contact", featured: false, description: "A slots studio with a catalog geared toward Asian markets." },
  { name: "Playtech Live", slug: "playtech-live", categories: ["Live Casino"], gameCount: null, availability: "contact", featured: false, description: "Playtech's dedicated live casino studio offering dealer-hosted tables." },
  { name: "Evolution Live", slug: "evolution-live", categories: ["Live Casino"], gameCount: null, availability: "contact", featured: false, description: "Evolution's live dealer studio offering table and show-style games." },
  { name: "Pragmatic Play Live", slug: "pragmatic-play-live", categories: ["Live Casino"], gameCount: null, availability: "contact", featured: false, description: "Pragmatic Play's dedicated live casino studio offering dealer-hosted tables." },
];

export function getProviderBySlug(slug: string): Provider | undefined {
  return providers.find((provider) => provider.slug === slug);
}

export function getRelatedProviders(provider: Provider, limit = 4): Provider[] {
  return providers
    .filter(
      (candidate) =>
        candidate.slug !== provider.slug &&
        candidate.categories.some((category) => provider.categories.includes(category))
    )
    .slice(0, limit);
}

export const availabilityLabels: Record<ProviderAvailability, string> = {
  available: "Available",
  planned: "Planned",
  contact: "Contact for Access",
};
