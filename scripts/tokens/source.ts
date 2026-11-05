// Reads tokens/tokens.json (Figma export, the source of truth) into a flat model.
// Token names here are CSS variable names without the leading `--`.

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { renameToken } from "./fixes";

export const ROOT = join(import.meta.dir, "..", "..");

export type Mode = "light" | "dark";
export type Viewport = "mobile" | "tablet" | "desktop";

/** A value is a literal (`#fff`, `16px`) or a reference to another token (`{colors-neutral-50}`). */
export type Value = string;

export type Primitive = {
  name: string;
  figmaName?: string;
  value: Value;
  source: "figma" | "css" | "dga-ui";
};
export type ThemeToken = {
  name: string;
  figmaName?: string;
  light: Value;
  dark: Value;
  source: "figma" | "css" | "dga-ui";
};
export type ResponsiveToken = {
  name: string;
  figmaName?: string;
  group: "Spacing" | "Radius" | "Typography";
  type: string;
  values: Record<Viewport, Value>;
};
export type TextStyle = {
  name: string;
  fontSize: string;
  lineHeight: string;
  letterSpacing: string;
  fontWeight: string;
};
export type Shadow = { name: string; layers: string[] };

export type TokenSource = {
  primitives: Map<string, Primitive>;
  themes: Map<string, ThemeToken>;
  responsive: Map<string, ResponsiveToken>;
  textStyles: TextStyle[];
  shadows: Shadow[];
  blurs: { name: string; value: string }[];
  grids: { name: string; columns: number; gutter: number; margin: number; content?: number }[];
  /** css-only tokens that are intentionally not emitted. */
  dropped: string[];
};

type RawToken = {
  $type?: string;
  $value: unknown;
  $extensions?: { dga?: { figmaName?: string; modes?: Record<string, string> } };
};
type RawGroup = Record<string, RawToken>;

const renameRefs = (value: string) =>
  value.replace(/\{([^}]+)\}/g, (_, name: string) => `{${renameToken(name)}}`);

function cssValueToRef(value: string) {
  const match = /^var\(--([a-z0-9-]+)\)$/.exec(value.trim());
  return match ? `{${match[1]}}` : value;
}

export function loadSource(path = join(ROOT, "tokens", "tokens.json")): TokenSource {
  const raw = JSON.parse(readFileSync(path, "utf8")) as Record<string, unknown>;
  const group = (name: string) => raw[name] as RawGroup;

  const primitives = new Map<string, Primitive>();
  const themes = new Map<string, ThemeToken>();
  const responsive = new Map<string, ResponsiveToken>();
  const dropped: string[] = [];

  for (const groupName of ["Primitives", "Containers", "Widths"]) {
    for (const [key, token] of Object.entries(group(groupName))) {
      const name = renameToken(key);
      primitives.set(name, {
        name,
        figmaName: token.$extensions?.dga?.figmaName,
        value: renameRefs(String(token.$value)),
        source: "figma",
      });
    }
  }

  for (const [key, token] of Object.entries(group("Themes"))) {
    const modes = token.$extensions?.dga?.modes;
    if (!modes?.Light || !modes.Dark) throw new Error(`Theme token without modes: ${key}`);
    const name = renameToken(key);
    themes.set(name, {
      name,
      figmaName: token.$extensions?.dga?.figmaName,
      light: renameRefs(modes.Light),
      dark: renameRefs(modes.Dark),
      source: "figma",
    });
  }

  for (const groupName of ["Spacing", "Radius", "Typography"] as const) {
    for (const [key, token] of Object.entries(group(groupName))) {
      const modes = token.$extensions?.dga?.modes;
      if (!modes?.Desktop || !modes.Tablet || !modes.Mobile) {
        throw new Error(`Responsive token without modes: ${key}`);
      }
      const name = renameToken(key);
      responsive.set(name, {
        name,
        figmaName: token.$extensions?.dga?.figmaName,
        group: groupName,
        type: token.$type ?? "dimension",
        values: {
          desktop: renameRefs(modes.Desktop),
          tablet: renameRefs(modes.Tablet),
          mobile: renameRefs(modes.Mobile),
        },
      });
    }
  }

  // Tokens present on design.dga.gov.sa but not in Figma.
  for (const [key, token] of Object.entries(group("css-only"))) {
    const name = renameToken(key);
    const value = renameRefs(cssValueToRef(String(token.$value)));
    if (/^(radius|shadow)-/.test(name)) {
      // Legacy radius set collides with the Figma scale; shadows come from Figma effect styles.
      dropped.push(name);
    } else if (name.startsWith("colors-")) {
      primitives.set(name, { name, value, source: "css" });
    } else {
      themes.set(name, { name, light: value, dark: value, source: "css" });
    }
  }

  const textStyles: TextStyle[] = [];
  for (const [name, token] of Object.entries(group("textStyles"))) {
    const v = token.$value as Record<string, string>;
    textStyles.push({
      name,
      fontSize: v.fontSize ?? "",
      lineHeight: v.lineHeight ?? "",
      letterSpacing: v.letterSpacing ?? "0%",
      fontWeight: v.fontWeight ?? "",
    });
  }

  const shadows: Shadow[] = [];
  const blurs: { name: string; value: string }[] = [];
  for (const [key, token] of Object.entries(group("effects"))) {
    const name = key.split("/").pop() ?? key;
    const layers = token.$value as Record<string, string>[];
    if (token.$type === "shadow") {
      shadows.push({
        name,
        layers: layers.map(
          (l) => `${l.offsetX} ${l.offsetY} ${l.blur} ${l.spread} ${hexToRgba(l.color ?? "#000")}`,
        ),
      });
    } else {
      blurs.push({ name, value: layers[0]?.blur ?? "0px" });
    }
  }

  const grids = Object.entries(raw.grids as Record<string, unknown[][]>)
    .filter(([name]) => name.startsWith("Grid "))
    .map(([name, layers]) => {
      const columns = layers.find((l) => l[0] === "COLUMNS");
      const content = layers.find((l, i) => i > 0 && l[0] === "COLUMNS");
      return {
        name: name.replace("Grid ", ""),
        columns: Number(columns?.[1]),
        gutter: Number(columns?.[2]),
        margin: Number(columns?.[3]),
        content: content ? Number(content[2]) : undefined,
      };
    });

  return { primitives, themes, responsive, textStyles, shadows, blurs, grids, dropped };
}

export function hexToRgba(hex: string) {
  const v = hex.replace("#", "");
  const n = (i: number) => Number.parseInt(v.slice(i, i + 2), 16);
  const alpha = v.length === 8 ? Math.round((n(6) / 255) * 100) / 100 : 1;
  return `rgb(${n(0)} ${n(2)} ${n(4)} / ${alpha})`;
}
