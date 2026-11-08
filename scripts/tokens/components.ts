// Component-level contrast pairs. Each component lists every state it renders, using the
// same tokens as its cn-* classes in registry/styles/style-dga.css. The token build fails on
// any pair below WCAG 2.1 AA, and the docs page for each component renders its checks.
//
// Disabled states are exempt (WCAG 1.4.3 / 1.4.11), so they are not listed.

import { chromePairs } from "./chrome";
import { compositePairs } from "./composite";
import { extensionPairs } from "./extensions";
import { formPairs } from "./forms";
import { interactivePairs } from "./interactive";
import { navigationPairs } from "./navigation";
import type { Mode } from "./source";

export type ComponentPair = {
  component: string;
  /** Variant and state, for example "primary / hovered". */
  state: string;
  fg: string;
  bg: string;
  /** Opaque surface under a translucent `bg` (default: background-body). */
  on?: string;
  min: number;
  kind: "text" | "non-text";
  modes?: Mode[];
};

/** Page surfaces a component can sit on. */
export const SURFACES = ["background-white", "background-body", "background-card"];
/** Brand fills that on-colour variants sit on. */
export const ON_COLOR_SURFACES = ["background-primary", "background-nav-header"];

type State = "default" | "hovered" | "pressed" | "selected" | "focused";
const STATES: State[] = ["default", "hovered", "pressed", "selected", "focused"];

/** One button style: its fill (or none) and label colour for each state. */
type ButtonSpec = {
  style: string;
  onColor: boolean;
  bg: (s: State) => string | null;
  fg: (s: State) => string;
  icon: (s: State) => string;
  /** Focus indicator colour (2px outline, non-text 3:1 against the surface). */
  focus: string;
};

const t = (prefix: string) => (s: State) => `${prefix}-${s}`;
const fixed = (token: string) => () => token;
const unlessDefault = (prefix: string) => (s: State) =>
  s === "default" || s === "focused" ? null : `${prefix}-${s}`;

/** Figma has default, hovered and pressed on-colour danger labels; selected uses pressed. */
const dangerOnColor = (s: State) =>
  `button-label-danger-primary-${s === "focused" ? "default" : s === "selected" ? "pressed" : s}-oncolor`;

/**
 * Mirrors the Figma state table in docs/design-system/components/buttons.md.
 * Destructive states Figma does not define follow the same pattern (see Deviations).
 */
