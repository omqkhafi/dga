// Decides which CI jobs a change needs. Used by the `changes` job of .github/workflows/ci.yml:
//
//   bun scripts/ci/affected.ts --base <sha> --head <sha>     (reads the event from GITHUB_EVENT_NAME)
//   bun scripts/ci/affected.ts --files a,b,c [--event pull_request]   (dry run, no git)
//
// A push to main, a manual run, and any change we cannot classify run everything. Only paths named
// here narrow a run, so a new kind of file is safe by default.

import { appendFileSync, existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { $ } from "bun";

// No imports from the rest of the repo: the `changes` job runs this before `bun install`.
const ROOT = join(import.meta.dir, "..", "..");

type Item = {
  name: string;
  type: string;
  registryDependencies?: string[];
  files?: { path: string }[];
};
type E2eMap = {
  groups: string[];
  /** groups whose page loops follow E2E_COMPONENTS */
  scoped: string[];
  /** how many component pages those loops cover in a full run */
  pages: number;
  shell: string[];
  weights: Record<string, number>;
  components: Record<string, string[]>;
  previews: Record<string, string[]>;
  contentOther: string[];
};

export type Plan = {
  full: boolean;
  docsOnly: boolean;
  /** lint-only PR that still needs the cheap CHANGELOG unit test */
  changelogTest: boolean;
  check: boolean;
  install: { run: boolean; items: string[] | "all" };
  e2e: { run: boolean; groups: string[]; shards: number; components: string[] };
  lighthouse: boolean;
  reasons: string[];
};

const readMap = (): E2eMap =>
  JSON.parse(readFileSync(join(ROOT, "scripts/ci/e2e-map.json"), "utf8"));

const nameFromUrl = (url: string) => /\/r\/([^/]+)\.json$/.exec(url)?.[1];

/** The items that need a re-test when `names` change: the items themselves and everything that
 *  depends on them, directly or through other items. */
export function withDependants(items: Item[], names: Iterable<string>): Set<string> {
  const dependants = new Map<string, string[]>();
  for (const item of items) {
    for (const dep of item.registryDependencies ?? []) {
      const dependency = nameFromUrl(dep) ?? dep;
      dependants.set(dependency, [...(dependants.get(dependency) ?? []), item.name]);
    }
  }
  const seen = new Set<string>(names);
  const queue = [...seen];
  while (queue.length > 0) {
    const next = queue.pop() as string;
    for (const dependant of dependants.get(next) ?? []) {
      if (!seen.has(dependant)) {
        seen.add(dependant);
        queue.push(dependant);
      }
    }
  }
  return seen;
}

/** Items whose entry differs between the base and head registry.json. `null` = an item was removed. */
function changedItems(base: Item[], head: Item[]): Set<string> | null {
  const before = new Map(base.map((i) => [i.name, JSON.stringify(i)]));
  const changed = new Set<string>();
  for (const item of head)
    if (before.get(item.name) !== JSON.stringify(item)) changed.add(item.name);
  for (const name of before.keys()) if (!head.some((i) => i.name === name)) return null;
  return changed;
}

const FULL_TRIGGERS: [RegExp, string][] = [
  [/^\.github\//, "CI configuration"],
  [/^(package\.json|bun\.lock|tsconfig.*\.json|biome\.json)$/, "toolchain or dependencies"],
  [
    /^apps\/docs\/(package\.json|tsconfig\.json|next\.config\.mjs|source\.config\.ts|proxy\.ts)$/,
    "docs app configuration",
  ],
  [/^(tokens\/|scripts\/tokens\/|scripts\/generate-tokens\.ts$)/, "design tokens"],
  [/^registry\/styles\//, "registry style and theme"],
  [/^registry\/(package|tsconfig)[^/]*\.json$/, "registry toolchain"],
  [/^scripts\/ci\//, "CI scripts"],
];
const FULL_E2E: [RegExp, string][] = [
  [/^scripts\/e2e/, "e2e harness"],
  [/^apps\/docs\/components\/preview\//, "preview"],
  [/^apps\/docs\/app\/\(preview\)\//, "preview"],
  [/^apps\/docs\/app\/\[lang\]\/layout\.tsx$/, "layout"],
  [/^apps\/docs\/app\/layout\.tsx$/, "layout"],
  [/^apps\/docs\/(lib\/(i18n|locale-context|preview|dictionary)|proxy)/, "locale"],
  [/^apps\/docs\/app\/global\.css$/, "global CSS"],
  [/^registry\/bases\/base\/lib\//, "shared registry library"],
];
const FULL_INSTALL = /^scripts\/(build-registry|install-test|style-map)\.ts$/;
const LIGHTHOUSE = [
  /^apps\/docs\/app\/(\[lang\]\/)?layout\.tsx$/,
  /^apps\/docs\/app\/\[lang\]\/\(home\)\//,
  /^apps\/docs\/app\/global\.css$/,
  /^apps\/docs\/components\/(shell|home)\//,
  /^apps\/docs\/next\.config\.mjs$/,
  /^apps\/docs\/lib\/fonts\.ts$/,
];
/** Committed output of the generators: it changes with its source, which decides the run. */
const GENERATED = /^apps\/docs\/(public\/r\/|registry\/|lib\/generated\/)/;
const CHECK_ONLY = /^scripts\/(api-[^/]+|build-api|translations|[^/]+\.test)\.ts$/;

const isDocs = (file: string) =>
  (/\.md$/.test(file) && !/^(skills|registry|tokens|apps\/docs\/public)\//.test(file)) ||
  /^docs\//.test(file) ||
  file === "LICENSE";

/** One shard per ~SHARD_SECONDS of expected work, at most MAX_SHARDS, so a small selection does not
 *  start four runners that each install Chromium for a few seconds of tests. */
const SHARD_SECONDS = 90;
const MAX_SHARDS = 4;
function shard(groups: string[], map: E2eMap, components: string[] = []): Plan["e2e"] {
  // form-pages and polish loop over component pages; scoped to some pages they take a fraction.
  const scale =
    components.length > 0 ? Math.min(1, Math.max(0.1, components.length / map.pages)) : 1;
  const total = groups.reduce(
    (n, g) => n + (map.weights[g] ?? 1) * (map.scoped.includes(g) ? scale : 1),
    0,
  );
  return {
    run: true,
    groups,
    components,
    shards: Math.min(MAX_SHARDS, Math.max(1, Math.ceil(total / SHARD_SECONDS))),
  };
}

export function plan(
  files: string[],
  opts: {
    event?: string;
    items: Item[];
    baseItems?: Item[] | null;
    map: E2eMap;
    groups: string[];
  },
): Plan {
  const { items, map } = opts;
  const reasons: string[] = [];
  const out: Plan = {
    full: false,
    docsOnly: false,
    changelogTest: false,
    check: true,
    install: { run: false, items: [] },
    e2e: { run: false, groups: [], shards: 0, components: [] },
    lighthouse: false,
    reasons,
  };
  const all = () => {
    out.full = true;
    out.install = { run: true, items: "all" };
    out.e2e = shard(opts.groups, map);
    out.lighthouse = true;
  };

  if (opts.event && opts.event !== "pull_request") {
    reasons.push(`${opts.event}: full suite`);
    all();
    return out;
  }
  if (files.length === 0) {
    reasons.push("no changed files could be listed: full suite");
    all();
    return out;
  }
  if (files.every(isDocs)) {
    out.docsOnly = true;
    out.check = false;
    out.changelogTest = files.includes("CHANGELOG.md");
    reasons.push("documentation only: lint" + (out.changelogTest ? " and the CHANGELOG test" : ""));
    return out;
  }

  for (const file of files) {
    const hit = FULL_TRIGGERS.find(([re]) => re.test(file));
    if (hit) {
      reasons.push(`${hit[1]} (${file}): full suite`);
      all();
      return out;
    }
  }

  const changed = new Set<string>();
  const e2e = new Set<string>();
  /** component pages the page loops should visit, besides the affected items */
  const pages = new Set<string>();
  let e2eFull = false;
  let installFull = false;
  const registryFile = new Map<string, string>();
  for (const item of items)
    for (const f of item.files ?? []) registryFile.set(`registry/${f.path}`, item.name);

  for (const file of files) {
    if (isDocs(file) || GENERATED.test(file) || CHECK_ONLY.test(file)) continue;
    const full = FULL_E2E.find(([re]) => re.test(file));
    if (full) {
      e2eFull = true;
      reasons.push(`${full[1]} (${file}): all browser checks`);
    }
    if (FULL_INSTALL.test(file)) {
      installFull = true;
      reasons.push(`${file}: every item installed`);
    }
    if (LIGHTHOUSE.some((re) => re.test(file))) {
      out.lighthouse = true;
      reasons.push(`${file}: Lighthouse`);
    }
    if (file === "registry/registry.json") {
      const diff = opts.baseItems ? changedItems(opts.baseItems, items) : null;
      if (!diff) {
        installFull = true;
        reasons.push("registry.json: item removed or unreadable, every item installed");
      } else for (const name of diff) changed.add(name);
      continue;
    }
    const item = registryFile.get(file);
    if (item) {
      changed.add(item);
      continue;
    }
    const component = /^apps\/docs\/content\/docs\/components\/([^/.]+)(\.ar)?\.mdx$/.exec(
      file,
    )?.[1];
    if (component) {
      const groups = map.components[component];
      pages.add(component);
      if (groups) for (const g of groups) e2e.add(g);
      else e2eFull = true;
      continue;
    }
    if (/^skills\//.test(file)) {
      e2e.add("ai-resources");
      continue;
    }
    if (/^apps\/docs\/content\//.test(file)) {
      for (const g of map.contentOther) e2e.add(g);
      continue;
    }
    const preview = /^apps\/docs\/components\/previews\/([^/]+)$/.exec(file)?.[1];
    if (preview) {
      const groups = map.previews[preview];
      if (groups) for (const g of groups) e2e.add(g);
      else {
        e2eFull = true;
        reasons.push(`${file}: unmapped preview, all browser checks`);
      }
      continue;
    }
    if (/^apps\/docs\/components\/shell\//.test(file)) {
      reasons.push(`${file}: shared shell`);
      continue;
    }
    if (/^registry\//.test(file) || /^apps\/docs\//.test(file)) {
      e2eFull = true;
      reasons.push(`${file}: not mapped to a component, all browser checks`);
    }
  }

  const affected = withDependants(items, changed);
  const uiAffected = items
    .filter((i) => i.type === "registry:ui" && affected.has(i.name))
    .map((i) => i.name);
  if (
    [...affected].some(
      (n) => items.find((i) => i.name === n)?.type !== "registry:ui" && /^dga(-|$)/.test(n),
    )
  ) {
    installFull = true;
    reasons.push("the style, tokens or base item changed: every item installed");
  }
  if (changed.size > 0) {
    reasons.push(
      `registry: ${[...changed].join(", ")} changed, ${affected.size - changed.size} dependant(s) also tested`,
    );
  }
  for (const name of affected) for (const g of map.components[name] ?? []) e2e.add(g);

  if (installFull) out.install = { run: true, items: "all" };
  else if (uiAffected.length > 0) out.install = { run: true, items: uiAffected };

  const touchesSite = files.some(
    (f) => /^(apps\/docs\/|registry\/|skills\/)/.test(f) && !GENERATED.test(f),
  );
  if (e2eFull) out.e2e = shard(opts.groups, map);
  else if (touchesSite || out.lighthouse) {
    out.e2e = shard(
      opts.groups.filter((g) => map.shell.includes(g) || e2e.has(g)),
      map,
      [...new Set([...affected, ...pages])],
    );
  }
  if (!out.e2e.run) reasons.push("no browser-visible change: no e2e");
  return out;
}

async function changedFiles(base: string, head: string): Promise<string[]> {
  const run = await $`git diff --name-only ${base}...${head}`.cwd(ROOT).nothrow().quiet();
  if (run.exitCode !== 0) return [];
  return run.stdout.toString().split("\n").filter(Boolean);
}

async function baseRegistry(base: string): Promise<Item[] | null> {
  const run = await $`git show ${base}:registry/registry.json`.cwd(ROOT).nothrow().quiet();
  return run.exitCode === 0 ? (JSON.parse(run.stdout.toString()).items as Item[]) : null;
}

if (import.meta.main) {
  const arg = (name: string) => {
    const i = process.argv.indexOf(`--${name}`);
    return i > -1 ? process.argv[i + 1] : undefined;
  };
  const items = (
    JSON.parse(readFileSync(join(ROOT, "registry/registry.json"), "utf8")) as { items: Item[] }
  ).items;

  const map = readMap();
  const event = arg("event") ?? process.env.GITHUB_EVENT_NAME ?? "pull_request";
  const filesArg = arg("files");
  const base = arg("base");
  const files = filesArg
    ? filesArg.split(",")
    : base
      ? await changedFiles(base, arg("head") ?? "HEAD")
      : [];
  const result = plan(files, {
    event,
    items,
    baseItems: base ? await baseRegistry(base) : null,
    map,
    groups: map.groups,
  });
  const lines: Record<string, string> = {
    full: String(result.full),
    docs_only: String(result.docsOnly),
    changelog_test: String(result.changelogTest),
    check: String(result.check),
    install: String(result.install.run),
    install_items: result.install.items === "all" ? "all" : result.install.items.join(","),
    e2e: String(result.e2e.run),
    e2e_groups: result.e2e.groups.join(","),
    e2e_components: result.e2e.components.join(","),
    e2e_shards: String(result.e2e.shards),
    e2e_matrix: JSON.stringify(Array.from({ length: result.e2e.shards }, (_, i) => i + 1)),
    lighthouse: String(result.lighthouse),
  };
  const summary = [
    "### What this change runs",
    "",
    ...Object.entries(lines).map(([k, v]) => `- \`${k}\`: ${v || "(none)"}`),
    "",
    ...result.reasons.map((r) => `- ${r}`),
  ].join("\n");
  console.log(summary);
  if (process.env.GITHUB_OUTPUT) {
    appendFileSync(
      process.env.GITHUB_OUTPUT,
      `${Object.entries(lines)
        .map(([k, v]) => `${k}=${v}`)
        .join("\n")}\n`,
    );
  }
  if (process.env.GITHUB_STEP_SUMMARY && existsSync(process.env.GITHUB_STEP_SUMMARY)) {
    appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${summary}\n`);
  }
}
