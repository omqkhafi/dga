// Generates DGA UI token files from tokens/tokens.json.
//   bun scripts/generate-tokens.ts          write files
//   bun scripts/generate-tokens.ts --check  fail if files are stale or contrast fails

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { docsData } from "./tokens/docs-data";
import { themeCss, themeEntries, tokensCss } from "./tokens/emit";
import { auditContrast, buildModel } from "./tokens/model";
import { ROOT } from "./tokens/source";

const check = process.argv.includes("--check");
const model = buildModel();

// Guard against two tokens landing on the same Tailwind theme key.
const seen = new Map<string, string>();
for (const [key, value] of themeEntries(model)) {
  const previous = seen.get(key);
  if (previous !== undefined && previous !== value) {
    throw new Error(`Duplicate @theme key --${key}: ${previous} vs ${value}`);
  }
  seen.set(key, value);
}

const failing = auditContrast(model).filter((c) => c.ratio < c.min);
if (failing.length > 0) {
  for (const f of failing) {
    console.error(
      `✗ ${f.mode}: --${f.fg} on --${f.bg} is ${f.ratio.toFixed(2)}:1 (needs ${f.min}:1)`,
    );
  }
  console.error(
    `${failing.length} contrast check(s) fail WCAG AA. Add an override in scripts/tokens/fixes.ts.`,
  );
  process.exit(1);
}

const json = (value: unknown) => `${JSON.stringify(value, null, 2)}\n`;

const outputs: Record<string, string> = {
  "registry/styles/dga/tokens.css": tokensCss(model),
  "registry/styles/dga/theme.css": themeCss(model),
  "apps/docs/lib/generated/tokens.json": json(docsData(model)),
  "apps/docs/lib/generated/deviations.json": json(model.deviations),
};

let stale = 0;
for (const [path, content] of Object.entries(outputs)) {
  const file = join(ROOT, path);
  let current: string | null = null;
  try {
    current = readFileSync(file, "utf8");
  } catch {}
  if (current === content) continue;
  if (check) {
    console.error(`✗ ${path} is out of date. Run \`bun run tokens\`.`);
    stale++;
    continue;
  }
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, content);
  console.log(`✓ wrote ${relative(ROOT, file)}`);
}

if (stale > 0) process.exit(1);
console.log(
  `Tokens OK: ${model.themes.size} semantic, ${model.primitives.size} primitive, ${auditContrast(model).length} contrast checks pass, ${model.deviations.length} deviations.`,
);