export const BUTTON_SPECS: ButtonSpec[] = [
  // Brand and neutral solid fills.
  {
    style: "primary",
    onColor: false,
    bg: t("button-background-primary"),
    fg: fixed("text-oncolor-primary"),
    icon: fixed("icon-oncolor"),
    focus: "border-black",
  },
  {
    style: "neutral",
    onColor: false,
    bg: t("button-background-black"),
    fg: fixed("text-oncolor-primary"),
    icon: fixed("icon-oncolor"),
    focus: "border-black",
  },
  {
    style: "secondary",
    onColor: false,
    // Figma: hovered uses the pressed fill.
    bg: (s) =>
      s === "hovered" ? "button-background-neutral-pressed" : `button-background-neutral-${s}`,
    fg: fixed("text-default"),
    icon: fixed("icon-default"),
    focus: "border-black",
  },
  {
    style: "outline",
    onColor: false,
    bg: (s) =>
      s === "default" || s === "focused"
        ? null
        : s === "hovered"
          ? "button-background-neutral-default"
          : `button-background-neutral-${s}`,
    fg: fixed("text-default"),
    icon: fixed("icon-default"),
    focus: "border-black",
  },
  {
    style: "subtle",
    onColor: false,
    bg: (s) =>
      s === "default" || s === "focused"
        ? null
        : s === "hovered"
          ? "button-background-neutral-default"
          : `button-background-neutral-${s}`,
    fg: fixed("text-default"),
    icon: fixed("icon-default"),
    focus: "border-black",
  },
  {
    style: "transparent",
    onColor: false,
    bg: () => null,
    fg: (s) =>
      s === "default" || s === "focused" ? "text-default" : `button-label-transparent-${s}`,
    icon: (s) =>
      s === "default" || s === "focused" ? "icon-default" : `button-label-transparent-${s}`,
    focus: "border-black",
  },
  // On-colour (on brand fills).
  {
    style: "primary",
    onColor: true,
    // Figma: selected uses the pressed fill.
    bg: (s) =>
      s === "selected" ? "button-background-oncolor-pressed" : `button-background-oncolor-${s}`,
    fg: fixed("text-default"),
    icon: fixed("icon-default"),
    focus: "icon-oncolor",
  },
  {
    style: "neutral",
    onColor: true,
    bg: t("button-background-oncolor"),
    fg: fixed("text-default"),
    icon: fixed("icon-default"),
    focus: "icon-oncolor",
  },
  {
    style: "secondary",
    onColor: true,
    bg: (s) =>
      s === "default" || s === "focused"
        ? "button-background-transparent-hovered"
        : `button-background-transparent-${s}`,
    fg: fixed("text-oncolor-primary"),
    icon: fixed("icon-oncolor"),
    focus: "icon-oncolor",
  },
  ...(["outline", "subtle"] as const).map(
    (style): ButtonSpec => ({
      style,
      onColor: true,
      bg: unlessDefault("button-background-transparent"),
      fg: fixed("text-oncolor-primary"),
      icon: fixed("icon-oncolor"),
      focus: "icon-oncolor",
    }),
  ),
  {
    style: "transparent",
    onColor: true,
    bg: () => null,
    fg: (s) =>
      s === "default" || s === "focused"
        ? "text-oncolor-primary"
        : `button-label-transparent-${s}-on-color`,
    icon: (s) =>
      s === "default" || s === "focused" ? "icon-oncolor" : `button-icon-transparent-${s}-on-color`,
    focus: "icon-oncolor",
  },
  // Destructive.
  ...[false, true].flatMap((onColor): ButtonSpec[] => [
    {
      style: "destructive primary",
      onColor,
      bg: t("button-background-danger-primary"),
      fg: fixed("text-oncolor-primary"),
      icon: fixed("icon-oncolor"),
      focus: onColor ? "icon-oncolor" : "border-black",
    },
    {
      style: "destructive secondary",
      onColor,
      bg: t(`button-background-danger-secondary${onColor ? "-oncolor" : ""}`),
      fg: fixed(onColor ? "button-label-danger-secondary-oncolor" : "text-error"),
      icon: fixed(onColor ? "button-label-danger-secondary-oncolor" : "icon-error"),
      focus: onColor ? "icon-oncolor" : "border-black",
    },
  ]),
  ...(["destructive outline", "destructive subtle"] as const).flatMap((style): ButtonSpec[] => [
    {
      style,
      onColor: false,
      bg: unlessDefault("button-background-danger-secondary"),
      fg: fixed("text-error"),
      icon: fixed("icon-error"),
      focus: "border-black",
    },
    {
      style,
      onColor: true,
      bg: unlessDefault("button-background-transparent"),
      fg: (s) => dangerOnColor(s),
      icon: (s) => dangerOnColor(s),
      focus: "icon-oncolor",
    },
  ]),
  {
    style: "destructive transparent",
    onColor: false,
    bg: () => null,
    fg: (s) => `button-label-danger-${s === "focused" ? "default" : s}`,
    icon: (s) => `button-label-danger-${s === "focused" ? "default" : s}`,
    focus: "border-black",
  },
  {
    style: "destructive transparent",
    onColor: true,
    bg: () => null,
    fg: (s) => dangerOnColor(s),
    icon: (s) => dangerOnColor(s),
    focus: "icon-oncolor",
  },
];

