import { COMPONENT_ADDITIONS, COMPONENT_DEVIATIONS, COMPONENT_OVERRIDES } from "./component-fixes";

// Every place where DGA UI intentionally differs from the DGA Figma source.
// Each entry is applied by the generator AND listed on the docs "Deviations from DGA" page,
// so the two can never drift apart.

export type DeviationArea =
  | "Naming"
  | "Contrast"
  | "Breakpoints"
  | "Typography"
  | "Tokens"
  | "Theming"
  | "Tailwind"
  | "Components";

export type Deviation = {
  area: DeviationArea;
  /** Token or component the change applies to. */
  item: string;
  original: string;
  ours: string;
  reason: string;
  status?: "fixed" | "unresolved" | "pending";
  /** Component the change belongs to, so its docs page can list it. */
  component?: string;
};

// ---------------------------------------------------------------------------
// Naming: typos in Figma variable names. Applied to token names and references.
// ---------------------------------------------------------------------------

export const RENAMES: { from: string; to: string; tokens: string; reason: string }[] = [
  {
    from: "line-hight-",
    to: "line-height-",
    tokens: "--line-hight-* (21 primitives)",
    reason: "Typo: Hight → Height.",
  },
  {
    from: "lavendar",
    to: "lavender",
    tokens: "--colors-tertiary-lavendar-*, --charts-lavendar",
    reason: "Typo: Lavendar → Lavender.",
  },
  {
    from: "diabled",
    to: "disabled",
    tokens: "--chip-background-on-color-diabled",
    reason: "Typo: diabled → disabled.",
  },
  {
    from: "iable-container",
    to: "label-container",
    tokens: "--iable-container",
    reason:
      'Typo: Figma "Form/Iable-container" (capital I for l). Figma uses it as the gap between the label and the input container in Textarea and Dropdown input, so it is "Label-container".',
  },
  {
    from: "lable",
    to: "label",
    tokens: "--prefix-suffix-lable-icon",
    reason: "Typo: lable → label.",
  },
  // Physical → logical. Figma's LTR variants call the start side "left".
  {
    from: "padding-left-right",
    to: "padding-inline",
    tokens: "--dropdown-container-padding-left-right, --textarea-container-padding-left-right",
    reason: "RTL: left/right → logical inline, so the names stay correct in Arabic layouts.",
  },
  {
    from: "padding-top-bottom",
    to: "padding-block",
    tokens: "--textarea-container-padding-top-bottom, --prefix-suffix-padding-top-bottom",
    reason: "Matches the logical inline naming (top/bottom → block).",
  },
  {
    from: "padding-left",
    to: "padding-start",
    tokens: "--input-container-padding-left, --prefix-suffix-padding-left",
    reason: "RTL: left → logical start.",
  },
  {
    from: "padding-right",
    to: "padding-end",
    tokens: "--input-container-padding-right, --prefix-suffix-padding-right",
    reason: "RTL: right → logical end.",
  },
];

export function renameToken(name: string) {
  let result = name;
  for (const { from, to } of RENAMES) result = result.replaceAll(from, to);
  return result;
}

// ---------------------------------------------------------------------------
// Contrast: value overrides so every audited pair meets WCAG 2.1 AA.
// `mode: "both"` applies to light and dark.
// ---------------------------------------------------------------------------

export type Override = {
  token: string;
  mode: "light" | "dark" | "both";
  to: string;
  reason: string;
  component?: string;
};

const linkFamilies = (
  kind: "primary" | "danger" | "neutral",
  state: string,
  mode: Override["mode"],
  to: string,
  reason: string,
): Override[] => [
  { token: `link-${kind}${state}`, mode, to, reason },
  // Figma has link-icon-* tokens for states only; the default icon uses the link colour.
  ...(state ? [{ token: `link-icon-${kind}${state}`, mode, to, reason }] : []),
];

