// Component-level deviations: token fixes found by the component contrast audit
// (scripts/tokens/components.ts) and behaviour that differs from the DGA Figma file.
// Spread into OVERRIDES, ADDITIONS and OTHER_DEVIATIONS in fixes.ts.

import type { Addition, Deviation, Override } from "./fixes";

const STATES = ["hovered", "pressed", "selected"] as const;

// ---------------------------------------------------------------------------
// Button
// ---------------------------------------------------------------------------

const button = "button";

export const COMPONENT_OVERRIDES: Override[] = [
  // On-colour secondary/outline/subtle: Figma lightens the brand fill with white, which lowers
  // the contrast of the white label (white on green-600 is only 4.57:1 to start with).
  ...(
    [
      ["hovered", "20"],
      ["pressed", "40"],
      ["selected", "30"],
    ] as const
  ).map(
    ([state, alpha]): Override => ({
      token: `button-background-transparent-${state}`,
      mode: "light",
      to: `{colors-alpha-alpha-black-${alpha}}`,
      reason: `White label on white-${alpha} over the brand fill fails AA (down to 2.38:1). Black-${alpha} darkens the fill instead (6.30:1 or better), as dark mode already does.`,
      component: button,
    }),
  ),
  // On-colour transparent: green-400/300 labels on the brand fill are 2.10–2.82:1.
  ...STATES.flatMap((state): Override[] =>
    (["label", "icon"] as const).map((part) => ({
      token: `button-${part}-transparent-${state}-on-color`,
      mode: "both",
      to: "{colors-base-white}",
      reason:
        "Green-300/400 on the brand fill is 2.10–2.82:1. The label stays white and the state is shown with an underline instead.",
      component: button,
    })),
  ),
  // On-colour destructive: red-200/300/400 on the brand fill is 1.0–3.4:1.
  ...(["default", "hovered", "pressed"] as const).map(
    (state): Override => ({
      token: `button-label-danger-primary-${state}-oncolor`,
      mode: "both",
      to: "{colors-base-white}",
      reason:
        "Red-200/300/400 on the green brand fill is 1.01–3.35:1 and relies on red/green colour difference. On brand fills, destructive outline, subtle and transparent buttons use white labels; the label text carries the meaning.",
      component: button,
    }),
  ),
  // Destructive secondary in dark mode: the red-50 fill does not change, so the dark-mode
  // error text (red-400) sits on a near-white fill.
  ...(
    [
      ["default", "{alpha-error-10}"],
      ["focused", "{alpha-error-10}"],
      ["selected", "{alpha-error-10}"],
      ["hovered", "{alpha-error-20}"],
      ["pressed", "#b423184d"],
    ] as const
  ).map(
    ([state, to]): Override => ({
      token: `button-background-danger-secondary-${state}`,
      mode: "dark",
      to,
      reason:
        "Figma keeps the light red-50 fill in dark mode, so dark-mode error text (red-400) is 1.96–2.56:1. A translucent red tint (10/20/30%) matches the dark tag and status tints and gives 4.57:1 or better.",
      component: button,
    }),
  ),
];

// ---------------------------------------------------------------------------
// Link
// ---------------------------------------------------------------------------

COMPONENT_OVERRIDES.push(
  ...(["hovered", "pressed", "visited"] as const).map(
    (state): Override => ({
      token: `link-oncolor-${state}`,
      mode: "both",
      to: "{colors-base-white}",
      reason:
        "Translucent white (60–90%) on the brand fill is 2.73–4.21:1. On-colour links stay white; hovered and pressed are shown by the underline.",
      component: "link",
    }),
  ),
);

export const COMPONENT_ADDITIONS: Addition[] = [
  // Transparent buttons: Figma colours the label with the primary fill tokens, which do not
  // change in dark mode.
  ...(
    [
      ["hovered", "700", "300"],
      ["pressed", "900", "200"],
      ["selected", "800", "300"],
    ] as const
  ).map(
    ([state, light, dark]): Addition => ({
      name: `button-label-transparent-${state}`,
      light: `{colors-primary-sa-flag-${light}}`,
      dark: `{colors-primary-sa-flag-${dark}}`,
      reason: `Figma uses button-background-primary-${state} as the label colour. It is a fill token and stays dark in dark mode (1.34–2.84:1 on dark surfaces). This label token keeps the Figma value in light mode and uses green-${dark} in dark mode.`,
      component: button,
    }),
  ),
  // Destructive transparent: Figma has no state variants for destructive buttons.
  ...(
    [
      ["default", "600", "400"],
      ["hovered", "700", "300"],
      ["pressed", "900", "200"],
      ["selected", "800", "300"],
    ] as const
  ).map(
    ([state, light, dark]): Addition => ({
      name: `button-label-danger-${state}`,
      light: `{colors-red-${light}}`,
      dark: `{colors-red-${dark}}`,
      reason: `Destructive transparent label (${state}). Figma only defines the default state and colours it with the danger fill token, which stays red-600 in dark mode (3.01:1 on dark card). States follow the primary transparent pattern; dark mode uses red-${dark}.`,
      component: button,
    }),
  ),
];

