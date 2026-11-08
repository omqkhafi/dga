// Round-trip check for the OKLCH colour output: every emitted oklch() value must convert back to
// the exact source hex (8-bit sRGB), with its alpha intact. The Figma hex values are the source
// of truth, so a mismatch fails `tokens:check`.

import { isHexColor, normalizeHex, oklchToHex, parseOklchCss } from "./color";
import { darkScopeVars, lightScopeVars, NO_SHADOW, rootVars, themeCss, tokensCss } from "./emit";
import type { Model } from "./model";
import type { Mode } from "./source";

export type OklchMismatch = { where: string; source: string; emitted: string; back: string };

const OKLCH_ANY = /oklch\([^)]*\)/g;

export function compare(
  where: string,
  source: string,
  emitted: string,
  out: OklchMismatch[],
  rgbOnly = false,
) {
  let back = "unparseable";
  try {
    back = rgbOnly ? emitted : oklchToHex(emitted);
  } catch {}
  if (back !== normalizeHex(source)) out.push({ where, source, emitted, back });
}

/** Returns every colour whose emitted OKLCH value does not convert back to its source hex. */
export function checkOklchRoundTrip(model: Model) {
  const mismatches: OklchMismatch[] = [];
  let checked = 0;

  const scopes: [string, Mode | null, [string, string][]][] = [
    [":root", "light", rootVars(model)],
    [".light", "light", lightScopeVars(model)],
    [".dark", "dark", darkScopeVars(model)],
  ];
  for (const [scope, mode, vars] of scopes) {
    for (const [name, value] of vars) {
      const primitive = model.primitives.get(name)?.value;
      const theme = mode ? model.themes.get(name)?.[mode] : undefined;
      // Rules in order: a theme token wins over a primitive of the same name in its scope.
      const source = [theme, primitive].find((v) => v !== undefined && isHexColor(v));
      if (source !== undefined) {
        checked++;
        compare(`${scope} --${name}`, source, value, mismatches);
      } else if (/#[0-9a-f]{3,8}\b/i.test(value)) {
        mismatches.push({
          where: `${scope} --${name}`,
          source: "(none)",
          emitted: value,
          back: "hex left in the CSS",
        });
      }
    }
  }

  // Shadows: the colour of every layer, against the Figma effect style (rounded opacity).
  const shadowVars = rootVars(model).filter(([name]) => model.shadows.some((s) => s.name === name));
  for (const shadow of model.shadows) {
    const emitted = shadowVars.find(([name]) => name === shadow.name)?.[1] ?? "";
    const colours = emitted.match(OKLCH_ANY) ?? [];
    if (colours.length !== shadow.layers.length) {
      mismatches.push({
        where: `shadow --${shadow.name}`,
        source: shadow.layers.join(", "),
        emitted,
        back: "layer count differs",
      });
      continue;
    }
    shadow.layers.forEach((layer, i) => {
      const m = /rgb\((\d+) (\d+) (\d+) \/ ([\d.]+)\)/.exec(layer);
      if (!m) return;
      const hex = `#${[m[1], m[2], m[3]].map((v) => Number(v).toString(16).padStart(2, "0")).join("")}`;
      const parsed = parseOklchCss(colours[i] as string);
      checked++;
      compare(
        `shadow --${shadow.name} layer ${i + 1}`,
        hex,
        oklchToHex({ ...parsed, alpha: 1 }),
        mismatches,
        true,
      );
      if (parsed.alpha !== Number(m[4])) {
        mismatches.push({
          where: `shadow --${shadow.name} layer ${i + 1} opacity`,
          source: String(m[4]),
          emitted: colours[i] as string,
          back: String(parsed.alpha),
        });
      }
    });
  }

  // No hex or rgb() colour may be left anywhere in the generated CSS.
  const files: Record<string, string> = {
    "tokens.css": tokensCss(model),
    "theme.css": themeCss(model),
  };
  for (const [file, css] of Object.entries(files)) {
    for (const match of css.matchAll(/(?<![\w&])#[0-9a-f]{3,8}\b|\brgba?\(/gi)) {
      mismatches.push({
        where: file,
        source: "(none)",
        emitted: match[0],
        back: "colour not in oklch()",
      });
    }
  }
  if (!tokensCss(model).includes(NO_SHADOW)) {
    mismatches.push({ where: "dark shadows", source: NO_SHADOW, emitted: "(missing)", back: "" });
  }
  return { checked, mismatches };
}
