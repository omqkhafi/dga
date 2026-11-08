// Phase 7 part 2 (0.7.1), Navigation: contrast pairs, new tokens and Deviations for Menubar,
// Navigation Menu and Sidebar. Every state is listed with the same tokens as its cn-* classes in
// registry/styles/style-dga.css. None of these components adds a token: they reuse the DGA Menu,
// Header navigation and Header Nav Drawer tokens.
//
// Text is 4.5:1. Icons, rings and the current-page marks are non-text and need 3:1 (WCAG 1.4.11).
// Disabled states are exempt. The panel and bar borders are decorative.

import type { ComponentPair } from "./components";
import type { Addition, Deviation } from "./fixes";

const SURFACES = ["background-white", "background-body", "background-card"];

export function navPairs(): ComponentPair[] {
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
  const selected = "button-background-neutral-selected";

  // The DGA Menu list that Menubar and the Navigation Menu panel use.
  const menuList = (component: string) => {
    const fills: [string, string][] = [
      ["default", menu],
      ["hovered", hover],
      ["pressed", press],
    ];
    for (const [state, bg] of fills) {
      add(component, `item text / ${state}`, "text-default", bg, 4.5, menu);
      add(component, `item icon / ${state}`, "icon-default", bg, 3, menu);
      add(component, `focus ring / ${state}`, "border-black", bg, 3, menu);
    }
  };

  // Menubar.
  const bar = "background-menu";
  add("menubar", "trigger", "text-default", bar, 4.5);
  add("menubar", "trigger, hovered", "text-default", hover, 4.5, bar);
  add("menubar", "trigger, pressed", "text-default", press, 4.5, bar);
  add("menubar", "trigger, open", "text-default", hover, 4.5, bar);
  add("menubar", "trigger, focus ring", "border-black", bar, 3);
  add("menubar", "trigger, focus ring, hovered", "border-black", hover, 3, bar);
  menuList("menubar");
  add("menubar", "shortcut", "text-primary-paragraph", menu, 4.5);
  add("menubar", "item text / checked", "text-primary", "background-primary-50", 4.5, menu);
  add("menubar", "item icon / checked", "icon-primary", "background-primary-50", 3, menu);
  add("menubar", "group label", "text-display", menu, 4.5);

  // Navigation Menu: the bar sits on the page surface.
  for (const surface of SURFACES) {
    add("navigation-menu", "bar item", "text-default", surface, 4.5);
    add("navigation-menu", "bar item, hovered", "text-default", hover, 4.5, surface);
    add("navigation-menu", "bar item, pressed", "text-default", press, 4.5, surface);
    add("navigation-menu", "bar item, open", "text-default", hover, 4.5, surface);
    add("navigation-menu", "chevron", "icon-default", surface, 3);
    add("navigation-menu", "chevron, hovered", "icon-default", hover, 3, surface);
    add("navigation-menu", "bar item, focus ring", "border-black", surface, 3);
  }
  const primary = "button-background-primary-default";
  add("navigation-menu", "bar item, current", "text-oncolor-primary", primary, 4.5);
  add(
    "navigation-menu",
    "bar item, current, hovered",
    "text-oncolor-primary",
    "button-background-primary-hovered",
    4.5,
  );
  add(
    "navigation-menu",
    "bar item, current, pressed",
    "text-oncolor-primary",
    "button-background-primary-pressed",
    4.5,
  );
  add(
    "navigation-menu",
    "bar item, current, focus ring",
    "border-black",
    primary,
    3,
    "background-body",
  );
  menuList("navigation-menu");
  add("navigation-menu", "panel link title", "text-display", menu, 4.5);
  add("navigation-menu", "panel link title, hovered", "text-display", hover, 4.5, menu);
  add("navigation-menu", "panel link title, pressed", "text-display", press, 4.5, menu);
  add("navigation-menu", "panel link description", "text-primary-paragraph", menu, 4.5);
  add(
    "navigation-menu",
    "panel link description, hovered",
    "text-primary-paragraph",
    hover,
    4.5,
    menu,
  );
  add(
    "navigation-menu",
    "panel link description, pressed",
    "text-primary-paragraph",
    press,
    4.5,
    menu,
  );

  // Sidebar: the panel is background-menu; the items are the Header Nav Drawer items.
  add("sidebar", "item", "text-default", menu, 4.5);
  add("sidebar", "item, hovered", "text-default", hover, 4.5, menu);
  add("sidebar", "item, pressed", "text-default", press, 4.5, menu);
  add("sidebar", "item, current", "link-primary-pressed", selected, 4.5, menu);
  add("sidebar", "item icon", "icon-default", menu, 3);
  add("sidebar", "item icon, hovered", "icon-default", hover, 3, menu);
  add("sidebar", "item icon, pressed", "icon-default", press, 3, menu);
  add("sidebar", "item icon, current", "icon-default", selected, 3, menu);
  add("sidebar", "group label", "text-primary-paragraph", menu, 4.5);
  add("sidebar", "badge", "text-primary-paragraph", menu, 4.5);
  add("sidebar", "badge, hovered", "text-primary-paragraph", hover, 4.5, menu);
  add("sidebar", "badge, pressed", "text-primary-paragraph", press, 4.5, menu);
  add("sidebar", "badge, current", "text-primary-paragraph", selected, 4.5, menu);
  add("sidebar", "nested item", "text-default", menu, 4.5);
  add("sidebar", "nested item, hovered", "text-default", hover, 4.5, menu);
  add("sidebar", "nested item, pressed", "text-default", press, 4.5, menu);
  add("sidebar", "nested item, current", "link-primary-pressed", selected, 4.5, menu);
  add("sidebar", "focus ring", "border-black", menu, 3);
  add("sidebar", "focus ring, hovered", "border-black", hover, 3, menu);
  add("sidebar", "focus ring, current", "border-black", selected, 3, menu);
  add("sidebar", "chevron", "icon-default", menu, 3);
  add("sidebar", "icon rail icon", "icon-default", menu, 3);
  add("sidebar", "icon rail icon, current", "icon-default", selected, 3, menu);
  return pairs;
}

export const NAV_ADDITIONS: Addition[] = [];

export const NAV_DEVIATIONS: Deviation[] = [
  {
    area: "Extensions",
    item: "Menubar (new component)",
    original: "—",
    ours: "A bar of Base UI Menubar triggers that open the DGA Menu list.",
    reason:
      "New, no DGA source. DGA has no menubar. The triggers take the Header navigation item states at a compact 32px height; the lists are the Menu. No token was added.",
    status: "fixed",
    component: "menubar",
  },
  {
    area: "Extensions",
    item: "Navigation Menu (new component)",
    original: "—",
    ours: "Header-style bar items and a shared panel on the Menu surface with a title and a description per link.",
    reason:
      "New, no DGA source. DGA has the Header navigation but no standalone navigation menu. The current page uses the Header's primary fill. No token was added.",
    status: "fixed",
    component: "navigation-menu",
  },
  {
    area: "Extensions",
    item: "Sidebar (new component)",
    original: "—",
    ours: "A 256px panel on background-menu with Header Nav Drawer items, an icon rail, a Drawer on phones, nested groups and a remembered open state.",
    reason:
      "New, no DGA source. DGA has the Header Nav Drawer and the Second Nav but no sidebar. The panel border, the 56px rail width and the 256px width are layout values with no token. No colour was added.",
    status: "fixed",
    component: "sidebar",
  },
];
