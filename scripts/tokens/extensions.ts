// Phase 7 (0.7.0): the Platform Code extension components and the DGA-defined Slider and Digital
// Stamp. Each work stream keeps its pairs, new tokens and Deviations in its own file.

import type { ComponentPair } from "./components";
import { INPUTS_ADDITIONS, INPUTS_DEVIATIONS, inputsPairs } from "./extension-inputs";
import { MISC_ADDITIONS, MISC_DEVIATIONS, miscPairs } from "./extension-misc";
import { OVERLAYS_ADDITIONS, OVERLAYS_DEVIATIONS, overlaysPairs } from "./extension-overlays";
import type { Addition, Deviation } from "./fixes";

export const extensionPairs = (): ComponentPair[] => [
  ...overlaysPairs(),
  ...inputsPairs(),
  ...miscPairs(),
];

export const EXTENSION_ADDITIONS: Addition[] = [
  ...OVERLAYS_ADDITIONS,
  ...INPUTS_ADDITIONS,
  ...MISC_ADDITIONS,
];

export const EXTENSION_DEVIATIONS: Deviation[] = [
  ...OVERLAYS_DEVIATIONS,
  ...INPUTS_DEVIATIONS,
  ...MISC_DEVIATIONS,
];
