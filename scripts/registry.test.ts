import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { styleFields, tokenFields } from "./build-registry";
import { inlineStyles, loadStyleMap } from "./style-map";
import { ROOT } from "./tokens/source";

describe("dga-tokens registry item", () => {
  const fields = tokenFields();

  test("cssVars only carries shadcn variables (the CLI turns every key into a colour)", () => {
    expect(Object.keys(fields.cssVars.light)).toContain("primary");
    expect(Object.keys(fields.cssVars.light)).not.toContain("spacing-4");
    expect(Object.keys(fields.cssVars.light).length).toBeLessThan(40);
  });

  test("DGA tokens, dark scope and responsive modes are in css", () => {
    expect(Object.keys(fields.css)).toEqual(
      expect.arrayContaining([":root", '.dark, [data-theme="dark"]', "@media (width >= 48rem)"]),
    );
    const root = fields.css[":root"] as Record<string, string>;
    expect(root["--background-body"]).toBe("var(--colors-neutral-50)");
  });

  test("theme exposes Figma-identical and short alias utilities", () => {
    expect(fields.cssVars.theme["color-text-primary"]).toBe("var(--text-primary)");
    expect(fields.cssVars.theme["text-color-primary"]).toBe("var(--text-primary)");
    expect(fields.cssVars.theme["background-color-body"]).toBe("var(--background-body)");
  });
});

test("dga-style stays small: only imports, tokens come from dga-tokens", () => {
  const style = styleFields();
  expect(Object.keys(style.css)).toEqual([
    '@import "tw-animate-css"',
    '@import "shadcn/tailwind.css"',
  ]);
  const registry = JSON.parse(readFileSync(join(ROOT, "registry", "registry.json"), "utf8")) as {
    items: { name: string; type: string; registryDependencies?: string[]; config?: unknown }[];
  };
  const item = registry.items.find((i) => i.name === "dga-style");
  expect(item?.registryDependencies).toContain("{{REGISTRY_URL}}/r/dga-tokens.json");
  const base = registry.items.find((i) => i.name === "dga");
  expect(base?.type).toBe("registry:base");
  expect(base?.config).toMatchObject({ iconLibrary: "hugeicons", rtl: true });
  expect(base?.registryDependencies).toContain("{{REGISTRY_URL}}/r/dga-style.json");
});

test("registry dependencies point at @dga items by URL, never bare shadcn names", () => {
  const registry = JSON.parse(readFileSync(join(ROOT, "registry", "registry.json"), "utf8")) as {
    items: { name: string; registryDependencies?: string[] }[];
  };
  for (const item of registry.items) {
    for (const dep of item.registryDependencies ?? []) {
      expect(dep).toStartWith("{{REGISTRY_URL}}/r/");
    }
  }
  expect(registry.items.find((i) => i.name === "utils")).toBeDefined();
});

test("cn-* classes are inlined from the style map, including compound variants and cn()", () => {
  const map = loadStyleMap(
    ".style-dga { .cn-demo { @apply ms-2 bg-primary; } .cn-x { @apply p-1; } }",
  );
  const out = inlineStyles(
    'const v = cva("cn-demo flex", { compoundVariants: [{ a: 1, class: "cn-x" }] }); cn("cn-x", ok && "cn-demo")',
    map,
  );
  expect(out).toContain('"ms-2 bg-primary flex"');
  expect(out).toContain('class: "p-1"');
  expect(out).toContain('cn("p-1", ok && "ms-2 bg-primary")');
  expect(out).not.toContain("cn-demo");
});

test("an unknown cn-* class fails the build", () => {
  expect(() => inlineStyles('cva("cn-missing")', {})).toThrow(/cn-missing/);
});

describe("install path isolation (0.4.2)", () => {
  type File = { path: string; type: string; target?: string };
  const registry = JSON.parse(readFileSync(join(ROOT, "registry", "registry.json"), "utf8")) as {
    items: { name: string; type: string; files?: File[] }[];
  };

  test("every registry:ui item installs to components/dga/<name>.tsx", () => {
    const ui = registry.items.filter((i) => i.type === "registry:ui");
    expect(ui.length).toBeGreaterThan(20);
    for (const item of ui) {
      expect(item.files?.map((f) => f.target)).toEqual([`components/dga/${item.name}.tsx`]);
    }
  });

  test("the direction helper installs to lib/dga, not a name shadcn projects may use", () => {
    const item = registry.items.find((i) => i.name === "direction");
    expect(item?.files?.[0]?.target).toBe("lib/dga/direction.tsx");
  });

  test("no source imports components/ui or the registry paths; only cn is shared", () => {
    for (const item of registry.items) {
      for (const file of item.files ?? []) {
        const source = readFileSync(join(ROOT, "registry", file.path), "utf8");
        expect(source).not.toContain("components/ui");
        expect(source).not.toMatch(/@\/registry\/bases\/base\/(ui|components)/);
        expect(source).not.toMatch(/@\/lib\/direction/);
      }
    }
  });
});
