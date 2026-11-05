// Generates apps/docs/lib/generated/api.json: the props of every exported component in
// registry/bases/base/ui, read from the TypeScript types and their JSDoc comments.
//   bun scripts/build-api.ts          write the file
//   bun scripts/build-api.ts --check  fail if it is out of date

import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import ts from "typescript";
import { API_DESCRIPTIONS_AR } from "./api-descriptions-ar";
import { API_NOTES } from "./api-notes";
import type { Api, ApiPart, ApiProp } from "./api-types";
import { ROOT } from "./tokens/source";

const UI = join(ROOT, "registry", "bases", "base", "ui");
const OUT = join(ROOT, "apps", "docs", "lib", "generated", "api.json");

/**
 * The type as text. A union of string or number literals is listed in the order its members
 * first appear in the source, so the table reads the way the code does and is the same on
 * every machine (TypeScript orders union members by type id, which depends on load order).
 */
function typeText(checker: ts.TypeChecker, type: ts.Type, text: string) {
  const flags =
    ts.TypeFormatFlags.NoTruncation | ts.TypeFormatFlags.UseAliasDefinedOutsideCurrentScope;
  if (type.isUnion() && type.types.every((t) => t.isStringLiteral() || t.isNumberLiteral())) {
    // T-shirt sizes read in scale order, whatever the source order.
    const scale = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"];
    const strings = type.types
      .filter((t) => t.isStringLiteral())
      .map((t) => (t as ts.StringLiteralType).value);
    const position = (t: ts.Type) => {
      if (t.isStringLiteral() && strings.some((v) => scale.includes(v))) {
        const i = scale.indexOf(t.value);
        if (i !== -1) return i - 1000;
      }
      const literal = t.isStringLiteral()
        ? `"${t.value}"`
        : String((t as ts.NumberLiteralType).value);
      const at = text.indexOf(literal);
      return at === -1 ? Number.MAX_SAFE_INTEGER : at;
    };
    return [...type.types]
      .sort((a, b) => position(a) - position(b))
      .map((t) => checker.typeToString(t, undefined, flags))
      .join(" | ");
  }
  return checker.typeToString(type, undefined, flags);
}

/** The Arabic description for a key, or an error if an English description has none. */
function arabic(key: string, hasEnglish: boolean) {
  const text = API_DESCRIPTIONS_AR[key] ?? "";
  if (hasEnglish && !text) {
    throw new Error(`Missing Arabic description for ${key} in scripts/api-descriptions-ar.ts`);
  }
  return text;
}

