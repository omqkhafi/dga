import { describe, expect, test } from "bun:test";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { plan, type withDependants } from "./affected";

const ROOT = join(import.meta.dir, "..", "..");
const items = (
  JSON.parse(readFileSync(join(ROOT, "registry/registry.json"), "utf8")) as {
    items: Parameters<typeof withDependants>[0];
  }
).items;
const map = JSON.parse(readFileSync(join(ROOT, "scripts/ci/e2e-map.json"), "utf8"));
const run = (files: string[], event = "pull_request") =>
  plan(files, { event, items, map, groups: map.groups });

describe("e2e map", () => {
  test("lists the groups of scripts/e2e.mjs in order", () => {
    const source = readFileSync(join(ROOT, "scripts/e2e.mjs"), "utf8");
    const block = source.slice(
      source.indexOf("const GROUPS = ["),
      source.indexOf("const names = GROUPS"),
    );
    const names = [...block.matchAll(/\[\s*"([a-z-]+)",/g)].map((m) => m[1]);
    expect(map.groups).toEqual(names);
  });
  test("every registry component and group name in it exists", () => {
    const ui = items.filter((i) => i.type === "registry:ui").map((i) => i.name);
    expect(ui.filter((n) => !(n in map.components))).toEqual([]);
    const used = [
      ...map.shell,
      ...map.scoped,
      ...map.contentOther,
      ...Object.values<string[]>(map.components).flat(),
      ...Object.values<string[]>(map.previews).flat(),
    ];
    expect(used.filter((g) => !map.groups.includes(g))).toEqual([]);
    expect(Object.keys(map.weights).sort()).toEqual([...map.groups].sort());
  });
  test("preview files that are not mapped are the shared ones", () => {
    const files = readdirSync(join(ROOT, "apps/docs/components/previews"));
    expect(files.filter((f) => !(f in map.previews)).sort()).toEqual([
      "bi.tsx",
      "foundations.tsx",
      "index.tsx",
      "kit.tsx",
    ]);
  });
});

describe("what a pull request runs", () => {
  test("documentation only: lint, nothing else", () => {
    const p = run(["README.md", "ROADMAP.md", "CONTRIBUTING.md", "docs/design-system/README.md"]);
    expect(p).toMatchObject({ docsOnly: true, check: false, changelogTest: false });
    expect(p.install.run || p.e2e.run || p.lighthouse).toBe(false);
  });
  test("CHANGELOG keeps its cheap unit test", () => {
    expect(run(["CHANGELOG.md"])).toMatchObject({ docsOnly: true, changelogTest: true });
  });
  test("markdown the site reads is not documentation only", () => {
    expect(run(["skills/platform-code/SKILL.md"]).docsOnly).toBe(false);
    expect(run(["skills/platform-code/SKILL.md"]).e2e.groups).toContain("ai-resources");
  });
  test("push to main, manual runs and an empty diff run everything", () => {
    for (const p of [
      run(["README.md"], "push"),
      run(["README.md"], "workflow_dispatch"),
      run([]),
    ]) {
      expect(p.full).toBe(true);
      expect(p.install.items).toBe("all");
      expect(p.e2e.groups).toEqual(map.groups);
      expect(p.lighthouse).toBe(true);
    }
  });
  test("a tokens change runs the full suite", () => {
    for (const file of [
      "scripts/tokens/color.ts",
      "tokens/tokens.json",
      "scripts/generate-tokens.ts",
    ]) {
      const p = run([file]);
      expect(p).toMatchObject({ full: true, check: true, lighthouse: true });
      expect(p.install.items).toBe("all");
      expect(p.e2e.groups).toEqual(map.groups);
    }
  });
  test("workflow and dependency changes run the full suite", () => {
    expect(run([".github/workflows/ci.yml"]).full).toBe(true);
    expect(run(["bun.lock"]).full).toBe(true);
  });
  test("one component: its install, its groups and its dependants only", () => {
    const p = run(["registry/bases/base/ui/breadcrumb.tsx"]);
    expect(p.full).toBe(false);
    expect(p.install).toEqual({ run: true, items: ["breadcrumb"] });
    expect(p.e2e.groups).toEqual(expect.arrayContaining([...map.shell, "navigation"]));
    expect(p.e2e.groups).not.toContain("composite");
    expect(p.e2e.components).toEqual(["breadcrumb"]);
    expect(p.lighthouse).toBe(false);
  });
  test("dependants are tested too", () => {
    const p = run(["registry/bases/base/ui/dialog.tsx"]);
    expect(p.install.items).toContain("dialog");
    expect(p.install.items).toContain("alert-dialog");
    expect(p.e2e.groups).toContain("ext-overlays");
  });
  test("a library file reaches every item that uses it", () => {
    const p = run(["registry/bases/base/lib/utils.ts"]);
    expect(p.e2e.groups).toEqual(map.groups);
    expect(p.install.items).not.toEqual([]);
  });
  test("shared code runs every browser group", () => {
    for (const file of [
      "apps/docs/components/preview/preview.tsx",
      "apps/docs/app/[lang]/layout.tsx",
      "apps/docs/lib/locale-context.tsx",
      "apps/docs/components/previews/kit.tsx",
      "scripts/e2e.mjs",
    ]) {
      expect(run([file]).e2e.groups).toEqual(map.groups);
    }
  });
  test("shell and global CSS changes run Lighthouse and the shell groups", () => {
    const p = run(["apps/docs/components/shell/header.tsx"]);
    expect(p.lighthouse).toBe(true);
    expect(p.e2e.groups).toEqual(map.shell);
    expect(run(["apps/docs/app/global.css"]).lighthouse).toBe(true);
  });
  test("a component page does not run Lighthouse", () => {
    expect(run(["apps/docs/content/docs/components/button.mdx"]).lighthouse).toBe(false);
  });
  test("a unit test file alone needs no browser and no install", () => {
    const p = run(["scripts/forms.test.ts"]);
    expect(p).toMatchObject({ check: true });
    expect(p.install.run || p.e2e.run).toBe(false);
  });
  test("an unknown path under apps/docs runs every browser group", () => {
    expect(run(["apps/docs/lib/something-new.ts"]).e2e.groups).toEqual(map.groups);
  });
  test("one shard for a small run, four for the full suite", () => {
    expect(run(["apps/docs/components/shell/header.tsx"]).e2e.shards).toBe(1);
    expect(run(["scripts/tokens/color.ts"]).e2e.shards).toBe(4);
  });
});
