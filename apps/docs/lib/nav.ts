import type * as PageTree from "fumadocs-core/page-tree";
import type { Locale } from "./i18n";
import { source } from "./source";

/** Pages in sidebar order (folders flattened), for Previous and Next. */
export function orderedPages(lang: Locale): { name: string; url: string }[] {
  const pages: { name: string; url: string }[] = [];
  const walk = (nodes: PageTree.Node[]) => {
    for (const node of nodes) {
      if (node.type === "page") pages.push({ name: String(node.name), url: node.url });
      else if (node.type === "folder") {
        if (node.index) pages.push({ name: String(node.index.name), url: node.index.url });
        walk(node.children);
      }
    }
  };
  walk(source.getPageTree(lang).children);
  return pages;
}

/** The form components, listed under "Forms" in the sidebar, search and llms.txt. */
export const FORM_COMPONENTS = [
  "field",
  "input",
  "textarea",
  "select",
  "number-input",
  "search-box",
  "checkbox",
  "radio",
  "switch",
  "file-upload",
];

/** The interactive components, listed under "Interactive" in the sidebar, search and llms.txt. */
export const INTERACTIVE_COMPONENTS = [
  "dialog",
  "drawer",
  "tooltip",
  "menu",
  "tabs",
  "accordion",
  "content-switcher",
  "toast",
  "notification",
  "inline-alert",
];

/** The navigation and data display components, listed under "Navigation and data display". */
export const NAVIGATION_COMPONENTS = [
  "breadcrumb",
  "pagination",
  "table-of-contents",
  "card",
  "list",
  "table",
  "data-table",
  "rating",
  "progress",
  "stepper",
];

/** Components that are used together, for the "Related" row on each component page. */
export const RELATED: Record<string, string[]> = {
  button: ["link", "spinner", "badge"],
  link: ["button", "divider"],
  spinner: ["button", "skeleton"],
  badge: ["tag", "featured-icon"],
  tag: ["badge", "avatar"],
  divider: ["link", "avatar"],
  avatar: ["tag", "skeleton"],
  "featured-icon": ["badge", "avatar"],
  skeleton: ["spinner", "avatar"],
  field: ["input", "checkbox", "select"],
  input: ["field", "textarea", "number-input"],
  textarea: ["input", "field"],
  select: ["field", "input", "radio"],
  "number-input": ["input", "field", "select"],
  "search-box": ["input", "field", "select"],
  checkbox: ["radio", "switch", "field"],
  radio: ["checkbox", "select", "field"],
  switch: ["checkbox", "radio", "field"],
  "file-upload": ["field", "input", "button"],
  dialog: ["drawer", "button", "toast"],
  drawer: ["dialog", "menu", "button"],
  tooltip: ["menu", "button", "dialog"],
  menu: ["button", "tooltip", "tabs"],
  tabs: ["content-switcher", "accordion", "menu"],
  accordion: ["tabs", "content-switcher"],
  "content-switcher": ["tabs", "accordion"],
  toast: ["notification", "inline-alert", "dialog"],
  notification: ["inline-alert", "toast"],
  "inline-alert": ["notification", "toast", "field"],
  breadcrumb: ["pagination", "table-of-contents", "link"],
  pagination: ["data-table", "table", "breadcrumb"],
  "table-of-contents": ["breadcrumb", "tabs", "link"],
  card: ["list", "rating", "button"],
  list: ["table", "card", "link"],
  table: ["data-table", "pagination", "list"],
  "data-table": ["table", "pagination", "checkbox"],
  rating: ["card", "progress", "inline-alert"],
  progress: ["stepper", "spinner", "notification"],
  stepper: ["progress", "tabs", "pagination"],
};

export const FIGMA_URL =
  "https://www.figma.com/community/file/1392264328585493958/components-library-platforms-code";
