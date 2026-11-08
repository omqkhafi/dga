// Phase 7 inputs: Slider (DGA), Input OTP, Toggle, Toggle Group, Input Group and Button Group.
// Checks the registry entries, the dependencies, DGA-token-only styling and the Arabic API text.
import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import allowlist from "./locale-allowlist.json";

const SLUGS = ["slider", "input-otp", "toggle", "toggle-group", "input-group", "button-group"];
const read = (path: string) => readFileSync(path, "utf8");

type Item = {
  name: string;
  type: string;
  dependencies: string[];
  registryDependencies: string[];
  files: { path: string; type: string; target: string }[];
};
const registry = JSON.parse(read("registry/registry.json")) as { items: Item[] };
const item = (name: string) => registry.items.find((i) => i.name === name) as Item;

describe("registry entries", () => {
  test("every item exists, installs to components/dga and sits after the switch", () => {
    const names = registry.items.map((i) => i.name);
    expect(names.indexOf("slider")).toBe(names.indexOf("switch") + 1);
    for (const slug of SLUGS) {
      const entry = item(slug);
      expect(entry?.type).toBe("registry:ui");
      expect(entry.files).toEqual([
        {
          path: `bases/base/ui/${slug}.tsx`,
          type: "registry:ui",
          target: `components/dga/${slug}.tsx`,
        },
      ]);
    }
  });

  test("they reuse existing @dga items instead of duplicating them", () => {
    const deps = (slug: string) =>
      item(slug).registryDependencies.map((d) =>
        d.replace("{{REGISTRY_URL}}/r/", "").replace(".json", ""),
      );
    expect(deps("toggle")).toContain("button");
    expect(deps("toggle-group")).toEqual(expect.arrayContaining(["toggle", "direction"]));
    expect(deps("button-group")).toEqual(expect.arrayContaining(["button", "divider"]));
    expect(deps("input-group")).toContain("input");
    expect(deps("input-otp")).toEqual(expect.arrayContaining(["input", "number-input"]));
    expect(deps("slider")).toContain("direction");
  });

  test("every @dga import in the source is declared, and no new package is needed", () => {
    for (const slug of SLUGS) {
      const source = read(`registry/bases/base/ui/${slug}.tsx`);
      const declared = item(slug).registryDependencies.map((d) =>
        d.replace("{{REGISTRY_URL}}/r/", "").replace(".json", ""),
      );
      for (const [, name] of source.matchAll(/from "@\/components\/dga\/([\w-]+)"/g)) {
        expect(declared).toContain(name as string);
      }
      // Base UI covers every primitive: nothing beyond the packages the style already installs.
      for (const dep of item(slug).dependencies) {
        expect([
          "@base-ui/react",
          "class-variance-authority",
          "@hugeicons/react",
          "@hugeicons/core-free-icons",
        ]).toContain(dep);
      }
    }
  });
});

describe("source", () => {
  test("styles come only from cn-* classes, with no hex or rgb colours", () => {
    for (const slug of SLUGS) {
      const source = read(`registry/bases/base/ui/${slug}.tsx`);
      expect(source).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
      expect(source).not.toMatch(/\b(?:rgb|hsl|oklch)\(/);
      expect(source).toMatch(/cn-/);
    }
  });

  test("the style section uses only DGA tokens", () => {
    const css = read("registry/styles/style-dga.css");
    const start = css.indexOf("Slider (DGA Slider");
    const end = css.indexOf("File Upload.");
    const section = css.slice(start, end);
    expect(section).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
    expect(section).not.toMatch(
      /(?<![\w-])(?:text|bg|border)-(?:red|green|blue|gray|slate|zinc|white|black)(?:-\d+)?(?![\w-])/,
    );
  });

  test("Input OTP keeps digits left to right and numeric", () => {
    const source = read("registry/bases/base/ui/input-otp.tsx");
    expect(source).toContain('dir="ltr"');
    expect(source).toContain('inputMode="numeric"');
    expect(source).toContain("normalizeDigits");
  });

  test("Toggle Group takes its direction from the page", () => {
    expect(read("registry/bases/base/ui/toggle-group.tsx")).toContain("AutoDirection");
    expect(read("registry/bases/base/ui/slider.tsx")).toContain("AutoDirection");
  });

  test("the preview map is a server module that does not use client", () => {
    expect(read("apps/docs/components/previews/ext-inputs.tsx")).not.toMatch(/^"use client"/m);
    expect(read("apps/docs/components/previews/ext-inputs-demos.tsx")).toContain('"use client"');
  });
});

describe("docs", () => {
  test("every page exists in both languages and the extensions say so", () => {
    for (const slug of SLUGS) {
      const en = read(`apps/docs/content/docs/components/${slug}.mdx`);
      const ar = read(`apps/docs/content/docs/components/${slug}.ar.mdx`);
      expect(en.includes("<ExtensionNote")).toBe(slug !== "slider");
      expect(ar.includes("<ExtensionNote")).toBe(slug !== "slider");
      expect(en).toContain(`<ApiReference component="${slug}" />`);
      expect(ar).toContain(`<ComponentContrast component="${slug}" />`);
    }
  });

  test("every preview a page names exists", () => {
    const names = [
      ...read("apps/docs/components/previews/ext-inputs.tsx").matchAll(
        /^\s+"([a-z-]+)": [A-Z]\w+,$/gm,
      ),
    ].map((m) => m[1]);
    for (const slug of SLUGS) {
      for (const file of [`${slug}.mdx`, `${slug}.ar.mdx`]) {
        const page = read(`apps/docs/content/docs/components/${file}`);
        for (const [, name] of page.matchAll(
          /<(?:Preview|DirectionCompare)[^>]*\bname="([a-z-]+)"/g,
        )) {
          expect(names).toContain(name as string);
        }
      }
    }
  });
});

describe("Arabic API descriptions", () => {
  const ALLOWED = new Set(allowlist.words.map((w) => w.toLowerCase()));
  const latinWords = (text: string) =>
    (
      text
        .replace(/`[^`]*`/g, " ")
        .replace(/\{[\w.]+\}/g, " ")
        .match(/[A-Za-z][\w.+-]*/g) ?? []
    ).filter((raw) => {
      const w = raw.replace(/[.-]+$/, "");
      if (w.length < 2 || ALLOWED.has(w.toLowerCase())) return false;
      if (/^[A-Z][a-z0-9]+([A-Z][a-z0-9]*)+$/.test(w) || /^[a-z]+[A-Z]\w*$/.test(w)) return false;
      return !/^[a-z0-9]+(-[a-z0-9]+)+$/.test(w);
    });

  test("every part and prop has one, in Arabic, with no English words", async () => {
    const api = JSON.parse(read("apps/docs/lib/generated/api.json")) as Record<
      string,
      {
        name: string;
        description: string;
        descriptionAr: string;
        props: { name: string; description: string; descriptionAr: string }[];
      }[]
    >;
    const bad: string[] = [];
    for (const slug of SLUGS) {
      expect(api[slug]?.length).toBeGreaterThan(0);
      for (const part of api[slug] ?? []) {
        for (const [name, en, ar] of [
          [part.name, part.description, part.descriptionAr],
          ...part.props.map(
            (p) => [`${part.name}.${p.name}`, p.description, p.descriptionAr] as const,
          ),
        ] as const) {
          if (en && !ar) bad.push(`${slug}.${name}: missing`);
          const words = latinWords(ar);
          if (words.length > 0) bad.push(`${slug}.${name}: ${words.join(", ")}`);
        }
      }
    }
    expect(bad).toEqual([]);
  });
});
