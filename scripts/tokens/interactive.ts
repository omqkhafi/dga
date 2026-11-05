// Contrast pairs for the Phase 4 components: Dialog, Drawer, Tooltip, Menu, Tabs, Accordion,
// Content Switcher, Toast, Notification and Inline Alert. Every state is listed with the same
// tokens as its cn-* classes in registry/styles/style-dga.css.
//
// Text is 4.5:1. Icons, focus rings and state indicators are non-text and need 3:1 (WCAG 1.4.11).
// Disabled states are exempt. Coloured bars on the start side of Toast and Inline Alert are
// decorative: the icon and the title carry the kind.

import type { ComponentPair } from "./components";

const SURFACES = ["background-white", "background-body", "background-card"];
const KINDS = ["info", "success", "warning", "error"] as const;

type Add = (
  component: string,
  state: string,
  fg: string,
  bg: string,
  min: number,
  on?: string,
) => void;

export function interactivePairs(): ComponentPair[] {
  const pairs: ComponentPair[] = [];
  const add: Add = (component, state, fg, bg, min, on) =>
    pairs.push({ component, state, fg, bg, on, min, kind: min === 3 ? "non-text" : "text" });

  // Dialog: the card is background-white; the backdrop is not part of the content.
  add("dialog", "title", "text-display", "background-white", 4.5);
  add("dialog", "description", "text-primary-paragraph", "background-white", 4.5);
  add("dialog", "body text", "text-default", "background-white", 4.5);
  add("dialog", "close icon", "icon-default", "background-white", 3);
  add(
    "dialog",
    "close icon, hovered",
    "icon-default",
    "button-background-neutral-hovered",
    3,
    "background-white",
  );
  add(
    "dialog",
    "close icon, pressed",
    "icon-default",
    "button-background-neutral-pressed",
    3,
    "background-white",
  );
  add("dialog", "focus ring", "border-black", "background-white", 3);

  // Drawer: white (background-menu) or gray (background-neutral-100).
  for (const [tone, bg] of [
    ["white", "background-menu"],
    ["gray", "background-neutral-100"],
  ] as const) {
    add("drawer", `${tone} / title`, "text-display", bg, 4.5);
    add("drawer", `${tone} / description`, "text-primary-paragraph", bg, 4.5);
    add("drawer", `${tone} / body text`, "text-default", bg, 4.5);
    add("drawer", `${tone} / close icon`, "icon-default", bg, 3);
    add("drawer", `${tone} / focus ring`, "border-black", bg, 3);
  }

  // Tooltip: light and dark (inverted).
  add("tooltip", "light / heading", "tooltip-text-heading-light", "tooltip-background-light", 4.5);
  add("tooltip", "light / text", "tooltip-text-paragraph-light", "tooltip-background-light", 4.5);
  add("tooltip", "dark / heading", "tooltip-text-heading-dark", "tooltip-background-dark", 4.5);
  add("tooltip", "dark / text", "tooltip-text-paragraph-dark", "tooltip-background-dark", 4.5);
  for (const surface of SURFACES) {
    add("tooltip", "help icon", "icon-default-500", surface, 3);
    add("tooltip", "help icon, hovered and open", "icon-default", surface, 3);
    add("tooltip", "focus ring", "border-black", surface, 3);
  }

  // Menu: items on background-menu; hover, pressed and selected fills.
  const itemFills: [string, string][] = [
    ["default", "background-menu"],
    ["hovered", "button-background-neutral-hovered"],
    ["pressed", "button-background-neutral-pressed"],
  ];
  for (const [state, bg] of itemFills) {
    add("menu", `item text / ${state}`, "text-default", bg, 4.5, "background-menu");
    add("menu", `item icon / ${state}`, "icon-default", bg, 3, "background-menu");
    add("menu", `shortcut / ${state}`, "text-primary-paragraph", bg, 4.5, "background-menu");
    add("menu", `focus ring / ${state}`, "border-black", bg, 3, "background-menu");
  }
  add(
    "menu",
    "item text / selected",
    "text-primary",
    "background-primary-50",
    4.5,
    "background-menu",
  );
  add(
    "menu",
    "item icon / selected",
    "icon-primary",
    "background-primary-50",
    3,
    "background-menu",
  );
  add(
    "menu",
    "shortcut / selected",
    "text-primary-paragraph",
    "background-primary-50",
    4.5,
    "background-menu",
  );
  add(
    "menu",
    "focus ring / selected",
    "border-black",
    "background-primary-50",
    3,
    "background-menu",
  );
  add("menu", "group label", "text-display", "background-menu", 4.5);

  // Tabs: on the page surface; hover and pressed fills.
  for (const surface of SURFACES) {
    add("tabs", "selected text", "text-default", surface, 4.5);
    add("tabs", "unselected text", "text-primary-paragraph", surface, 4.5);
    add("tabs", "unselected icon", "unselected-tab-icon", surface, 3);
    add("tabs", "selected icon", "icon-default", surface, 3);
    add("tabs", "selected bar", "border-primary", surface, 3);
    add("tabs", "focus ring", "border-black", surface, 3);
    add("tabs", "panel text", "text-default", surface, 4.5);
    for (const [state, bg] of [
      ["hovered", "button-background-neutral-hovered"],
      ["pressed", "button-background-neutral-pressed"],
    ] as const) {
      add("tabs", `text / ${state}`, "text-default", bg, 4.5, surface);
      add("tabs", `unselected icon / ${state}`, "unselected-tab-icon", bg, 3, surface);
      add("tabs", `focus ring / ${state}`, "border-black", bg, 3, surface);
    }
  }

  // Accordion: header on the page surface; hover and pressed fills.
  for (const surface of SURFACES) {
    add("accordion", "heading", "text-default", surface, 4.5);
    add("accordion", "chevron", "icon-default", surface, 3);
    add("accordion", "panel text", "text-primary-paragraph", surface, 4.5);
    add("accordion", "focus ring", "border-black", surface, 3);
    for (const [state, bg] of [
      ["hovered", "button-background-neutral-hovered"],
      ["pressed", "button-background-neutral-pressed"],
    ] as const) {
      add("accordion", `heading / ${state}`, "text-default", bg, 4.5, surface);
      add("accordion", `chevron / ${state}`, "icon-default", bg, 3, surface);
      add("accordion", `focus ring / ${state}`, "border-black", bg, 3, surface);
    }
  }

  // Content Switcher: track neutral-100; the chosen option is the primary button fill.
  for (const [state, bg] of [
    ["default", "background-neutral-100"],
    ["hovered", "button-background-neutral-hovered"],
    ["pressed", "button-background-neutral-pressed"],
  ] as const) {
    add(
      "content-switcher",
      `option text / ${state}`,
      "text-default",
      bg,
      4.5,
      "background-neutral-100",
    );
    add(
      "content-switcher",
      `focus ring / ${state}`,
      "border-black",
      bg,
      3,
      "background-neutral-100",
    );
  }
  // The chosen option keeps the default primary fill on hover and press.
  add(
    "content-switcher",
    "chosen text",
    "text-oncolor-primary",
    "button-background-primary-default",
    4.5,
  );
  add(
    "content-switcher",
    "chosen fill",
    "button-background-primary-default",
    "background-neutral-100",
    3,
  );
  for (const surface of ON_COLOR) {
    add(
      "content-switcher",
      "on-colour / option text",
      "text-oncolor-primary",
      "colors-alpha-alpha-black-20",
      4.5,
      surface,
    );
    add(
      "content-switcher",
      "on-colour / option text, hovered",
      "text-oncolor-primary",
      "colors-alpha-alpha-black-30",
      4.5,
      surface,
    );
    add(
      "content-switcher",
      "on-colour / option text, pressed",
      "text-oncolor-primary",
      "colors-alpha-alpha-black-40",
      4.5,
      surface,
    );
    add(
      "content-switcher",
      "on-colour / chosen text",
      "colors-primary-sa-flag-700",
      "colors-base-white",
      4.5,
    );
    add("content-switcher", "on-colour / chosen fill", "colors-base-white", surface, 3);
    add("content-switcher", "on-colour / focus ring", "colors-base-white", surface, 3);
  }

  // Toast: the card is background-notification-white.
  const toast = "background-notification-white";
  add("toast", "title", "text-display", toast, 4.5);
  add("toast", "description", "text-primary-paragraph", toast, 4.5);
  add("toast", "icon / neutral", "icon-default", toast, 3);
  for (const kind of KINDS) add("toast", `icon / ${kind}`, `icon-${kind}`, toast, 3);
  add("toast", "action text", "text-default", "button-background-neutral-default", 4.5, toast);
  add(
    "toast",
    "action text, hovered",
    "text-default",
    "button-background-neutral-pressed",
    4.5,
    toast,
  );
  add("toast", "close icon", "icon-default", toast, 3);
  add(
    "toast",
    "close icon, hovered",
    "icon-default",
    "button-background-neutral-hovered",
    3,
    toast,
  );
  add("toast", "focus ring", "border-black", toast, 3);

  // Notification: text, icon and close button on the kind's 50 tint (translucent in dark mode).
  const notification: [string, string, string, string][] = [
    ["neutral", "text-primary-paragraph", "icon-default", "background-neutral-50"],
    ["info", "text-info", "icon-info", "background-info-50"],
    ["success", "text-success", "icon-success", "background-success-50"],
    ["warning", "text-warning", "icon-warning", "background-warning-50"],
    ["critical", "text-error", "icon-error", "background-error-50"],
  ];
  for (const [kind, text, icon, bg] of notification) {
    for (const surface of ["background-body", "background-card"]) {
      add("notification", `${kind} / text`, text, bg, 4.5, surface);
      add("notification", `${kind} / icon`, icon, bg, 3, surface);
      add("notification", `${kind} / close icon`, "icon-default", bg, 3, surface);
      add("notification", `${kind} / focus ring`, "border-black", bg, 3, surface);
    }
  }

  // Inline Alert: white (background-notification-white) or tinted (the 25 tints).
  for (const kind of ["neutral", ...KINDS] as const) {
    add("inline-alert", `${kind} / title`, "text-display", toast, 4.5);
    add("inline-alert", `${kind} / text`, "text-primary-paragraph", toast, 4.5);
    add(
      "inline-alert",
      `${kind} / icon`,
      kind === "neutral" ? "icon-default" : `icon-${kind}`,
      toast,
      3,
    );
  }
  const tinted: [string, string, string, string][] = [
    ["neutral", "text-display", "icon-default", "background-neutral-25"],
    ["info", "text-info", "icon-info", "background-info-25"],
    ["success", "text-success", "icon-success", "background-success-25"],
    ["warning", "text-warning", "icon-warning", "background-warning-25"],
    ["destructive", "text-error", "icon-error", "background-error-25"],
  ];
  for (const [kind, text, icon, bg] of tinted) {
    for (const surface of ["background-body", "background-card"]) {
      add("inline-alert", `${kind} tinted / text`, text, bg, 4.5, surface);
      add("inline-alert", `${kind} tinted / icon`, icon, bg, 3, surface);
      add("inline-alert", `${kind} tinted / close icon`, "icon-default", bg, 3, surface);
      add("inline-alert", `${kind} tinted / focus ring`, "border-black", bg, 3, surface);
    }
  }
  add("inline-alert", "close icon", "icon-default", toast, 3);
  add("inline-alert", "focus ring", "border-black", toast, 3);

  return pairs;
}

const ON_COLOR = ["background-primary", "background-nav-header"];
