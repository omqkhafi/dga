// Contrast pairs for the Phase 5 components: Breadcrumb, Pagination, Table of Content, Card,
// List, Table, Data Table, Rating, Progress and Stepper. Every state is listed with the same
// tokens as its cn-* classes in registry/styles/style-dga.css.
//
// Text is 4.5:1. Icons, bars, rings and focus indicators are non-text and need 3:1 (WCAG
// 1.4.11). Disabled states are exempt. Separators, step connectors and the card's edge are
// decorative: the text, the icon or the state name carries the meaning.

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

export function navigationPairs(): ComponentPair[] {
  const pairs: ComponentPair[] = [];
  const add: Add = (component, state, fg, bg, min, on) =>
    pairs.push({ component, state, fg, bg, on, min, kind: min === 3 ? "non-text" : "text" });
  const hover = "button-background-neutral-hovered";
  const press = "button-background-neutral-pressed";

  // Breadcrumb: links and the current page on the page surface; the ellipsis button has fills.
  for (const surface of SURFACES) {
    add("breadcrumb", "link", "link-neutral", surface, 4.5);
    add("breadcrumb", "link, hovered", "link-neutral-hovered", surface, 4.5);
    add("breadcrumb", "link, pressed", "link-neutral-pressed", surface, 4.5);
    add("breadcrumb", "current page", "text-default", surface, 4.5);
    add("breadcrumb", "focus ring", "border-black", surface, 3);
    add("breadcrumb", "ellipsis icon", "icon-default", surface, 3);
    for (const [state, bg] of [
      ["hovered", hover],
      ["pressed", press],
    ] as const) {
      add("breadcrumb", `ellipsis icon, ${state}`, "icon-default", bg, 3, surface);
      add("breadcrumb", `focus ring, ${state}`, "border-black", bg, 3, surface);
    }
  }

  // Pagination: numbers and arrows on the page surface, the current page on the primary fill.
  for (const surface of SURFACES) {
    add("pagination", "page number", "text-default", surface, 4.5);
    add("pagination", "arrow", "icon-default", surface, 3);
    add("pagination", "compact label", "text-default", surface, 4.5);
    add("pagination", "focus ring", "border-black", surface, 3);
    for (const [state, bg] of [
      ["hovered", hover],
      ["pressed", press],
    ] as const) {
      add("pagination", `page number, ${state}`, "text-default", bg, 4.5, surface);
      add("pagination", `arrow, ${state}`, "icon-default", bg, 3, surface);
      add("pagination", `focus ring, ${state}`, "border-black", bg, 3, surface);
    }
  }
  for (const [state, bg] of [
    ["current", "background-primary"],
    ["current, hovered", "button-background-primary-hovered"],
    ["current, pressed", "button-background-primary-pressed"],
  ] as const) {
    add("pagination", `page number, ${state}`, "text-oncolor-primary", bg, 4.5);
  }

  // Table of Content: Text sm. Selected is Semibold text-default; hover and pressed fill.
  for (const surface of SURFACES) {
    add("table-of-contents", "title", "text-primary-paragraph", surface, 4.5);
    add("table-of-contents", "link", "text-primary-paragraph", surface, 4.5);
    add("table-of-contents", "link, current", "text-default", surface, 4.5);
    add("table-of-contents", "focus ring", "border-black", surface, 3);
    for (const [state, bg] of [
      ["hovered", hover],
      ["pressed", press],
    ] as const) {
      add("table-of-contents", `link, ${state}`, "text-default", bg, 4.5, surface);
      add("table-of-contents", `focus ring, ${state}`, "border-black", bg, 3, surface);
    }
  }

  // Card: on background-card; hover fills neutral-50. Disabled is exempt.
  add("card", "title", "text-display", "background-card", 4.5);
  add("card", "description", "text-primary-paragraph", "background-card", 4.5);
  add("card", "body text", "text-default", "background-card", 4.5);
  add("card", "icon", "icon-success", "background-card", 3);
  add("card", "expand chevron", "icon-default", "background-card", 3);
  add("card", "focus ring", "border-black", "background-card", 3);
  add("card", "selected border", "border-primary", "background-card", 3);
  for (const surface of SURFACES) {
    add("card", "title, hovered", "text-display", "background-neutral-50", 4.5, surface);
    add(
      "card",
      "description, hovered",
      "text-primary-paragraph",
      "background-neutral-50",
      4.5,
      surface,
    );
    add("card", "icon, hovered", "icon-success", "background-neutral-50", 3, surface);
    add("card", "focus ring, hovered", "border-black", "background-neutral-50", 3, surface);
    add("card", "stroke", "border-neutral-primary", surface, 1);
  }

  // List: the text colour is also the marker colour. Primary and neutral sit on the surfaces.
  for (const surface of SURFACES) {
    add("list", "primary / text", "text-primary", surface, 4.5);
    add("list", "primary / icon", "icon-primary", surface, 3);
    add("list", "neutral / text", "text-default", surface, 4.5);
    add("list", "neutral / icon", "icon-default", surface, 3);
  }
  for (const bg of ["background-primary", "background-nav-header"]) {
    add("list", "on colour / text", "text-oncolor-primary", bg, 4.5);
    add("list", "on colour / icon", "icon-oncolor", bg, 3);
  }

  // Table and Structured List: header, rows, striped, hovered, selected.
  const rows: [string, string][] = [
    ["row", "table-background-row"],
    ["striped row", "table-background-row-alt"],
    ["hovered row", "table-background-row-hovered"],
    ["selected row", "table-background-row-select"],
    ["selected row, hovered", "table-background-row-selected-hovered"],
  ];
  add("table", "header text", "table-text-head", "table-background-header", 4.5);
  for (const [name, bg] of rows) {
    add("table", `${name} / text`, "table-text-body", bg, 4.5);
    add("table", `${name} / link`, "link-primary", bg, 4.5);
    add("table", `${name} / icon`, "icon-default", bg, 3);
    add("table", `${name} / focus ring`, "border-black", bg, 3);
  }
  add("table", "caption", "text-primary-paragraph", "background-body", 4.5);
  for (const [state, bg] of [
    ["off", "button-background-neutral-default"],
    ["off, hovered", "button-background-neutral-hovered"],
    ["off, pressed", "button-background-neutral-pressed"],
    ["on", "button-background-black-default"],
    ["on, hovered", "button-background-black-hovered"],
    ["on, pressed", "button-background-black-pressed"],
  ] as const) {
    const active = state.startsWith("on");
    add(
      "table",
      `sort and filter button, ${state}`,
      active ? "icon-oncolor" : "icon-default",
      bg,
      3,
      "table-background-header",
    );
  }
  add("table", "sort and filter focus ring", "border-black", "table-background-header", 3);
  add("structured-list", "header text", "table-text-head", "background-body", 4.5);
  add("structured-list", "cell text", "table-text-body", "background-body", 4.5);
  add(
    "structured-list",
    "selected row text",
    "table-text-body",
    "table-background-row-select",
    4.5,
  );
  add("structured-list", "focus ring", "table-cell-border-inverse", "background-body", 3);
  add("data-table", "summary", "text-primary-paragraph", "background-body", 4.5);
  add("data-table", "empty message", "text-primary-paragraph", "table-background-row", 4.5);
  add("data-table", "empty icon", "icon-default-500", "table-background-row", 3);

  // Rating: every star is outlined, so the shape (not the 2.30:1 gold fill) is 3:1.
  for (const surface of SURFACES) {
    add("rating", "gold star outline", "icon-warning", surface, 3);
    add("rating", "brand star outline", "icon-primary", surface, 3);
    add("rating", "empty star outline", "icon-default-500", surface, 3);
    add("rating", "focus ring", "border-black", surface, 3);
  }

  // Progress: the fill against the track is the information; label, value and helper are text.
  for (const [name, fill] of [
    ["primary", "icon-primary"],
    ["neutral", "progress-bar-neutral"],
    ["success", "icon-success"],
    ["error", "icon-error"],
  ] as const) {
    add("progress", `${name} / fill on track`, fill, "border-neutral-secondary", 3);
  }
  for (const surface of SURFACES) {
    add("progress", "label and value", "field-text-label", surface, 4.5);
    add("progress", "helper text", "text-primary-paragraph", surface, 4.5);
    add("progress", "success helper text", "text-success", surface, 4.5);
    add("progress", "error helper text", "text-error", surface, 4.5);
    add("progress", "circle value", "text-primary-paragraph", surface, 4.5);
  }
  add("progress", "success icon", "icon-oncolor", "background-success", 3);
  add("progress", "error icon", "icon-oncolor", "background-error", 3);

  // Stepper: indicator ring and number, title and description on the page surface.
  for (const surface of SURFACES) {
    add("stepper", "completed / title", "stepper-text-primary", surface, 4.5);
    add("stepper", "completed / indicator", "stepper-button-completed", surface, 3);
    add(
      "stepper",
      "completed / indicator, hovered",
      "stepper-button-completed-hovered",
      surface,
      3,
    );
    add("stepper", "current / title and number", "stepper-button-current", surface, 4.5);
    add("stepper", "current / indicator", "stepper-button-current", surface, 3);
    add("stepper", "current / indicator, hovered", "stepper-button-current-hovered", surface, 3);
    add("stepper", "upcoming / title", "stepper-text-tertiary", surface, 4.5);
    add("stepper", "upcoming / number", "text-primary-paragraph", surface, 4.5);
    add("stepper", "upcoming / indicator", "icon-default-500", surface, 3);
    add("stepper", "error / title", "text-error", surface, 4.5);
    add("stepper", "error / indicator", "background-error", surface, 3);
    add("stepper", "description", "text-primary-paragraph", surface, 4.5);
    add("stepper", "compact ring", "stepper-button-current", surface, 3);
    add("stepper", "compact text", "text-primary-paragraph", surface, 4.5);
    add("stepper", "focus ring", "border-black", surface, 3);
  }
  add("stepper", "completed / tick", "icon-oncolor", "stepper-button-completed", 3);
  add(
    "stepper",
    "completed / tick, hovered",
    "icon-oncolor",
    "stepper-button-completed-hovered",
    3,
  );
  add("stepper", "error / icon", "icon-oncolor", "background-error", 3);

  return pairs.filter((p) => p.min > 1);
}