export function buildApi(): Api {
  // Sorted: readdir order differs between filesystems, and the order files load in decides
  // how TypeScript orders union members, so an unsorted list gives a different api.json on CI.
  const files = readdirSync(UI)
    .filter((f) => f.endsWith(".tsx"))
    .sort()
    .map((f) => join(UI, f));
  const program = ts.createProgram(files, {
    jsx: ts.JsxEmit.ReactJSX,
    strict: true,
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    skipLibCheck: true,
    noEmit: true,
    baseUrl: ROOT,
    paths: { "@/registry/*": ["apps/docs/registry/*"] },
  });
  const checker = program.getTypeChecker();
  const api: Api = {};

  for (const file of files) {
    const source = program.getSourceFile(file);
    if (!source) continue;
    const slug = file
      .split("/")
      .pop()
      ?.replace(/\.tsx$/, "") as string;
    const moduleSymbol = checker.getSymbolAtLocation(source);
    if (!moduleSymbol) continue;
    const parts: ApiPart[] = [];

    // Defaults that come from cva `defaultVariants` (not destructured in the function).
    const variantDefaults = new Map<string, string>();
    const visit = (node: ts.Node) => {
      if (
        ts.isPropertyAssignment(node) &&
        node.name.getText() === "defaultVariants" &&
        ts.isObjectLiteralExpression(node.initializer)
      ) {
        for (const p of node.initializer.properties) {
          if (ts.isPropertyAssignment(p))
            variantDefaults.set(p.name.getText(), p.initializer.getText());
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(source);

    // The Base UI primitive the file wraps, for the "also accepts" note.
    let inherits: ApiPart["inherits"] = null;
    for (const stmt of source.statements) {
      if (ts.isImportDeclaration(stmt) && ts.isStringLiteral(stmt.moduleSpecifier)) {
        const m = /^@base-ui\/react\/([a-z-]+)$/.exec(stmt.moduleSpecifier.text);
        if (m?.[1] && !inherits && !["merge-props", "use-render"].includes(m[1])) {
          const name = m[1];
          inherits = {
            name: name.replace(/(^|-)([a-z])/g, (_, __, c: string) => c.toUpperCase()),
            url: `https://base-ui.com/react/components/${name}`,
          };
        }
      }
    }

    for (const symbol of checker.getExportsOfModule(moduleSymbol)) {
      const real = symbol.flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(symbol) : symbol;
      const decl = real.valueDeclaration;
      if (!decl || !ts.isFunctionDeclaration(decl)) continue;
      const name = real.getName();
      if (!/^[A-Z]/.test(name)) continue;
      const param = decl.parameters[0];
      if (!param) continue;

      const defaults = new Map<string, string>();
      if (ts.isObjectBindingPattern(param.name)) {
        for (const el of param.name.elements) {
          if (el.initializer)
            defaults.set((el.propertyName ?? el.name).getText(), el.initializer.getText());
        }
      }

      const type = checker.getTypeAtLocation(param);
      const props: ApiProp[] = [];
      // Props in the order the source lists them (cva variants first), not TypeScript's
      // internal order, which depends on which files were loaded first.
      const ordered = checker
        .getPropertiesOfType(type)
        .map((prop) => ({ prop, at: source.text.search(new RegExp(`\\b${prop.getName()}\\b`)) }))
        .sort(
          (a, b) =>
            (a.at === -1 ? Number.MAX_SAFE_INTEGER : a.at) -
              (b.at === -1 ? Number.MAX_SAFE_INTEGER : b.at) ||
            a.prop.getName().localeCompare(b.prop.getName()),
        )
        .map((x) => x.prop);
      for (const prop of ordered) {
        const declarations = prop.getDeclarations() ?? [];
        const from = declarations[0]?.getSourceFile().fileName ?? "";
        // Ours: declared in this repo or by class-variance-authority. Base UI, React and DOM
        // props are covered by the "also accepts" note.
        const own = !from.includes("node_modules") || from.includes("class-variance-authority");
        const note =
          API_NOTES[`${slug}.${name}.${prop.getName()}`] ?? API_NOTES[`${slug}.${prop.getName()}`];
        if (!own && !note?.include) continue;
        const propType = checker.getTypeOfSymbolAtLocation(prop, decl);
        const optional = (prop.flags & ts.SymbolFlags.Optional) !== 0;
        const text = typeText(checker, checker.getNonNullableType(propType), source.text);
        const jsdoc = ts.displayPartsToString(prop.getDocumentationComment(checker)).trim();
        props.push({
          name: prop.getName(),
          type: note?.type ?? text,
          default: defaults.get(prop.getName()) ?? variantDefaults.get(prop.getName()) ?? null,
          required: !optional,
          description: (jsdoc || note?.description || "").replace(/\s+/g, " "),
          descriptionAr: arabic(
            `${slug}.${name}.${prop.getName()}`,
            Boolean(jsdoc || note?.description),
          ),
        });
      }
      const doc = ts.displayPartsToString(real.getDocumentationComment(checker)).trim();
      parts.push({
        name,
        description: doc.replace(/\s+/g, " ") || API_NOTES[`${slug}.${name}`]?.description || "",
        descriptionAr: arabic(
          `${slug}.${name}`,
          Boolean(doc || API_NOTES[`${slug}.${name}`]?.description),
        ),
        inherits,
        props,
      });
    }
    if (parts.length > 0) api[slug] = parts;
  }
  return api;
}

if (import.meta.main) {
  const next = `${JSON.stringify(buildApi(), null, 2)}\n`;
  if (process.argv.includes("--check")) {
    let current = "";
    try {
      current = readFileSync(OUT, "utf8");
    } catch {}
    if (current !== next) {
      console.error("✗ apps/docs/lib/generated/api.json is out of date. Run `bun run api`.");
      process.exit(1);
    }
  } else writeFileSync(OUT, next);
  console.log("API reference OK.");
}
