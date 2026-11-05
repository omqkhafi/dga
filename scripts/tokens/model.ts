// Applies DGA UI fixes to the Figma source and resolves token values.

import { contrastRatio } from "./color";
import { type ComponentPair, componentPairs } from "./components";
import { applyDark } from "./dark";
import {
  ADDITIONS,
  type Deviation,
  FIXED_TEXT_TOKENS,
  OTHER_DEVIATIONS,
  OVERRIDES,
  RENAMES,
} from "./fixes";
import { loadSource, type Mode, type ThemeToken, type TokenSource, type Viewport } from "./source";

export type Model = TokenSource & { deviations: Deviation[] };

const REF = /^\{([^}]+)\}$/;

export function buildModel(source = loadSource()): Model {
  const deviations: Deviation[] = RENAMES.map((r) => ({
    area: "Naming",
    item: r.tokens,
    original: r.from.replace(/-$/, ""),
    ours: r.to.replace(/-$/, ""),
    reason: r.reason,
    status: r.from === "iable-container" ? "fixed" : undefined,
  }));

  const themes = new Map<string, ThemeToken>();
  for (const [name, token] of source.themes) themes.set(name, { ...token });

  for (const override of OVERRIDES) {
    const token = themes.get(override.token);
    if (!token) throw new Error(`Override for unknown token: ${override.token}`);
    const modes: Mode[] = override.mode === "both" ? ["light", "dark"] : [override.mode];
    for (const mode of modes) {
      const original = token[mode];
      if (original === override.to) throw new Error(`No-op override: ${override.token} ${mode}`);
      token[mode] = override.to;
      deviations.push({
        area: "Contrast",
        item: `--${override.token} (${mode})`,
        original: describe(original),
        ours: describe(override.to),
        reason: override.reason,
        status: "fixed",
        component: override.component,
      });
    }
  }

  for (const addition of ADDITIONS) {
    if (themes.has(addition.name)) throw new Error(`Addition already exists: ${addition.name}`);
    themes.set(addition.name, {
      name: addition.name,
      light: addition.light,
      dark: addition.dark,
      source: "dga-ui",
    });
    const light = describe(addition.light);
    const dark = describe(addition.dark);
    deviations.push({
      area: addition.area ?? "Contrast",
      item: `--${addition.name} (new)`,
      original: addition.original ?? "—",
      ours: light === dark ? light : `${light} (light), ${dark} (dark)`,
      reason: addition.reason,
      status: "fixed",
      component: addition.component,
    });
  }

  // Rebuild the dark theme last, so it sees every override and addition.
  const primitives = new Map(source.primitives);
  const figmaDark = new Map([...source.themes].map(([name, token]) => [name, token.dark]));
  const dark = applyDark(themes, primitives, figmaDark);
  // A dark contrast override the rebuild replaced would otherwise be listed twice.
  const rebuilt = new Set(dark.map((d) => d.item));
  const kept = deviations.filter((d) => !(d.area === "Contrast" && rebuilt.has(d.item)));
  deviations.length = 0;
  deviations.push(...kept, ...dark);

  const responsive = new Map(source.responsive);
  for (const [name, token] of responsive) {
    if (FIXED_TEXT_TOKENS.test(name)) {
      const desktop = token.values.desktop;
      responsive.set(name, { ...token, values: { desktop, tablet: desktop, mobile: desktop } });
    }
  }

  return {
    ...source,
    primitives,
    themes,
    responsive,
    deviations: [...deviations, ...OTHER_DEVIATIONS],
  };
}

function describe(value: string) {
  const match = REF.exec(value);
  return match ? `--${match[1]}` : value;
}

/** Resolve a token or value to its final literal in the given mode and viewport. */
export function resolve(
  model: Model,
  value: string,
  mode: Mode = "light",
  viewport: Viewport = "desktop",
  seen: string[] = [],
): string {
  const match = REF.exec(value.trim());
  if (!match) return value;
  const name = match[1] as string;
  if (seen.includes(name)) throw new Error(`Reference cycle: ${[...seen, name].join(" → ")}`);
  const next = [...seen, name];
  const theme = model.themes.get(name);
  if (theme) return resolve(model, theme[mode], mode, viewport, next);
  const responsive = model.responsive.get(name);
  if (responsive) return resolve(model, responsive.values[viewport], mode, viewport, next);
  const primitive = model.primitives.get(name);
  if (primitive) return resolve(model, primitive.value, mode, viewport, next);
  throw new Error(`Unknown token reference: {${name}}`);
}

export const tokenValue = (model: Model, name: string, mode: Mode = "light") =>
  resolve(model, `{${name}}`, mode);

