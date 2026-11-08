// Phase 7 (inputs): contrast pairs for the Slider (DGA) and the Input OTP, Input Group, Toggle,
// Toggle Group and Button Group extensions. Every state is listed with the same tokens as its
// cn-* classes in registry/styles/style-dga.css.
//
// Text is 4.5:1. Tracks, thumbs, borders, underlines, icons and focus rings are non-text and need
// 3:1 (WCAG 1.4.11). Disabled states are exempt. Nothing here adds a colour: every pair uses
// existing DGA tokens.

import type { ComponentPair } from "./components";
import type { Addition, Deviation } from "./fixes";

const SURFACES = ["background-white", "background-body", "background-card"];

type Add = (
  component: string,
  state: string,
  fg: string,
  bg: string,
  min: number,
  on?: string,
) => void;

export function inputsPairs(): ComponentPair[] {
  const pairs: ComponentPair[] = [];
  const add: Add = (component, state, fg, bg, min, on) =>
    pairs.push({ component, state, fg, bg, on, min, kind: min === 3 ? "non-text" : "text" });

  // Slider (DGA): label and helper from the Field tokens; track, fill and thumb like the Switch.
  for (const surface of SURFACES) {
    add("slider", "label", "field-text-label", surface, 4.5);
    add("slider", "value", "field-text-helper", surface, 4.5);
    add("slider", "helper text", "field-text-helper", surface, 4.5);
    add("slider", "error text", "text-error", surface, 4.5);
    add("slider", "error icon", "icon-error", surface, 3);
    add("slider", "track", "control-border", surface, 3);
    add("slider", "fill and thumb", "control-primary-checked", surface, 3);
    add("slider", "fill and thumb, hovered", "control-primary-hovered", surface, 3);
    add("slider", "fill and thumb, dragging", "control-primary-pressed", surface, 3);
    add("slider", "fill and thumb, error", "field-border-error", surface, 3);
    add("slider", "focus ring", "border-black", surface, 3);
  }
  add("slider", "thumb ring on fill", "control-thumb", "control-primary-checked", 3);
  add("slider", "thumb ring on fill, hovered", "control-thumb", "control-primary-hovered", 3);
  add("slider", "thumb ring on fill, dragging", "control-thumb", "control-primary-pressed", 3);
  add("slider", "thumb ring on fill, error", "control-thumb", "field-border-error", 3);

  // Input OTP and Input Group: the Input box, so the Input tokens, in the three fills.
  const fills = [
    ["default", "field-background-default"],
    ["lighter", "field-background-lighter"],
    ["darker", "field-background-darker"],
  ] as const;
  for (const component of ["input-otp", "input-group"]) {
    for (const surface of SURFACES) {
      for (const [fill, bg] of fills) {
        const name = fill === "default" ? "" : ` (${fill})`;
        add(component, `filled text${name}`, "field-text-filled", bg, 4.5, surface);
        add(component, `hovered text${name}`, "field-text-hovered", bg, 4.5, surface);
        add(
          component,
          `focused text${name}`,
          "field-text-focused",
          "field-background-default",
          4.5,
        );
        add(
          component,
          `pressed text${name}`,
          "field-text-pressed",
          "field-background-pressed",
          4.5,
          surface,
        );
        add(
          component,
          `underline, focused and pressed${name}`,
          "field-border-pressed",
          bg,
          3,
          surface,
        );
        add(component, `underline, error${name}`, "field-border-error", surface, 3);
        add(component, `border, hovered${name}`, "field-border-hovered", surface, 3);
        add(component, `border, focused and pressed${name}`, "field-border-pressed", surface, 3);
        add(component, `border, error${name}`, "field-border-error", surface, 3);
        add(component, `addon text${name}`, "text-primary-paragraph", bg, 4.5, surface);
        add(component, `addon icon${name}`, "icon-default-500", bg, 3, surface);
        add(
          component,
          `addon text, pressed${name}`,
          "text-primary-paragraph",
          "field-background-pressed",
          4.5,
          surface,
        );
      }
      add(component, "border, default", "field-border-default", surface, 3);
      add(
        component,
        "read-only text",
        "field-text-readonly",
        "field-background-default",
        4.5,
        surface,
      );
    }
  }
  add("input-otp", "separator", "icon-default-500", "background-body", 3);
  add("input-group", "keyboard hint text", "text-default", "background-neutral-100", 4.5);

  // Toggle and Toggle Group: the Button styles with the pressed (selected) fill.
  for (const component of ["toggle", "toggle-group"]) {
    for (const surface of SURFACES) {
      for (const [state, fill] of [
        ["default", "button-background-neutral-default"],
        ["hovered", "button-background-neutral-hovered"],
        ["pressed (mouse down)", "button-background-neutral-pressed"],
        ["on", "button-background-neutral-selected"],
      ] as const) {
        add(component, `label, solid or subtle, ${state}`, "text-default", fill, 4.5, surface);
        add(component, `icon, solid or subtle, ${state}`, "icon-default", fill, 3, surface);
      }
      add(component, "label, outline", "text-default", surface, 4.5);
      add(component, "border, outline", "border-neutral-primary", surface, 3);
      add(component, "label, transparent", "text-default", surface, 4.5);
      add(
        component,
        "label, transparent, hovered",
        "button-label-transparent-hovered",
        surface,
        4.5,
      );
      add(
        component,
        "label, transparent, pressed",
        "button-label-transparent-pressed",
        surface,
        4.5,
      );
      add(component, "label, transparent, on", "button-label-transparent-selected", surface, 4.5);
      add(component, "focus ring", "border-black", surface, 3);
    }
  }

  // Button Group: the text segment.
  for (const surface of SURFACES) {
    add("button-group", "text segment", "text-default", "background-neutral-100", 4.5, surface);
    add("button-group", "text segment icon", "icon-default", "background-neutral-100", 3, surface);
    add("button-group", "text segment border", "border-neutral-primary", surface, 3);
  }
  return pairs;
}

/** New tokens: each is logged in Deviations as "new, no DGA source". */
export const INPUTS_ADDITIONS: Addition[] = [];

export const INPUTS_DEVIATIONS: Deviation[] = [];
