// Phase 7 part 2 (0.7.1), display: Kbd, Empty, Item and Chart, which are Platform Code extensions.
// Behaviour (keys, RTL axis order, the table) is checked in the browser by
// scripts/e2e-extension/display.mjs; this file covers what needs no browser.
import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { loadStyleMap } from "./style-map";
import { contrastRatio } from "./tokens/color";
import { auditContrast, buildModel, tokenValue } from "./tokens/model";
import { ROOT } from "./tokens/source";

const ITEMS = ["kbd", "empty", "item", "chart"];
const read = (path: string) => readFileSync(join(ROOT, path), "utf8");
type Item = {
  name: string;
  type: string;
  description: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: { path: string; target: string }[];
};
const registry = JSON.parse(read("registry/registry.json")) as { items: Item[] };
const item = (name: string) => registry.items.find((i) => i.name === name) as Item;
const api = JSON.parse(read("apps/docs/lib/generated/api.json")) as Record<
  string,
  {
    name: string;
    description: string;
    descriptionAr: string;
    props: { name: string; description: string; descriptionAr: string }[];
  }[]
>;
const U = "{{REGISTRY_URL}}/r/";

describe("registry entries", () => {
  for (const name of ITEMS) {
    test(`${name} is an extension registry:ui item that installs to components/dga`, () => {
      const entry = item(name);
      expect(entry?.type).toBe("registry:ui");
      expect(entry.description).toStartWith("Platform Code extension (not DGA).");
      expect(entry.files[0]?.path).toBe(`bases/base/ui/${name}.tsx`);
      expect(entry.files[0]?.target).toBe(`components/dga/${name}.tsx`);
      expect(entry.registryDependencies).toContain(`${U}utils.json`);
    });
  }
  test("Chart pins Recharts and react-is, and uses the direction library", () => {
    expect(item("chart").dependencies).toContain("recharts@3.8.0");
    expect(item("chart").dependencies).toContain("react-is@19.3.1");
    expect(item("chart").registryDependencies).toContain(`${U}direction.json`);
    const pkg = JSON.parse(read("apps/docs/package.json")) as {
      dependencies: Record<string, string>;
    };
    expect(pkg.dependencies.recharts).toBe("3.8.0");
    expect(pkg.dependencies["react-is"]).toBe("19.3.1");
  });
  test("Item reuses the Divider; Input Group reuses Kbd", () => {
    expect(item("item").registryDependencies).toContain(`${U}divider.json`);
    expect(item("input-group").registryDependencies).toContain(`${U}kbd.json`);
    const group = read("registry/bases/base/ui/input-group.tsx");
    expect(group).toContain('from "@/components/dga/kbd"');
    expect(group).not.toContain("cn-input-group-kbd");
  });
  test("every source imports only declared dependencies and @dga paths", () => {
    for (const name of ITEMS) {
      const source = read(`registry/bases/base/ui/${name}.tsx`);
      const imports = [...source.matchAll(/from "([^"]+)"/g)].map((m) => m[1] as string);
      for (const from of imports) {
        const ok =
          from === "react" ||
          from === "recharts" ||
          from.startsWith("@base-ui/react/") ||
          from === "class-variance-authority" ||
          from.startsWith("@/components/dga/") ||
          from.startsWith("@/lib/dga/") ||
          from === "@/registry/bases/base/lib/utils";
        expect({ name, from, ok }).toEqual({ name, from, ok: true });
      }
    }
  });
});

