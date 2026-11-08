// Phase 7 part 2 (0.7.1), Display: contrast pairs, new tokens and Deviations for Kbd, Empty, Item
// and Chart. Every state is listed with the same tokens as its cn-* classes in
// registry/styles/style-dga.css.
//
// Text is 4.5:1. Icons, rings, chart series and markers are non-text and need 3:1 (WCAG 1.4.11).
// Disabled states are exempt. Borders that only decorate (Kbd, Item outline, grid lines) are not
// listed.

import type { ComponentPair } from "./components";
import type { Addition, Deviation } from "./fixes";

const SURFACES = ["background-white", "background-body", "background-card"];

/** The four chart series tokens, in order. */
const CHART_SERIES = ["chart-series-1", "chart-series-2", "chart-series-3", "chart-series-4"];

export function displayPairs(): ComponentPair[] {
  const pairs: ComponentPair[] = [];
  const add = (
    component: string,
    state: string,
    fg: string,
    bg: string,
    min: number,
    on?: string,
  ) => pairs.push({ component, state, fg, bg, on, min, kind: min === 3 ? "non-text" : "text" });
  const neutral50 = "background-neutral-50";
  const neutral100 = "background-neutral-100";

  // Kbd: the key cap is background-neutral-100 whatever is behind it.
  add("kbd", "key text", "text-default", neutral100, 4.5);
  add("kbd", "key text, inside a muted Item", "text-default", neutral100, 4.5, neutral50);

  // Empty: a centred state on the page surface.
  for (const surface of SURFACES) {
    add("empty", "title", "text-display", surface, 4.5);
    add("empty", "description", "text-primary-paragraph", surface, 4.5);
    add("empty", "link in the description", "link-primary", surface, 4.5);
    add("empty", "icon", "icon-default-500", surface, 3);
    add("empty", "focus ring", "border-black", surface, 3);
  }
  add("empty", "icon on the round fill", "icon-default", neutral100, 3);

  // Item: default (transparent), outline (transparent) and muted (neutral-50) rows; a link row
  // tints to neutral-50 on hover and neutral-100 on press.
  const rows: [string, string, string?][] = [
    ["default", "", undefined],
    ["hovered", neutral50, undefined],
    ["pressed", neutral100, undefined],
    ["muted", neutral50, undefined],
    ["muted, hovered", neutral100, undefined],
  ];
  for (const surface of SURFACES) {
    add("item", "title / default", "text-display", surface, 4.5);
    add("item", "description / default", "text-primary-paragraph", surface, 4.5);
    add("item", "icon / default", "icon-default", surface, 3);
    add("item", "focus ring", "border-black", surface, 3);
  }
  for (const [state, fill] of rows) {
    if (!fill) continue;
    add("item", `title / ${state}`, "text-display", fill, 4.5, "background-body");
    add("item", `description / ${state}`, "text-primary-paragraph", fill, 4.5, "background-body");
    add("item", `icon / ${state}`, "icon-default", fill, 3, "background-body");
    add("item", `focus ring / ${state}`, "border-black", fill, 3, "background-body");
  }
  add("item", "icon media", "icon-default", neutral100, 3);
  add("item", "icon media, in a muted Item", "icon-default", neutral100, 3, neutral50);

  // Chart: series are graphics (3:1) against every surface, the tooltip surface, and the series
  // next to them. 1-2, 2-3, 3-4 and 4-1 are neighbours in a bar group, a stacked area and the
  // slices of a pie. Series 1 and 3 are the dark pair, 2 and 4 the light pair, so the neighbours
  // differ in lightness. Series two apart (1 and 3, 2 and 4) share a lightness band and are told
  // apart by hue and by marker shape (lines) or position, never by colour alone.
  for (const [i, series] of CHART_SERIES.entries()) {
    for (const surface of SURFACES) {
      add("chart", `series ${i + 1} on the page`, series, surface, 3);
    }
    const next = CHART_SERIES[(i + 1) % CHART_SERIES.length] as string;
    add(
      "chart",
      `series ${i + 1} next to series ${((i + 1) % CHART_SERIES.length) + 1}`,
      series,
      next,
      3,
    );
  }
  for (const surface of SURFACES) {
    add("chart", "axis labels and legend", "text-primary-paragraph", surface, 4.5);
    add("chart", "focus ring", "border-black", surface, 3);
    add("chart", "view as table", "link-primary", surface, 4.5);
    add("chart", "view as table, hovered", "link-primary-hovered", surface, 4.5);
    add("chart", "view as table, pressed", "link-primary-pressed", surface, 4.5);
    add("chart", "table headings", "text-display", surface, 4.5);
    add("chart", "table cells", "text-primary-paragraph", surface, 4.5);
    add("chart", "slice separator", "border-black", surface, 3);
  }
  add("chart", "tooltip title", "text-display", "background-card", 4.5);
  add("chart", "tooltip text", "text-primary-paragraph", "background-card", 4.5);
  add("chart", "tooltip value", "text-display", "background-card", 4.5);
  return pairs;
}

