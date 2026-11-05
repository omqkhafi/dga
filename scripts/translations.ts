// Keeps the Arabic docs in step with the English ones.
//
//   bun scripts/translations.ts --check          fail if an Arabic page is missing, outdated or has a different structure
//   bun scripts/translations.ts --stamp [files]  record the hash of the English source in each Arabic page (all, or the files given)
//
// Every apps/docs/content/docs/**/*.ar.mdx records `sourceHash`, the hash of the English page it
// was translated from. When the English page changes, the hash no longer matches: CI fails, and
// the site would show a "translation may be out of date" banner. Whoever changes the English page
// updates the Arabic page and runs `--stamp` on it, which is the sign that the translation was
// reviewed against the new English text.

import { createHash } from "node:crypto";
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join, relative } from "node:path";
import { ROOT } from "./tokens/source";

const CONTENT = join(ROOT, "apps", "docs", "content", "docs");

const walk = (dir: string): string[] =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });

/** Same normalisation as apps/docs/lib/translations.ts. */
export const hashSource = (text: string) =>
  createHash("sha256")
    .update(`${text.replace(/\r\n/g, "\n").trimEnd()}\n`)
    .digest("hex")
    .slice(0, 12);

export const englishOf = (arPath: string) => arPath.replace(/\.ar\.(mdx|json)$/, ".$1");

const frontmatter = (text: string) => /^---\n([\s\S]*?)\n---/.exec(text)?.[1] ?? "";
const recordedHash = (text: string) =>
  /^sourceHash:\s*["']?([0-9a-f]{6,64})["']?\s*$/m.exec(frontmatter(text))?.[1] ?? null;

const body = (text: string) => text.replace(/^---\n[\s\S]*?\n---\n?/, "");

/** The parts of a page that must be the same in both languages: components, headings, code fences. */
export function structure(text: string) {
  const content = body(text);
  const fences = [...content.matchAll(/^```(\w*)/gm)]
    .filter((_, i) => i % 2 === 0)
    .map((m) => m[1]);
  const withoutCode = content.replace(/```[\s\S]*?```/g, "");
  return {
    components: [...withoutCode.matchAll(/<([A-Z][A-Za-z]+)\b/g)].map((m) => m[1]),
    headings: [...withoutCode.matchAll(/^(#{2,3}) /gm)].map((m) => m[1]),
    fences,
  };
}

const pagesOf = (json: string) =>
  (JSON.parse(json) as { pages?: string[] }).pages?.filter((p) => !p.startsWith("---")) ?? [];

function check() {
  const problems: string[] = [];
  const all = walk(CONTENT);
  const english = all.filter((f) => /\.mdx$/.test(f) && !/\.ar\.mdx$/.test(f));
  const rel = (f: string) => relative(CONTENT, f);

  for (const en of english) {
    const ar = en.replace(/\.mdx$/, ".ar.mdx");
    if (!all.includes(ar)) {
      problems.push(`${rel(en)}: no Arabic page (${rel(ar)}). Every page ships in both languages.`);
      continue;
    }
    const enText = readFileSync(en, "utf8");
    const arText = readFileSync(ar, "utf8");
    const recorded = recordedHash(arText);
    if (!recorded) problems.push(`${rel(ar)}: no sourceHash. Run \`bun run translations:stamp\`.`);
    else if (recorded !== hashSource(enText))
      problems.push(
        `${rel(ar)}: outdated. ${rel(en)} changed after this translation was reviewed (recorded ${recorded}, now ${hashSource(enText)}). Update the Arabic page, then run \`bun run translations:stamp ${rel(ar)}\`.`,
      );
    const a = structure(enText);
    const b = structure(arText);
    for (const key of ["components", "headings", "fences"] as const) {
      if (JSON.stringify(a[key]) !== JSON.stringify(b[key]))
        problems.push(
          `${rel(ar)}: ${key} differ from ${rel(en)} (English ${a[key].length}, Arabic ${b[key].length}). Both languages keep the same ${key}.`,
        );
    }
  }
  for (const ar of all.filter((f) => /\.ar\.mdx$/.test(f))) {
    if (!all.includes(englishOf(ar)))
      problems.push(`${rel(ar)}: no English page to translate from.`);
  }
  for (const json of all.filter((f) => /\/meta\.json$/.test(f))) {
    const ar = json.replace(/\.json$/, ".ar.json");
    if (!all.includes(ar)) {
      problems.push(`${rel(json)}: no ${rel(ar)} (Arabic sidebar titles).`);
      continue;
    }
    if (
      JSON.stringify(pagesOf(readFileSync(json, "utf8"))) !==
      JSON.stringify(pagesOf(readFileSync(ar, "utf8")))
    )
      problems.push(`${rel(ar)}: the page list differs from ${rel(json)}.`);
  }
  if (problems.length > 0) {
    for (const p of problems) console.error(`✗ ${p}`);
    console.error(`${problems.length} translation problem(s).`);
    process.exit(1);
  }
  console.log(`Translations OK: ${english.length} pages, each with a current Arabic page.`);
}

function stamp(files: string[]) {
  const targets = (files.length ? files.map((f) => join(process.cwd(), f)) : walk(CONTENT)).flatMap(
    (f) => {
      const abs = f.startsWith(CONTENT) ? f : join(CONTENT, relative(CONTENT, f));
      return /\.ar\.mdx$/.test(abs) ? [abs] : [];
    },
  );
  let changed = 0;
  for (const ar of targets) {
    const en = englishOf(ar);
    const hash = hashSource(readFileSync(en, "utf8"));
    const text = readFileSync(ar, "utf8");
    if (recordedHash(text) === hash) continue;
    const next = /^sourceHash:/m.test(frontmatter(text))
      ? text.replace(/^sourceHash:.*$/m, `sourceHash: ${hash}`)
      : text.replace(/^(---\n[\s\S]*?)\n---/, `$1\nsourceHash: ${hash}\n---`);
    writeFileSync(ar, next);
    changed++;
    console.log(`✓ ${relative(CONTENT, ar)} → ${hash}`);
  }
  console.log(changed ? `${changed} page(s) stamped.` : "Every recorded hash is already current.");
}

if (import.meta.main) {
  const [mode, ...rest] = process.argv.slice(2);
  if (mode === "--check") check();
  else if (mode === "--stamp") stamp(rest);
  else {
    console.error("Usage: bun scripts/translations.ts --check | --stamp [files]");
    process.exit(2);
  }
}
