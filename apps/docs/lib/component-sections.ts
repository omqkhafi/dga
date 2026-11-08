// Pure data, so tests and client components can use it without loading the page source.

/**
 * The sidebar sections. DGA components and Platform Code extensions share them: an extension sits
 * right after the DGA component it is closest to, and keeps its EXTENSION badge. These lists drive
 * the sidebar order (kept in step with `meta.json`), search and llms.txt.
 */
/** The ungrouped components at the top of the list. */
export const BASIC_COMPONENTS = [
  "button",
  "button-group",
  "spinner",
  "link",
  "badge",
  "tag",
  "divider",
  "avatar",
  "featured-icon",
  "skeleton",
];

/** Listed under "Forms". */
export const FORM_COMPONENTS = [
  "field",
  "input",
  "input-group",
  "input-otp",
  "textarea",
  "select",
  "combobox",
  "number-input",
  "search-box",
  "checkbox",
  "radio",
  "switch",
  "toggle",
  "toggle-group",
  "file-upload",
  "slider",
];

/** Listed under "Interactive" (overlays, menus, disclosure, feedback). */
export const INTERACTIVE_COMPONENTS = [
  "dialog",
  "alert-dialog",
  "drawer",
  "tooltip",
  "popover",
  "hover-card",
  "menu",
  "context-menu",
  "command",
  "tabs",
  "accordion",
  "content-switcher",
  "toast",
  "notification",
  "inline-alert",
];

/** Listed under "Navigation and data display". */
export const NAVIGATION_COMPONENTS = [
  "breadcrumb",
  "pagination",
  "table-of-contents",
  "menubar",
  "navigation-menu",
  "sidebar",
  "card",
  "list",
  "item",
  "table",
  "data-table",
  "chart",
  "empty",
  "rating",
  "progress",
  "stepper",
  "kbd",
];

/** Listed under "Layout". A section of its own: no existing section holds layout primitives. */
export const LAYOUT_COMPONENTS = ["collapsible", "scroll-area", "resizable", "aspect-ratio"];

/** Listed under "Composite". */
export const COMPOSITE_COMPONENTS = [
  "header",
  "second-nav",
  "footer",
  "date-picker",
  "carousel",
  "filtration",
  "digital-stamp",
];

export type ComponentSection =
  | "components"
  | "forms"
  | "interactive"
  | "navigation"
  | "layout"
  | "composite";

/** The sidebar section of a component slug, for search and llms.txt. */
export function componentSection(slug: string): ComponentSection {
  if (FORM_COMPONENTS.includes(slug)) return "forms";
  if (INTERACTIVE_COMPONENTS.includes(slug)) return "interactive";
  if (NAVIGATION_COMPONENTS.includes(slug)) return "navigation";
  if (LAYOUT_COMPONENTS.includes(slug)) return "layout";
  if (COMPOSITE_COMPONENTS.includes(slug)) return "composite";
  return "components";
}
