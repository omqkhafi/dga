// Phase 7 (inputs): contrast pairs, new tokens and Deviations entries. Owned by one work stream.
import type { ComponentPair } from "./components";
import type { Addition, Deviation } from "./fixes";

export function inputsPairs(): ComponentPair[] {
  return [];
}

/** New tokens: each is logged in Deviations as "new, no DGA source". */
export const INPUTS_ADDITIONS: Addition[] = [];

export const INPUTS_DEVIATIONS: Deviation[] = [];
