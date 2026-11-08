// English notes the types cannot carry, for the Phase 7 inputs work stream (cva props and a few
// inherited Base UI props). Keyed `slug.Component.prop` or `slug.prop`.
import type { ApiNote } from "./api-notes";

const render = "Render as another element. From Base UI.";

export const API_NOTES_EXT_INPUTS: Record<string, ApiNote> = {
  // Slider
  "slider.size": {
    description: "Small (4px track, 16px thumb) or medium (6px track, 20px thumb).",
  },
  "slider.showMinMax": {
    include: true,
    type: "boolean",
    description:
      "Shows the Min and Max labels under the ends of the track (DGA). Default false.",
  },
  "slider.minLabel": {
    include: true,
    type: "ReactNode",
    description: "Replaces the text of the Min label, which is `min` by default.",
  },
  "slider.maxLabel": {
    include: true,
    type: "ReactNode",
    description: "Replaces the text of the Max label, which is `max` by default.",
  },
  "slider.value": {
    include: true,
    type: "number | number[]",
    description: "The value (controlled). An array of two numbers makes a range.",
  },
  "slider.defaultValue": {
    include: true,
    type: "number | number[]",
    description: "The value at first (uncontrolled). An array of two numbers makes a range.",
  },
  "slider.onValueChange": {
    include: true,
    type: "(value, details) => void",
    description: "Called while a thumb moves, with the number or the array.",
  },
  "slider.onValueCommitted": {
    include: true,
    type: "(value, details) => void",
    description: "Called when the pointer is released or a key is pressed, with the final value.",
  },
  "slider.min": { include: true, type: "number", description: "The lowest value. Default 0." },
  "slider.max": { include: true, type: "number", description: "The highest value. Default 100." },
  "slider.step": {
    include: true,
    type: "number",
    description: "The step of the arrow keys. Default 1.",
  },
  "slider.largeStep": {
    include: true,
    type: "number",
    description: "The step of Page Up, Page Down and Shift with an arrow. Default 10.",
  },
  "slider.disabled": { include: true, type: "boolean", description: "Ignores all interaction." },
  "slider.locale": {
    include: true,
    type: "Intl.LocalesArgument",
    description:
      "Locale of the value readout and of the spoken value, for example `ar-EG` for Arabic-Indic digits.",
  },
  // Input OTP
  "input-otp.value": {
    include: true,
    type: "string",
    description: "The code (controlled). Only digits.",
  },
  "input-otp.defaultValue": {
    include: true,
    type: "string",
    description: "The code at first (uncontrolled).",
  },
  "input-otp.onValueChange": {
    include: true,
    type: "(value, details) => void",
    description: "Called as the code changes by typing, pasting or deleting.",
  },
  "input-otp.onValueComplete": {
    include: true,
    type: "(value, details) => void",
    description: "Called when every box is filled, or a full code is pasted.",
  },
  "input-otp.mask": {
    include: true,
    type: "boolean",
    description: "Shows dots instead of the digits, for a PIN. Default false.",
  },
  "input-otp.disabled": { include: true, type: "boolean", description: "Ignores all interaction." },
  "input-otp.readOnly": {
    include: true,
    type: "boolean",
    description: "Shows the code and does not let people change it.",
  },
  "input-otp.name": {
    include: true,
    type: "string",
    description: "The field name when the form is submitted.",
  },
  "input-otp.autoSubmit": {
    include: true,
    type: "boolean",
    description: "Submits the form when the code is complete. Default false.",
  },
  // Toggle
  "toggle.size": { description: "Height: `sm` 24px, `md` 32px, `lg` 40px, like Button." },
  "toggle.iconOnly": { description: "Square, icon only. Needs an `aria-label`." },
  "toggle.onColor": { description: "For toggles on brand fills." },
  "toggle.pressed": {
    include: true,
    type: "boolean",
    description: "Whether it is pressed (controlled).",
  },
  "toggle.defaultPressed": {
    include: true,
    type: "boolean",
    description: "Whether it is pressed at first (uncontrolled).",
  },
  "toggle.onPressedChange": {
    include: true,
    type: "(pressed, details) => void",
    description: "Called when it is pressed or released.",
  },
  "toggle.disabled": { include: true, type: "boolean", description: "Ignores all interaction." },
  "toggle.render": { include: true, type: "ReactElement | function", description: render },
  // Toggle Group
  "toggle-group.attached": {
    description: "Joins the toggles with shared edges (default), or keeps them 8px apart.",
  },
  "toggle-group.value": {
    include: true,
    type: "string[]",
    description: "The values of the pressed toggles (controlled).",
  },
  "toggle-group.defaultValue": {
    include: true,
    type: "string[]",
    description: "The values pressed at first (uncontrolled).",
  },
  "toggle-group.onValueChange": {
    include: true,
    type: "(value, details) => void",
    description: "Called with the new array of pressed values.",
  },
  "toggle-group.multiple": {
    include: true,
    type: "boolean",
    description: "Lets several toggles be pressed at once. Default false.",
  },
  "toggle-group.orientation": {
    include: true,
    type: '"horizontal" | "vertical"',
    description: "Direction of the row. Vertical uses Up and Down arrows. Default horizontal.",
  },
  "toggle-group.disabled": {
    include: true,
    type: "boolean",
    description: "Ignores all interaction.",
  },
  "toggle-group.loopFocus": {
    include: true,
    type: "boolean",
    description: "Whether the arrow keys wrap from the last toggle to the first. Default true.",
  },
  // Input Group
  "input-group.size": { description: "Height: `md` 32px or `lg` 40px, like Input." },
  "input-group.appearance": {
    description: "`default`, or the filled `lighter` and `darker` fills of Input.",
  },
  // Button Group
  "button-group.orientation": {
    description: "`horizontal` (default) or `vertical`.",
  },
};
