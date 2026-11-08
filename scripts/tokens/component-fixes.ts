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

// Phase 5: Table rows. Figma gives the row and the alternate row the same light fill (f9fafb), and
// hovers to f3f4f6, where the primary link is 4.32:1 (needs 4.5:1).
COMPONENT_OVERRIDES.push(
  {
    token: "table-background-row",
    mode: "light",
    to: "{colors-base-white}",
    reason:
      "Figma gives the row and the alternate row the same fill (f9fafb), so alternating rows could not be seen. Rows are white and the alternate row keeps f9fafb.",
    component: "table",
  },
  {
    token: "table-background-row-hovered",
    mode: "light",
    to: "{background-primary-25}",
    reason:
      "The Figma hover fill (f3f4f6) puts the primary link at 4.32:1, below the 4.5:1 a link needs. A faint brand tint keeps the link at 4.61:1 and still tells the hovered row from the white and alternate ones.",
    component: "table",
  },
);

// Phase 6: Date Picker. The today ring and number use datecell-background-600 (green 600), which is
// 3.84:1 on the hovered cell and 3.25:1 on the pressed one.
COMPONENT_OVERRIDES.push({
  token: "datecell-background-600",
  mode: "light",
  to: "{colors-primary-sa-flag-800}",
  reason:
    "Today's number in the DGA green 600 is 3.84:1 on the hovered cell and 3.25:1 on the pressed one (needs 4.5:1). Green 800 is 4.5:1 or better on the cell in every state.",
  component: "date-picker",
});

