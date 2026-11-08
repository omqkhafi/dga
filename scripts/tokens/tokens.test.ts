import { describe, expect, test } from "bun:test";
import { contrastRatio, hexToOklchCss, normalizeHex, oklchToHex } from "./color";
import { themeCss, tokensCss } from "./emit";
import { auditContrast, buildModel, tokenValue } from "./model";
import { checkOklchRoundTrip, compare } from "./oklch-check";

const model = buildModel();

describe("contrast maths", () => {
  test("black on white is 21:1", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 5);
  });
  test("#767676 on white is the AA threshold", () => {
    expect(contrastRatio("#767676", "#ffffff")).toBeGreaterThanOrEqual(4.5);
    expect(contrastRatio("#777777", "#ffffff")).toBeLessThan(4.5);
  });
  test("translucent foregrounds are composited", () => {
    expect(contrastRatio("#00000000", "#ffffff")).toBeCloseTo(1, 5);
  });
});

describe("tokens", () => {
  test("every audited pair meets WCAG AA in both modes", () => {
    const failing = auditContrast(model).filter((c) => c.ratio < c.min);
    expect(failing).toEqual([]);
  });

  test("Figma typos are gone from the generated CSS", () => {
    const css = tokensCss(model) + themeCss(model);
    for (const typo of ["hight", "wieght", "lavendar", "diabled", "lable", "iable-container"]) {
      expect(css.toLowerCase()).not.toContain(typo);
    }
  });

  test("italic Figma style names are not emitted as font weights", () => {
    expect(tokensCss(model)).not.toContain('"Medium Italic"');
  });

  test("light and dark resolve differently for flipping tokens", () => {
    expect(tokenValue(model, "background-body", "light")).toBe("#f9fafb");
    expect(tokenValue(model, "background-body", "dark")).toBe("#0d1311");
  });

  test("dark scope re-declares shadcn variables", () => {
    const dark = tokensCss(model).split('[data-theme="dark"] {')[1] ?? "";
    expect(dark).toContain("--background: var(--background-body);");
  });
});

describe("OKLCH output", () => {
  const css = tokensCss(model);

  test("the CSS has no hex or rgb() colours left", () => {
    expect(css).not.toMatch(/#[0-9a-f]{3,8}\b/i);
    expect(css).not.toMatch(/\brgba?\(/);
    expect(css).toContain("--colors-blue-700: oklch(");
  });

  test("every emitted colour converts back to its source hex", () => {
    const { checked, mismatches } = checkOklchRoundTrip(model);
    expect(mismatches).toEqual([]);
    expect(checked).toBeGreaterThan(200);
  });

  test("every source hex in tokens.json round-trips, 6 and 8 digit", () => {
    const hexes = [...model.primitives.values(), ...model.themes.values()].flatMap((t) =>
      Object.values("value" in t ? { v: t.value } : { l: t.light, d: t.dark }),
    );
    let count = 0;
    for (const hex of hexes.filter((v) => /^#[0-9a-f]{6,8}$/i.test(v))) {
      expect(oklchToHex(hexToOklchCss(hex))).toBe(normalizeHex(hex));
      count++;
    }
    expect(count).toBeGreaterThan(200);
  });

  test("alpha keeps its exact opacity", () => {
    expect(css).toContain("--colors-alpha-alpha-white-50: oklch(1 0 0 / 0.502);");
    expect(oklchToHex("oklch(1 0 0 / 0.502)")).toBe("#ffffff80");
    expect(css).toContain("--colors-alpha-alpha-black-0: oklch(0.20019 0 0 / 0);");
  });

  test("a wrong emitted value fails the round trip", () => {
    const out: Parameters<typeof compare>[3] = [];
    compare("ok", "#0b5c3f", hexToOklchCss("#0b5c3f"), out);
    expect(out).toEqual([]);
    compare("off by one step", "#0b5c3f", hexToOklchCss("#0b5c40"), out);
    compare("not a colour", "#0b5c3f", "var(--x)", out);
    expect(out.map((m) => m.where)).toEqual(["off by one step", "not a colour"]);
  });

  test("the contrast audit still runs on the hex source values", () => {
    expect(tokenValue(model, "background-body", "light")).toBe("#f9fafb");
    expect(contrastRatio("#161616", "#ffffff")).toBeGreaterThan(15);
  });
});
