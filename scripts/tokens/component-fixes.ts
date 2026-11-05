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
      "neutral-400 (#9da4ae) on a white field is 2.58:1, below the 3:1 that WCAG 1.4.11 asks for input boundaries. neutral-500 is 4.83:1 on white and 4.3:1 or better on every field fill. Dark mode already passes (neutral dark 500, 3.8:1 or better).",
    component: "input",
  },
  {
    token: "field-text-placeholder",
    mode: "light",
    to: "{colors-neutral-600}",
    reason:
      "neutral-500 placeholder text on the filled darker fill (#f3f4f6) is 4.34:1, below the 4.5:1 minimum. neutral-600 is 6.2:1 on that fill and 7.6:1 on white.",
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
    item: "Input, Textarea, Select: filled lighter and darker",
    original:
      "No border by default (border 0), a 1px border only on hover and focus. The fills are #fcfcfd and #f3f4f6.",
    ours: "The border stays in every state. The fill changes, the boundary does not.",
    reason:
      "The fills are 1.0:1 and 1.1:1 against the page, so without a border the field cannot be found (WCAG 1.4.11).",
    component: "input",
  },
  {
    area: "Components",
    item: "Input, Textarea, Select: focus",
    original: "shadow-md and a 2px underline that grows in from the start.",
    ours: "A 2px outline in border-black (white in dark mode), 1px outside the border, and the border takes field-border-pressed.",
    reason:
      "Shadows are off in dark mode (the focus cue would vanish) and the underline is not a 3:1 focus indicator on every fill. An outline is visible in both modes and in forced colours.",
    component: "input",
  },
  {
    area: "Components",
    item: "Input, Textarea, Select: read-only",
    original: "border-neutral-primary (#d2d6db) with the default fill.",
    ours: "A dashed border in field-border-default, the default fill and no hover change.",
    reason:
      "#d2d6db on white is 1.5:1. A read-only field can still be focused and read, so its boundary keeps 3:1. The dashed line tells it apart from an editable field without colour.",
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
