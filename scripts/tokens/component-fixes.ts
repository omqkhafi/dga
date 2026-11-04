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

// ---------------------------------------------------------------------------
// Tag
// ---------------------------------------------------------------------------

COMPONENT_OVERRIDES.push({
  token: "tag-background-on-color",
  mode: "both",
  to: "{colors-alpha-alpha-black-20}",
  reason:
    "White label on white-20 over the brand fill is 3.34:1. A black-20 tint keeps the tag visible and gives 6.30:1.",
  component: "tag",
});

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

// ---------------------------------------------------------------------------
// Badge: not in the Figma file. Tokens taken from the design.dga.gov.sa .badge CSS,
// mapped to DGA palettes (brand → primary-sa-flag, purple → tertiary-lavender).
// Dark-mode values are ours: the site CSS has no dark mode.
// ---------------------------------------------------------------------------

/** Badge colours and their DGA palette. */
export const BADGE_COLORS = {
  neutral: "neutral",
  success: "primary-sa-flag",
  error: "red",
  warning: "yellow",
  info: "blue",
  purple: "tertiary-lavender",
  orange: "orange",
} as const;

const PRIMARY_STEP: Record<string, string> = {
  "primary-sa-flag": "600",
  "tertiary-lavender": "500",
};
const step = (palette: string, n: string) =>
  `{colors-${palette}-${n}${PRIMARY_STEP[palette] === n ? "-primary" : ""}}`;
const SITE_CSS = "Added from site CSS (.badge)";

for (const [color, palette] of Object.entries(BADGE_COLORS)) {
  const neutral = color === "neutral";
  const parts: [string, string, string, string][] = [
    ["background", "50", neutral ? "800" : "950", "fill"],
    ["border", "200", neutral ? "700" : "800", "border"],
    ["text", "700", "200", "label and icon"],
    ["border-outlined", "500", "400", "outlined border"],
  ];
  for (const [part, light, dark, what] of parts) {
    COMPONENT_ADDITIONS.push({
      name: `badge-${color}-${part}`,
      light: step(palette, light),
      dark: step(palette, dark),
      area: "Tokens",
      original: SITE_CSS,
      reason: `Badge ${color} ${what}: ${palette}-${light} as on the site; ${palette}-${dark} in dark mode.`,
      component: "badge",
    });
  }
}
COMPONENT_ADDITIONS.push(
  {
    name: "badge-on-color-background",
    light: "{colors-alpha-alpha-black-20}",
    dark: "{colors-alpha-alpha-black-20}",
    area: "Tokens",
    original: "Added from site CSS (.badge--on-color: white 30%)",
    reason:
      "White text on white-30 over the brand fill is 3.13:1. A black-20 tint keeps the badge visible and gives 6.30:1.",
    component: "badge",
  },
  {
    name: "badge-on-color-border-outlined",
    light: "{colors-alpha-alpha-white-90}",
    dark: "{colors-alpha-alpha-white-90}",
    area: "Tokens",
    original: SITE_CSS,
    reason: "On-colour outlined border, white 90% as on the site.",
    component: "badge",
  },
);

// ---------------------------------------------------------------------------
// Featured Icon: not in the Figma file. Tokens from the design.dga.gov.sa
// .featured-icon CSS (its semantic block: text-success, icon-info …).
// ---------------------------------------------------------------------------

export const FEATURED_ICON_COLORS = {
  brand: { palette: "primary-sa-flag", hard: "600", fg: "600" },
  neutral: { palette: "neutral", hard: "500", fg: "500" },
  success: { palette: "green", hard: "700", fg: "700" },
  error: { palette: "red", hard: "600", fg: "600" },
  warning: { palette: "yellow", hard: "700", fg: "700" },
  info: { palette: "blue", hard: "600", fg: "600" },
} as const;

for (const [color, { palette, hard, fg }] of Object.entries(FEATURED_ICON_COLORS)) {
  const neutral = color === "neutral";
  const parts: [string, string, string, string][] = [
    ["background", hard, hard, "hard fill (white icon)"],
    ["background-light", neutral ? "100" : "50", neutral ? "800" : "950", "light fill"],
    ["icon", fg, "300", "icon on the light fill and outlined"],
    ["border", "200", neutral ? "700" : "800", "outlined border"],
  ];
  for (const [part, light, dark, what] of parts) {
    COMPONENT_ADDITIONS.push({
      name: `featured-icon-${color}-${part}`,
      light: step(palette, light),
      dark: step(palette, dark),
      area: "Tokens",
      original: "Added from site CSS (.featured-icon)",
      reason: `Featured icon ${color} ${what}: ${palette}-${light}${light === dark ? "" : `, ${palette}-${dark} in dark mode`}.`,
      component: "featured-icon",
    });
  }
}

// ---------------------------------------------------------------------------
// Skeleton: the Figma components have no fill token.
// ---------------------------------------------------------------------------

