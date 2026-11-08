import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  BASIC_COMPONENTS,
  COMPOSITE_COMPONENTS,
  componentSection,
  FORM_COMPONENTS,
  INTERACTIVE_COMPONENTS,
  LAYOUT_COMPONENTS,
  NAVIGATION_COMPONENTS,
} from "../apps/docs/lib/component-sections";
import { EXTENSION_COMPONENTS } from "../apps/docs/lib/extension-slugs";

const DIR = join(import.meta.dir, "../apps/docs/content/docs/components");
const meta = (file: string) => JSON.parse(readFileSync(join(DIR, file), "utf8")).pages as string[];

const ORDER = [
  BASIC_COMPONENTS,
  FORM_COMPONENTS,
  INTERACTIVE_COMPONENTS,
  NAVIGATION_COMPONENTS,
  LAYOUT_COMPONENTS,
  COMPOSITE_COMPONENTS,
];

describe("sidebar sections", () => {
  for (const file of ["meta.json", "meta.ar.json"]) {
    test(`${file} has no Extension section and follows nav.ts`, () => {
      const pages = meta(file);
      expect(pages.filter((p) => p.startsWith("---"))).toHaveLength(5);
      expect(pages.some((p) => /Extension|امتداد/.test(p))).toBe(false);
      expect(pages.filter((p) => !p.startsWith("---"))).toEqual(ORDER.flat());
    });
  }

  test("every extension is in exactly one section", () => {
    const all = ORDER.flat();
    expect(new Set(all).size).toBe(all.length);
    for (const slug of EXTENSION_COMPONENTS) expect(all).toContain(slug);
  });

  test("extensions sit with their natural group", () => {
    expect(componentSection("button-group")).toBe("components");
    expect(componentSection("popover")).toBe("interactive");
    expect(componentSection("slider")).toBe("forms");
    expect(componentSection("combobox")).toBe("forms");
    expect(componentSection("sidebar")).toBe("navigation");
    expect(componentSection("scroll-area")).toBe("layout");
    expect(componentSection("chart")).toBe("navigation");
  });
});
