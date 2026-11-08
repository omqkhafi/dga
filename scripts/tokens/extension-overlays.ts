// Phase 7 (overlays): contrast pairs, new tokens and Deviations entries. Owned by one work stream.
import type { ComponentPair } from "./components";
import type { Addition, Deviation } from "./fixes";

export function overlaysPairs(): ComponentPair[] {
  return [];
}

/** New tokens: each is logged in Deviations as "new, no DGA source". */
export const OVERLAYS_ADDITIONS: Addition[] = [];

export const OVERLAYS_DEVIATIONS: Deviation[] = [];