COMPONENT_ADDITIONS.push({
  name: "skeleton-background",
  light: "{colors-neutral-200}",
  dark: "{colors-neutral-700}",
  area: "Tokens",
  original: "No fill token on the Figma Skeleton components",
  reason: "Placeholder fill: neutral-200, neutral-700 in dark mode.",
  component: "skeleton",
});

export const COMPONENT_DEVIATIONS: Deviation[] = [
  {
    area: "Components",
    item: "Featured Icon",
    original:
      "Not in the DGA Figma file. Defined only in the design.dga.gov.sa CSS (.featured-icon).",
    ours: "Built from the site CSS: hard, light and outlined; brand, neutral, success, error, warning and info; sm 32, md 40, lg 48 and xl 56px; square or circle.",
    reason: "Figma is the source of truth where it exists; here only the site CSS does.",
    component: "featured-icon",
  },
  {
    area: "Components",
    item: "Featured Icon: hard warning and success",
    original:
      "Hard warning: white on warning-400. Hard success: white on brand-600 (the same as brand).",
    ours: "Hard warning uses yellow-700; hard success uses green-700 (DGA status green).",
    reason:
      "White on yellow-400 is 1.9:1, below the 3:1 non-text minimum. Success uses the status palette so it differs from brand, as the site's semantic block (text-success) does.",
    component: "featured-icon",
  },
  {
    area: "Components",
    item: "Skeleton: composite types",
    original:
      "Five composite Skeleton Components (Image Button and Text, Icon and List, Image Content and Button, Chart and Content, Image Profile Content and Button)",
    ours: "One Skeleton primitive (rectangle, square, circle, line) and the five layouts as copy-paste examples on the docs page",
    reason: "The composites are layouts of the primitives; real pages need their own shapes.",
    component: "skeleton",
  },
  {
    area: "Components",
    item: "Skeleton: animation",
    original: "Static",
    ours: "Pulses (opacity); static with reduced motion",
    reason: "A gentle pulse shows that content is loading. prefers-reduced-motion turns it off.",
    component: "skeleton",
  },
  {
    area: "Components",
    item: "Divider: colours",
    original: "Neutral, Primary, Alpha-white and White, with no colour tokens in the export",
    ours: "neutral → border-neutral-secondary, primary → border-primary, alpha-white → border-oncolor-transparent-30, white → icon-oncolor (white in both modes)",
    reason:
      "Mapped to the closest semantic border tokens. border-white flips to black in dark mode, so white uses a token that stays white.",
    component: "divider",
  },
  {
    area: "Components",
    item: "Avatar: sizes and text",
    original: "Initials use Text xs/Semibold on every size in the export",
    ours: "Text style per size from the site CSS: 24 Text 2xs Bold, 32 Text xs SemiBold, 40 Text sm SemiBold, 48 Text md SemiBold, 64 Text xl Medium, 80 Display sm, 120 Display md",
    reason: "One text size cannot fit avatars from 24 to 120px.",
    component: "avatar",
  },
  {
    area: "Components",
    item: "Tag: text size",
    original: "Text 2xs/SemiBold on every size in the exported variant table",
    ours: "Text sm (md, 32px), Text xs (sm, 24px) and Text 2xs (xs, 20px), SemiBold",
    reason:
      "The export lists one sample text style. A 10px label in a 32px tag is hard to read; the sizes follow the site CSS (.tag--lg uses 14px).",
    component: "tag",
  },
  {
    area: "Components",
    item: "Tag: dismiss",
    original: "Optional trailing icon",
    ours: "onDismiss adds a trailing close button (Cancel icon) with an aria-label (dismissLabel). The tag itself is not interactive.",
    reason: "Removable filter tags need a real button for keyboard and screen-reader users.",
    component: "tag",
  },
  {
    area: "Components",
    item: "Status Tag: ghost and dot",
    original: "Ghost: neutral label with no fill",
    ours: "Every status tag starts with a coloured dot (tag-icon-*; tag-dot on inverted) so ghost tags still show their colour.",
    reason:
      "Ghost tags would otherwise all look the same; the dot is decorative and the label carries the status.",
    component: "tag",
  },
  {
    area: "Components",
    item: "Badge",
    original: "Not in the DGA Figma file. Defined only in the design.dga.gov.sa CSS (.badge).",
    ours: "Built from the site CSS: sizes sm 20, md 24 and lg 32px, filled and outlined, square and rounded, icon-only. Colours map to DGA palettes (brand → success, purple → lavender).",
    reason:
      "The badge is used across DGA sites. Figma is the source of truth where it exists; here only the site CSS does.",
    component: "badge",
  },
  {
    area: "Components",
    item: "Badge: pink",
    original: ".badge--pink and .badge--pink-outlined",
    ours: "Dropped",
    reason: "DGA has no pink palette, in Figma or in the token set.",
    component: "badge",
  },
  {
    area: "Components",
    item: "Badge: on-colour outlined label",
    original: "White 90% text",
    ours: "White text (text-oncolor-primary)",
    reason: "White 90% on the brand fill is 4.16:1; white is 4.57:1 or better.",
    component: "badge",
  },
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
