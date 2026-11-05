// Dark theme, rebuilt from DGA's Figma Dark mode.
//
// Figma's Dark mode is incomplete and inconsistent: the "white" surface is darker than the
// page, cards are two steps lighter than the page, a few tokens are the same in both modes
// (light tints on dark backgrounds), a few are hardcoded hex, and the neutral ramp is a cool
// blue-grey that clashes with the green brand. This module rebuilds the dark values with one
// set of rules. The generator applies it after the contrast fixes, and every token it
// changes is logged on the Deviations page (area "Dark theme").
//
//   Neutrals   One tinted ramp (`colors-neutral-dark-*`, hue 172, chroma 0.011–0.016) that
//              takes the place of the cool grey in dark mode.
//   Roles      bg 950, surface 900, raised 850, border 800, border-strong 700,
//              text-muted 400, text-secondary 300, text 50.
//   Colours    Text and icons use step 300 of the colour's own ramp, strong borders 500, soft
//              borders 700–800. Every soft background (badge, tag, alert, featured icon) is
//              the hue's 500 step as a tint with the same OKLab lightness, so all hues read as
//              one family. Solid button and chip fills keep the light value.
//   Elevation  No shadows in dark mode. Borders and tints carry elevation (see emit.ts).

import { oklchHex, oklchHue } from "./color";
import type { Deviation } from "./fixes";
import type { Primitive, ThemeToken } from "./source";

/** OKLCH hue 172 (between the DGA green and a neutral cool grey). */
export const DARK_NEUTRALS: Record<string, string> = {
  "25": "#f8fbfa",
  "50": "#f0f5f3",
  "100": "#e4ebe9",
  "200": "#d0d8d5",
  "300": "#b6c0bd",
  "400": "#939e9a",
  "500": "#6c7873",
  "600": "#4a5651",
  "700": "#37413d",
  "800": "#242e2a",
  "850": "#1b2421",
  "900": "#141b19",
  "950": "#0d1311",
};

export const DARK_NEUTRAL_PREFIX = "colors-neutral-dark-";

const N = (step: number | string) => `{${DARK_NEUTRAL_PREFIX}${step}}`;

const STATUS = {
  success: "green",
  info: "blue",
  warning: "yellow",
  error: "red",
} as const;
type Status = keyof typeof STATUS;
const statuses = Object.keys(STATUS) as Status[];
const ramp = (hue: string, step: number) => `{colors-${hue}-${step}}`;
const sa = (step: number) => `{colors-primary-sa-flag-${step}}`;

type Rule = { value: string; reason: string };

const REASON = {
  surface:
    "Figma Dark has the white surface darker than the page and the card two steps lighter. Rebuilt as bg 950, surface 900, raised 850, so each layer is lighter than the one under it.",
  border: "Border roles on the tinted ramp: border 800, border-strong 700, subtle 850.",
  text: "Text roles on the tinted ramp: text 50, primary paragraph 200, secondary 300, muted 400.",
  tint: "Soft tint of the colour's own 500 step (400 for amber and purple) at the opacity that gives every hue the same OKLab lightness over the surface, instead of a solid saturated fill or a 950 step. Reads as the light-mode soft tint, never brown.",
  strong:
    "The strongest dark fill: the same tint at a higher opacity, never a solid saturated colour. White label on top.",
  softBorder: "Hue 700 (outlined) or 800 (soft and alert), subtle on the dark surface.",
  accent:
    "Step 300 of the colour's own ramp for text and icons on dark surfaces, 500 for strong borders (same hue as light).",
  bug: "Figma Dark keeps a light value (or hardcoded hex) on a dark surface here. Mapped to the tinted ramp.",
  neutral: "Same step on the tinted neutral ramp (green-tinted) instead of the cool-blue grey.",
  button:
    "On the 950 page the black button and the neutral fills lose their edge. Lifted one step and given a border (button-border-neutral).",
} as const;