COMPONENT_ADDITIONS.push(
  ...(
    [
      ["default", "50"],
      ["hovered", "100"],
      ["pressed", "200"],
      ["selected", "50"],
      ["focused", "50"],
    ] as const
  ).map(
    ([state, step]): Addition => ({
      name: `button-background-danger-secondary-oncolor-${state}`,
      light: `{colors-red-${step}}`,
      dark: `{colors-red-${step}}`,
      reason:
        "On brand fills the dark-mode translucent tint lets the green show through (1.91:1). On-colour destructive secondary buttons keep Figma's opaque red-50/100/200 fill in both modes.",
      component: button,
    }),
  ),
  {
    name: "button-label-danger-secondary-oncolor",
    light: "{colors-red-700}",
    dark: "{colors-red-700}",
    reason:
      "Label for the opaque on-colour destructive secondary fill. text-error flips to red-400 in dark mode, which is 2.56:1 on red-50; red-700 is used in both modes.",
    component: button,
  },
);

export const COMPONENT_DEVIATIONS: Deviation[] = [
  {
    area: "Components",
    item: "Link: focus ring and disabled",
    original:
      "Focused: border-black stroke (border-white on colour). Disabled: a separate variant.",
    ours: "2px outline on :focus-visible with a 2px offset (white on colour, both modes). disabled removes the href and sets aria-disabled.",
    reason:
      "Keyboard-only focus (WCAG 2.4.7). A link without an href cannot be followed or focused.",
    component: "link",
  },
  {
    area: "Components",
    item: "Link: external",
    original: "Optional swap icon",
    ours: 'external opens a new tab with rel="noopener noreferrer", shows the external-link icon (mirrored in RTL) and adds "(opens in a new tab)" for screen readers.',
    reason: "WCAG 3.2.5: warn before opening a new window.",
    component: "link",
  },
  {
    area: "Components",
    item: "Button: destructive states",
    original:
      "Figma defines only the Default state for destructive buttons (Primary, Secondary-Solid, Secondary-Outline, Subtle, Transparent).",
    ours: "Hovered, pressed, selected, focused and disabled follow the same pattern as the non-destructive styles, using the button-background-danger-* tokens (which already have every state).",
    reason: "A button needs every state. The danger fill tokens exist in Figma for all states.",
    component: button,
  },
  {
    area: "Components",
    item: "Button: destructive neutral",
    original: "No destructive variant of Primary-Neutral",
    ours: 'variant="neutral" with destructive renders as destructive primary',
    reason:
      "Figma has no neutral destructive style. Falling back keeps every prop combination valid.",
    component: button,
  },
  {
    area: "Components",
    item: "Button: focus ring",
    original:
      "Focused is a separate Figma state with a 2px border-black (border-white on colour) stroke inside the button.",
    ours: "Shown on :focus-visible only (keyboard), as a 2px outline outside the button with a 1px inner ring in the button's surface colour. On-colour buttons use white (icon-oncolor) in both modes.",
    reason:
      "WCAG 2.4.7 / 2.4.11. An outside outline does not shift the label, and border-white flips to black in dark mode (2.11:1 on the nav header).",
    component: button,
  },
  {
    area: "Components",
    item: "Button: transparent on-colour states",
    original: "Hovered, pressed and selected change the label to green-400/300",
    ours: "The label stays white; hovered and selected add an underline, pressed adds an underline and 80% opacity.",
    reason: "Colour alone cannot meet 4.5:1 on the brand fill (see the label token fixes).",
    component: button,
  },
  {
    area: "Components",
    item: "Button: selected state",
    original: "A separate Figma variant",
    ours: 'Applied with aria-pressed="true" (toggle buttons) or data-selected',
    reason:
      "Screen readers announce aria-pressed; data-selected covers buttons in menus and groups.",
    component: button,
  },
  {
    area: "Components",
    item: "Button: loading",
    original: "Not in Figma",
    ours: "loading prop: a Spinner replaces the leading icon, the width is kept, aria-busy is set and the button is disabled for clicks but stays focusable.",
    reason: "Async actions need a busy state. Keeping focus avoids losing the user's place.",
    component: button,
  },
];