export const OVERRIDES: Override[] = [
  // Solid status fills carry white text.
  {
    token: "background-success",
    mode: "both",
    to: "{colors-green-700}",
    reason: "White text on green-600 is 3.91:1. Green-700 gives 5.69:1.",
  },
  {
    token: "background-warning",
    mode: "both",
    to: "{colors-yellow-700}",
    reason: "White text on yellow-600 is 3.49:1. Yellow-700 gives 5.43:1.",
  },
  // Gold and lavender text.
  {
    token: "text-secondary",
    mode: "light",
    to: "{colors-secondary-gold-800}",
    reason:
      "Gold-600 text on white is 2.30:1 and gold-700 is 3.58:1. Gold-800 gives 5.54:1 and stays recognisably gold.",
  },
  {
    token: "text-tertiary",
    mode: "dark",
    to: "{colors-tertiary-lavender-300}",
    reason: "Lavender-500 on dark surfaces is 2.49:1. Lavender-300 gives 7.30:1.",
  },
  {
    token: "icon-tertiary",
    mode: "dark",
    to: "{colors-tertiary-lavender-400}",
    reason:
      "Lavender-500 icons on dark surfaces are 2.49:1 (non-text needs 3:1). Lavender-400 gives 4.25:1.",
  },
  // On-colour secondary text: Figma maps these to the flipping alpha-white tokens,
  // which turn black in dark mode and become unreadable on green fills.
  {
    token: "text-oncolor-secondary",
    mode: "dark",
    to: "{colors-alpha-alpha-white-80}",
    reason:
      "In dark mode alpha-white-80 flips to 80% black, which is unreadable on fills. Uses literal white at 80%, the same as light mode.",
  },
  {
    token: "text-oncolor-tertiary",
    mode: "dark",
    to: "{colors-alpha-alpha-white-70}",
    reason:
      "In dark mode alpha-white-70 flips to 70% black, which is unreadable on fills. Uses literal white at 70%, the same as light mode.",
  },
  // Icons (non-text, 3:1).
  {
    token: "icon-primary-400",
    mode: "light",
    to: "{colors-primary-sa-flag-800}",
    reason:
      "Sa-flag-400 icons on white are 2.26:1. Used for pressed/selected transparent-button icons, so it now matches link-primary-pressed (sa-flag-800).",
  },
  {
    token: "icon-secondary",
    mode: "light",
    to: "{colors-secondary-gold-700}",
    reason: "Gold-600 icons on white are 2.30:1. Gold-700 gives 3.58:1 (non-text needs 3:1).",
  },
  {
    token: "text-tertiary-light",
    mode: "light",
    to: "{colors-tertiary-lavender-200}",
    reason: "Lavender-300 on the nav-header green is 4.30:1. Lavender-200 gives 5.71:1.",
  },
  // Links, light mode: Figma lightens on hover/press, which drops below 4.5:1.
  ...linkFamilies(
    "primary",
    "-hovered",
    "light",
    "{colors-primary-sa-flag-700}",
    "Sa-flag-400 on white is 2.16:1. Hover darkens to sa-flag-700 (6.60:1) instead of lightening.",
  ),
  ...linkFamilies(
    "primary",
    "-pressed",
    "light",
    "{colors-primary-sa-flag-800}",
    "Sa-flag-300 on white is 1.61:1. Pressed uses sa-flag-800 (8.56:1).",
  ),
  ...linkFamilies(
    "neutral",
    "-pressed",
    "light",
    "{colors-neutral-600}",
    "Neutral-400 on white is 2.41:1. Neutral-600 gives 7.36:1.",
  ),
  // Links, dark mode: Figma has no dark values for primary/danger links.
  ...linkFamilies(
    "primary",
    "",
    "dark",
    "{colors-primary-sa-flag-400}",
    "Sa-flag-600 on dark card is 3.06:1. Sa-flag-400 gives 6.43:1.",
  ),
  ...linkFamilies(
    "primary",
    "-focused",
    "dark",
    "{colors-primary-sa-flag-400}",
    "Matches the dark default link (sa-flag-600 was 3.06:1).",
  ),
  ...linkFamilies(
    "primary",
    "-hovered",
    "dark",
    "{colors-primary-sa-flag-300}",
    "Dark hover lightens one step from the new default.",
  ),
  ...linkFamilies(
    "primary",
    "-pressed",
    "dark",
    "{colors-primary-sa-flag-200}",
    "Dark pressed lightens two steps from the new default.",
  ),
  ...linkFamilies(
    "primary",
    "-visited",
    "dark",
    "{colors-primary-sa-flag-200}",
    "Sa-flag-800 on dark card is 1.70:1.",
  ),
  ...linkFamilies(
    "danger",
    "",
    "dark",
    "{colors-red-400}",
    "Red-600 on dark card is 3.01:1. Red-400 gives 5.22:1.",
  ),
  ...linkFamilies(
    "danger",
    "-focused",
    "dark",
    "{colors-red-400}",
    "Matches the dark default danger link.",
  ),
  ...linkFamilies(
    "danger",
    "-hovered",
    "dark",
    "{colors-red-300}",
    "Red-700 on dark card is 2.21:1.",
  ),
  ...linkFamilies(
    "danger",
    "-pressed",
    "dark",
    "{colors-red-200}",
    "Red-900 on dark card is 1.48:1.",
  ),
  ...linkFamilies(
    "danger",
    "-visited",
    "dark",
    "{colors-red-300}",
    "Red-800 on dark card is 1.68:1.",
  ),
  ...linkFamilies(
    "neutral",
    "-pressed",
    "dark",
    "{colors-neutral-400}",
    "Neutral-500 on dark card is 3.04:1. Neutral-400 gives 5.78:1.",
  ),
  ...COMPONENT_OVERRIDES,
];