/** Final dark value for tokens the rules decide on their own. Names are theme token names. */
export function darkRules(hex: (primitive: string) => string): Record<string, Rule> {
  const r: Record<string, Rule> = {};
  const set = (names: string[], value: string, reason: string) => {
    for (const name of names) r[name] = { value, reason };
  };
  /**
   * One rule for every hue: the hue of the colour's own base step at a fixed OKLCH lightness
   * and chroma (as much as sRGB allows, up to the cap), so all hues are equally strong and
   * none drifts to brown. Warning uses the amber 400 because yellow-500 is orange.
   */
  const tint = (primitive: string, level: { L: number; C: number }) =>
    oklchHex(level.L, level.C, oklchHue(hex(primitive)));
  const SUBTLE = { L: 0.24, C: 0.04 }; // surfaces: background-*-25, rings
  const SURFACE = { L: 0.27, C: 0.06 }; // large surfaces: alerts, background-*-50
  const SOFT = { L: 0.31, C: 0.085 }; // chips: badges, tags, featured icon (light appearance)
  const STRONG = { L: 0.4, C: 0.11 }; // "hard" and "inverted": the strongest dark fill

  // Surfaces ---------------------------------------------------------------
  set(["background-body", "background-neutral-50"], N(950), REASON.surface);
  set(["background-white", "background-card", "background-neutral-25"], N(900), REASON.surface);
  set(["background-menu", "background-notification-white"], N(850), REASON.surface);
  set(["background-neutral-100", "background-disabled"], N(850), REASON.surface);
  set(["background-neutral-200", "background-inverse-disabled"], N(800), REASON.surface);
  set(["background-neutral-300"], N(700), REASON.surface);
  set(["background-neutral-400"], N(500), REASON.surface);
  set(["icon-neutral-ring", "control-ripple-effect"], N(850), REASON.surface);

  // Text ---------------------------------------------------------------------
  set(["text-default", "text-display", "icon-default"], N(50), REASON.text);
  set(["text-primary-paragraph", "unselected-tab-icon", "table-text-head"], N(200), REASON.text);
  set(["text-secondary-paragraph", "icon-default-500"], N(300), REASON.text);
  set(["field-text-placeholder", "field-text-helper"], N(400), REASON.text);
  set(
    ["field-text-label", "field-text-filled", "field-text-readonly", "field-text-hovered"],
    N(50),
    REASON.text,
  );
  set(["field-text-focused", "field-text-pressed"], N(200), REASON.text);
  set(["table-text-body", "stepper-text-primary"], N(50), REASON.text);
  set(["stepper-text-secondary"], N(200), REASON.text);
  set(["stepper-text-tertiary"], N(300), REASON.text);
  set(["text-form-title"], "{text-default}", REASON.text);
  set(["text-form-paragraph"], "{text-secondary-paragraph}", REASON.text);

  // Borders ------------------------------------------------------------------
  set(["border-neutral-tertiary"], N(850), REASON.border);
  set(
    ["border-neutral-secondary", "border-background-white", "table-cell-border"],
    N(800),
    REASON.border,
  );
  set(
    [
      "border-neutral-primary",
      "border-background-neutral",
      "border-disabled",
      "global-border-disabled",
    ],
    N(700),
    REASON.border,
  );
  set(
    ["control-border", "field-border-default"],
    N(500),
    "Input boundaries need 3:1 on the surface (WCAG 1.4.11). Step 500 on the tinted ramp.",
  );
  set(["border-white"], N(950), "Figma Dark uses pure black. The tinted 950.");

  // Brand and status ---------------------------------------------------------
  set(["text-primary", "icon-primary", "text-primary-light"], sa(300), REASON.accent);
  set(["border-primary"], sa(400), REASON.accent);
  set(["border-primary-light"], sa(800), REASON.accent);
  set(["text-secondary", "icon-secondary"], "{colors-secondary-gold-400}", REASON.accent);
  set(["text-tertiary", "icon-tertiary"], "{colors-tertiary-lavender-300}", REASON.accent);
  set(["border-tertiary"], "{colors-tertiary-lavender-400}", REASON.accent);
  set(["border-secondary"], "{colors-secondary-gold-500}", REASON.accent);

  for (const s of statuses) {
    const h = STATUS[s];
    set([`text-${s}`, `icon-${s}`, `tag-text-${s}`, `tag-icon-${s}`], ramp(h, 300), REASON.accent);
    set([`border-${s}`], ramp(h, 500), REASON.accent);
    set([`tag-border-${s}`], ramp(h, 700), REASON.softBorder);
    set([`border-${s}-light`, `tag-border-${s}-light`], ramp(h, 800), REASON.softBorder);
  }
  // Soft tint per hue. In this ramp yellow-500 is orange, so warning uses the amber 400.
  const BASE: Record<string, string> = {
    success: "colors-green-500",
    info: "colors-blue-500",
    warning: "colors-yellow-400",
    error: "colors-red-500",
    primary: "colors-primary-sa-flag-500",
    orange: "colors-orange-500",
    purple: "colors-tertiary-lavender-400",
    gold: "colors-secondary-gold-400",
  };
  for (const [name, base] of Object.entries(BASE)) {
    if (["success", "info", "warning", "error", "primary"].includes(name)) {
      set([`alpha-${name}-10`], tint(base, SUBTLE), REASON.tint);
      set([`alpha-${name}-20`], tint(base, SURFACE), REASON.tint);
    }
  }
  set(
    [
      "background-primary-50",
      "background-sa-flag-50",
      "table-background-row-select",
      "table-background-row-selected-hovered",
    ],
    "{alpha-primary-20}",
    REASON.tint,
  );
  set(["background-primary-25", "background-sa-flag-25"], "{alpha-primary-10}", REASON.tint);
  set(["background-primary-200"], sa(900), REASON.tint);
  set(["background-secondary-25"], tint(BASE.gold as string, SUBTLE), REASON.tint);
  set(["background-secondary-50"], tint(BASE.gold as string, SURFACE), REASON.tint);
  set(["background-tertiary-25"], tint(BASE.purple as string, SUBTLE), REASON.tint);
  set(["background-tertiary-50"], tint(BASE.purple as string, SURFACE), REASON.tint);
  for (const s of statuses) {
    set([`icon-${s}-ring`], `{alpha-${s}-10}`, REASON.tint);
    set([`tag-background-${s}-light`], tint(BASE[s] as string, SOFT), REASON.tint);
    set(
      [`tag-background-${s}`, `featured-icon-${s}-background`],
      tint(BASE[s] as string, STRONG),
      REASON.strong,
    );
    set([`featured-icon-${s}-background-light`], tint(BASE[s] as string, SOFT), REASON.tint);
    set([`featured-icon-${s}-border`], ramp(STATUS[s], 800), REASON.softBorder);
    set([`featured-icon-${s}-icon`], ramp(STATUS[s], 300), REASON.accent);
  }
  set(["featured-icon-brand-background-light"], tint(BASE.primary as string, SOFT), REASON.tint);
  set(["featured-icon-brand-background"], tint(BASE.primary as string, STRONG), REASON.strong);
  set(["featured-icon-brand-border"], sa(800), REASON.softBorder);
  set(["featured-icon-brand-icon"], sa(300), REASON.accent);
  // Badges: success is the brand green, warning the amber, plus orange and purple.
  const badge: [string, string, (step: number) => string][] = [
    ["success", "primary", sa],
    ["error", "error", (n) => ramp("red", n)],
    ["warning", "warning", (n) => ramp("yellow", n)],
    ["info", "info", (n) => ramp("blue", n)],
    ["purple", "purple", (n) => `{colors-tertiary-lavender-${n}}`],
    ["orange", "orange", (n) => `{colors-orange-${n}}`],
  ];
  for (const [name, base, stepOf] of badge) {
    set([`badge-${name}-background`], tint(BASE[base] as string, SOFT), REASON.tint);
    set([`badge-${name}-text`], stepOf(300), REASON.accent);
    set([`badge-${name}-border`], stepOf(800), REASON.softBorder);
    set([`badge-${name}-border-outlined`], stepOf(700), REASON.softBorder);
  }

  // Figma Dark bugs: light values or hardcoded hex on dark surfaces ----------
  set(
    [
      "table-background-row",
      "table-background-row-alt",
      "stepper-button-background",
      "datecell-background-disabled",
    ],
    N(900),
    REASON.bug,
  );
  set(
    [
      "table-background-header",
      "table-background-row-hovered",
      "table-background-hover-selected",
      "field-background-lighter",
    ],
    N(850),
    REASON.bug,
  );
  set(["field-background-default"], "{background-card}", REASON.bug);
  set(["field-background-darker"], N(950), REASON.bug);
  set(["field-background-pressed"], N(800), REASON.bug);
  set(["table-boarder-row-selected-hovered"], N(800), REASON.bug);
  set(["tooltip-background-light"], N(850), REASON.surface);
  set(
    ["control-neutral-checked", "control-neutral-focused"],
    N(300),
    "Checked neutral controls need 3:1 on the surface. Step 600 is 2.1:1.",
  );
  set(
    ["control-neutral-hovered"],
    N(200),
    "Hover is lighter than checked, as in the other states.",
  );
  set(["control-neutral-pressed"], N(400), "Pressed is dimmer than checked.");

  // Buttons -------------------------------------------------------------------
  set(
    ["button-background-black-default", "button-background-black-focused"],
    N(850),
    REASON.button,
  );
  set(
    ["button-background-black-hovered", "button-background-black-selected"],
    N(700),
    REASON.button,
  );
  set(["button-background-black-pressed"], N(600), REASON.button);
  set(
    ["button-background-oncolor-default", "chip-background-on-color-default"],
    N(950),
    "Figma Dark uses pure black. The tinted 950.",
  );

  return r;
}

