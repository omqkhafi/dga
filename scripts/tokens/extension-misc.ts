// Phase 7 (misc): contrast pairs, new tokens and Deviations entries. Owned by one work stream.
import type { ComponentPair } from "./components";
import type { Addition, Deviation } from "./fixes";

export function miscPairs(): ComponentPair[] {
  return [];
}

/** New tokens: each is logged in Deviations as "new, no DGA source". */
export const MISC_ADDITIONS: Addition[] = [];

export const MISC_DEVIATIONS: Deviation[] = [];
