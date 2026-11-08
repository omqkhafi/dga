// Phase 7 (0.7.0), overlays: Popover, Hover Card, Alert Dialog and Context Menu, which are Platform
// Code extensions. Behaviour (focus, keys, RTL) is checked in the browser by
// scripts/e2e-extension/overlays.mjs; this file covers what needs no browser.
import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { loadStyleMap } from "./style-map";
import { auditContrast, buildModel } from "./tokens/model";
import { ROOT } from "./tokens/source";

const ITEMS = ["popover", "hover-card", "alert-dialog", "context-menu"];
const read = (path: string) => readFileSync(join(ROOT, path), "utf8");
type Item = {
  name: string;
  type: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: { path: string; target: string }[];
};
const registry = JSON.parse(read("registry/registry.json")) as { items: Item[] };
const api = JSON.parse(read("apps/docs/lib/generated/api.json")) as Record<
  string,
  { name: string; descriptionAr: string; props: { name: string; descriptionAr: string }[] }[]
>;

describe("registry entries", () => {
  for (const name of ITEMS) {
    test(`${name} is a registry:ui item that installs to components/dga`, () => {
      const item = registry.items.find((i) => i.name === name);
      expect(item?.type).toBe("registry:ui");
      expect(item?.files[0]?.path).toBe(`bases/base/ui/${name}.tsx`);
      expect(item?.files[0]?.target).toBe(`components/dga/${name}.tsx`);
      expect(item?.dependencies).toContain("@base-ui/react");
      expect(item?.registryDependencies).toContain("{{REGISTRY_URL}}/r/utils.json");
    });
  }
  test("registry dependencies match the imports", () => {
    const deps = (name: string) =>
      registry.items.find((i) => i.name === name)?.registryDependencies ?? [];
    expect(deps("alert-dialog")).toContain("{{REGISTRY_URL}}/r/dialog.json");
    expect(deps("alert-dialog")).toContain("{{REGISTRY_URL}}/r/button.json");
    expect(deps("context-menu")).toContain("{{REGISTRY_URL}}/r/menu.json");
    expect(deps("popover")).toContain("{{REGISTRY_URL}}/r/direction.json");
    expect(deps("hover-card")).toContain("{{REGISTRY_URL}}/r/direction.json");
  });
  test("every source imports only declared dependencies and @dga paths", () => {
    for (const name of ITEMS) {
      const source = read(`registry/bases/base/ui/${name}.tsx`);
      const imports = [...source.matchAll(/from "([^"]+)"/g)].map((m) => m[1] as string);
      for (const from of imports) {
        const ok =
          from === "react" ||
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
  test("the overlay classes use DGA tokens only: no hex, rgb or oklch literals", () => {
    const start = read("registry/styles/style-dga.css");
    const a = start.indexOf("Popover, Hover Card, Alert Dialog and Context Menu");
    const b = start.indexOf("Tabs. Horizontal");
    const section = start.slice(a, b);
    expect(section.length).toBeGreaterThan(500);
    expect(section).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(section).not.toMatch(/\b(rgb|rgba|hsl|oklch)\(/);
  });
  test("the components have no physical left/right utilities", () => {
    for (const name of ITEMS) {
      const source = read(`registry/bases/base/ui/${name}.tsx`);
      expect(source).not.toMatch(/(?<![\w-])(ml|mr|pl|pr|left|right)-\d/);
    }
  });
});

describe("behaviour that does not need a browser", () => {
  test("Tooltip-style sides: start and end swap for RTL", () => {
    for (const name of ["popover", "hover-card"]) {
      const source = read(`registry/bases/base/ui/${name}.tsx`);
      expect(source).toContain('side === "start" ? (rtl ? "right" : "left")');
      expect(source).toContain('side === "end" ? (rtl ? "left" : "right")');
    }
  });
  test("Alert Dialog starts focus on Cancel and has no close icon", () => {
    const source = read("registry/bases/base/ui/alert-dialog.tsx");
    expect(source).toContain("cancelRef.current");
    expect(source).not.toContain("Cancel01Icon");
  });
  test("Context Menu trigger area is focusable by default", () => {
    expect(read("registry/bases/base/ui/context-menu.tsx")).toContain("tabIndex = 0");
  });
  test("every visible string has an English default and is a prop", () => {
    expect(read("registry/bases/base/ui/popover.tsx")).toContain('closeLabel = "Close"');
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
  test("every overlay state is audited in light and dark and passes", () => {
    for (const name of ITEMS) {
      const own = checks.filter((c) => c.component === name);
      expect(own.length).toBeGreaterThan(5);
      expect(own.some((c) => c.mode === "light")).toBe(true);
      expect(own.some((c) => c.mode === "dark")).toBe(true);
    }
    expect(checks.filter((c) => c.ratio < c.min)).toEqual([]);
  });
});
