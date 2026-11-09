// Contrast pairs for the Phase 6 components: Header, Footer, Second Nav, Date Picker, Carousel
// and Filtration. Every state is listed with the same tokens as its cn-* classes in
// registry/styles/style-dga.css.
//
// Text is 4.5:1. Icons, dots, rings and focus indicators are non-text and need 3:1 (WCAG
// 1.4.11). Disabled states are exempt. Dividers and panel borders are decorative.

import type { ComponentPair } from "./components";

const SURFACES = ["background-white", "background-body", "background-card"];

type Add = (
  component: string,
  state: string,
  fg: string,
  bg: string,
  min: number,
  on?: string,
) => void;

export function compositePairs(): ComponentPair[] {
  const pairs: ComponentPair[] = [];
  const add: Add = (component, state, fg, bg, min, on) =>
    pairs.push({ component, state, fg, bg, on, min, kind: min === 3 ? "non-text" : "text" });
  const hover = "button-background-neutral-hovered";
  const press = "button-background-neutral-pressed";
  const green = "background-sa-flag";
  const fills = [
    ["hovered", "button-background-primary-hovered"],
    ["pressed", "button-background-primary-pressed"],
  ] as const;

  // Header: items and actions on the menu surface; the selected item is the primary fill.
  for (const part of ["item", "action"]) {
    add("header", `${part}`, "text-default", "background-menu", 4.5);
    add("header", `${part} icon`, "icon-default", "background-menu", 3);
    add("header", `${part}, hovered`, "text-default", hover, 4.5, "background-menu");
    add("header", `${part}, pressed`, "text-default", press, 4.5, "background-menu");
    add("header", `${part} icon, hovered`, "icon-default", hover, 3, "background-menu");
    add("header", `${part}, focus ring`, "border-black", "background-menu", 3);
    add(
      "header",
      `${part}, selected`,
      "text-oncolor-primary",
      "button-background-primary-default",
      4.5,
    );
    add("header", `${part} icon, selected`, "icon-oncolor", "button-background-primary-default", 3);
    for (const [state, bg] of fills) {
      add("header", `${part}, selected, ${state}`, "text-oncolor-primary", bg, 4.5);
      add("header", `${part} icon, selected, ${state}`, "icon-oncolor", bg, 3);
    }
    // The bar along the bottom of the selected block, and the bar of an unselected item on hover
    // and press, are state indicators: 3:1 against what they sit on (WCAG 1.4.11).
    add(
      "header",
      `${part}, selected, indicator bar`,
      "colors-primary-sa-flag-200",
      "button-background-primary-default",
      3,
    );
    for (const [state, bg] of fills) {
      add(
        "header",
        `${part}, selected, ${state}, indicator bar`,
        "colors-primary-sa-flag-200",
        bg,
        3,
      );
    }
    add(
      "header",
      `${part}, hovered, indicator bar`,
      "icon-default-500",
      hover,
      3,
      "background-menu",
    );
    add("header", `${part}, pressed, indicator bar`, "icon-default", press, 3, "background-menu");
    add(
      "header",
      `${part}, selected, focus ring`,
      "border-black",
      "button-background-primary-default",
      3,
    );
  }
  add("header", "skip link", "text-oncolor-primary", "background-primary", 4.5);
  add("header", "skip link, focus ring", "border-black", "background-primary", 3);
  // Sub-menu, default tone.
  add("header", "sub-menu heading", "text-primary", "background-menu", 4.5);
  add("header", "sub-menu link", "text-display", "background-menu", 4.5);
  add("header", "sub-menu helper text", "text-primary-paragraph", "background-menu", 4.5);
  add("header", "sub-menu icon", "icon-default", "background-menu", 3);
  add(
    "header",
    "sub-menu boxed icon",
    "icon-primary",
    "background-primary-50",
    3,
    "background-menu",
  );
  add("header", "sub-menu link, hovered", "text-display", hover, 4.5, "background-menu");
  add(
    "header",
    "sub-menu helper text, hovered",
    "text-primary-paragraph",
    hover,
    4.5,
    "background-menu",
  );
  add("header", "sub-menu link, pressed", "text-display", press, 4.5, "background-menu");
  add(
    "header",
    "sub-menu helper text, pressed",
    "text-primary-paragraph",
    press,
    4.5,
    "background-menu",
  );
  add("header", "sub-menu link, focus ring", "border-black", "background-menu", 3);
  // Sub-menu, dark green tone.
  add("header", "sub-menu heading, green", "text-oncolor-primary", green, 4.5);
  add("header", "sub-menu link, green", "text-oncolor-primary", green, 4.5);
  add("header", "sub-menu helper text, green", "text-oncolor-primary", green, 4.5);
  add("header", "sub-menu icon, green", "icon-oncolor", green, 3);
  add("header", "sub-menu boxed icon, green", "icon-oncolor", "alpha-white-10", 3, green);
  add(
    "header",
    "sub-menu link, green, hovered",
    "text-oncolor-primary",
    "button-background-transparent-hovered",
    4.5,
    green,
  );
  add(
    "header",
    "sub-menu link, green, pressed",
    "text-oncolor-primary",
    "button-background-transparent-pressed",
    4.5,
    green,
  );
  add("header", "sub-menu link, green, focus ring", "border-white", green, 3);
  // Drawer (white tone).
  add("header", "drawer item", "text-default", "background-menu", 4.5);
  add("header", "drawer item, hovered", "text-default", hover, 4.5, "background-menu");
  add("header", "drawer item, pressed", "text-default", press, 4.5, "background-menu");
  add(
    "header",
    "drawer item, current",
    "link-primary-pressed",
    "button-background-neutral-selected",
    4.5,
    "background-menu",
  );
  add(
    "header",
    "drawer item, current, icon",
    "icon-primary",
    "button-background-neutral-selected",
    3,
    "background-menu",
  );
  add(
    "header",
    "drawer item, current, bar",
    "icon-primary",
    "button-background-neutral-selected",
    3,
    "background-menu",
  );
  add("header", "drawer item, hovered, bar", "icon-default-500", hover, 3, "background-menu");
  add("header", "drawer item, pressed, bar", "icon-default", press, 3, "background-menu");
  add("header", "drawer sub-heading", "text-primary-paragraph", "background-menu", 4.5);
  add("header", "drawer menu button icon", "icon-default", "background-menu", 3);
  add("header", "drawer item, focus ring", "border-black", "background-menu", 3);

  // Second Nav: gray strip and primary strip.
  add("second-nav", "gray, text", "text-primary-paragraph", "background-neutral-100", 4.5);
  add("second-nav", "gray, icon", "icon-neutral", "background-neutral-100", 3);
  add("second-nav", "gray, focus ring", "border-black", "background-neutral-100", 3);
  add("second-nav", "gray, current page", "text-primary-paragraph", "background-neutral-100", 4.5);
  add("second-nav", "primary, text", "text-oncolor-primary", "background-primary", 4.5);
  add("second-nav", "primary, icon", "icon-oncolor", "background-primary", 3);
  add("second-nav", "primary, focus ring", "border-white", "background-primary", 3);

  // Footer: default (gray) and dark green.
  add("footer", "text", "text-default", "background-neutral-100", 4.5);
  add("footer", "link", "text-default", "background-neutral-100", 4.5);
  add("footer", "icon", "icon-default", "background-neutral-100", 3);
  add("footer", "social link, hovered", "icon-default", hover, 3, "background-neutral-100");
  add("footer", "social link, pressed", "icon-default", press, 3, "background-neutral-100");
  add("footer", "focus ring", "border-black", "background-neutral-100", 3);
  add("footer", "text, green", "text-oncolor-primary", green, 4.5);
  add("footer", "icon, green", "icon-oncolor", green, 3);
  add(
    "footer",
    "social link, green, hovered",
    "icon-oncolor",
    "button-background-transparent-hovered",
    3,
    green,
  );
  add(
    "footer",
    "social link, green, pressed",
    "icon-oncolor",
    "button-background-transparent-pressed",
    3,
    green,
  );
  add(
    "footer",
    "accordion title, green, hovered",
    "text-oncolor-primary",
    "button-background-transparent-hovered",
    4.5,
    green,
  );
  add(
    "footer",
    "accordion title, green, pressed",
    "text-oncolor-primary",
    "button-background-transparent-pressed",
    4.5,
    green,
  );
  add("footer", "focus ring, green", "border-white", green, 3);

  // Date Picker: the popup is field-background-default.
  const popup = "field-background-default";
  add("date-picker", "month title", "text-display", popup, 4.5);
  add("date-picker", "weekday", "text-primary-paragraph", popup, 4.5);
  add("date-picker", "navigation icon", "icon-default", popup, 3);
  add("date-picker", "navigation icon, hovered", "icon-default", hover, 3, popup);
  add("date-picker", "navigation icon, pressed", "icon-default", press, 3, popup);
  add("date-picker", "day", "text-default", popup, 4.5);
  add(
    "date-picker",
    "day, hovered",
    "text-default",
    "datecell-today-background-hovered",
    4.5,
    popup,
  );
  add(
    "date-picker",
    "day, pressed",
    "text-default",
    "datecell-today-background-pressed",
    4.5,
    popup,
  );
  add("date-picker", "day in the next or previous month", "text-secondary-paragraph", popup, 4.5);
  add(
    "date-picker",
    "day in the next or previous month, hovered",
    "text-default",
    "datecell-today-background-hovered",
    4.5,
    popup,
  );
  add("date-picker", "today", "datecell-background-600", popup, 4.5);
  add("date-picker", "today, ring", "datecell-background-600", popup, 3);
  add(
    "date-picker",
    "today, hovered",
    "datecell-background-600",
    "datecell-today-background-hovered",
    4.5,
    popup,
  );
  add(
    "date-picker",
    "today, pressed",
    "datecell-background-600",
    "datecell-today-background-pressed",
    4.5,
    popup,
  );
  add("date-picker", "chosen day", "text-oncolor-primary", "datecell-background-default", 4.5);
  add(
    "date-picker",
    "chosen day, hovered",
    "text-oncolor-primary",
    "datecell-background-hovered",
    4.5,
  );
  add(
    "date-picker",
    "chosen day, pressed",
    "text-oncolor-primary",
    "datecell-background-pressed",
    4.5,
  );
  add("date-picker", "chosen day, edge of the popup", "datecell-background-default", popup, 3);
  add(
    "date-picker",
    "day between the ends of a range",
    "text-default",
    "datecell-background-100",
    4.5,
  );
  add(
    "date-picker",
    "day between the ends of a range, hovered",
    "text-default",
    "datecell-today-background-hovered",
    4.5,
    popup,
  );
  add(
    "date-picker",
    "range edge against the band",
    "datecell-background-default",
    "datecell-background-100",
    3,
  );
  add("date-picker", "focus ring", "border-black", popup, 3);
  add("date-picker", "focus ring, in a range", "border-black", "datecell-background-100", 3);
  add(
    "date-picker",
    "focus ring, on a chosen day",
    "border-black",
    "datecell-background-default",
    3,
  );
  add("date-picker", "quick option", "text-default", popup, 4.5);
  add("date-picker", "quick option, hovered", "text-default", hover, 4.5, popup);
  add("date-picker", "quick option, pressed", "text-default", press, 4.5, popup);
  add("date-picker", "field icon", "icon-default", "field-background-default", 3);
  add("date-picker", "field icon, hovered", "icon-default", hover, 3, "field-background-default");

  // Carousel: arrows, dots and the pause button on the page surface.
  for (const [state, bg] of [
    ["", "button-background-primary-default"],
    [", hovered", "button-background-primary-hovered"],
    [", pressed", "button-background-primary-pressed"],
  ] as const) {
    add("carousel", `primary arrow${state}`, "icon-oncolor", bg, 3);
  }
  add("carousel", "primary arrow, focus ring", "border-black", "background-body", 3);
  for (const surface of SURFACES) {
    add("carousel", "subtle arrow", "icon-default", surface, 3);
    add("carousel", "pause button", "icon-default", surface, 3);
    add("carousel", "dot", "icon-neutral", surface, 3);
    add("carousel", "chosen dot", "background-primary", surface, 3);
    add("carousel", "focus ring", "border-black", surface, 3);
    for (const [state, bg] of [
      ["hovered", hover],
      ["pressed", press],
    ] as const) {
      add("carousel", `subtle arrow, ${state}`, "icon-default", bg, 3, surface);
      add("carousel", `pause button, ${state}`, "icon-default", bg, 3, surface);
    }
  }

  // Filtration: the panel is background-card.
  const panel = "background-card";
  add("filtration", "title", "text-display", panel, 4.5);
  add("filtration", "group heading", "text-default", panel, 4.5);
  add("filtration", "option label", "text-default", panel, 4.5);
  add("filtration", "option count", "text-primary-paragraph", panel, 4.5);
  add("filtration", "range field label", "text-primary-paragraph", panel, 4.5);
  add("filtration", "no matches", "text-primary-paragraph", panel, 4.5);
  add("filtration", "show more", "link-primary", panel, 4.5);
  add("filtration", "show more, hovered", "link-primary-hovered", panel, 4.5);
  add("filtration", "show more, pressed", "link-primary-pressed", panel, 4.5);
  add("filtration", "result count", "text-default", "background-body", 4.5);
  add("filtration", "result count, on white", "text-default", "background-white", 4.5);

  return pairs;
}
