// Phase 7 (overlays): contrast pairs for Popover, Hover Card, Alert Dialog and Context Menu. Every
// state is listed with the same tokens as its cn-* classes in registry/styles/style-dga.css.
// None of these components adds a token: they reuse the DGA Menu, Tooltip, Dialog and Link tokens.
//
// Text is 4.5:1. Icons, rings and the beak line are non-text and need 3:1 (WCAG 1.4.11).
// Disabled states are exempt. The popup border is decorative.

import type { ComponentPair } from "./components";
import type { Addition, Deviation } from "./fixes";

const SURFACES = ["background-white", "background-body", "background-card"];

export function overlaysPairs(): ComponentPair[] {
  const pairs: ComponentPair[] = [];
  const add = (
    component: string,
    state: string,
    fg: string,
    bg: string,
    min: number,
    on?: string,
  ) => pairs.push({ component, state, fg, bg, on, min, kind: min === 3 ? "non-text" : "text" });
  const menu = "background-menu";
  const hover = "button-background-neutral-hovered";
  const press = "button-background-neutral-pressed";

  // Popover and Hover Card: the panel is background-menu.
  for (const component of ["popover", "hover-card"]) {
    add(component, "title", "text-display", menu, 4.5);
    add(component, "description", "text-primary-paragraph", menu, 4.5);
    add(component, "body text", "text-default", menu, 4.5);
    add(component, "secondary text", "text-secondary-paragraph", menu, 4.5);
    add(component, "icon", "icon-default", menu, 3);
    add(component, "link", "link-primary", menu, 4.5);
    add(component, "link, hovered", "link-primary-hovered", menu, 4.5);
    add(component, "link, pressed", "link-primary-pressed", menu, 4.5);
    add(component, "focus ring", "border-black", menu, 3);
  }
  add("popover", "close icon", "icon-default", menu, 3);
  add("popover", "close icon, hovered", "icon-default", hover, 3, menu);
  add("popover", "close icon, pressed", "icon-default", press, 3, menu);
  add("popover", "close button, focus ring", "border-black", menu, 3);
  add("popover", "close button, focus ring, hovered", "border-black", hover, 3, menu);

  // Hover Card trigger: a primary link on the page surface.
  for (const surface of SURFACES) {
    add("hover-card", "trigger", "link-primary", surface, 4.5);
    add("hover-card", "trigger, hovered", "link-primary-hovered", surface, 4.5);
    add("hover-card", "trigger, pressed", "link-primary-pressed", surface, 4.5);
    add("hover-card", "trigger, focus ring", "border-black", surface, 3);
  }

  // Alert Dialog: the Dialog card is background-white. Its buttons are audited with Button.
  add("alert-dialog", "title", "text-display", "background-white", 4.5);
  add("alert-dialog", "description", "text-primary-paragraph", "background-white", 4.5);
  add("alert-dialog", "cancel button", "text-default", "background-white", 4.5);
  add("alert-dialog", "cancel button, focus ring", "border-black", "background-white", 3);

  // Context Menu: the DGA Menu list, then the area that opens it.
  const itemFills: [string, string][] = [
    ["default", menu],
    ["hovered", hover],
    ["pressed", press],
  ];
  for (const [state, bg] of itemFills) {
    add("context-menu", `item text / ${state}`, "text-default", bg, 4.5, menu);
    add("context-menu", `item icon / ${state}`, "icon-default", bg, 3, menu);
    add("context-menu", `shortcut / ${state}`, "text-primary-paragraph", bg, 4.5, menu);
    add("context-menu", `focus ring / ${state}`, "border-black", bg, 3, menu);
  }
  add("context-menu", "item text / selected", "text-primary", "background-primary-50", 4.5, menu);
  add("context-menu", "item icon / selected", "icon-primary", "background-primary-50", 3, menu);
  add("context-menu", "focus ring / selected", "border-black", "background-primary-50", 3, menu);
  add("context-menu", "group label", "text-display", menu, 4.5);
  for (const surface of SURFACES) {
    add("context-menu", "trigger area, focus ring", "border-black", surface, 3);
  }
  return pairs;
}

/** New tokens: each is logged in Deviations as "new, no DGA source". None for the overlays. */
export const OVERLAYS_ADDITIONS: Addition[] = [];

const NOTE =
  "There is no DGA specification to compare it with. It adds no token: every colour comes from an existing DGA token.";

export const OVERLAYS_DEVIATIONS: Deviation[] = [
  {
    area: "Extensions",
    item: "popover",
    original: "Not defined by DGA",
    ours: "Extension, new, no DGA source: the DGA Menu surface (background-menu, border, radius-md, shadow-2xl) with the Tooltip beak",
    reason: NOTE,
    status: "fixed",
    component: "popover",
  },
  {
    area: "Extensions",
    item: "hover-card",
    original: "Not defined by DGA",
    ours: "Extension, new, no DGA source: the Popover surface, opened by hover or focus on a primary link",
    reason: NOTE,
    status: "fixed",
    component: "hover-card",
  },
  {
    area: "Extensions",
    item: "alert-dialog",
    original: "Not defined by DGA",
    ours: "Extension, new, no DGA source: the DGA Dialog (Modal) with the alert dialog behaviour and the Button",
    reason: NOTE,
    status: "fixed",
    component: "alert-dialog",
  },
  {
    area: "Extensions",
    item: "context-menu",
    original: "Not defined by DGA",
    ours: "Extension, new, no DGA source: the DGA Menu list, opened by right-click, long-press or the Menu key",
    reason: NOTE,
    status: "fixed",
    component: "context-menu",
  },
];