describe("styles", () => {
  const map = loadStyleMap(read("registry/styles/style-dga.css"));
  test("every cn-* class the components use is defined", () => {
    const missing: string[] = [];
    for (const name of ITEMS) {
      const source = read(`registry/bases/base/ui/${name}.tsx`);
      for (const [cls] of source.matchAll(/(?<![\w/-])cn-[a-z0-9-]+(?![\w-])/g)) {
        if (map[cls] === undefined) missing.push(`${name}: ${cls}`);
      }
    }
    expect(missing).toEqual([]);
  });
  test("the display classes use DGA tokens only: no hex, rgb or oklch literals", () => {
    const css = read("registry/styles/style-dga.css");
    const section = css.slice(css.indexOf("/* STREAM display"), css.indexOf("/* END display */"));
    expect(section.length).toBeGreaterThan(1000);
    expect(section).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(section).not.toMatch(/\b(rgb|rgba|hsl|oklch)\(/);
  });
  test("the components have no physical left/right utilities and no hard-coded colours", () => {
    for (const name of ITEMS) {
      const source = read(`registry/bases/base/ui/${name}.tsx`);
      expect(source).not.toMatch(/(?<![\w-])(ml|mr|pl|pr|left|right)-\d/);
      expect(source).not.toMatch(/#[0-9a-fA-F]{6}\b/);
    }
  });
});

describe("Chart behaviour that does not need a browser", () => {
  const chart = read("registry/bases/base/ui/chart.tsx");
  test("RTL: the X axis is reversed, the Y axis moves to the right and the pie turns", () => {
    expect(chart).toContain("xAxisProps: { reversed: rtl }");
    expect(chart).toContain('orientation: rtl ? ("right" as const) : ("left" as const)');
    expect(chart).toContain("startAngle: 90, endAngle: 450");
    expect(chart).toContain("startAngle: 90, endAngle: -270");
  });
  test("values keep Western digits, left to right", () => {
    expect(chart).toContain('toLocaleString("en-US")');
    expect(chart).toContain('<bdi dir="ltr"');
  });
  test("the picture is a named image with a table alternative; animation respects reduced motion", () => {
    expect(chart).toContain('role={interactive ? "group" : "img"}');
    expect(chart).toContain("aria-label={title}");
    expect(chart).toContain("aria-controls={tableId}");
    expect(chart).toContain("(prefers-reduced-motion: reduce)");
  });
  test("every visible string has an English default and is a prop", () => {
    expect(chart).toContain('title = "Chart"');
    expect(chart).toContain('show: "View as table"');
    expect(chart).toContain('hide: "Hide table"');
  });
});

describe("the chart palette", () => {
  const model = buildModel();
  const SURFACES = ["background-white", "background-body", "background-card"];
  const series = [1, 2, 3, 4].map((n) => `chart-series-${n}`);
  for (const mode of ["light", "dark"] as const) {
    test(`${mode}: each series is 3:1 against every surface`, () => {
      for (const s of series)
        for (const surface of SURFACES)
          expect(
            contrastRatio(tokenValue(model, s, mode), tokenValue(model, surface, mode)),
          ).toBeGreaterThanOrEqual(3);
    });
    test(`${mode}: neighbouring series (1-2, 2-3, 3-4, 4-1) are 3:1 from each other`, () => {
      series.forEach((s, i) => {
        const next = series[(i + 1) % series.length] as string;
        expect(
          contrastRatio(tokenValue(model, s, mode), tokenValue(model, next, mode)),
        ).toBeGreaterThanOrEqual(3);
      });
    });
  }
  test("the tokens are logged in Deviations as new, with no DGA source", () => {
    const deviations = read("apps/docs/lib/generated/deviations.json");
    for (const s of series) expect(deviations).toContain(s);
    expect(deviations).toContain("New, no DGA source");
  });
});

describe("Arabic API descriptions", () => {
  for (const name of ITEMS) {
    test(`${name} has an Arabic description for every part and prop`, () => {
      const parts = api[name] ?? [];
      expect(parts.length).toBeGreaterThan(0);
      for (const part of parts) {
        expect(!part.description || part.descriptionAr !== "").toBe(true);
        for (const prop of part.props) {
          expect({
            part: part.name,
            prop: prop.name,
            ar: !prop.description || prop.descriptionAr !== "",
          }).toEqual({
            part: part.name,
            prop: prop.name,
            ar: true,
          });
        }
      }
    });
  }
});

describe("pages and previews", () => {
  const map = read("apps/docs/components/previews/ext-display-map.ts");
  for (const name of ITEMS) {
    for (const lang of ["", ".ar"]) {
      test(`${name}${lang} page has the extension note, install, API, derivation, contrast`, () => {
        const path = `apps/docs/content/docs/components/${name}${lang}.mdx`;
        expect(existsSync(join(ROOT, path))).toBe(true);
        const page = read(path);
        expect(page).toContain("<ExtensionNote");
        expect(page).toContain(`<ComponentInstall name="${name}" />`);
        expect(page).toContain(`<ApiReference component="${name}" />`);
        expect(page).toContain(`<ComponentContrast component="${name}" />`);
        expect(page).toContain(`<ComponentDeviations component="${name}" />`);
        expect(page).toContain("<DirectionCompare");
        for (const [, preview] of page.matchAll(/<Preview[^>]*name="([^"]+)"/g))
          expect({ preview, mapped: map.includes(`"${preview}"`) }).toEqual({
            preview,
            mapped: true,
          });
      });
    }
    test(`${name} is on the Extensions list`, () => {
      expect(read("apps/docs/lib/extensions.ts")).toContain(`slug: "${name}"`);
      expect(read("apps/docs/lib/extension-slugs.ts")).toContain(`"${name}"`);
    });
  }
});

describe("contrast", () => {
  const model = buildModel();
  const checks = auditContrast(model).filter((c) => ITEMS.includes(c.component ?? ""));
  test("every display state is audited in light and dark and passes", () => {
    for (const name of ITEMS) {
      const own = checks.filter((c) => c.component === name);
      expect(own.length).toBeGreaterThan(1);
      expect(own.some((c) => c.mode === "light")).toBe(true);
      expect(own.some((c) => c.mode === "dark")).toBe(true);
    }
    expect(checks.filter((c) => c.ratio < c.min)).toEqual([]);
  });
});
