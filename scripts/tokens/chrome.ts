// Contrast pairs for the docs site's own UI chrome (sidebar, tabs, table of contents,
// preview toolbar, tables, code blocks). The site is built with the same tokens it documents,
// so these pairs keep it passing WCAG 2.1 AA in light and dark mode too.

import type { ComponentPair } from "./components";

export const CHROME = "ui-chrome";

const SURFACES = ["background-white", "background-body", "background-card"];

const text = (state: string, fg: string, bgs: string[]): ComponentPair[] =>
  bgs.map((bg) => ({ component: CHROME, state, fg, bg, min: 4.5, kind: "text" }));

const nonText = (state: string, fg: string, bgs: string[]): ComponentPair[] =>
  bgs.map((bg) => ({ component: CHROME, state, fg, bg, min: 3, kind: "non-text" }));

export function chromePairs(): ComponentPair[] {
  return [
    // Sidebar
    ...text("Sidebar / Section label", "text-secondary-paragraph", ["background-white"]),
    ...text("Sidebar / Link", "text-primary-paragraph", ["background-white"]),
    ...text("Sidebar / Link, hovered", "text-default", ["button-background-neutral-default"]),
    ...text("Sidebar / Link, active", "text-primary", ["background-primary-50"]),
    ...text("Sidebar / Release label", "text-secondary-paragraph", ["background-white"]),
    ...text("Sidebar / Search field", "text-secondary-paragraph", ["background-white"]),
    ...text("Sidebar / Keyboard hint", "text-secondary-paragraph", ["background-white"]),
    // Header and tabs
    ...text("Tabs / Inactive", "text-secondary-paragraph", ["background-white"]),
    ...text("Tabs / Inactive, hovered", "text-default", ["button-background-neutral-default"]),
    ...text("Tabs / Active", "text-default", ["background-white"]),
    ...nonText("Tabs / Active indicator", "border-primary", ["background-white"]),
    // Table of contents
    ...text("Table of contents / Inactive", "text-secondary-paragraph", SURFACES),
    ...text("Table of contents / Active", "text-primary", SURFACES),
    ...nonText("Table of contents / Active marker", "border-primary", SURFACES),
    // Preview toolbar and tables
    ...text("Toolbar / Inactive toggle", "text-secondary-paragraph", [
      "background-neutral-50",
      "background-white",
    ]),
    ...text("Toolbar / Active toggle", "text-oncolor-primary", ["background-primary"]),
    ...text("Toolbar / Caption", "text-secondary-paragraph", [
      "background-neutral-50",
      "background-card",
    ]),
    ...text("Table / Secondary column", "text-secondary-paragraph", [
      "background-card",
      "background-neutral-50",
    ]),
    ...text("Table / Header", "text-primary-paragraph", ["background-neutral-100"]),
    ...text("Table / Body", "text-default", ["background-card"]),
    // Code
    ...text("Code / Line numbers", "text-secondary-paragraph", ["background-neutral-50"]),
    ...text("Code / Language pill", "text-primary-paragraph", ["background-neutral-100"]),
    // Focus ring on every surface the shell uses
    ...nonText("Focus ring / Docs shell", "border-black", [
      ...SURFACES,
      "background-neutral-100",
      "background-neutral-50",
    ]),
  ];
}