function buttonPairs(): ComponentPair[] {
  const pairs: ComponentPair[] = [];
  for (const spec of BUTTON_SPECS) {
    const surfaces = spec.onColor ? ON_COLOR_SURFACES : SURFACES;
    const name = `${spec.style}${spec.onColor ? " on-colour" : ""}`;
    for (const state of STATES) {
      const bg = spec.bg(state);
      for (const surface of surfaces) {
        const fill = bg ?? surface;
        const on = bg ? surface : undefined;
        const label = `${name} / ${state}`;
        pairs.push({
          component: "button",
          state: label,
          fg: spec.fg(state),
          bg: fill,
          on,
          min: 4.5,
          kind: "text",
        });
        pairs.push({
          component: "button",
          state: `${label} (icon)`,
          fg: spec.icon(state),
          bg: fill,
          on,
          min: 3,
          kind: "non-text",
        });
        if (state === "focused") {
          pairs.push({
            component: "button",
            state: `${name} / focus ring`,
            fg: spec.focus,
            bg: surface,
            min: 3,
            kind: "non-text",
          });
        }
      }
    }
  }
  return pairs;
}

/** Spinner indicator arcs are non-text graphics: 3:1 against the surface. */
function spinnerPairs(): ComponentPair[] {
  const variants: [string, string, string[]][] = [
    ["primary", "icon-primary", SURFACES],
    ["neutral", "icon-default", SURFACES],
    ["on-color", "icon-oncolor", ON_COLOR_SURFACES],
  ];
  return variants.flatMap(([variant, fg, surfaces]) =>
    surfaces.map(
      (bg): ComponentPair => ({
        component: "spinner",
        state: `${variant} / indicator`,
        fg,
        bg,
        min: 3,
        kind: "non-text",
      }),
    ),
  );
}

/** Link text in every state, and its focus ring, on each surface it can sit on. */
function linkPairs(): ComponentPair[] {
  const variants: [string, string[], string[], string][] = [
    [
      "primary",
      [
        "link-primary",
        "link-primary-hovered",
        "link-primary-pressed",
        "link-primary-visited",
        "link-primary-focused",
      ],
      SURFACES,
      "border-black",
    ],
    [
      "neutral",
      [
        "link-neutral",
        "link-neutral-hovered",
        "link-neutral-pressed",
        "link-primary-visited",
        "link-neutral-focused",
      ],
      SURFACES,
      "border-black",
    ],
    [
      "on-color",
      [
        "link-oncolor",
        "link-oncolor-hovered",
        "link-oncolor-pressed",
        "link-oncolor-visited",
        "link-oncolor-focused",
      ],
      ON_COLOR_SURFACES,
      "icon-oncolor",
    ],
  ];
  const names = ["default", "hovered", "pressed", "visited", "focused"];
  return variants.flatMap(([variant, tokens, surfaces, ring]) =>
    surfaces.flatMap((bg): ComponentPair[] => [
      ...tokens.map(
        (fg, i): ComponentPair => ({
          component: "link",
          state: `${variant} / ${names[i]}`,
          fg,
          bg,
          min: 4.5,
          kind: "text",
        }),
      ),
      {
        component: "link",
        state: `${variant} / focus ring`,
        fg: ring,
        bg,
        min: 3,
        kind: "non-text",
      },
    ]),
  );
}

const BADGE_COLORS = ["neutral", "success", "error", "warning", "info", "purple", "orange"];

/** Badge label (and icon) on its filled tint and, outlined, on the page surface. */
function badgePairs(): ComponentPair[] {
  const pairs: ComponentPair[] = [];
  for (const color of BADGE_COLORS) {
    for (const surface of SURFACES) {
      const fg = `badge-${color}-text`;
      pairs.push(
        {
          component: "badge",
          state: `${color} / filled`,
          fg,
          bg: `badge-${color}-background`,
          on: surface,
          min: 4.5,
          kind: "text",
        },
        {
          component: "badge",
          state: `${color} / outlined`,
          fg,
          bg: surface,
          min: 4.5,
          kind: "text",
        },
      );
    }
  }
  for (const surface of ON_COLOR_SURFACES) {
    pairs.push(
      {
        component: "badge",
        state: "on-color / filled",
        fg: "text-oncolor-primary",
        bg: "badge-on-color-background",
        on: surface,
        min: 4.5,
        kind: "text",
      },
      {
        component: "badge",
        state: "on-color / outlined",
        fg: "text-oncolor-primary",
        bg: surface,
        min: 4.5,
        kind: "text",
      },
    );
  }
  return pairs;
}

