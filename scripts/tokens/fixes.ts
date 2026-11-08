import { COMPONENT_ADDITIONS, COMPONENT_DEVIATIONS, COMPONENT_OVERRIDES } from "./component-fixes";
import { EXTENSION_ADDITIONS, EXTENSION_DEVIATIONS } from "./extensions";

// Every place where Platform Code intentionally differs from the DGA Figma source.
// Each entry is applied by the generator AND listed on the docs "Deviations from DGA" page,
// so the two can never drift apart.

export type DeviationArea =
  | "Naming"
  | "Contrast"
  | "Breakpoints"
  | "Typography"
  | "Tokens"
  | "Theming"
  | "Dark theme"
  | "Tailwind"
  | "Components"
  | "Extensions";

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
  {
    from: "upcomming",
    to: "upcoming",
    tokens:
      "--stepper-button-upcomming, --stepper-button-upcomming-hovered, --stepper-line-upcomming, --stepper-line-upcomming-hovered",
    reason: 'Typo: upcomming → upcoming (also in the Figma state name "Upcomming").',
  },
  {
    from: "boarder",
    to: "border",
    tokens: "--table-boarder-row-selected-hovered",
    reason: "Typo: boarder → border.",
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

/** Tokens Platform Code adds that do not exist in Figma. */
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
  ...EXTENSION_ADDITIONS,
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

// ---------------------------------------------------------------------------
// Phase 5 (0.5.0): Breadcrumb, Pagination, Table of Content, Card, List, Table, Data Table,
// Rating, Progress and Stepper. Bugs and gaps found reading the Figma specs and the
// design.dga.gov.sa CSS against the WCAG audit. Token overrides made for these components
// (the Table row fills, the dark Stepper and Progress fills, the renamed tokens) are listed
// automatically by the generator under Contrast, Dark theme and Naming.
// ---------------------------------------------------------------------------

export const NAVIGATION_DEVIATIONS: Deviation[] = [
  {
    area: "Naming",
    item: "Figma variant names: Meduim, Sahdow, Upcomming, Lable",
    original:
      'Pagination Size "Meduim"; Card Effect "With Sahdow"; Progress Indicator State "Upcomming"; Structured List "Lable AR".',
    ours: "md, shadow, upcoming, label. Sizes are sm, md and lg like every other component.",
    reason: "Typos in the Figma variant names. Prop values in code are spelled correctly.",
    status: "fixed",
  },
  {
    area: "Components",
    item: "Stepper: the upcoming step was 1.48:1",
    original:
      "Upcoming: ring, number and title in stepper-button-upcomming (gray-300, #d2d6db), and the Vertical upcoming title in stepper-line-upcomming. 1.48:1 on white.",
    ours: "Ring icon-default-500 (4.78:1), number text-primary-paragraph, title stepper-text-tertiary. The connector line keeps the DGA gray.",
    reason:
      "Text needs 4.5:1 and a state indicator 3:1 (WCAG 1.4.3, 1.4.11). The DGA gray is fine for the decorative line, not for the number, title or ring.",
    status: "fixed",
    component: "stepper",
  },
  {
    area: "Components",
    item: "Stepper: error state, radial form and CSS",
    original:
      "Progress Indicator has Current, Completed and Upcomming; the Radial Stepper is a separate component. The CSS hard-codes --colors-brand-600 and a 62px vertical circle for the contribution stepper.",
    ours: "Stepper has completed, current, upcoming and error (a red circle with an alert icon and the title in text-error). Below the sm width a horizontal stepper folds into the Radial Stepper form: a ring with the step count, the step's name and the next one. The brand tokens are used, not the hex.",
    reason:
      "A process with a problem step needs a state (WCAG 3.3.1), and a nine-step horizontal stepper does not fit a phone. Each step also says its state in words for screen readers, not just by colour.",
    status: "fixed",
    component: "stepper",
  },
  {
    area: "Components",
    item: "Progress: bar height, status icon and indeterminate",
    original:
      "Progress Bar frames are 320x50, 56 and 68 for Small, Medium and Large; the bar's own height, the track colour and an indeterminate state are not given. Success and Error variants show an on-colour icon with no state in the CSS.",
    ours: "The bar is 8, 12 and 16px high on a border-neutral-secondary track. Success and Error add a round on-colour icon beside the helper text. value={null} is indeterminate (a pulsing bar, still when motion is reduced; a turning arc on the circle).",
    reason:
      "The frame heights fit these bars with the label and helper text. The fill colours come from the icon-* tokens, which flip in dark mode, because the DGA background-primary, -success and -error fills are 1.9 to 2.2:1 on the dark track (needs 3:1).",
    status: "fixed",
    component: "progress",
  },
  {
    area: "Components",
    item: "Rating: gold fill, hard-coded colour and interaction",
    original:
      ".rating colour #faaf00 (hard-coded); Figma background-secondary (#dba102) is 2.30:1 on white. DGA also defines half stars and pressed and selected states.",
    ours: "The fill is background-secondary (or background-primary with brand); every star is outlined in icon-warning (5.43:1) or icon-primary, and an empty star in icon-default-500. Half stars are built (allowHalf): two radios per star, arrow keys move by half, the start half fills first in LTR and RTL. Pressed (scale 90%) and selected (2px outline) are our reading of the DGA states. Interactive ratings are a radio group with hover preview and a focus ring; read-only ones are an image with a text alternative and draw fractional values.",
    reason:
      "A graphical object that carries information needs 3:1 (WCAG 1.4.11): the outline gives the star its shape at 3:1 or more where the gold fill alone cannot. A rating also has to work by keyboard and be announced.",
    status: "fixed",
    component: "rating",
  },
  {
    area: "Components",
    item: "List: physical margins and hard-coded colours",
    original:
      ".list { margin-left: 24px }, .list--unordered>ul { margin-left: 18px } and list colours #1b8354, #0d121c and #fff written as hex, with --Link-2-link-default_on-color as the on-colour.",
    ours: "Logical margins (ms-6), so a nested list indents from the start side in Arabic. Colours are text-primary, text-default and text-oncolor-primary with icon-primary, icon-default and icon-oncolor. Ordered markers are 1- then a-, with Arabic letters in Arabic.",
    reason:
      "A margin-left puts the indent on the wrong side in RTL, and hex values do not follow dark mode.",
    status: "fixed",
    component: "list",
  },
  {
    area: "Components",
    item: "Card: border fallback, disabled overlay and link pattern",
    original:
      ".card { border: 2px solid var(--Colors-Base-black, #fff) } (a white fallback for a black token); .card.disabled fades a gray overlay at .3 opacity over a transparent card; max-width 350px.",
    ours: "A transparent 1px border (a neutral stroke with the stroke effect) and a 2px outline for keyboard focus, so focus does not move the layout. Disabled uses the Figma tokens: background-disabled, text-default-disabled and border-disabled. No fixed width. The clickable card is a real link in the title whose click area is stretched over the card, with the actions raised above it.",
    reason:
      "The Figma tokens are the source of truth where the CSS disagrees. A card that is only an onclick div has no link semantics (WCAG 4.1.2); the stretched link keeps one link named by the title and a focus ring around the whole card.",
    status: "fixed",
    component: "card",
  },
  {
    area: "Components",
    item: "Card: selected state",
    original:
      "Selectable Selected = True differs from False only by the checkbox. Figma gives the focused fill as neutral-50 with a black border.",
    ours: "A selected card also gets a 1px border-primary (4.75:1) so the selection does not depend on a 20px checkbox alone.",
    reason: "WCAG 1.4.11: the selected state is a state indicator and needs a clear cue.",
    status: "fixed",
    component: "card",
  },
  {
    area: "Components",
    item: "Pagination: no states, selected style or small-screen form",
    original:
      "Only sizes (24, 32, 40px) and a gap of 8px; no hover, pressed, selected or disabled styles, no ellipsis or previous and next, and no behaviour on small screens.",
    ours: "Items are transparent with the button neutral hover and pressed fills; the current page is the primary fill with an on-colour label; previous and next are chevrons that mirror in RTL and disable at the ends; skipped pages are an ellipsis; below the sm width the numbers fold into a compact 'page of count'.",
    reason:
      "A pagination without a current-page style cannot be used. The states follow the Button, which DGA does define.",
    status: "fixed",
    component: "pagination",
  },
  {
    area: "Components",
    item: "Breadcrumb: separator, current page and collapse",
    original:
      "Only link-neutral text (Text sm), an icon-default-400 icon (2.5:1 on white), and 2, 3, 4, 5 and more-than-5 levels. No current-page style, no collapse behaviour. DGA's compact form is a back link to the previous level.",
    ours: "The chevron separator stays icon-default-400: it is decorative and hidden from screen readers. The current page is Medium text-default with aria-current. Above five levels, and below the sm width, the levels between the first and the last two fold behind an ellipsis button that shows the full path (optional). The compact form (compact) is a back link to the previous level, with a back arrow that mirrors in RTL.",
    reason:
      "A chain of five or more levels overflows a phone, and the Figma '>5' variant implies a fold. The ellipsis is a real button, reachable by keyboard.",
    status: "fixed",
    component: "breadcrumb",
  },
  {
    area: "Components",
    item: "Table of Content: width and height rule",
    original:
      ".table-of-content is 228px wide, and a second rule sets width: 100% and height: 100vh, which overrides it.",
    ours: "228px at most (max-w-57) and as tall as its items. The active section is Semibold text-default and aria-current='location'; Up, Down, Home and End move between links.",
    reason:
      "A 100vh column cannot sit beside content that scrolls, and Figma shows the 228px width.",
    status: "fixed",
    component: "table-of-contents",
  },
  {
    area: "Components",
    item: "Table: compact sizes, sort and filter buttons",
    original:
      "Compact is a boolean with no heights; the Sort and Filter header buttons are 20px with five states and no accessible name or aria-sort.",
    ours: "Rows 64px (48px compact), header 48px (40px compact). TableSortButton and TableFilterButton are real buttons with an accessible name; the heading carries aria-sort. The table scrolls sideways inside a region that takes keyboard focus.",
    reason:
      "A sortable column must say how it is sorted (WCAG 4.1.2), and scrolling content must be reachable without a mouse (WCAG 2.1.1).",
    status: "fixed",
    component: "table",
  },
  {
    area: "Components",
    item: "Structured List: selectable rows",
    original:
      "Selectable rows have Default, Hovered, Focused and Disabled states but no control or semantics; the focus border is table-cell-border-inverse.",
    ours: "A selectable list is a radio group: each row has a radio button (named by the row's label), the arrow keys move between rows, and the chosen row uses table-background-row-select. The focus ring is table-cell-border-inverse, inside the row.",
    reason:
      "A choice among rows needs a form control behind it for keyboard and screen reader users.",
    status: "fixed",
    component: "list",
  },
  {
    area: "Components",
    item: "Data Table: new, no DGA source",
    original: "DGA has a Table and a Pagination and no data table.",
    ours: "DataTable composes the DGA Table and Pagination with TanStack Table: sorting, a global filter, row selection, pagination, loading rows, an empty state and sideways scrolling. It uses only the Table tokens.",
    reason:
      "Listed here so nobody looks for it in Figma. It adds no colour: every token is one the Table already uses.",
    status: "fixed",
    component: "data-table",
  },
];

// ---------------------------------------------------------------------------
// Phase 6 (0.6.0): Header, Footer, Second Nav, Date Picker, Carousel and Filtration. Bugs and
// gaps found reading the Figma specs and the design.dga.gov.sa CSS against the WCAG audit. Token
// overrides made for these components (today's date in the Date Picker, the dark range band and
// today) are listed automatically by the generator under Contrast and Dark theme.
// ---------------------------------------------------------------------------

export const COMPOSITE_DEVIATIONS: Deviation[] = [
  {
    area: "Naming",
    item: "Figma variant names: Mideum, Nex/Prev, 2ndry Date, quarterary",
    original:
      'Carousel Controls Size "Mideum"; Date cell property "Nex/Prev" and "2ndry Date"; the token text-quarterary.',
    ours: "md, outside (a day in the next or previous month), secondaryDate. text-quarterary is not used.",
    reason: "Typos and abbreviations in Figma names. Prop values in code are spelled out.",
    status: "fixed",
  },
  {
    area: "Components",
    item: "Header: skip link, current page and keyboard",
    original:
      "Nav Header, Header Menu Item and Header Action are drawn as states only. There is no skip link, no current-page markup, no keyboard model for the sub-menus, and the CSS (.header-nav) sets only the height and padding.",
    ours: 'A skip link is the first tab stop. The page the person is on is aria-current="page", and a parent whose child is current takes the selected fill. Left and Right (swapped in RTL), Home and End move between items; the sub-menu is the DGA Menu (Enter, Space or Down opens it, Escape closes it and returns focus).',
    reason:
      "Bypass blocks (WCAG 2.4.1), current-page information (1.3.1, 2.4.8) and keyboard operation (2.1.1) are not met by a states-only drawing.",
    status: "fixed",
    component: "header",
  },
  {
    area: "Breakpoints",
    item: "Header: breakpoint for the Drawer",
    original: "Nav Header has three variants: under 600, 600 to 960 and over 960.",
    ours: "The navigation sits in the bar from the lg width (1024px) and moves into the Drawer below it. The sm, md and lg widths are the same as every other Platform Code component.",
    reason:
      "One set of breakpoints for all components. At 960px the main navigation with sub-menus and the actions do not fit one row of the 1280px bar without wrapping.",
    status: "fixed",
    component: "header",
  },
  {
    area: "Components",
    item: "Header: official site strip, Header Menu and Nav Drawer composed",
    original:
      "The official site strip is the separate Digital Stamp component, and the Second Nav Header is the strip above the primary navigation. Header Menu (a chevron button) and the Nav Drawer are separate components.",
    ours: "Header takes a `stamp` slot for the Digital Stamp (0.7.0) and a `top` slot for a Second Nav, and renders no strip of its own. The chevron is part of the menu item and the sub-menu is the DGA Menu. On narrow screens the navigation is the DGA Drawer with expandable parents; Level 2 links are indented.",
    reason:
      "Reusing Menu and Drawer keeps the focus, dismissal and mirroring behaviour in one place instead of copying it into the header.",
    status: "fixed",
    component: "header",
  },
  {
    area: "Components",
    item: "Header: selected block, indicator bar and focus",
    original:
      "Selected Header Menu Item and Header Action are a primary fill. Focused is a 2px border-black stroke; Disabled has no bar.",
    ours: "Selected is a full-height primary block with DGA's bottom bar: 6px high, inset 8px from each side, fully rounded, background-primary-400. An unselected item shows a bar on hover (background-neutral-400) and when pressed or open (background-neutral-800); focused shows only the outline, as in Figma. Selected and disabled drops the block, greys the label and shows a muted bar (background-neutral-100). Focus is a 2px outline inside the item (a stroke would shift the label) shown on keyboard focus only.",
    reason:
      "The bar shape and colours follow the DGA header as published (measured on a live DGA-based site, not in the Figma dump). background-primary-400 on the selected block is 2.10:1 (2.92:1 hovered), below the 3:1 for a state indicator, and it is not corrected: the bar never carries the selected state alone (the brand block fill and aria-current do), so the pair is not in the Contrast audit. Disabled items are exempt from contrast.",
    status: "fixed",
    component: "header",
  },
  {
    area: "Components",
    item: "Header: phone layout and actions",
    original:
      "The mobile Header shows the menu, the logo and an overflow control. Header Action is an icon and label in the bar.",
    ours: "Below lg: overflow (…) button (start), centred logo, menu button (end), mirrored in RTL, as in the Figma Nav Header frames. The overflow button opens a Menu of the actions; `language` and `user` move to the foot of the Nav Drawer. Action labels are always visible in the bar.",
    reason:
      "Actions do not fit a phone bar. The sides follow the Figma Nav Header frames; the content of the overflow menu is not drawn there (our choice).",
    status: "fixed",
    component: "header",
  },
  {
    area: "Components",
    item: "Nav Drawer: panel colours, badge, external link and divider",
    original:
      "Nav Drawer has Green, White and Gray backgrounds, an item Badge, an External Link icon, a Divider item type, on-colour item states and an optional scroll bar, border and overlay.",
    ours: "The Header's Drawer is the white panel (the Drawer component has white and gray tones). Item states, Level 1 and 2, Parent and Link with an expanded chevron, selected and disabled are built. Badge, external-link icon, divider items and the green on-colour panel are not.",
    reason:
      "The Header composes the shared Drawer instead of a second panel component. The missing parts are not needed to navigate and can be added to the Drawer later.",
    status: "fixed",
    component: "header",
  },
  {
    area: "Contrast",
    item: "Header, Nav Drawer: selected item text is a background token",
    original:
      "Nav Drawer Item Selected uses fg:background-primary (the brand fill) for the label on button-background-neutral-selected: 3.84:1.",
    ours: "The selected item label uses link-primary-pressed (brand 800), 4.5:1 or better, and the item is Semibold.",
    reason: "Text needs 4.5:1 (WCAG 1.4.3). A fill token is also the wrong token for text.",
    status: "fixed",
    component: "header",
  },
  {
    area: "Components",
    item: "Second Nav: contextual strip, links and scrolling",
    original:
      "Second Nav Header is a 40px strip with fixed Show Item 2, 3 and 4 and Show Action 2, 3 and 4 switches, a divider and Gray or Primary. It is described as navigation, but the items are text with an icon (a date, the weather).",
    ours: 'Items and actions are arrays. An entry is plain text, a link (`href`), or a button (`onClick`), has a ready-made `kind` (weather, date, time, location) with its icon, and can be `iconOnly`. `current` sets aria-current="page" for the optional links row, which is not a DGA example. The strip scrolls sideways on narrow screens instead of wrapping or clipping. Items are 24px high with a 16px gap between them (gap value not in Figma).',
    reason:
      "A fixed number of switches cannot hold real content, and a 40px strip that wraps would grow. Icon-only actions need an accessible name. Links need a current state (WCAG 2.4.8).",
    status: "fixed",
    component: "second-nav",
  },
  {
    area: "Components",
    item: "Footer: hard-coded colours, 72px heading and no mobile form",
    original:
      ".footer sets --colors-gray-neutral-100, --colors-brand-900 and hsla(var(--colors-alpha-white)/30%) directly, and .footer-title-description h3 is 72px / 90px with a 24px paragraph at every width. Figma has a <600 variant that only changes the weight to Semibold.",
    ours: "Semantic tokens (background-neutral-100, background-sa-flag, alpha-white-30), no 72px heading (the description is Text md, optional, and you place any hero text yourself). Below the sm width the link groups sit in two columns and the legal row is centred; folding them into the DGA Accordion is the optional `collapsible` prop. Platform logos sit on a white tile (12px padding, 4px radius, values not in Figma). The description, contact details and app badges are our additions, optional and off by default.",
    reason:
      "Hard-coded values skip the dark theme. A 72px heading overflows a 375px screen. Four link columns at 375px are unreadable, so they go to two.",
    status: "fixed",
    component: "footer",
  },
  {
    area: "Components",
    item: "Footer: link semantics and on-colour states",
    original:
      "The footer has no states for its links, social icons or accordion, and the green variant has no hover, pressed or focus colour.",
    ours: "Links underline on hover and press; social icons and accessibility tools are 40px bordered icon buttons (the border is 40% white on green, values not in Figma) with the neutral hover and pressed fills (the transparent on-colour fills on green); focus is a 2px outline (black on gray, white on green). External links get an icon and a screen-reader note.",
    reason:
      "Every interactive element needs a visible focus (WCAG 2.4.7) and a hover state to match the other links.",
    status: "fixed",
    component: "footer",
  },
  {
    area: "Components",
    item: "Date Picker: two sets of hover rules, opacity for disabled",
    original:
      "The CSS defines .date-cell:hover twice, first with gray-neutral-200 and then with datecell-today-background-hovered, and the today and chosen fills with both brand-600 and text-success. Disabled is opacity .5 on the class and .3 on the attribute.",
    ours: "One set: the datecell tokens from Figma for hover, pressed, chosen and range, text-default-disabled for a disabled day (a chosen disabled day keeps its fill). No opacity.",
    reason:
      "Opacity makes the contrast of a disabled or chosen day depend on what is behind it, and two conflicting rule sets give different colours depending on the order of the CSS.",
    status: "fixed",
    component: "date-picker",
  },
  {
    area: "Components",
    item: "Date Picker: RTL range band and fixed widths",
    original:
      "The range band is a 52x48 pseudo-element with a border-radius that [dir=rtl] rules swap by hand, and the inputs are 50px or 200px wide.",
    ours: "The band is the cell's own background, a hard-edged gradient that flips with the direction (to the right in LTR, to the left in RTL), and the cells shrink to fit seven columns in the viewport.",
    reason:
      "A fixed-width pseudo-element leaves gaps between cells when the cell size changes and needs a second rule per direction.",
    status: "fixed",
    component: "date-picker",
  },
  {
    area: "Components",
    item: "Date Picker: calendars, grid semantics and typing",
    original:
      "Figma draws a Gregorian calendar with a Secondary Date, a year dropdown and an Input field, and gives no behaviour. There is no Hijri calendar and no keyboard model.",
    ours: 'A switch between Gregorian and Hijri (Umm al-Qura, from Intl; years 1300 to 1600 AH). Dates are ISO strings. The month is a role=grid with column headers, aria-selected, aria-current="date" and a full date as the name of each day; one day is in the tab order, arrows, Page Up, Page Down, Home and End move, and Left and Right swap in RTL. Dates can be typed as YYYY-MM-DD (any digits) and are checked against min, max and disabled dates.',
    reason:
      "A date picker must be usable without a pointer (WCAG 2.1.1), and Saudi forms need both calendars.",
    status: "fixed",
    component: "date-picker",
  },
  {
    area: "Components",
    item: "Date Picker: year dropdown",
    original:
      "Figma's header has a Year Dropdown part (the year is chosen from a list) and gives no behaviour.",
    ours: 'The year in the header is a native select (yearDropdown, on by default) listing min to max, or a hundred years either side of today. It is named "Year", opens with the keyboard and a pointer, shows the year in the calendar\'s own digits and calendar, and keeps the month when the year changes (limited by min and max). Shift with Page Up and Page Down still changes the year.',
    reason:
      "A native select is keyboard accessible, mirrors in RTL, and gives the platform list on touch. The list is not DGA's drawn menu; the closed control matches the header text.",
    status: "fixed",
    component: "date-picker",
  },
  {
    area: "Components",
    item: "Date Picker: days in the next and previous month",
    original: "Date cell has a Nex/Prev switch and a Null state.",
    ours: "In one month the days of the neighbouring months are shown in text-secondary-paragraph and can be chosen. In the dual-month view they are left empty, so no date appears twice.",
    reason: "Two months side by side would otherwise show the same date in both grids.",
    status: "fixed",
    component: "date-picker",
  },
  {
    area: "Components",
    item: "Carousel: autoplay, pause and reduced motion",
    original:
      "Carousel has three styles (Arrows, Dots, Dots Only) and no behaviour. Moving content is not addressed.",
    ours: "Autoplay is off by default. When it is on, a pause button is always shown, it stops while the pointer or focus is inside, and it does not start when the person prefers reduced motion. The live region is off while it plays and polite when it does not.",
    reason:
      "Moving content that starts by itself must be pausable (WCAG 2.2.2), and a live region that fires on every slide would make a screen reader unusable.",
    status: "fixed",
    component: "carousel",
  },
  {
    area: "Components",
    item: "Carousel: dots are 8 to 16px and distinguished by colour only",
    original:
      "Carousel Controls are 16, 12 or 8px squares in a Selected or not state with no colour given.",
    ours: "The dot is drawn 8, 12 or 16px, inside a 24px button. The chosen dot is filled and the others are rings, so it does not rely on colour.",
    reason:
      "A target should be 24px (WCAG 2.5.8) and state should not be shown by colour alone (1.4.1).",
    status: "fixed",
    component: "carousel",
  },
  {
    area: "Components",
    item: "Carousel: physical Left and Right",
    original: "Carousel Arrows have Direction Left and Right and an RTL variant for each.",
    ours: "Previous and next. The icon mirrors, the first slide is on the right in RTL, the track moves the other way, the arrow keys swap and a swipe is read by the page direction.",
    reason:
      "One component for both directions instead of mirrored copies; the slide order follows reading order.",
    status: "fixed",
    component: "carousel",
  },
  {
    area: "Components",
    item: "Filtration: the panel and the mobile form are designed here",
    original:
      "Filtration is a 123x40 trigger with Open, Result and Show Results flags and Placement Center, Right and Left. The internal parts (_Filtration list, _Multi Select Checkbox Filter, _Text Range) are not drawn.",
    ours: "A panel of checkbox and radio groups (optional search and Show more), select, input, range, date, rating and custom groups beside the results from lg, applied filters as removable Tags with clear all, a result count, and below lg the same panel in the DGA Drawer from a button. placement=start or end always uses the button and opens the Drawer from that side (Figma's Left and Right, mirrored in RTL); placement=center opens a centred Dialog. The default stays the inline panel.",
    reason:
      "The spec has the button only. The panel is composed from the DGA Checkbox, Radio, Select, Input, Search Box, Date Picker, Rating, Tag, Drawer and Dialog so it needs no new colour. The Show more link uses the link colours.",
    status: "fixed",
    component: "filtration",
  },
];

export const OTHER_DEVIATIONS: Deviation[] = [
  {
    area: "Contrast",
    item: "shadcn --muted (background-neutral-100 → background-neutral-50)",
    original:
      "--muted: --background-neutral-100 with --muted-foreground: --text-secondary-paragraph",
    ours: "--muted: --background-neutral-50",
    reason:
      "text-secondary-paragraph (#6c737f) on neutral-100 is 4.34:1 in light mode, which fails AA for the muted text shadcn components put on muted fills. On neutral-50 it is 4.65:1.",
    status: "fixed",
  },
  {
    area: "Dark theme",
    item: "--shadow-* (dark)",
    original: "Figma effect styles, same in both modes",
    ours: "none (0 0 oklch(0 0 0 / 0))",
    reason:
      "Shadows are invisible on near-black surfaces and only add haze. In dark mode elevation is a lighter surface (raised 850) plus a border.",
  },
  {
    area: "Dark theme",
    item: "Neutral ramp (dark)",
    original: "Cool blue-grey ramp (colors-neutral-*), reused for dark",
    ours: "colors-neutral-dark-25 … 950: a green-tinted ramp (OKLCH hue 172, chroma 0.004–0.016)",
    reason:
      "Figma Dark reuses the light neutral ramp, a blue-grey that clashes with the green brand and makes dark mode look off-brand. The tinted ramp keeps the same lightness steps.",
  },
  {
    area: "Dark theme",
    item: "Solid button and status fills (dark)",
    original: "Same value as light mode",
    ours: "Unchanged for buttons and --background-*: primary 600, success 700, info 600, warning 700, error 600",
    reason:
      "The label on these fills is white in both modes, and a lighter step (400–500) drops white text below 4.5:1 (3.2–3.9:1). Kept on purpose. Badges, tags, status tags, alerts and featured icons do not use these: they get the soft tints logged under Dark theme.",
  },
  {
    area: "Naming",
    item: 'Figma group "Font Wieght"',
    original: "Font Wieght/font-weight-*",
    ours: "Font Weight (CSS names were already --font-weight-*)",
    reason: "Typo: Wieght → Weight. Only the Figma group name was wrong.",
  },
  {
    area: "Typography",
    item: "--font-weight-* and --primitive-font-weight-*",
    original: "The Figma variable holds the font style name: Regular, Medium, Semibold, Bold.",
    ours: "400, 500, 600, 700.",
    reason:
      "CSS needs a number or a keyword: font-weight: Semibold is invalid, so font-medium, font-semibold and font-bold all fell back to 400 and every label, heading and tab rendered regular. Found while building the Phase 4 components, and fixed for all of them.",
    status: "fixed",
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
    area: "Typography",
    item: '--typo-line-height-*, --typo-letter-spacing-* in Arabic (lang="ar", dir="rtl")',
    original:
      "Token line heights 1.4 to 1.6 and -2% letter spacing on display sizes, for every language",
    ours: "In Arabic: line height 1.8 for body text and 1.5 for headings, letter spacing 0 on every element.",
    reason:
      "The marks above and below Arabic letters need more room than the Latin line heights give, and negative tracking breaks the joins between letters. Latin text keeps the Figma values.",
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
    item: "Component-level pairs",
    original: "Not audited",
    ours: "Every state of every component, on each surface it can sit on, in light and dark mode (scripts/tokens/components.ts). Phase 2: Button, Spinner, Link, Badge, Tag, Avatar and Featured Icon.",
    reason:
      "Foundation pairs alone miss component states such as hovered labels and on-colour fills. Each component page lists its checks.",
    status: "fixed",
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
  ...NAVIGATION_DEVIATIONS,
  ...COMPOSITE_DEVIATIONS,
  ...EXTENSION_DEVIATIONS,
];
