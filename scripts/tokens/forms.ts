// Contrast pairs for the Phase 3 form components: Field, Input, Textarea, Select, Number
// Input, Search Box, Checkbox, Radio, Switch and File Upload. Every state is listed with the
// same tokens as its cn-* classes in registry/styles/style-dga.css.
//
// Text is 4.5:1. Input boundaries, check marks, radio dots, switch tracks and thumbs and focus
// rings are non-text and need 3:1 (WCAG 1.4.11). Disabled states are exempt.

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

/** The three fills a text-like field can have. */
const FILLS = [
  ["default", "field-background-default"],
  ["lighter", "field-background-lighter"],
  ["darker", "field-background-darker"],
] as const;

export function formPairs(): ComponentPair[] {
  const pairs: ComponentPair[] = [];
  const add: Add = (component, state, fg, bg, min, on) =>
    pairs.push({ component, state, fg, bg, on, min, kind: min === 3 ? "non-text" : "text" });

  // Label, helper text, error and required marker sit on the page surface.
  for (const surface of SURFACES) {
    add("field", "label", "field-text-label", surface, 4.5);
    add("field", "label (horizontal)", "text-display", surface, 4.5);
    add("field", "helper text", "field-text-helper", surface, 4.5);
    add("field", "optional marker", "field-text-helper", surface, 4.5);
    add("field", "required marker", "field-border-error", surface, 4.5);
    add("field", "error text", "text-error", surface, 4.5);
    add("field", "error icon", "icon-error", surface, 3);
  }

  // Text-like fields: Input, Textarea, Select trigger, Number Input, Search Box.
  for (const component of ["input", "textarea", "select", "number-input", "search-box"]) {
    for (const surface of SURFACES) {
      for (const [fill, bg] of FILLS) {
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
          "field-background-default",
          4.5,
        );
        add(component, `placeholder${name}`, "field-text-placeholder", bg, 4.5, surface);
        add(component, `prefix and suffix text${name}`, "text-primary-paragraph", bg, 4.5, surface);
        add(component, `icon${name}`, "icon-default-500", bg, 3, surface);
        add(component, `border, default${name}`, "field-border-default", surface, 3);
        add(component, `border, hovered${name}`, "field-border-hovered", surface, 3);
        add(component, `border, focused${name}`, "field-border-pressed", surface, 3);
        add(component, `border, error${name}`, "field-border-error", surface, 3);
      }
      add(
        component,
        "read-only text",
        "field-text-readonly",
        "field-background-default",
        4.5,
        surface,
      );
      add(component, "border, read-only", "field-border-default", surface, 3);
      add(component, "focus ring", "border-black", surface, 3);
    }
  }
  for (const surface of SURFACES) {
    add(
      "search-box",
      "clear button icon",
      "icon-default-500",
      "field-background-default",
      3,
      surface,
    );
    add(
      "search-box",
      "clear button icon, hovered",
      "icon-default",
      "button-background-neutral-default",
      3,
      surface,
    );
    add("number-input", "stepper icon", "icon-default", "field-background-default", 3, surface);
    add(
      "number-input",
      "stepper icon, hovered",
      "icon-default",
      "button-background-neutral-default",
      3,
      surface,
    );
    add("textarea", "border, resize handle", "field-border-default", surface, 3);
  }

  // Select popup, on the card surface.
  add("select", "option text", "text-default", "background-card", 4.5);
  add(
    "select",
    "option text, highlighted",
    "text-default",
    "button-background-neutral-default",
    4.5,
    "background-card",
  );
  add("select", "group label", "field-text-helper", "background-card", 4.5);
  add("select", "selected check", "icon-primary", "background-card", 3);
  add(
    "select",
    "selected check, highlighted",
    "icon-primary",
    "button-background-neutral-default",
    3,
    "background-card",
  );
  add("select", "highlight bar", "border-black", "background-card", 3);

  // Checkbox and Radio: border, fill, mark and dot.
  for (const component of ["checkbox", "radio"]) {
    for (const surface of SURFACES) {
      add(component, "unchecked border", "control-border", surface, 3);
      add(component, "unchecked border, hovered", "control-neutral-hovered", surface, 3);
      add(component, "border, error", "field-border-error", surface, 3);
      add(component, "border, read-only", "control-border", surface, 3);
      add(component, "focus ring", "border-black", surface, 3);
      for (const tone of ["primary", "neutral"]) {
        for (const state of ["checked", "hovered", "pressed"]) {
          const fill = `control-${tone}-${state}`;
          add(
            component,
            `${tone} / ${state}${component === "radio" ? " (dot and border)" : " (fill)"}`,
            fill,
            surface,
            3,
          );
          if (component === "checkbox") {
            const mark = tone === "primary" ? "icon-oncolor" : "control-icon-neutral";
            add(component, `${tone} / ${state} (check mark)`, mark, fill, 3, surface);
          }
        }
      }
    }
    add(component, "read-only mark", "icon-default-500", "background-card", 3);
    add(component, "label", "text-display", "background-card", 4.5);
    add(component, "helper text", "field-text-helper", "background-card", 4.5);
  }

  // Switch: track, thumb and optional tick.
  for (const surface of SURFACES) {
    add("switch", "off / track", "control-border", surface, 3);
    add("switch", "on / track", "control-primary-checked", surface, 3);
    add("switch", "on / track, hovered", "control-primary-hovered", surface, 3);
    add("switch", "on / track, pressed", "control-primary-pressed", surface, 3);
    add("switch", "focus ring", "border-black", surface, 3);
    add("switch", "border, error", "field-border-error", surface, 3);
    add("switch", "border, read-only", "control-border", surface, 3);
  }
  add("switch", "off / thumb", "control-thumb", "control-border", 3);
  add("switch", "on / thumb", "control-thumb", "control-primary-checked", 3);
  add("switch", "on / thumb, hovered", "control-thumb", "control-primary-hovered", 3);
  add("switch", "on / thumb, pressed", "control-thumb", "control-primary-pressed", 3);
  add("switch", "on / check icon", "control-primary-checked", "control-thumb", 3);
  add("switch", "label", "text-display", "background-card", 4.5);
  add("switch", "helper text", "field-text-helper", "background-card", 4.5);

  // File Upload.
  for (const surface of SURFACES) {
    add("file-upload", "drop zone border", "field-border-default", surface, 3);
    add("file-upload", "drop zone border, hovered", "field-border-hovered", surface, 3);
    add("file-upload", "drop zone border, drag over", "border-primary", surface, 3);
    add("file-upload", "drop zone border, error", "field-border-error", surface, 3);
    add("file-upload", "focus ring", "border-black", surface, 3);
    add("file-upload", "hint", "field-text-helper", surface, 4.5);
  }
  add(
    "file-upload",
    "drop zone text",
    "text-default",
    "field-background-default",
    4.5,
    "background-body",
  );
  add("file-upload", "drop zone text, hovered", "text-default", "background-neutral-50", 4.5);
  add("file-upload", "drop zone text, drag over", "text-default", "background-primary-50", 4.5);
  add(
    "file-upload",
    "drop zone icon",
    "icon-primary",
    "field-background-default",
    3,
    "background-body",
  );
  add("file-upload", "drop zone icon, drag over", "icon-primary", "background-primary-50", 3);
  add("file-upload", "drag over border", "border-primary", "background-primary-50", 3);
  add("file-upload", "file name", "text-default", "background-card", 4.5);
  add("file-upload", "file size", "field-text-helper", "background-card", 4.5);
  add("file-upload", "error text", "text-error", "background-card", 4.5);
  add("file-upload", "error icon", "icon-error", "background-card", 3);
  add("file-upload", "error border", "field-border-error", "background-card", 3);
  add("file-upload", "done text", "text-success", "background-card", 4.5);
  add("file-upload", "done icon", "icon-success", "background-card", 3);
  add(
    "file-upload",
    "progress bar",
    "icon-primary",
    "background-neutral-200",
    3,
    "background-card",
  );
  add("file-upload", "file icon", "icon-default-500", "background-card", 3);
  add("file-upload", "remove button icon", "icon-default", "background-card", 3);
  add(
    "file-upload",
    "remove button icon, hovered",
    "icon-default",
    "button-background-neutral-default",
    3,
    "background-card",
  );

  return pairs;
}