/** Tokens DGA UI adds that do not exist in Figma. */
export type Addition = {
  name: string;
  light: string;
  dark: string;
  reason: string;
  /** Defaults to "Contrast". Tokens taken from the site CSS use "Tokens". */
  area?: DeviationArea;
  /** "Added from site CSS" for tokens taken from design.dga.gov.sa. */
  original?: string;
  component?: string;
};

export const ADDITIONS: Addition[] = [
  {
    name: "text-on-gold",
    light: "{colors-base-black}",
    dark: "{colors-base-black}",
    reason:
      "White on the gold fill (background-secondary, gold-600) is 2.30:1. Text on gold uses black (7.85:1), which keeps the brand gold fill.",
  },
  ...COMPONENT_ADDITIONS,
];

// ---------------------------------------------------------------------------
// Responsive modes and breakpoints.
// ---------------------------------------------------------------------------

/** Tailwind breakpoints in rem (1rem = 16px). Figma has modes, not pixel widths. */
export const BREAKPOINTS = {
  sm: "40rem",
  md: "48rem",
  lg: "64rem",
  xl: "80rem",
  "2xl": "96rem",
} as const;

/** Figma mode → min-width where it starts (mobile-first). */
export const MODE_MIN_WIDTH = {
  mobile: null,
  tablet: BREAKPOINTS.md,
  desktop: BREAKPOINTS.lg,
} as const;

/**
 * Body text keeps its desktop size on every viewport. Figma's Mobile mode shrinks
 * text-md to 12px and text-xs to 8px, and makes text-lg smaller than text-md.
 */
export const FIXED_TEXT_TOKENS = /^(typo-size|line-heights|paragraph-spacing)-text-/;

// ---------------------------------------------------------------------------
// Everything else that is not a token value change.
// ---------------------------------------------------------------------------

