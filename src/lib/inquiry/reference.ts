import { randomInt } from "node:crypto";

// No 0/O, 1/I/L, so references survive being read out over the phone.
const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

/** Human-readable inquiry reference, e.g. OCT-20261017-A7K4. */
export function createReference(now: Date = new Date()): string {
  const date = now.toISOString().slice(0, 10).replace(/-/g, "");
  let suffix = "";
  for (let i = 0; i < 4; i++) suffix += alphabet[randomInt(alphabet.length)];
  return `OCT-${date}-${suffix}`;
}

export const referencePattern = /^OCT-\d{8}-[A-HJ-NP-Z2-9]{4}$/;
