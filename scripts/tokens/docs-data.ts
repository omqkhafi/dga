// Data the docs site renders (swatches, scales, deviations). Generated, never hand-edited.

import { contrastRatio, hexToOklchCss, isHexColor } from "./color";
import { fontWeightNumber, ITALIC_WEIGHTS, SHADCN_VARS, shadowColour, tailwindTheme } from "./emit";
import { BREAKPOINTS, MODE_MIN_WIDTH } from "./fixes";
import { auditContrast, type Model, resolve, tokenValue } from "./model";
import type { Mode } from "./source";

const floor = (ratio: number) => Math.floor(ratio * 100) / 100;
const ref = (value: string) => /^\{([^}]+)\}$/.exec(value)?.[1] ?? null;

function category(name: string) {
  const head = name.split("-")[0] ?? name;
  const known: Record<string, string> = {
    background: "Background",
    text: "Text",
    border: "Border",
    icon: "Icon",
    link: "Link",
    alpha: "Alpha",
  };
  return known[head] ?? "Component";
}

/** `{ hex, oklch }` for a resolved colour; the docs show both (designers work in hex). */
const colour = (hex: string) => ({ hex, oklch: isHexColor(hex) ? hexToOklchCss(hex) : hex });

/** Adds an `oklch` next to every hex literal a deviation mentions. */
export function deviationsWithOklch(deviations: Model["deviations"]) {
  return deviations.map((d) => {
    const hexes = new Set(
      `${d.original} ${d.ours}`.match(/#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6})\b/g) ?? [],
    );
    if (hexes.size === 0) return d;
    return { ...d, colors: Object.fromEntries([...hexes].map((h) => [h, hexToOklchCss(h)])) };
  });
}

export function docsData(model: Model) {
  const { aliases } = tailwindTheme(model);
  const fullAudit = auditContrast(model);
  // Foundation tables rate tokens by the foundation pairs only.
  const audit = fullAudit.filter((c) => !c.component);

  const worst = (name: string, mode: Mode) => {
    const checks = audit.filter((c) => c.fg === name && c.mode === mode);
    if (checks.length === 0) return null;
    const c = checks.reduce((a, b) => (b.ratio / b.min < a.ratio / a.min ? b : a));
    return { bg: c.bg, ratio: Math.floor(c.ratio * 100) / 100, min: c.min };
  };
  // Fills are rated by the on-colour text placed on them.
  const asFill = (name: string, mode: Mode) => {
    const checks = audit.filter((c) => c.bg === name && c.mode === mode && c.kind === "text");
    if (checks.length === 0) return null;
    const c = checks.reduce((a, b) => (b.ratio < a.ratio ? b : a));
    return { fg: c.fg, ratio: Math.floor(c.ratio * 100) / 100, min: c.min };
  };

  // Swatch text is the DGA on-colour and default text tokens, never hardcoded hex.
  const swatchText = {
    white: {
      token: "text-oncolor-primary",
      value: tokenValue(model, "text-oncolor-primary", "light"),
      oklch: colour(tokenValue(model, "text-oncolor-primary", "light")).oklch,
    },
    black: {
      token: "text-default",
      value: tokenValue(model, "text-default", "light"),
      oklch: colour(tokenValue(model, "text-default", "light")).oklch,
    },
  };

  const primitives = [...model.primitives.values()]
    .filter((p) => p.name.startsWith("colors-") && /^#|^\{/.test(p.value))
    .map((p) => {
      const palette = p.name
        .replace(/^colors-/, "")
        .replace(/-(\d+)(-primary)?$/, "")
        .replace(/-(\d+)$/, "");
      return {
        name: p.name,
        figmaName: p.figmaName ?? null,
        source: p.source,
        palette,
        value: resolve(model, p.value),
        oklch: colour(resolve(model, p.value)).oklch,
        utility: `${p.name.replace(/^colors-/, "")}`,
        onWhite: floor(contrastRatio(swatchText.white.value, resolve(model, p.value))),
        onBlack: floor(contrastRatio(swatchText.black.value, resolve(model, p.value))),
      };
    });

  const semantic = [...model.themes.values()].map((t) => {
    const fixed = model.deviations.some((d) => d.item.startsWith(`--${t.name} (`));
    return {
      name: t.name,
      figmaName: t.figmaName ?? null,
      source: t.source,
      category: category(t.name),
      fixed,
      light: {
        ref: ref(t.light),
        value: tokenValue(model, t.name, "light"),
        oklch: colour(tokenValue(model, t.name, "light")).oklch,
      },
      dark: {
        ref: ref(t.dark),
        value: tokenValue(model, t.name, "dark"),
        oklch: colour(tokenValue(model, t.name, "dark")).oklch,
      },
      aliases: aliases.filter((a) => a.token === t.name).map((a) => a.utility),
      contrast: {
        light: worst(t.name, "light"),
        dark: worst(t.name, "dark"),
      },
      fill: { light: asFill(t.name, "light"), dark: asFill(t.name, "dark") },
    };
  });

  const responsiveValue = (name: string) => {
    const token = model.responsive.get(name);
    if (!token) throw new Error(`Unknown responsive token ${name}`);
    return {
      mobile: resolve(model, token.values.mobile, "light", "mobile"),
      tablet: resolve(model, token.values.tablet, "light", "tablet"),
      desktop: resolve(model, token.values.desktop, "light", "desktop"),
    };
  };

  const typeSizes = [
    "display-2xl",
    "display-xl",
    "display-lg",
    "display-md",
    "display-sm",
    "display-xs",
    "text-xl",
    "text-lg",
    "text-md",
    "text-sm",
    "text-xs",
    "text-2xs",
  ].map((size) => {
    const style = model.textStyles.find(
      (s) => s.name.toLowerCase().startsWith(size.replace("-", " ")) && s.name.endsWith("/Regular"),
    );
    return {
      key: size,
      utility: `text-${size.replace(/^text-/, "")}`,
      size: responsiveValue(`typo-size-${size}`),
      lineHeight: responsiveValue(`line-heights-${size}`),
      letterSpacing: style?.letterSpacing ?? "0%",
      figma: style ? style.name.replace("/Regular", "") : size,
    };
  });

  const weights = [...model.responsive.values()]
    .filter((t) => t.name.startsWith("font-weight-") && !ITALIC_WEIGHTS.test(t.name))
    .map((t) => ({
      name: t.name,
      value: fontWeightNumber(t.name, resolve(model, t.values.desktop)),
    }));

  const spacingScale = [...model.primitives.values()]
    .filter((p) => /^spacing-\d/.test(p.name))
    .map((p) => {
      const step = p.name.slice("spacing-".length).replace("-", ".");
      return { name: p.name, value: p.value, utility: step };
    })
    .sort((a, b) => Number.parseFloat(a.value) - Number.parseFloat(b.value));

  const spacingTokens = [...model.responsive.values()]
    .filter((t) => t.group === "Spacing")
    .map((t) => ({
      name: t.name,
      figmaName: t.figmaName ?? null,
      ref: ref(t.values.desktop),
      values: responsiveValue(t.name),
      utility: t.name.startsWith("spacing-") ? null : `p-${t.name}`,
    }));

  const radius = [...model.responsive.values()]
    .filter((t) => t.group === "Radius")
    .map((t) => ({
      name: t.name,
      value: fontWeightNumber(t.name, resolve(model, t.values.desktop)),
    }));

  // The colours behind the component audit, as hex and OKLCH, keyed "light:token-name".
  const auditColors: Record<string, { hex: string; oklch: string }> = {};
  for (const c of fullAudit.filter((x) => x.component)) {
    for (const token of [c.fg, c.bg]) {
      const key = `${c.mode}:${token}`;
      auditColors[key] ??= colour(tokenValue(model, token, c.mode));
    }
  }

  return {
    shadcn: Object.entries(SHADCN_VARS).map(([name, token]) => ({ name, token })),
    swatchText,
    primitives,
    semantic,
    typography: { family: "IBM Plex Sans Arabic", sizes: typeSizes, weights },
    spacing: { scale: spacingScale, tokens: spacingTokens },
    radius,
    shadows: model.shadows.map((s) => ({
      name: s.name,
      value: s.layers.map(shadowColour).join(", "),
    })),
    blurs: model.blurs,
    breakpoints: Object.entries(BREAKPOINTS).map(([name, rem]) => ({
      name,
      rem,
      px: Number.parseFloat(rem) * 16,
    })),
    modes: MODE_MIN_WIDTH,
    grids: model.grids,
    widths: [...model.primitives.values()]
      .filter((p) => p.name.startsWith("width-") || p.name === "paragraph-max-width")
      .map((p) => ({ name: p.name, value: resolve(model, p.value) })),
    audit: {
      checks: fullAudit.length,
      failing: fullAudit.filter((c) => c.ratio < c.min).length,
    },
    auditColors,
    componentAudit: fullAudit
      .filter((c) => c.component)
      .map((c) => ({
        component: c.component as string,
        state: c.state as string,
        fg: c.fg,
        bg: c.bg,
        on: c.on ?? null,
        mode: c.mode,
        ratio: floor(c.ratio),
        min: c.min,
        kind: c.kind,
      })),
  };
}

export type DocsData = ReturnType<typeof docsData>;