export const OTHER_DEVIATIONS: Deviation[] = [
  {
    area: "Naming",
    item: 'Figma group "Font Wieght"',
    original: "Font Wieght/font-weight-*",
    ours: "Font Weight (CSS names were already --font-weight-*)",
    reason: "Typo: Wieght → Weight. Only the Figma group name was wrong.",
  },
  {
    area: "Breakpoints",
    item: "sm / md / lg / xl / 2xl",
    original: "Not defined. Figma has Desktop, Tablet and Mobile modes with no pixel widths.",
    ours: "sm 640px (40rem), md 768px (48rem), lg 1024px (64rem), xl 1280px (80rem), 2xl 1536px (96rem)",
    reason:
      "These are the widths the design.dga.gov.sa CSS uses and also Tailwind's defaults. Figma's tablet frame is 704 + 2×32 = 768px wide, which matches md.",
  },
  {
    area: "Breakpoints",
    item: "Responsive token modes",
    original:
      "tokens.css (extraction guess): Desktop default, Tablet at max-width 1024px, Mobile at max-width 640px",
    ours: "Mobile-first: Mobile is the base, Tablet from 768px (md), Desktop from 1024px (lg)",
    reason:
      "Mobile-first matches Tailwind's min-width breakpoints, and 768px is where Figma's tablet grid starts.",
  },
  {
    area: "Typography",
    item: "--typo-size-text-*, --line-heights-text-*, --paragraph-spacing-text-*",
    original: "Mobile mode: text-md 12px, text-sm 10px, text-xs 8px; Tablet: text-md 14px",
    ours: "Body text sizes stay at their desktop values on every viewport. Display sizes still follow the Figma modes.",
    reason:
      "8–12px body text is hard to read on phones, iOS zooms into inputs under 16px, and the mobile mode made text-lg (14px) smaller than text-md.",
  },
  {
    area: "Tokens",
    item: "Site CSS vs Figma (39 material conflicts, 87 rounding-only, shadow-sm)",
    original: "design.dga.gov.sa compiled CSS values",
    ours: "Figma values everywhere",
    reason: "Figma is the source of truth. The full list is in tokens/TOKEN_CONFLICTS.md.",
  },
  {
    area: "Tokens",
    item: "--radius-xxs, --radius-2xl, --radius-3xl, --radius-4xl",
    original: "Legacy site-CSS radius set (2, 16, 20, 24px)",
    ours: "Dropped. rounded-2xl, rounded-3xl and rounded-4xl clamp to radius-xl (24px) so shadcn class names still work.",
    reason:
      "Not in Figma, and it clashes with the Figma scale (site radius-2xl is 16px, the same as Figma radius-lg).",
  },
  {
    area: "Tokens",
    item: "--shadow-* (css-only copies)",
    original: "Site CSS shadow values",
    ours: "Figma effect styles (Shadows/shadow-xs … shadow-3xl)",
    reason: "Figma is the source of truth. Only shadow-sm differed (5% vs 6%/10% opacity).",
  },
  {
    area: "Theming",
    item: "Dark mode selector",
    original: '[data-theme="dark"]',
    ours: '[data-theme="dark"] and .dark (both work, also on any subtree)',
    reason:
      "shadcn and next-themes use the .dark class. All semantic tokens are re-declared in the dark scope so nested dark sections resolve correctly.",
  },
  {
    area: "Tailwind",
    item: "shadcn --radius scale",
    original: "shadcn derives radius-sm…4xl from --radius with calc()",
    ours: "Fixed DGA radii: none 0, xs 2, sm 4, md 8, lg 16, xl 24, full 9999px; --radius = radius-sm (4px)",
    reason: "DGA defines exact radii. Buttons and inputs use radius-sm (4px).",
  },
  {
    area: "Tailwind",
    item: "Spacing scale",
    original: "--spacing-N in px (spacing-N = N × 4px)",
    ours: "Tailwind's --spacing: 0.25rem, so p-4 = 16px and p-80 = 320px, matching DGA one-to-one",
    reason:
      "rem keeps spacing in step with the user's root font size. The raw --spacing-* variables keep their px values.",
  },
  {
    area: "Contrast",
    item: "Component-level pairs (buttons, chips, fields, tables…)",
    original: "Not audited yet",
    ours: "Audited per component as each one lands (Phase 2+)",
    reason:
      "Phase 1 audits foundation tokens only: text, links and icons on surfaces, and on-colour text on fills.",
    status: "pending",
  },
  {
    area: "Contrast",
    item: "--background-black in dark mode",
    original: "Flips to white in dark mode",
    ours: "Unchanged",
    reason:
      "It is an inverse surface (white in dark mode), so text on it must use the inverse colour, not text-oncolor-primary. Primary-neutral buttons use button-background-black-*, which stays dark.",
  },
  {
    area: "Contrast",
    item: "--text-oncolor-secondary, --text-oncolor-tertiary",
    original: "No usage rule (80% and 70% white)",
    ours: "Use only on deep fills: nav header, pressed/selected primary, black. On mid-tone fills use --text-oncolor-primary.",
    reason:
      "White itself is only 4.57–4.83:1 on the 600-level fills, so no lower opacity can pass there. On deep fills 80% and 70% white pass AA.",
  },
  ...COMPONENT_DEVIATIONS,
];