export type DarkChange = Deviation;

export function describe(value: string) {
  const match = /^\{([^}]+)\}$/.exec(value);
  return match ? `--${match[1]}` : value;
}

/**
 * Applies the dark rules to the theme tokens (mutates `themes`) and returns the Deviations
 * entries. `figmaDark` has the original Figma values, so entries show what changed.
 */
export function applyDark(
  themes: Map<string, ThemeToken>,
  primitives: Map<string, Primitive>,
  figmaDark: Map<string, string>,
): DarkChange[] {
  for (const [step, value] of Object.entries(DARK_NEUTRALS)) {
    const name = `${DARK_NEUTRAL_PREFIX}${step}`;
    primitives.set(name, { name, value, source: "platform-code" });
  }
  const hex = (name: string) => {
    let value = primitives.get(name)?.value;
    for (let i = 0; i < 5 && value?.startsWith("{"); i++) {
      value = primitives.get(value.slice(1, -1))?.value;
    }
    if (!value?.startsWith("#")) throw new Error(`No hex for primitive ${name}`);
    return value;
  };
  const rules = darkRules(hex);
  for (const name of Object.keys(rules)) {
    if (!themes.has(name)) throw new Error(`Dark rule for unknown token: ${name}`);
  }

  const changes: DarkChange[] = [];
  for (const [name, token] of themes) {
    const rule = rules[name];
    let next = rule?.value ?? token.dark;
    let reason = rule?.reason ?? REASON.neutral;
    // Everything else on the cool-blue grey moves to the same step of the tinted ramp.
    if (!rule) next = next.replace(/\{colors-neutral-(\d+)\}/g, (_, step) => N(step));
    // Hardcoded Figma greys.
    if (!rule && next === "#4d5761") {
      next = N(600);
      reason = REASON.bug;
    }
    if (!rule && next === "#ffffff" && token.light === "#ffffff") {
      next = N(900);
      reason = REASON.bug;
    }
    if (next === token.dark) continue;
    const original = figmaDark.get(name) ?? token.dark;
    token.dark = next;
    if (original === next) continue;
    changes.push({
      area: "Dark theme",
      item: `--${name} (dark)`,
      original: describe(original),
      ours: describe(next),
      reason,
      status: "fixed",
    });
  }
  return changes;
}
