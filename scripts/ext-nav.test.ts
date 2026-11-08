// Phase 7 part 2 (0.7.1), Menubar, Navigation Menu and Sidebar. Logic that needs no browser lives
// here; keyboard behaviour, RTL, the icon rail and the phone Drawer are checked in
// scripts/e2e-extension/nav.mjs.
import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { parseSidebarState, SIDEBAR_COOKIE_NAME } from "../registry/bases/base/ui/sidebar";
import { auditContrast, buildModel } from "./tokens/model";
import { ROOT } from "./tokens/source";

const ITEMS = ["menubar", "navigation-menu", "sidebar"];
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
const dependsOn = (name: string) =>
  (item(name).registryDependencies ?? []).map((d) => d.split("/r/")[1]?.replace(".json", "") ?? "");

describe("parseSidebarState", () => {
  test("reads the saved state from a cookie header", () => {
    expect(parseSidebarState(`a=1; ${SIDEBAR_COOKIE_NAME}=false; b=2`)).toBe(false);
    expect(parseSidebarState(`${SIDEBAR_COOKIE_NAME}=true`)).toBe(true);
  });
  test("returns undefined when nothing, or something else, is saved", () => {
    expect(parseSidebarState("")).toBeUndefined();
    expect(parseSidebarState("a=1; b=2")).toBeUndefined();
    expect(parseSidebarState(`${SIDEBAR_COOKIE_NAME}=maybe`)).toBeUndefined();
  });
  test("uses the cookie name it is given", () => {
    expect(
      parseSidebarState("dga_docs_sidebar=false; sidebar_state=true", "dga_docs_sidebar"),
    ).toBe(false);
    expect(parseSidebarState("sidebar_state=false", "other")).toBeUndefined();
  });
});

describe("registry items", () => {
  test("each installs to components/dga and declares its @dga dependencies", () => {
    for (const name of ITEMS) {
      const i = item(name);
      expect(i.type).toBe("registry:ui");
      expect(i.files).toEqual([
        {
          path: `bases/base/ui/${name}.tsx`,
          type: "registry:ui",
          target: `components/dga/${name}.tsx`,
        },
      ]);
      expect(dependsOn(name)).toContain("utils");
    }
    expect(dependsOn("menubar")).toEqual(expect.arrayContaining(["menu", "direction"]));
    expect(dependsOn("navigation-menu")).toContain("direction");
    expect(dependsOn("sidebar")).toEqual(
      expect.arrayContaining(["button", "collapsible", "drawer", "tooltip"]),
    );
  });
  test("the sources import the @dga items they declare, at the install path", () => {
    expect(read("registry/bases/base/ui/menubar.tsx")).toContain('"@/components/dga/menu"');
    const sidebar = read("registry/bases/base/ui/sidebar.tsx");
    for (const name of ["button", "collapsible", "drawer", "tooltip"]) {
      expect(sidebar).toContain(`"@/components/dga/${name}"`);
    }
  });
  test("no new package: only Base UI, Hugeicons and cva", () => {
    for (const name of ITEMS) {
      const deps = item(name).dependencies ?? [];
      expect(deps.every((d) => /^(@base-ui|@hugeicons)\/|^class-variance-authority$/.test(d))).toBe(
        true,
      );
    }
  });
});

