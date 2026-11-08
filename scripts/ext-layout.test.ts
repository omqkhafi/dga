// Phase 7 part 2 (0.7.1), layout: Collapsible, Scroll Area, Resizable and Aspect Ratio, which are
// Platform Code extensions. Behaviour (keys, RTL, scrolling) is checked in the browser by
// scripts/e2e-extension/layout.mjs; this file covers what needs no browser.
import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { loadStyleMap } from "./style-map";
import { auditContrast, buildModel } from "./tokens/model";
import { ROOT } from "./tokens/source";

const ITEMS = ["collapsible", "scroll-area", "resizable", "aspect-ratio"];
const read = (path: string) => readFileSync(join(ROOT, path), "utf8");
type Item = {
  name: string;
  type: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: { path: string; target: string }[];
};
const registry = JSON.parse(read("registry/registry.json")) as { items: Item[] };
const item = (name: string) => registry.items.find((i) => i.name === name) as Item;
const api = JSON.parse(read("apps/docs/lib/generated/api.json")) as Record<
  string,
  { name: string; descriptionAr: string; props: { name: string; descriptionAr: string }[] }[]
>;

describe("registry entries", () => {
  for (const name of ITEMS) {
    test(`${name} is a registry:ui item that installs to components/dga`, () => {
      const entry = item(name);
      expect(entry?.type).toBe("registry:ui");
      expect(entry?.files[0]?.path).toBe(`bases/base/ui/${name}.tsx`);
      expect(entry?.files[0]?.target).toBe(`components/dga/${name}.tsx`);
      expect(entry?.registryDependencies).toContain("{{REGISTRY_URL}}/r/utils.json");
    });
  }
  test("Base UI is declared where it is imported", () => {
    expect(item("collapsible").dependencies).toContain("@base-ui/react");
    expect(item("scroll-area").dependencies).toContain("@base-ui/react");
    expect(item("scroll-area").registryDependencies).toContain("{{REGISTRY_URL}}/r/direction.json");
  });
  test("react-resizable-panels is pinned to an exact version", () => {
    const deps = item("resizable").dependencies ?? [];
    expect(deps).toContain("react-resizable-panels@4.14.8");
    expect(deps.filter((d) => d.startsWith("react-resizable-panels"))).toHaveLength(1);
    const docs = JSON.parse(read("apps/docs/package.json")) as {
      dependencies: Record<string, string>;
    };
    expect(docs.dependencies["react-resizable-panels"]).toBe("4.14.8");
    expect(item("resizable").registryDependencies).toContain("{{REGISTRY_URL}}/r/direction.json");
  });
  test("Aspect Ratio needs no package", () => {
    expect(item("aspect-ratio").dependencies ?? []).toEqual([]);
  });
  test("Card depends on the Collapsible instead of duplicating it", () => {
    expect(item("card").registryDependencies).toContain("{{REGISTRY_URL}}/r/collapsible.json");
    const card = read("registry/bases/base/ui/card.tsx");
    expect(card).toContain('from "@/components/dga/collapsible"');
    expect(card).not.toContain("import { Collapsible as CollapsiblePrimitive }");
    expect(card).not.toContain("<CollapsiblePrimitive.");
    expect(loadStyleMap(read("registry/styles/style-dga.css"))["cn-card-expand-panel"]).toBe(
      undefined,
    );
  });
  test("every source imports only declared dependencies and @dga paths", () => {
    for (const name of ITEMS) {
      const source = read(`registry/bases/base/ui/${name}.tsx`);
      const imports = [...source.matchAll(/from "([^"]+)"/g)].map((m) => m[1] as string);
      for (const from of imports) {
        const ok =
          from === "react" ||
          from === "react-resizable-panels" ||
          from.startsWith("@base-ui/react/") ||
          from.startsWith("@hugeicons/") ||
          from.startsWith("@/components/dga/") ||
          from.startsWith("@/lib/dga/") ||
          from === "@/registry/bases/base/lib/utils";
        expect({ name, from, ok }).toEqual({ name, from, ok: true });
      }
    }
  });
});

