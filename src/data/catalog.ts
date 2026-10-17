import { providers } from "@/data/providers";

/**
 * Single source of truth for catalog size claims. Every page that mentions
 * how many providers or games Octhera offers must read from here so the
 * numbers can never drift apart again.
 *
 * Headline totals stay `null` until the commercial team confirms the figure
 * AND its scope (whole aggregated catalog vs. what a given plan includes vs.
 * what is live for a given market). While a value is null, pages fall back
 * to wording that makes no numeric claim.
 */
export const catalogTotals: {
  providerCount: string | null;
  gameCount: string | null;
  /** Plain-language scope shown next to the figures, e.g. "Total aggregated catalog; availability varies by market." */
  scope: string | null;
} = {
  providerCount: null,
  gameCount: null,
  scope: null,
};

/** Number of studios listed in the public /providers directory. */
export const directoryProviderCount = providers.length;

/** Scope note for the directory, which lists studios, not confirmed integrations. */
export const directoryScope =
  "Studios listed in our directory. Availability for your markets and plan is confirmed during onboarding.";
