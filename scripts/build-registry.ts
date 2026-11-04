// Builds the installable registry into apps/docs/public/r.
//
// 1. Fill dga-tokens' cssVars/css from the token model (tokens.json is the only source).
//    dga-style only carries the CSS imports and depends on dga-tokens, so it stays small.
// 2. Inline the cn-* style map (registry/styles/style-dga.css) into every component,
//    the same way shadcn builds its base-nova/base-* styles.
// 3. Run `shadcn build` on the composed registry.
//
// REGISTRY_URL overrides the public URL used in cross-item dependencies (for local install tests).

import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { $ } from "bun";
import { createStyleMap, transformStyle } from "shadcn/utils";
import {
  BASE_LAYER,
  DARK_VARIANT,
  darkScopeVars,
  lightScopeVars,
  rootVars,
  shadcnVars,
  themeEntries,
  type Vars,
  viewportVars,
} from "./tokens/emit";
import { MODE_MIN_WIDTH } from "./tokens/fixes";
import { auditContrast, buildModel } from "./tokens/model";
import { ROOT } from "./tokens/source";

export const DEFAULT_REGISTRY_URL = "https://dga.omqkhafi.dev";

type RegistryFile = { path: string; type: string; target?: string };
type RegistryItem = {
  name: string;
  type: string;
  files?: RegistryFile[];
  cssVars?: Record<string, Record<string, string>>;
  css?: Record<string, unknown>;
  [key: string]: unknown;
};
type Registry = { items: RegistryItem[]; [key: string]: unknown };

const toObject = (vars: Vars) => Object.fromEntries(vars);
const toDeclarations = (vars: Vars) => Object.fromEntries(vars.map(([k, v]) => [`--${k}`, v]));

export function tokenFields() {
  const model = buildModel();
  const failing = auditContrast(model).filter((c) => c.ratio < c.min);
  if (failing.length > 0)
    throw new Error(`${failing.length} contrast checks fail. Run bun run tokens.`);

  const { tablet, desktop } = viewportVars(model);
  // Only shadcn variables go in cssVars: the CLI adds a --color-* theme entry for every
  // cssVars key, which would turn spacing/radius/primitive tokens into colour utilities.
  const shadcnKeys = new Set(shadcnVars().map(([k]) => k));
  const dgaOnly = (vars: Vars) => vars.filter(([k]) => !shadcnKeys.has(k));
  return {
    cssVars: {
      theme: toObject(themeEntries(model)),
      light: toObject(shadcnVars()),
      dark: toObject(shadcnVars()),
    },
    css: {
      [DARK_VARIANT.replace(/;$/, "")]: {},
      ":root": { "color-scheme": "light", ...toDeclarations(dgaOnly(rootVars(model))) },
      [`@media (width >= ${MODE_MIN_WIDTH.tablet})`]: { ":root": toDeclarations(tablet) },
      [`@media (width >= ${MODE_MIN_WIDTH.desktop})`]: { ":root": toDeclarations(desktop) },
      '.light, [data-theme="light"]': {
        "color-scheme": "light",
        ...toDeclarations(lightScopeVars(model)),
      },
      '.dark, [data-theme="dark"]': {
        "color-scheme": "dark",
        ...toDeclarations(darkScopeVars(model)),
      },
      "@layer base": BASE_LAYER,
    },
  };
}

export function styleFields() {
  return {
    css: { '@import "tw-animate-css"': {}, '@import "shadcn/tailwind.css"': {} },
  };
}

export async function composeRegistry(outDir: string, registryUrl = DEFAULT_REGISTRY_URL) {
  const source = readFileSync(join(ROOT, "registry", "registry.json"), "utf8").replaceAll(
    "{{REGISTRY_URL}}",
    registryUrl.replace(/\/$/, ""),
  );
  const registry = JSON.parse(source) as Registry;
  const styleMap = createStyleMap(
    readFileSync(join(ROOT, "registry", "styles", "style-dga.css"), "utf8"),
  );

  for (const item of registry.items) {
    if (item.name === "dga-tokens") Object.assign(item, tokenFields());
    if (item.name === "dga-style") Object.assign(item, styleFields());
    for (const file of item.files ?? []) {
      const from = join(ROOT, "registry", file.path);
      const to = join(outDir, file.path);
      mkdirSync(dirname(to), { recursive: true });
      if (/\.tsx?$/.test(file.path)) {
        writeFileSync(to, await transformStyle(readFileSync(from, "utf8"), { styleMap }));
      } else {
        cpSync(from, to);
      }
    }
  }

  writeFileSync(join(outDir, "registry.json"), `${JSON.stringify(registry, null, 2)}\n`);
  return registry;
}

if (import.meta.main) {
  const registryUrl = process.env.REGISTRY_URL ?? DEFAULT_REGISTRY_URL;
  const output = process.env.REGISTRY_OUTPUT ?? join(ROOT, "apps", "docs", "public", "r");
  const work = join(ROOT, ".registry-build");
  rmSync(work, { recursive: true, force: true });
  mkdirSync(work, { recursive: true });

  const registry = await composeRegistry(work, registryUrl);
  rmSync(output, { recursive: true, force: true });
  await $`${join(ROOT, "node_modules", ".bin", "shadcn")} build ${join(work, "registry.json")} --output ${output} --cwd ${work}`.quiet();
  rmSync(work, { recursive: true, force: true });
  console.log(`✓ built ${registry.items.length} registry items → ${output}`);
}