describe("styles", () => {
  const css = read("registry/styles/style-dga.css");
  const map = loadStyleMap(css);
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
  test("the layout classes use DGA tokens only: no hex, rgb or oklch literals", () => {
    const section = css.slice(css.indexOf("/* STREAM layout"), css.indexOf("/* END layout */"));
    expect(section.length).toBeGreaterThan(500);
    expect(section).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(section).not.toMatch(/\b(rgb|rgba|hsl|oklch)\(/);
    // Logical properties: no physical sides, except the group that is always left to right.
    expect(section).not.toMatch(/(?<![\w-])(ml|mr|pl|pr|left|right)-\d/);
  });
  test("the components have no physical left/right utilities", () => {
    for (const name of ITEMS) {
      const source = read(`registry/bases/base/ui/${name}.tsx`);
      expect(source).not.toMatch(/(?<![\w-])(ml|mr|pl|pr|left|right)-\d/);
    }
  });
});

describe("behaviour that does not need a browser", () => {
  const resizable = read("registry/bases/base/ui/resizable.tsx");
  test("Resizable lays out left to right and reverses the panels in RTL", () => {
    expect(resizable).toContain('dir="ltr"');
    expect(resizable).toContain('direction === "rtl" && orientation === "horizontal"');
    expect(resizable).toContain(".reverse()");
    expect(resizable).toContain("dir={direction}");
  });
  test("Resizable can remember its layout under autoSaveId", () => {
    expect(resizable).toContain("autoSaveId");
    expect(resizable).toContain("useDefaultLayout");
  });
  test("Scroll Area viewport is a named, focusable region", () => {
    const source = read("registry/bases/base/ui/scroll-area.tsx");
    expect(source).toContain('role="region"');
    expect(source).toContain("tabIndex={0}");
    expect(source).toContain('label = "Scrollable content"');
  });
  test("Aspect Ratio sets the CSS aspect-ratio from a variable", () => {
    const source = read("registry/bases/base/ui/aspect-ratio.tsx");
    expect(source).toContain('"--ratio"');
    expect(loadStyleMap(read("registry/styles/style-dga.css"))["cn-aspect-ratio"]).toContain(
      "aspect-(--ratio)",
    );
  });
  test("every visible string has an English default and is a prop", () => {
    expect(read("registry/bases/base/ui/scroll-area.tsx")).toContain("label?: string");
  });
});

describe("docs", () => {
  for (const name of ITEMS) {
    test(`${name} has English and Arabic pages with the extension note and previews`, () => {
      for (const file of [`${name}.mdx`, `${name}.ar.mdx`]) {
        const page = read(`apps/docs/content/docs/components/${file}`);
        expect(page).toContain("<ExtensionNote");
        expect(page).toContain(
          file.includes(".ar") ? "[#derivation-from-dga]" : "## Derivation from DGA",
        );
        expect(page).toContain(`<ComponentDeviations component="${name}" />`);
        expect(page).toContain(`<ApiReference component="${name}" />`);
        expect(page).toContain(`<ComponentInstall name="${name}" />`);
        expect(page).toContain("<DirectionCompare");
      }
      expect(read(`apps/docs/content/docs/components/${name}.ar.mdx`)).toContain("sourceHash:");
    });
  }
  test("every <Preview name> on these pages exists in the layout map", () => {
    const map = read("apps/docs/components/previews/ext-layout-map.ts");
    for (const name of ITEMS) {
      for (const file of [`${name}.mdx`, `${name}.ar.mdx`]) {
        const page = read(`apps/docs/content/docs/components/${file}`);
        for (const m of page.matchAll(/<(?:Preview|DirectionCompare)[^>]*\bname="([^"]+)"/g)) {
          expect({ file, name: m[1], found: map.includes(`"${m[1]}"`) }).toEqual({
            file,
            name: m[1],
            found: true,
          });
        }
      }
    }
  });
  test("the four components are listed on the Extensions page", () => {
    const list = read("apps/docs/lib/extensions.ts");
    for (const name of ITEMS) expect(list).toContain(`slug: "${name}"`);
  });
  test("the generated pages exist", () => {
    for (const name of ITEMS) {
      expect(existsSync(join(ROOT, `apps/docs/public/r/${name}.json`))).toBe(true);
      expect(existsSync(join(ROOT, `apps/docs/registry/bases/base/ui/${name}.tsx`))).toBe(true);
    }
  });
});

describe("Arabic API descriptions", () => {
  for (const name of ITEMS) {
    test(`${name} has an Arabic description for every part and prop`, () => {
      const parts = api[name] ?? [];
      expect(parts.length).toBeGreaterThan(0);
      for (const part of parts) {
        expect(part.descriptionAr).not.toBe("");
        for (const prop of part.props) {
          expect({ part: part.name, prop: prop.name, ar: prop.descriptionAr !== "" }).toEqual({
            part: part.name,
            prop: prop.name,
            ar: true,
          });
        }
      }
    });
  }
});

describe("contrast", () => {
  const model = buildModel();
  const checks = auditContrast(model).filter((c) => ITEMS.includes(c.component ?? ""));
  test("every state is audited in light and dark and passes", () => {
    for (const name of ["collapsible", "scroll-area", "resizable"]) {
      const own = checks.filter((c) => c.component === name);
      expect(own.length).toBeGreaterThan(5);
      expect(own.some((c) => c.mode === "light")).toBe(true);
      expect(own.some((c) => c.mode === "dark")).toBe(true);
    }
    expect(checks.filter((c) => c.ratio < c.min)).toEqual([]);
  });
  test("the scrollbar thumb and the resizable line are 3:1 against every surface", () => {
    for (const [component, state] of [
      ["scroll-area", "thumb"],
      ["resizable", "handle"],
    ]) {
      const own = checks.filter((c) => c.component === component && c.state === state);
      expect(own.length).toBe(6);
      for (const c of own) expect(c.ratio).toBeGreaterThanOrEqual(3);
    }
  });
});