export const COMPONENT_ADDITIONS: Addition[] = [
  // Neutral buttons in dark mode: the fills are one or two steps above the page, so their
  // edge disappears. A border one step above the fill keeps it visible; none in light mode.
  {
    name: "button-border-neutral",
    light: "{colors-alpha-alpha-white-0}",
    dark: "{colors-neutral-dark-700}",
    reason:
      "In dark mode the neutral and secondary button fills are 1.1–1.4:1 against the page, so their edge was not visible. A 1px border (neutral dark 700) shows it. Transparent in light mode, so nothing changes there.",
    component: button,
  },
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

// ---------------------------------------------------------------------------
// Forms (Phase 3): Field, Input, Textarea, Select, Number Input, Search Box, Checkbox, Radio,
// Switch and File Upload. Found by the field-*, control-* and textarea-* audit in forms.ts.
// ---------------------------------------------------------------------------

COMPONENT_ADDITIONS.push(
  {
    name: "control-thumb",
    light: "{colors-base-white}",
    dark: "{colors-base-white}",
    reason:
      "The Switch thumb is white in both modes. Figma has no token for it (background-white turns dark in dark mode, and the white thumb on the off track would be 1.1:1).",
    component: "switch",
  },
  {
    name: "field-text-placeholder-tinted",
    light: "{colors-neutral-600}",
    dark: "{field-text-placeholder}",
    reason:
      "The DGA placeholder (neutral-500, #6c737f) is 4.83:1 on white but 4.34:1 on the filled darker fill and the pressed fill (#f3f4f6), under 4.5:1. Only those two states use this token (neutral-600, 6.2:1); everywhere else the placeholder is the DGA colour.",
    component: "input",
  },
  {
    name: "control-icon-neutral",
    light: "{colors-base-white}",
    dark: "{colors-neutral-dark-950}",
    reason:
      "The check mark on a neutral checkbox. The neutral fill is near-black in light mode and light grey in dark mode (control-neutral-checked), so the mark needs to flip too. Figma's control-icon-* tokens stay white (1.8:1 on the dark-mode fill).",
    component: "checkbox",
  },
);

COMPONENT_OVERRIDES.push(
  {
    token: "field-border-default",
    mode: "light",
    to: "{colors-neutral-500}",
    reason:
      "DGA draws the default field border in neutral-400 (#9da4ae), which is 2.58:1 on a white field. The default field has a white fill on a white or near-white page, so the border is the only thing that marks its boundary at rest (WCAG 1.4.11, 3:1). Neutral-500 is 4.83:1 on white. Kept only for this reason; hover, focus and press use the DGA colours. Dark mode already passes.",
    component: "input",
  },
  {
    token: "field-border-error",
    mode: "light",
    to: "{colors-red-600}",
    reason:
      "Figma binds the error border to red-700 (#b42318); the live DGA CSS (--form-field-border-error) is error-600 (#d92d20), 4.77:1 on white, which still passes 3:1 as a border and 4.5:1 as the required marker. Follows the live DGA colour.",
    component: "input",
  },
  ...(["hovered", "pressed"] as const).map(
    (state): Override => ({
      token: `control-primary-${state}`,
      mode: "dark",
      to: "{colors-primary-sa-flag-600-primary}",
      reason:
        "Figma Dark lightens the checked fill on hover and press (green-300/400). The white check mark on it is 1.4–2.1:1. The fill stays green-600 and hover and press show on the ring and background instead.",
      component: "checkbox",
    }),
  ),
);

export const FORM_DEVIATIONS: Deviation[] = [
  {
    area: "Components",
    item: "Field",
    original: "No Field component. Label, helper text and error are parts of each input page.",
    ours: "One Field wraps every control: Label (with required or optional marker), Description (helper text) and Error. Built on Base UI Field, so the label names the control and helper and error text are linked with aria-describedby.",
    reason:
      "The same three parts appear on every control page. One component keeps them consistent and wires the accessibility attributes once.",
    component: "field",
  },
  {
    area: "Components",
    item: "Field: error is never colour alone",
    original: "Error state is a red border and a message with an icon swap.",
    ours: "aria-invalid on the control, a red border and a message that always starts with an alert icon. Checkbox, radio and switch show the message the same way.",
    reason: "WCAG 1.4.1: colour must not be the only cue. A border colour change alone fails it.",
    component: "field",
  },
  {
    area: "Components",
    item: "Input, Textarea, Select: read-only focus",
    original: "A read-only field shows no change when it is focused.",
    ours: "A focused read-only field shows the border colour change and the full underline (no shadow). Its fill and rest border are the DGA ones.",
    reason:
      "A read-only field is still in the tab order, and a focused element needs a visible indicator (WCAG 2.4.7). Without an outline, the underline is the indicator.",
    component: "input",
  },
  {
    area: "Components",
    item: "Input, Textarea, Select: read-only border",
    original: "Solid border-neutral-primary (#d2d6db).",
    ours: "The same, kept as DGA draws it. The value text is 4.5:1 or better.",
    reason:
      "Not remapped: #d2d6db is 1.5:1 on white, below the 3:1 of WCAG 1.4.11 if the boundary is needed to find the control. A read-only field shows a value, is not edited, and is named by its label, so the boundary is not what identifies it. Teams that treat read-only fields as controls should use a plain text display instead.",
    status: "unresolved",
    component: "input",
  },
  {
    area: "Components",
    item: "Input, Textarea, Select: filled lighter and darker at rest",
    original:
      "No border at rest, the border on hover, focus and press. The fills are #fcfcfd and #f3f4f6.",
    ours: "The same, kept as DGA draws it. The border is transparent at rest (not removed), so the box does not shift when it appears.",
    reason:
      "Not remapped: the fills are 1.0:1 and 1.1:1 against the page, below the 3:1 of WCAG 1.4.11 for the resting boundary. The label, the placeholder (4.5:1 or better) and the hover, focus and press border identify the field. Use the default fill where the field must be findable at rest.",
    status: "unresolved",
    component: "input",
  },
  {
    area: "Components",
    item: "Textarea: size",
    original: "Large only: one fixed height (124px sample).",
    ours: "Grows in height (rows, default 4) and the user can resize it vertically; resize can be turned off.",
    reason:
      "A multi-line field has no single right height. Figma's Resize and Scroll Bar props map to resize and the native scroll bar.",
    component: "textarea",
  },
  {
    area: "Components",
    item: "Select: popup",
    original: "Only the open list (Dropdown List Item) is drawn, no popup surface.",
    ours: "A popup on the card surface with a 1px border, as wide as the trigger, opening below it. A 2px bar on the highlighted option (as well as the tint) and a check mark on the chosen one.",
    reason:
      "The tint alone is 1.1:1 against the popup, so keyboard users could not see which option is highlighted (WCAG 2.4.7).",
    component: "select",
  },
  {
    area: "Components",
    item: "Select: name",
    original: "Dropdown Input",
    ours: "Select (SelectTrigger, SelectValue, SelectContent, SelectItem)",
    reason:
      "Named after the Base UI part and the shadcn convention, so it is found when people search for it. The docs page says it is DGA's Dropdown Input.",
    component: "select",
  },
  {
    area: "Components",
    item: "Number Input: digits and direction",
    original: "No rule for Arabic pages.",
    ours: 'The field is dir="ltr" with unicode-bidi: isolate, so digits and signs never reorder. Typing or pasting Arabic-Indic (٣) or Persian (۳) digits gives Western digits (3). The − and + buttons sit on the logical start and end.',
    reason:
      "Numbers are technical values (amounts, IDs, quantities) that must not be reordered or mixed with other digit systems in one field.",
    component: "number-input",
  },
  {
    area: "Components",
    item: "Search Box: clear button",
    original: "A trailing icon variant (clear or voice).",
    ours: "A real clear button (24px target, named by clearLabel) that appears when there is text and returns focus to the field. type=search, so Escape clears it too.",
    reason: "Icon-only controls need a name and a keyboard path.",
    component: "search-box",
  },
  {
    area: "Components",
    item: "Checkbox, Radio: hover and pressed fill in dark mode",
    original: "The checked fill lightens on hover and press.",
    ours: "The fill stays green-600 in dark mode. Hover and press add a background to the box.",
    reason:
      "A white mark on the lighter fill is 1.4–2.1:1 (see the control-primary-hovered and -pressed fixes).",
    component: "checkbox",
  },
  {
    area: "Components",
    item: "Checkbox, Radio, Switch: read-only",
    original: "border-neutral-primary, transparent fill, grey mark.",
    ours: "control-border (3:1), transparent fill, grey mark, and the pointer stays an arrow.",
    reason: "The pale border is 1.5:1 on white. A read-only control keeps a 3:1 boundary.",
    component: "checkbox",
  },
  {
    area: "Components",
    item: "Checkbox: indeterminate",
    original: "A dash variant of the primary and neutral styles.",
    ours: "indeterminate prop (and aria-checked=mixed). The dash and check mark share one icon slot.",
    reason: "A parent checkbox needs to report a partly selected group to screen readers.",
    component: "checkbox",
  },
  {
    area: "Components",
    item: "Checkbox, Radio, Switch: focus ring",
    original: "A 2px border-black outline on the label's hit box.",
    ours: "A 2px outline 2px outside the control, on :focus-visible only (white in dark mode).",
    reason:
      "Keyboard-only focus (WCAG 2.4.7). The outline follows the control's shape and does not shift the label.",
    component: "switch",
  },
  {
    area: "Components",
    item: "Switch: off track",
    original: "#ccc on the site, no token in Figma.",
    ours: "control-border for the off track, a white thumb, and a tick in the thumb when icon is set.",
    reason:
      "#ccc is 1.6:1 on white. control-border is 4.8:1, so the off track and its white thumb pass 3:1.",
    component: "switch",
  },
  {
    area: "Components",
    item: "Switch: error",
    original: "An alert message below the label.",
    ours: "The same message with its icon, and a 2px error outline on the off track.",
    reason:
      "The error must be visible on the control as well as in the text, without relying on colour alone.",
    component: "switch",
  },
  {
    area: "Components",
    item: "File Upload: drop zone",
    original:
      "Single and Multiple variants with a Drop Zone and File parts; drag-over style on the site.",
    ours: "One component for both: a drop zone that is a real file input (Tab, then Space or Enter), a file list with remove, progress and error states, and file-type, size and count validation.",
    reason:
      "A drop zone that only accepts a mouse drag is not keyboard accessible (WCAG 2.1.1). Rejected files stay in the list with the reason.",
    component: "file-upload",
  },
  {
    area: "Components",
    item: "File Upload: Arabic file names",
    original: "Not specified.",
    ours: 'Each name has dir="auto" and is wrapped in <bdi>, so an Arabic name reads right to left and "report.pdf" left to right, whatever the page direction. Sizes and percentages are always left to right Western digits.',
    reason: "A name mixing Arabic and Latin text must not be reordered around its extension.",
    component: "file-upload",
  },
];

COMPONENT_DEVIATIONS.push(...FORM_DEVIATIONS);

// ---------------------------------------------------------------------------
// Interactive (Phase 4): Dialog, Drawer, Tooltip, Menu, Tabs, Accordion, Content Switcher,
// Toast, Notification and Inline Alert. Found by the audit in interactive.ts and by reading the
// design.dga.gov.sa CSS against the Figma file.
// ---------------------------------------------------------------------------

export const INTERACTIVE_DEVIATIONS: Deviation[] = [
  {
    area: "Components",
    item: "Dialog: name, close and focus",
    original:
      "Modal: a 600px card (padding 24, radius-md, shadow-3xl). No close button, focus or keyboard behaviour is specified; width: 100% on mobile.",
    ours: "Dialog (DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose). A close button in the corner, Escape, a focus trap, focus returning to the trigger, an inert page behind it, sm 400 / md 600 / lg 800px, and 16px of page padding on phones.",
    reason:
      "A window that takes over the page must be operable by keyboard and announced (WAI-ARIA dialog pattern, WCAG 2.1.1, 2.4.3). Built on Base UI Dialog.",
    component: "dialog",
  },
  {
    area: "Components",
    item: "Drawer: from Slideout Menu to a modal drawer",
    original:
      "Slideout Menu: a 346px side panel (.sidepanel) with a physical border-right, always visible in the layout.",
    ours: "Drawer: a modal panel that slides in from the start, end, top or bottom. start and end follow the page direction, the edge border is logical (border-e or border-s) and a touch swipe closes it. White or gray (neutral-100).",
    reason:
      "A panel that covers the page needs the same focus trap and Escape as a dialog. DGA's border-right and its slide direction are physical, so they would be on the wrong side in Arabic.",
    component: "drawer",
  },
  {
    area: "Components",
    item: "Tooltip: placement and behaviour",
    original:
      "A 240px bubble with a 14px physical margin per direction (margin-right for left, margin-left for right) and a beak placement and alignment from Figma. Shown on hover.",
    ours: "side is top, bottom, start or end, so start and end swap on Arabic pages and the beak follows. It opens on hover and on keyboard focus, stays open while the pointer is over it, and closes with Escape (WCAG 1.4.13). The Help Icon is TooltipHelp: a 20px button with an accessible name that opens the same bubble as a popover on hover, focus, click and touch.",
    reason:
      "A tooltip that shows only on hover is invisible to keyboard users, and a physical margin would sit on the wrong side in RTL. Base UI also advises that an info icon whose purpose is to show the text be a popover, so touch and screen reader users can read it.",
    component: "tooltip",
  },
  {
    area: "Components",
    item: "Menu: states and disabled",
    original:
      ".menu-item:hover is defined twice with different fills (neutral-100 and button-background-neutral-hovered); focus is a 2px black border; disabled is opacity .5.",
    ours: "The Figma fills: button-background-neutral-hovered and -pressed, background-primary-50 for the selected item. Focus is a 2px outline, drawn inside the item and only for keyboard focus. Disabled uses text-default-disabled and icon-default-disabled instead of opacity.",
    reason:
      "Figma is the source of truth where the CSS disagrees with itself. Opacity on the whole item also fades the focus ring.",
    component: "menu",
  },
  {
    area: "Components",
    item: "Menu: trailing element",
    original: "Five trail variants: Text, Button, Tag, Switch and Icon.",
    ours: "MenuShortcut for text and any element you place after the label (Tag, Switch, an icon). Submenus (MenuSub) and checkbox and radio items are added, with a check mark or a dot on the end side.",
    reason:
      "One slot covers every trail variant and the extra items cover the menus that apps actually need.",
    component: "menu",
  },
  {
    area: "Components",
    item: "Tabs: selected, hover and More tab",
    original:
      "A 3px bar for hover, press and selected on vertical tabs; a Closed and Open More tab on horizontal tabs.",
    ours: "A 3px bar under (or beside) the selected tab in border-primary; vertical tabs also show a neutral bar on hover and press. A list that does not fit scrolls sideways by default; with overflow set to menu the tabs that do not fit collapse into a More tab that opens a Menu (the More tab is selected while a hidden tab is). Its size, padding and 16px chevron are our choice.",
    reason:
      "Scrolling stays the default because it keeps every tab reachable with Tab and the arrow keys. The More tab is opt-in and sits outside the tablist, so Tab reaches it after the visible tabs.",
    status: "fixed",
    component: "tabs",
  },
  {
    area: "Components",
    item: "Tabs, Content Switcher: arrow keys in RTL",
    original: "Not specified.",
    ours: "Left and Right swap on Arabic pages (Base UI DirectionProvider, set from the dir attribute of html by the components themselves), so the arrow that points at the next tab moves to it.",
    reason:
      "The arrow keys must match what the eyes see, in both directions (WAI-ARIA tabs pattern).",
    component: "tabs",
  },
  {
    area: "Components",
    item: "Accordion: RTL padding, flush and disabled",
    original:
      "Body padding in physical sides with two [dir=rtl] overrides per variant; flush draws its line with a border-image gradient at 16px and 382px; disabled is neutral-300 with !important.",
    ours: "Logical padding (ps and pe), so no RTL overrides are needed; flush is a 16px margin on each side of the line (the width follows the container); disabled uses text-default-disabled.",
    reason:
      "The CSS needs twelve rules where logical properties need none, and the gradient hard-codes a 382px width.",
    component: "accordion",
  },
  {
    area: "Components",
    item: "Accordion: filled variant and flush line",
    original:
      "The DGA CSS shows only the white item; flush is a border-image gradient at 16px and 382px.",
    ours: 'variant="filled" fills each item with background-neutral-50 (our choice); flush draws the line 16px from both edges with a pseudo-element, so the heading and content keep their full width; the content text is grey in a disabled item.',
    reason:
      "A gradient at fixed pixels breaks at any other width and made the flush heading look indented. The filled colour has no source in the dump or the CSS and is contrast-checked at 4.5:1 and 3:1.",
    component: "accordion",
  },
  {
    area: "Components",
    item: "Content Switcher: design and on-colour",
    original:
      "Figma has two to three items with a white label (text-oncolor-primary) and an OnColor variant. The CSS only sets margin: 10px.",
    ours: "A neutral-100 track with the chosen option in the primary fill and a white label; one option is always chosen. On a brand fill the track is a translucent black (not white) and the chosen option is white with a dark green label.",
    reason:
      "White on a white-lightened brand fill is 3.34:1 (down to 2.81:1 pressed); a darkened track keeps 4.5:1 or better, as the on-colour buttons do.",
    component: "content-switcher",
  },
  {
    area: "Components",
    item: "Toast: neutral bar, timing and live region",
    original:
      "Notification Toast: an 8px bar in the kind's 400 colour (white for neutral, so invisible), no timing or announcement.",
    ours: "A bar on the logical start in the kind's 400 colour (neutral uses border-neutral-primary), an icon and a title for each kind, a close button and an optional action. It is announced (polite; assertive for error and warning), pauses while hovered or focused, and can be swiped away. Toaster sits at the bottom end of the screen.",
    reason:
      "A message that disappears must be announced and must not vanish while someone is reading it (WCAG 4.1.3, 2.2.1).",
    component: "toast",
  },
  {
    area: "Components",
    item: "Notification: the icon colour",
    original:
      "The icon is icon-oncolor (white) on a 50 tint, and the success style uses the brand green where the other kinds use their own colour.",
    ours: "The icon uses the kind's icon colour (3:1 or better on the tint); success uses the success tokens like the Figma fill and text.",
    reason:
      "A white icon on a 50 tint is 1.0 to 1.1:1: it cannot be seen. The kinds should read as one set.",
    component: "notification",
  },
  {
    area: "Components",
    item: "Notification, Inline Alert: live regions",
    original: "Not specified.",
    ours: "critical (Notification) and destructive or warning (Inline Alert) are role=alert, the rest role=status, and each hides itself when dismissed.",
    reason:
      "A message that appears on its own must be announced without moving focus (WCAG 4.1.3). Urgent kinds interrupt; the rest wait.",
    component: "notification",
  },
  {
    area: "Components",
    item: "Inline Alert: icon colour and neutral bar",
    original:
      "The tinted info and warning alerts with a close button use icon-default for the icon, and the neutral bar is white.",
    ours: "The icon is always the kind's icon colour, and the neutral bar is border-neutral-primary. A tinted alert takes the kind's text colour for the title and the text.",
    reason:
      "The icon should not change when a close button is added, and a white bar on a white alert is not there.",
    component: "inline-alert",
  },
];

COMPONENT_DEVIATIONS.push(...INTERACTIVE_DEVIATIONS);