// ---------------------------------------------------------------------------
// Contrast audit
// ---------------------------------------------------------------------------

export type ContrastCheck = {
  fg: string;
  bg: string;
  mode: Mode;
  ratio: number;
  min: number;
  kind: "text" | "non-text";
  /** Set for component-level pairs (scripts/tokens/components.ts). */
  component?: string;
  state?: string;
  on?: string;
};

const SURFACES = ["background-white", "background-body", "background-card"];
const FILLS = [
  "background-primary",
  "background-success",
  "background-info",
  "background-error",
  "background-warning",
  "background-tertiary",
  "background-sa-flag",
  "background-nav-header",
  "button-background-primary-default",
  "button-background-primary-hovered",
  "button-background-primary-pressed",
  "button-background-primary-selected",
  "button-background-danger-primary-default",
  "button-background-danger-primary-hovered",
  "button-background-black-default",
  "button-background-black-hovered",
];
/** Fills dark enough for translucent on-colour text (see Deviations). */
const DEEP_FILLS = [
  "background-nav-header",
  "button-background-primary-pressed",
  "button-background-primary-selected",
  "button-background-black-default",
];
const STATUS = ["success", "info", "warning", "error"];

/** Pairs audited in Phase 1. Disabled states are exempt (WCAG 1.4.3). */
export function contrastPairs(model: Model) {
  const names = [...model.themes.keys()];
  const pairs: {
    fg: string;
    bg: string;
    min: number;
    kind: ContrastCheck["kind"];
    modes?: Mode[];
  }[] = [];

  const isText = (n: string) =>
    /^(text|link|field-text)-/.test(n) &&
    !/oncolor|on-color|disabled|^text-on-/.test(n) &&
    !n.startsWith("link-icon-");
  const isLightAccent = (n: string) => /^text-.*-light$/.test(n);

  for (const fg of names.filter(isText)) {
    if (isLightAccent(fg)) {
      // Light accents are for dark/coloured surfaces in light mode.
      pairs.push({ fg, bg: "background-nav-header", min: 4.5, kind: "text", modes: ["light"] });
      for (const bg of SURFACES) pairs.push({ fg, bg, min: 4.5, kind: "text", modes: ["dark"] });
      continue;
    }
    for (const bg of SURFACES) pairs.push({ fg, bg, min: 4.5, kind: "text" });
  }

  // Link icons and status icons are non-text: 3:1.
  for (const fg of names.filter(
    (n) =>
      (n.startsWith("link-icon-") || /^icon-/.test(n)) &&
      !/disabled|oncolor|-light$|-ring$|^icon-default-(400|500)$/.test(n),
  )) {
    for (const bg of SURFACES) pairs.push({ fg, bg, min: 3, kind: "non-text" });
  }

  for (const bg of FILLS) pairs.push({ fg: "text-oncolor-primary", bg, min: 4.5, kind: "text" });
  for (const fg of ["text-oncolor-secondary", "text-oncolor-tertiary"]) {
    for (const bg of DEEP_FILLS) pairs.push({ fg, bg, min: 4.5, kind: "text" });
  }
  for (const bg of FILLS) pairs.push({ fg: "icon-oncolor", bg, min: 3, kind: "non-text" });
  pairs.push({ fg: "text-on-gold", bg: "background-secondary", min: 4.5, kind: "text" });

  for (const status of STATUS) {
    for (const tint of ["25", "50"]) {
      pairs.push({
        fg: `text-${status}`,
        bg: `background-${status}-${tint}`,
        min: 4.5,
        kind: "text",
      });
    }
  }
  pairs.push({ fg: "text-primary", bg: "background-primary-50", min: 4.5, kind: "text" });

  return pairs;
}

export function auditContrast(model: Model): ContrastCheck[] {
  const results: ContrastCheck[] = [];
  const pairs: (ReturnType<typeof contrastPairs>[number] & Partial<ComponentPair>)[] = [
    ...contrastPairs(model),
    ...componentPairs(),
  ];
  for (const pair of pairs) {
    for (const mode of pair.modes ?? (["light", "dark"] as Mode[])) {
      const fg = tokenValue(model, pair.fg, mode);
      const bg = tokenValue(model, pair.bg, mode);
      // Translucent backgrounds sit on the page body unless the pair names a surface.
      const base = tokenValue(model, pair.on ?? "background-body", mode);
      results.push({
        fg: pair.fg,
        bg: pair.bg,
        mode,
        ratio: contrastRatio(fg, bg, base),
        min: pair.min,
        kind: pair.kind,
        ...(pair.component && { component: pair.component, state: pair.state, on: pair.on }),
      });
    }
  }
  return results;
}
