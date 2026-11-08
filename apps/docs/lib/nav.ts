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

export * from "./component-sections";
export * from "./extension-slugs";

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
  header: ["second-nav", "footer", "drawer"],
  "second-nav": ["header", "footer", "link"],
  footer: ["header", "accordion", "link"],
  "date-picker": ["input", "field", "select"],
  carousel: ["card", "tabs", "pagination"],
  filtration: ["checkbox", "tag", "drawer"],
  slider: ["field", "number-input", "input"],
  "digital-stamp": ["header", "second-nav", "footer"],
  popover: ["tooltip", "menu", "hover-card"],
  "hover-card": ["popover", "tooltip", "avatar"],
  "alert-dialog": ["dialog", "button", "inline-alert"],
  "context-menu": ["menu", "popover", "command"],
  toggle: ["toggle-group", "button", "switch"],
  "toggle-group": ["toggle", "button-group", "content-switcher"],
  combobox: ["select", "command", "field"],
  command: ["combobox", "menu", "dialog"],
  "input-otp": ["input", "number-input", "field"],
  "input-group": ["input", "button-group", "field"],
  "button-group": ["button", "toggle-group", "input-group"],
  menubar: ["menu", "navigation-menu", "context-menu"],
  "navigation-menu": ["header", "menubar", "second-nav"],
  sidebar: ["drawer", "collapsible", "second-nav"],
  collapsible: ["accordion", "card", "sidebar"],
  "scroll-area": ["sidebar", "resizable", "table"],
  resizable: ["scroll-area", "sidebar", "drawer"],
  "aspect-ratio": ["card", "carousel", "skeleton"],
  kbd: ["command", "menu", "input-group"],
  empty: ["data-table", "inline-alert", "list"],
  item: ["list", "card", "menu"],
  chart: ["card", "data-table", "progress"],
};

export const FIGMA_URL =
  "https://www.figma.com/community/file/1392264328585493958/components-library-platforms-code";
