import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createStyleMap, transformStyle } from "shadcn/utils";
import { styleFields } from "./build-registry";
import { ROOT } from "./tokens/source";

describe("dga-style registry item", () => {
  const fields = styleFields();

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

test("cn-* classes are inlined from the style map", async () => {
  const map = createStyleMap(".style-dga { .cn-demo { @apply ms-2 bg-primary; } }");
  const out = await transformStyle('export const A = () => <div className="cn-demo flex" />', {
    styleMap: map,
  });
  expect(out).toContain("ms-2 bg-primary flex");
  expect(out).not.toContain("cn-demo");
});