/**
 * The chart series colours. New tokens with no DGA source: DGA publishes no data-visualisation
 * palette, and no pair of existing semantic colours is 3:1 from the next one. Each value is an
 * existing primitive of the DGA colour scales; only the pairing is new.
 */
export const DISPLAY_ADDITIONS: Addition[] = [
  {
    name: "chart-series-1",
    light: "{colors-primary-sa-flag-950}",
    dark: "{colors-primary-sa-flag-200}",
    reason:
      "New, no DGA source. First chart series: the deepest green of the brand scale in light, its pale step in dark. 3:1 or better on every surface and on series 2 and 4 in both themes.",
    area: "Extensions",
    component: "chart",
  },
  {
    name: "chart-series-2",
    light: "{colors-secondary-gold-700}",
    dark: "{colors-secondary-gold-800}",
    reason:
      "New, no DGA source. Second chart series: gold. The mid-lightness step on each theme, so it is 3:1 against the page and against the dark and light series beside it.",
    area: "Extensions",
    component: "chart",
  },
  {
    name: "chart-series-3",
    light: "{colors-tertiary-lavender-900}",
    dark: "{colors-tertiary-lavender-200}",
    reason:
      "New, no DGA source. Third chart series: lavender, the dark of the pair in light and the pale one in dark.",
    area: "Extensions",
    component: "chart",
  },
  {
    name: "chart-series-4",
    light: "{colors-blue-light-600}",
    dark: "{colors-blue-dark-600}",
    reason:
      "New, no DGA source. Fourth chart series: blue. Blue-light 600 in light mode and blue-dark 600 in dark mode, the steps that are 3:1 against the page and the neighbouring series.",
    area: "Extensions",
    component: "chart",
  },
];

export const DISPLAY_DEVIATIONS: Deviation[] = [
  {
    area: "Extensions",
    item: "Kbd (new component)",
    original: "—",
    ours: "A key cap: background-neutral-100, a 1px border-neutral-primary, radius-xs, 20px high, text-xs medium text-default.",
    reason:
      "New, no DGA source. DGA has no keyboard key element. The cap is the look Input Group's key addon already had (0.7.0), now one component that the addon reuses. No token was added.",
    status: "fixed",
    component: "kbd",
  },
  {
    area: "Extensions",
    item: "Empty (new component)",
    original: "—",
    ours: "A centred icon, title, description and next steps, with an optional dashed border and a round neutral fill behind an icon.",
    reason:
      "New, no DGA source. DGA only has the empty state inside the Data Table, which this follows (icon-default-500, text-primary-paragraph); the standalone layout, the dashed border and the round icon fill are ours. No token was added.",
    status: "fixed",
    component: "empty",
  },
  {
    area: "Extensions",
    item: "Item (new component)",
    original: "—",
    ours: "A row with media, title, description and actions; default, outline and muted; hover, pressed and focus when it is a link.",
    reason:
      "New, no DGA source. DGA has the List and the Card but no row with media and actions. Text, icon and fills are the List and Card tokens; the hover tint is the Card link's. No token was added.",
    status: "fixed",
    component: "item",
  },
  {
    area: "Extensions",
    item: "Chart (new component)",
    original: "—",
    ours: "Bar, line, area and pie on Recharts with a four-colour DGA palette, a tooltip on the Card surface, a legend with marker shapes, a data-table fallback and RTL axes.",
    reason:
      "New, no DGA source. DGA publishes no data-visualisation guidance. Axis text, tooltip and table use existing text tokens. The series colours are the four new tokens chart-series-1 to chart-series-4.",
    status: "fixed",
    component: "chart",
  },
  {
    area: "Extensions",
    item: "Chart series colours (chart-series-1 to 4)",
    original: "—",
    ours: "Four themed tokens built from existing primitives: green, gold, lavender and blue, alternating dark and light so neighbours differ in lightness.",
    reason:
      "New, no DGA source. No pair of existing semantic colours is 3:1 from its neighbour, so colour tokens at the same lightness (the status and icon colours) fail the series-to-series check. Only the pairing is new, not the primitives. Every series is 3:1 or better on every surface and on its neighbours in light and dark; series two apart share a lightness band, so lines also use marker shapes.",
    status: "fixed",
    component: "chart",
  },
];
