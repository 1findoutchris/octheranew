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

/** Number of entries in the public /providers directory. */
export const directoryEntryCount = providers.length;

/**
 * Distinct brand names: an entry like "Evolution Live" is counted with
 * "Evolution" when both are listed, because it is a product line of the
 * same studio. This is not a verified count of studio relationships.
 */
export const directoryBrandCount = new Set(
  providers.map((p) => {
    const base = p.name.replace(/ Live$/, "");
    return providers.some((other) => other.name === base) ? base : p.name;
  })
).size;

/** Scope note: the directory lists studios, not confirmed integrations or partnerships. */
export const directoryScope =
  "A listing is not a confirmed partnership or market authorisation. Availability for your markets and plan is confirmed with sales before you sign.";
