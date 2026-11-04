import { describe, expect, test } from "bun:test";
import { contrastRatio } from "./color";
import { themeCss, tokensCss } from "./emit";
import { auditContrast, buildModel, tokenValue } from "./model";

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
    expect(tokenValue(model, "background-body", "dark")).toBe("#111927");
  });

  test("dark scope re-declares shadcn variables", () => {
    const dark = tokensCss(model).split('[data-theme="dark"] {')[1] ?? "";
    expect(dark).toContain("--background: var(--background-body);");
  });
});
