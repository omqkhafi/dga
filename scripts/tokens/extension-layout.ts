// Phase 7 part 2 (0.7.1), Layout: contrast pairs, new tokens and Deviations for Collapsible,
// Scroll Area, Resizable and Aspect Ratio. Every state is listed with the same tokens as its cn-*
// classes in registry/styles/style-dga.css. None of these components adds a token.
//
// Text is 4.5:1. Icons, scrollbar thumbs, handles and rings are non-text and need 3:1 (WCAG
// 1.4.11). Disabled states are exempt. Aspect Ratio draws no colour, so it has no pairs.

import type { ComponentPair } from "./components";
import type { Addition, Deviation } from "./fixes";

const SURFACES = ["background-white", "background-body", "background-card"];

export function layoutPairs(): ComponentPair[] {
  const pairs: ComponentPair[] = [];
  const add = (
    component: string,
    state: string,
    fg: string,
    bg: string,
    min: number,
    on?: string,
  ) => pairs.push({ component, state, fg, bg, on, min, kind: min === 3 ? "non-text" : "text" });

  for (const surface of SURFACES) {
    // Collapsible: the trigger is the Card Expandable trigger, the panel is its details.
    add("collapsible", "trigger", "text-display", surface, 4.5);
    add("collapsible", "panel text", "text-primary-paragraph", surface, 4.5);
    add("collapsible", "chevron", "icon-default", surface, 3);
    add("collapsible", "trigger, focus ring", "border-black", surface, 3);

    // Scroll Area: the thumb is a text-gray, because DGA has no scrollbar token. It has no track
    // fill, so it sits straight on the surface.
    add("scroll-area", "thumb", "text-secondary-paragraph", surface, 3);
    add("scroll-area", "thumb, hovered", "text-primary-paragraph", surface, 3);
    add("scroll-area", "thumb, pressed", "icon-default", surface, 3);
    add("scroll-area", "viewport, focus ring", "border-black", surface, 3);

    // Resizable: the handle line, its states, its grip and the focus ring.
    add("resizable", "handle", "text-secondary-paragraph", surface, 3);
    add("resizable", "handle, hovered", "icon-default", surface, 3);
    add("resizable", "handle, dragging", "icon-default", surface, 3);
    add("resizable", "handle, focus ring", "border-black", surface, 3);
  }
  add("resizable", "grip icon", "icon-default", "background-white", 3);
  return pairs;
}

export const LAYOUT_ADDITIONS: Addition[] = [];

export const LAYOUT_DEVIATIONS: Deviation[] = [
  {
    area: "Extensions",
    item: "Collapsible (new component)",
    original: "—",
    ours: "One panel that opens and closes, with an optional chevron. The trigger and panel are the ones the Card's Expandable already had, now shared.",
    reason:
      "New, no DGA source. DGA has no standalone collapsible. The Card's Expandable is built on it, so there is one implementation; no visual change to the Card and no token was added.",
    status: "fixed",
    component: "collapsible",
  },
  {
    area: "Extensions",
    item: "Scroll Area (new component)",
    original: "—",
    ours: "A 12px scrollbar with a rounded thumb in text-secondary-paragraph (hovered text-primary-paragraph, pressed icon-default) and no track fill; shown on hover or always.",
    reason:
      "New, no DGA source. DGA has no scrollbar. The thumb uses an existing gray text token because the neutral border and background tokens are 1.1:1 to 1.7:1 against the page, below the 3:1 non-text minimum (WCAG 1.4.11). No token was added.",
    status: "fixed",
    component: "scroll-area",
  },
  {
    area: "Extensions",
    item: "Resizable (new component)",
    original: "—",
    ours: "A 1px handle line in text-secondary-paragraph (hovered, dragging and focused: icon-default), an optional grip, and a focus ring in border-black.",
    reason:
      "New, no DGA source. The Divider's border-neutral-primary is 1.5:1 against the page, too faint for a control that has to be found and focused, so the line is a darker existing gray at 4.3:1 or better. No token was added.",
    status: "fixed",
    component: "resizable",
  },
  {
    area: "Extensions",
    item: "Resizable: right to left layout",
    original: "react-resizable-panels works in physical left to right only",
    ours: "In Arabic the group lays itself out left to right with the panels in reverse order, so the first panel is on the right and dragging and the arrow keys follow the eye.",
    reason:
      "New, no DGA source. The library has no RTL support: pointer deltas are physical, so a logical flip alone would drag the wrong way. Each panel keeps dir=rtl for its own content.",
    status: "fixed",
    component: "resizable",
  },
  {
    area: "Extensions",
    item: "Aspect Ratio (new component)",
    original: "—",
    ours: "A box with the CSS aspect-ratio and a rounded-md corner, with cover or contain fit for media.",
    reason:
      "New, no DGA source. Base UI has no primitive and DGA has no ratio box (the Card has no ratio prop). It draws no colour, so no token was added.",
    status: "fixed",
    component: "aspect-ratio",
  },
];