describe("source rules", () => {
  test("no hex colours and no Arabic in the components: strings are props", () => {
    for (const name of ITEMS) {
      const source = read(`registry/bases/base/ui/${name}.tsx`);
      expect(/#[0-9a-fA-F]{3,8}\b/.test(source.replace(/&#\d+;/g, ""))).toBe(false);
      expect(/[؀-ۿ]/.test(source)).toBe(false);
    }
  });
  test("logical properties only", () => {
    const physical =
      /(?<![\w-])-?(ml|mr|pl|pr|left|right|border-l|border-r|rounded-l|rounded-r)-[\w[]|text-(left|right)\b/;
    for (const name of ITEMS) {
      expect(physical.test(read(`registry/bases/base/ui/${name}.tsx`))).toBe(false);
    }
  });
  test("every cn-* class used is defined in the style map", () => {
    const css = read("registry/styles/style-dga.css");
    for (const name of ITEMS) {
      const source = read(`registry/bases/base/ui/${name}.tsx`);
      for (const [cls] of source.matchAll(/(?<![\w/-])cn-[a-z0-9-]+(?![\w-])/g)) {
        expect(css).toContain(`.${cls} {`);
      }
    }
  });
  test("the style map of this stream only uses DGA tokens: no raw colour functions", () => {
    const css = read("registry/styles/style-dga.css");
    const section = css.slice(css.indexOf("/* STREAM nav"), css.indexOf("/* END nav */"));
    expect(section.length).toBeGreaterThan(1000);
    expect(/(#[0-9a-fA-F]{3,8}\b|rgb\(|hsl\(|oklch\()/.test(section)).toBe(false);
  });
  test("every string is a prop: the defaults are English", () => {
    const sidebar = read("registry/bases/base/ui/sidebar.tsx");
    for (const prop of ["mobileTitle", "mobileDescription", "closeLabel", "label"]) {
      expect(sidebar).toMatch(new RegExp(`${prop} = "`));
    }
  });
  test("the sidebar is inert when hidden and the keyboard shortcut can be turned off", () => {
    const sidebar = read("registry/bases/base/ui/sidebar.tsx");
    expect(sidebar).toContain("inert=");
    expect(sidebar).toContain("shortcut === false");
    expect(sidebar).toContain("aria-expanded={isMobile ? openMobile : open}");
  });
});

describe("docs", () => {
  const map = read("apps/docs/components/previews/ext-nav-map.ts");
  const previews = [...map.matchAll(/"([a-z-]+)":/g)].map((m) => m[1] as string);
  test("every preview in the map is used by the English and the Arabic page of its component", () => {
    for (const name of previews) {
      const owner = ITEMS.find((i) => name.startsWith(i)) as string;
      expect(owner).toBeDefined();
      for (const file of [`${owner}.mdx`, `${owner}.ar.mdx`]) {
        expect(read(`apps/docs/content/docs/components/${file}`)).toContain(`name="${name}"`);
      }
    }
  });
  test("both languages exist, carry the extension note and use only listed previews", () => {
    for (const name of ITEMS) {
      for (const file of [`${name}.mdx`, `${name}.ar.mdx`]) {
        expect(existsSync(join(ROOT, "apps/docs/content/docs/components", file))).toBe(true);
        const page = read(`apps/docs/content/docs/components/${file}`);
        expect(page).toContain("<ExtensionNote");
        for (const m of page.matchAll(/<(?:Preview|DirectionCompare)[^>]*\bname="([^"]+)"/g)) {
          expect(previews).toContain(m[1] as string);
        }
      }
    }
  });
  test("the pages document the keyboard, RTL and the Derivation from DGA", () => {
    for (const name of ITEMS) {
      const en = read(`apps/docs/content/docs/components/${name}.mdx`);
      expect(en).toContain("## RTL");
      expect(en).toContain("## Accessibility");
      expect(en).toContain("## Derivation from DGA");
      const ar = read(`apps/docs/content/docs/components/${name}.ar.mdx`);
      expect(ar).toContain("[#rtl]");
      expect(ar).toContain("[#derivation-from-dga]");
    }
  });
  test("the Extensions list names all three", () => {
    const list = read("apps/docs/lib/extensions.ts");
    for (const name of ITEMS) expect(list).toContain(`slug: "${name}"`);
    const slugs = read("apps/docs/lib/extension-slugs.ts");
    for (const name of ITEMS) expect(slugs).toContain(`"${name}"`);
  });
});

describe("audit and deviations", () => {
  const model = buildModel();
  test("every component has audited states in light and dark, all passing", () => {
    const audit = auditContrast(model);
    for (const name of ITEMS) {
      const checks = audit.filter((c) => c.component === name);
      expect(checks.length).toBeGreaterThan(10);
      expect(new Set(checks.map((c) => c.mode))).toEqual(new Set(["light", "dark"]));
      expect(checks.filter((c) => c.ratio < c.min)).toEqual([]);
    }
  });
  test("each is logged as an extension: new, no DGA source", () => {
    for (const name of ITEMS) {
      const entries = model.deviations.filter((d) => d.component === name);
      expect(entries.length).toBeGreaterThan(0);
      expect(entries.every((d) => d.area === "Extensions")).toBe(true);
      expect(entries.some((d) => /new, no DGA source/i.test(d.reason))).toBe(true);
    }
  });
  test("Deviation texts are English: no Arabic letters", () => {
    const arabic = /[؀-ٟ٭-ۯۺ-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/;
    const bad = model.deviations
      .filter((d) => ITEMS.includes(d.component ?? ""))
      .filter((d) => arabic.test(`${d.item} ${d.original} ${d.ours} ${d.reason}`));
    expect(bad).toEqual([]);
  });
});
