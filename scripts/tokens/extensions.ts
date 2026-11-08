// Phase 7 (0.7.0 and 0.7.1): the Platform Code extension components and the DGA-defined Slider and Digital
// Stamp. Each work stream keeps its pairs, new tokens and Deviations in its own file.

import type { ComponentPair } from "./components";
import { DISPLAY_ADDITIONS, DISPLAY_DEVIATIONS, displayPairs } from "./extension-display";
import { INPUTS_ADDITIONS, INPUTS_DEVIATIONS, inputsPairs } from "./extension-inputs";
import { LAYOUT_ADDITIONS, LAYOUT_DEVIATIONS, layoutPairs } from "./extension-layout";
import { MISC_ADDITIONS, MISC_DEVIATIONS, miscPairs } from "./extension-misc";
import { NAV_ADDITIONS, NAV_DEVIATIONS, navPairs } from "./extension-nav";
import { OVERLAYS_ADDITIONS, OVERLAYS_DEVIATIONS, overlaysPairs } from "./extension-overlays";
import type { Addition, Deviation } from "./fixes";

export const extensionPairs = (): ComponentPair[] => [
  ...overlaysPairs(),
  ...inputsPairs(),
  ...miscPairs(),
  ...navPairs(),
  ...layoutPairs(),
  ...displayPairs(),
];

export const EXTENSION_ADDITIONS: Addition[] = [
  ...OVERLAYS_ADDITIONS,
  ...INPUTS_ADDITIONS,
  ...MISC_ADDITIONS,
  ...NAV_ADDITIONS,
  ...LAYOUT_ADDITIONS,
  ...DISPLAY_ADDITIONS,
];

export const EXTENSION_DEVIATIONS: Deviation[] = [
  ...OVERLAYS_DEVIATIONS,
  ...INPUTS_DEVIATIONS,
  ...MISC_DEVIATIONS,
  ...NAV_DEVIATIONS,
  ...LAYOUT_DEVIATIONS,
  ...DISPLAY_DEVIATIONS,
];