const TAG_COLORS = ["neutral", "success", "info", "warning", "error"];

/** Tag and Status Tag, per the Figma state tables in tags.md. */
function tagPairs(): ComponentPair[] {
  const pairs: ComponentPair[] = [];
  const add = (state: string, fg: string, bg: string, on?: string, min = 4.5) =>
    pairs.push({
      component: "tag",
      state,
      fg,
      bg,
      on,
      min,
      kind: min === 3 ? "non-text" : "text",
    });
  for (const color of TAG_COLORS) {
    const fg = `tag-text-${color}`;
    const icon = color === "neutral" ? "icon-default" : `tag-icon-${color}`;
    for (const surface of SURFACES) {
      add(`${color} / filled`, fg, `tag-background-${color}-light`, surface);
      add(`${color} / filled (icon)`, icon, `tag-background-${color}-light`, surface, 3);
      add(`${color} / outlined`, fg, surface);
      add(`${color} / outlined (icon)`, icon, surface, undefined, 3);
      add(`status ${color} / subtle`, fg, `tag-background-${color}-light`, surface);
      add(`status ${color} / ghost`, "tag-text-neutral", surface);
      add(`status ${color} / ghost (dot)`, icon, surface, undefined, 3);
      add(`status ${color} / inverted`, "text-oncolor-primary", `tag-background-${color}`, surface);
    }
  }
  for (const surface of ON_COLOR_SURFACES) {
    add("on-color / filled", "text-oncolor-primary", "tag-background-on-color", surface);
    add("on-color / outlined", "text-oncolor-primary", surface);
  }
  return pairs;
}

const FEATURED_ICON_COLORS = ["brand", "neutral", "success", "error", "warning", "info"];

/** Featured icons are non-text graphics: 3:1. */
function featuredIconPairs(): ComponentPair[] {
  return FEATURED_ICON_COLORS.flatMap((color) =>
    SURFACES.flatMap((surface): ComponentPair[] => [
      {
        component: "featured-icon",
        state: `${color} / hard`,
        fg: "icon-oncolor",
        bg: `featured-icon-${color}-background`,
        on: surface,
        min: 3,
        kind: "non-text",
      },
      {
        component: "featured-icon",
        state: `${color} / light`,
        fg: `featured-icon-${color}-icon`,
        bg: `featured-icon-${color}-background-light`,
        on: surface,
        min: 3,
        kind: "non-text",
      },
      {
        component: "featured-icon",
        state: `${color} / outlined`,
        fg: `featured-icon-${color}-icon`,
        bg: surface,
        min: 3,
        kind: "non-text",
      },
    ]),
  );
}

/** Avatar initials and icon on the avatar fill. */
function avatarPairs(): ComponentPair[] {
  return SURFACES.flatMap((surface): ComponentPair[] => [
    {
      component: "avatar",
      state: "initials / text",
      fg: "text-default",
      bg: "button-background-neutral-default",
      on: surface,
      min: 4.5,
      kind: "text",
    },
    {
      component: "avatar",
      state: "icon / icon",
      fg: "icon-default",
      bg: "button-background-neutral-default",
      on: surface,
      min: 3,
      kind: "non-text",
    },
  ]);
}

export function componentPairs(): ComponentPair[] {
  return [
    ...chromePairs(),
    ...buttonPairs(),
    ...spinnerPairs(),
    ...linkPairs(),
    ...badgePairs(),
    ...tagPairs(),
    ...featuredIconPairs(),
    ...avatarPairs(),
    ...formPairs(),
    ...interactivePairs(),
    ...navigationPairs(),
    ...compositePairs(),
    ...extensionPairs(),
  ];
}
