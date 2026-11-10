// Phase 7 (Combobox, Command, Digital Stamp): contrast pairs, new tokens and Deviations.
//
// Text is 4.5:1, icons, bars and focus rings are non-text and need 3:1 (WCAG 1.4.11). Disabled
// states are exempt. Every pair uses the tokens named by the component's cn-* classes in
// registry/styles/style-dga.css.

import type { ComponentPair } from "./components";
import type { Addition, Deviation } from "./fixes";

const SURFACES = ["background-white", "background-body", "background-card"];

export function miscPairs(): ComponentPair[] {
  const pairs: ComponentPair[] = [];
  const add = (
    component: string,
    state: string,
    fg: string,
    bg: string,
    min: number,
    on?: string,
  ) => pairs.push({ component, state, fg, bg, on, min, kind: min === 3 ? "non-text" : "text" });

  // Combobox. The field is the Input box (audited under `input`); these are its own parts.
  const card = "background-card";
  const tint = "button-background-neutral-default";
  add("combobox", "option text", "text-default", card, 4.5);
  add("combobox", "option text, highlighted", "text-default", tint, 4.5, card);
  add("combobox", "create row icon", "icon-primary", card, 3);
  add("combobox", "create row icon, highlighted", "icon-primary", tint, 3, card);
  add("combobox", "group label", "field-text-helper", card, 4.5);
  add("combobox", "empty and loading text", "text-primary-paragraph", card, 4.5);
  add("combobox", "selected check", "icon-primary", card, 3);
  add("combobox", "selected check, highlighted", "icon-primary", tint, 3, card);
  add("combobox", "highlight bar", "border-black", card, 3);
  for (const surface of SURFACES) {
    add("combobox", "chip text", "tag-text-neutral", "tag-background-neutral-light", 4.5, surface);
    add("combobox", "chip remove icon", "icon-default", "tag-background-neutral-light", 3, surface);
    add("combobox", "chip focus ring", "border-black", "field-background-default", 3, surface);
    add(
      "combobox",
      "arrow and clear icon",
      "icon-default-500",
      "field-background-default",
      3,
      surface,
    );
    add(
      "combobox",
      "arrow and clear icon, hovered",
      "icon-default",
      tint,
      3,
      "field-background-default",
    );
    add(
      "combobox",
      "arrow and clear, focus ring",
      "border-black",
      "field-background-default",
      3,
      surface,
    );
  }

  // Phone Input: the Input box (audited under `input`), the country button and the Combobox list.
  add("phone-input", "country name", "text-default", card, 4.5);
  add("phone-input", "country name, highlighted", "text-default", tint, 4.5, card);
  add("phone-input", "calling code in the list", "text-primary-paragraph", card, 4.5);
  add(
    "phone-input",
    "calling code in the list, highlighted",
    "text-primary-paragraph",
    tint,
    4.5,
    card,
  );
  add("phone-input", "group label", "field-text-helper", card, 4.5);
  add("phone-input", "empty text", "text-primary-paragraph", card, 4.5);
  add("phone-input", "search hint", "field-text-placeholder", card, 4.5);
  add("phone-input", "search text", "field-text-filled", card, 4.5);
  add("phone-input", "search icon", "icon-default-500", card, 3);
  add("phone-input", "selected check", "icon-primary", card, 3);
  add("phone-input", "selected check, highlighted", "icon-primary", tint, 3, card);
  add("phone-input", "highlight bar", "border-black", card, 3);
  for (const surface of SURFACES) {
    add(
      "phone-input",
      "country button arrow",
      "icon-default-500",
      "field-background-default",
      3,
      surface,
    );
    add("phone-input", "country button, hovered", "text-default", tint, 4.5, surface);
    add(
      "phone-input",
      "country button, focus ring",
      "border-black",
      "field-background-default",
      3,
      surface,
    );
  }

  // Command: the Menu surface and items.
  const menu = "background-menu";
  const hover = "button-background-neutral-hovered";
  const press = "button-background-neutral-pressed";
  add("command", "action text", "text-default", menu, 4.5);
  add("command", "action text, highlighted", "text-default", hover, 4.5, menu);
  add("command", "action text, pressed", "text-default", press, 4.5, menu);
  add("command", "action icon", "icon-default", menu, 3);
  add("command", "action icon, highlighted", "icon-default", hover, 3, menu);
  add("command", "shortcut", "text-primary-paragraph", menu, 4.5);
  add("command", "shortcut, highlighted", "text-primary-paragraph", hover, 4.5, menu);
  add("command", "shortcut, pressed", "text-primary-paragraph", press, 4.5, menu);
  add("command", "group label", "text-display", menu, 4.5);
  add("command", "empty text", "text-primary-paragraph", menu, 4.5);
  add("command", "highlight bar", "border-black", menu, 3);
  add("command", "highlight bar, highlighted", "border-black", hover, 3, menu);

  // Digital Stamp: the strip is background-neutral-100 in every mode.
  const strip = "background-neutral-100";
  add("digital-stamp", "label", "text-default", strip, 4.5);
  add("digital-stamp", "flag icon", "icon-default", strip, 3);
  add("digital-stamp", "toggle", "text-default", strip, 4.5);
  add("digital-stamp", "toggle, focus ring", "border-black", strip, 3);
  add("digital-stamp", "row heading and domain", "text-default", strip, 4.5);
  add("digital-stamp", "row description", "text-primary-paragraph", strip, 4.5);
  add("digital-stamp", "row icon", "icon-success", strip, 3);
  add("digital-stamp", "domain suffix", "text-success", strip, 4.5);
  add("digital-stamp", "registration card text", "text-primary-paragraph", "background-white", 4.5);
  add("digital-stamp", "registration number link", "link-primary", "background-white", 4.5);
  return pairs;
}

