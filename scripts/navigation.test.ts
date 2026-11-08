// Phase 5 (0.5.0): Breadcrumb, Pagination, Table of Contents, Card, List, Table, Data Table,
// Rating, Progress and Stepper. Logic that needs no browser lives here; keyboard behaviour and
// RTL are checked in scripts/e2e.mjs (navigationChecks).
import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { getPaginationRange } from "../registry/bases/base/ui/pagination";
import { buildModel } from "./tokens/model";
import { ROOT } from "./tokens/source";

const NAVIGATION = [
  "breadcrumb",
  "pagination",
  "table-of-contents",
  "card",
  "list",
  "table",
  "data-table",
  "rating",
  "progress",
  "stepper",
];

describe("getPaginationRange", () => {
  test("shows every page while they fit", () => {
    expect(getPaginationRange(1, 5)).toEqual([1, 2, 3, 4, 5]);
    expect(getPaginationRange(4, 7)).toEqual([1, 2, 3, 4, 5, 6, 7]);
  });
  test("keeps seven slots with an ellipsis at the end near the start", () => {
    expect(getPaginationRange(1, 20)).toEqual([1, 2, 3, 4, 5, "end-ellipsis", 20]);
    expect(getPaginationRange(3, 20)).toEqual([1, 2, 3, 4, 5, "end-ellipsis", 20]);
  });
  test("has an ellipsis on both sides in the middle", () => {
    expect(getPaginationRange(10, 20)).toEqual([
      1,
      "start-ellipsis",
      9,
      10,
      11,
      "end-ellipsis",
      20,
    ]);
  });
  test("keeps seven slots with an ellipsis at the start near the end", () => {
    expect(getPaginationRange(20, 20)).toEqual([1, "start-ellipsis", 16, 17, 18, 19, 20]);
  });
  test("the number of slots does not change while paging", () => {
    const lengths = new Set(
      Array.from({ length: 20 }, (_, i) => getPaginationRange(i + 1, 20).length),
    );
    expect([...lengths]).toEqual([7]);
  });
  test("siblingCount widens the window", () => {
    expect(getPaginationRange(10, 30, 2)).toEqual([
      1,
      "start-ellipsis",
      8,
      9,
      10,
      11,
      12,
      "end-ellipsis",
      30,
    ]);
  });
  test("a page out of range is clamped", () => {
    expect(getPaginationRange(99, 20).at(-1)).toBe(20);
  });
});

describe("registry", () => {
  const registry = JSON.parse(readFileSync(join(ROOT, "registry", "registry.json"), "utf8")) as {
    items: {
      name: string;
      type: string;
      dependencies?: string[];
      registryDependencies?: string[];
    }[];
  };
  test("every navigation item is a registry:ui item installed to components/dga", () => {
    for (const name of NAVIGATION) {
      const item = registry.items.find((i) => i.name === name);
      expect(item?.type).toBe("registry:ui");
    }
  });
  test("Data Table pulls in Table, Pagination, Checkbox and Skeleton and TanStack Table", () => {
    const item = registry.items.find((i) => i.name === "data-table");
    for (const dep of ["table", "pagination", "checkbox", "skeleton"]) {
      expect(item?.registryDependencies).toContain(`{{REGISTRY_URL}}/r/${dep}.json`);
    }
    // Pinned to v8: the registry must not pull in TanStack Table v9, whose API is different.
    expect(item?.dependencies).toContain("@tanstack/react-table@8.21.3");
    const source = readFileSync(join(ROOT, "registry/bases/base/ui/data-table.tsx"), "utf8");
    expect(source).toContain('"@/components/dga/pagination"');
  });
  test("Rating needs the direction helper; List needs Radio; Card needs Checkbox", () => {
    const need = (name: string) =>
      registry.items.find((i) => i.name === name)?.registryDependencies ?? [];
    expect(need("rating")).toContain("{{REGISTRY_URL}}/r/direction.json");
    expect(need("list")).toContain("{{REGISTRY_URL}}/r/radio.json");
    expect(need("card")).toContain("{{REGISTRY_URL}}/r/checkbox.json");
  });
});

/** The names registered in apps/docs/components/previews/index.tsx. */
const previewNames = [
  ...readFileSync(join(ROOT, "apps/docs/components/previews/index.tsx"), "utf8").matchAll(
    /^\s*"?([a-z0-9-]+)"?:\s+[A-Z]\w+,$/gm,
  ),
].map((m) => m[1] as string);

describe("docs", () => {
  test("every component has an English and an Arabic page and previews for its examples", () => {
    for (const name of NAVIGATION) {
      for (const file of [`${name}.mdx`, `${name}.ar.mdx`]) {
        expect(existsSync(join(ROOT, "apps/docs/content/docs/components", file))).toBe(true);
      }
      const page = readFileSync(
        join(ROOT, `apps/docs/content/docs/components/${name}.mdx`),
        "utf8",
      );
      for (const preview of page.matchAll(/<(?:Preview|DirectionCompare)[^>]*\bname="([^"]+)"/g)) {
        expect(previewNames).toContain(preview[1] as string);
      }
    }
  });
  test("the components are in the sidebar in both languages", () => {
    for (const file of ["meta.json", "meta.ar.json"]) {
      const pages = (
        JSON.parse(readFileSync(join(ROOT, "apps/docs/content/docs/components", file), "utf8")) as {
          pages: string[];
        }
      ).pages;
      for (const name of NAVIGATION) expect(pages).toContain(name);
    }
  });
});

describe("audit and deviations", () => {
  const model = buildModel();
  test("every component has audited states in light and dark", async () => {
    const { auditContrast } = await import("./tokens/model");
    const audit = auditContrast(model);
    for (const name of NAVIGATION) {
      const checks = audit.filter((c) => c.component === name);
      expect(checks.length).toBeGreaterThan(3);
      expect(new Set(checks.map((c) => c.mode))).toEqual(new Set(["light", "dark"]));
      expect(checks.filter((c) => c.ratio < c.min)).toEqual([]);
    }
  });
  test("Deviations lists the DGA problems found, one entry per component at least", () => {
    for (const name of NAVIGATION) {
      expect(model.deviations.some((d) => d.component === name)).toBe(true);
    }
  });
  test("Deviation texts are English: no Arabic letters (they show on English pages as they are)", () => {
    const arabic =
      /[\u0600-\u065F\u066D-\u06EF\u06FA-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;
    const bad = model.deviations
      .filter((d) => arabic.test(`${d.item} ${d.original} ${d.ours} ${d.reason}`))
      .map((d) => d.item);
    expect(bad).toEqual([]);
  });
  test("the Figma typos are renamed", () => {
    const css = readFileSync(join(ROOT, "registry/styles/dga/tokens.css"), "utf8");
    expect(css).not.toContain("upcomming");
    expect(css).not.toContain("boarder");
    expect(css).toContain("--stepper-button-upcoming:");
    expect(css).toContain("--table-border-row-selected-hovered:");
  });
  test("stripes are visible: the alternate row differs from the row in both modes", () => {
    const css = readFileSync(join(ROOT, "registry/styles/dga/tokens.css"), "utf8");
    const blocks = css.split('[data-theme="dark"] {');
    const value = (block: string, name: string) =>
      new RegExp(`--${name}: ([^;]+);`).exec(block)?.[1];
    for (const block of [blocks[0] as string, blocks[1] as string]) {
      expect(value(block, "table-background-row")).not.toBe(
        value(block, "table-background-row-alt"),
      );
    }
  });
});
