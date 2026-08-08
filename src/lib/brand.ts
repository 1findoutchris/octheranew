/**
 * Single source of truth for the Octhera mark geometry (a triangular node
 * cluster on a 24x24 grid, evoking the aggregation/network concept used
 * throughout the site). Shared by the on-page OctheraLogo component and the
 * generated favicon/apple-icon so both stay visually identical.
 */
export const octheraMarkNodes = [
  { cx: 12, cy: 6, r: 2.3 },
  { cx: 5.5, cy: 17.5, r: 2.3 },
  { cx: 18.5, cy: 17.5, r: 2.3 },
] as const;

export const octheraMarkConnectorPath = "M12 8.3V12m0 0-5.3 4.2M12 12l5.3 4.2";

export const octheraGradient = {
  from: "#ff5a1f",
  to: "#ff7a1a",
} as const;