/** New tokens: each is logged in Deviations as "new, no DGA source". None needed. */
export const MISC_ADDITIONS: Addition[] = [];

export const MISC_DEVIATIONS: Deviation[] = [
  {
    area: "Extensions",
    item: "Combobox (new component)",
    original: "—",
    ours: "Field, arrow and clear button from Input and Select; list from Select; chips from the neutral Tag.",
    reason:
      "New, no DGA source. DGA has no searchable select. Every colour is an existing DGA token and no token was added.",
    status: "fixed",
    component: "combobox",
  },
  {
    area: "Extensions",
    item: "Combobox: creatable mode",
    original: "—",
    ours: "A create row with a plus icon when the typed text matches no option.",
    reason:
      "New, no DGA source. shadcn's registry has no creatable combobox; the behaviour follows Base UI's creatable recipe.",
    status: "fixed",
    component: "combobox",
  },
  {
    area: "Extensions",
    item: "Phone Input (new component)",
    original: "—",
    ours: "The Input box holding a country button (calling code in a fixed-width column) and the number, with the Combobox list and a search box on top.",
    reason:
      "New, no DGA source. DGA has no phone field. The box, states and fills are Input; the list is the Combobox popup. Every colour is an existing DGA token and no token was added. Validation is by length per country, not by operator prefix.",
    status: "fixed",
    component: "phone-input",
  },
  {
    area: "Extensions",
    item: "Command (new component)",
    original: "—",
    ours: "Search Box over a Menu-style list of actions, with a dialog form.",
    reason:
      "New, no DGA source. DGA has no command menu. Items follow Menu; a 2px start bar marks the highlighted action because focus stays in the search box and the Menu tint alone is 1.1:1. No token was added.",
    status: "fixed",
    component: "command",
  },
  {
    area: "Components",
    item: "Digital Stamp: artwork and registration card",
    original:
      "Figma draws the 32px banner, its opened state and the domain Extension part; DGA shows the Saudi flag, circular icons and a registration card with the DGA logo.",
    ours: "The flag and the DGA mark are inline SVG redrawn by us (the DGA logo can be replaced through registrationLogo); the item icons are Hugeicons globe and lock in circles outlined in icon-success; the domain suffix is text-success.",
    reason:
      "The official artwork is not in the registry. Every colour is an existing DGA token; the domain suffix in text-success is 4.5:1 or better on the strip in both modes, so no token was added.",
    status: "fixed",
    component: "digital-stamp",
  },
  {
    area: "Components",
    item: "Digital Stamp: opened state and mobile layout",
    original: "A separate Opened frame, a Mobile frame, and the Extension part as an 88px bar",
    ours: "One component: on mobile the banner and the panel stack vertically, and the Extension part is the first item of the panel.",
    reason:
      "One responsive component instead of four frames. The tokens (background-neutral-100, text-default, section-padding, icon-success) are DGA's.",
    status: "fixed",
    component: "digital-stamp",
  },
];
