// Phase 7 (0.7.0), Combobox, Command and Digital Stamp. Logic that needs no browser lives here;
// keyboard behaviour, RTL and the dialog are checked in scripts/e2e-extension/misc.mjs.
import { describe, expect, test } from "bun:test";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { matchesQuery, normalizeArabic } from "../registry/bases/base/ui/combobox";
import { API_DESCRIPTIONS_AR } from "./api-descriptions-ar";
import { auditContrast, buildModel } from "./tokens/model";
import { ROOT } from "./tokens/source";

const ITEMS = ["combobox", "command", "digital-stamp"];
const EXTENSIONS = ["combobox", "command"];
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

describe("normalizeArabic", () => {
  test("ignores diacritics and tatweel", () => {
    expect(normalizeArabic("مَدْرَسَة")).toBe(normalizeArabic("مدرسة"));
    expect(normalizeArabic("كـتـاب")).toBe("كتاب");
  });
  test("treats the alef forms as one", () => {
    for (const form of ["أحمد", "إحمد", "آحمد", "ٱحمد"]) {
      expect(normalizeArabic(form)).toBe(normalizeArabic("احمد"));
    }
  });
  test("treats alef maqsura as ya, ta marbuta as ha, hamza on waw and ya as plain", () => {
    expect(normalizeArabic("مستشفى")).toBe(normalizeArabic("مستشفي"));
    expect(normalizeArabic("إقامة")).toBe(normalizeArabic("اقامه"));
    expect(normalizeArabic("مؤسسة")).toBe(normalizeArabic("موسسه"));
    expect(normalizeArabic("رئيس")).toBe(normalizeArabic("رييس"));
  });
  test("reads Arabic-Indic and Persian digits as Western ones", () => {
    expect(normalizeArabic("١٢٣")).toBe("123");
    expect(normalizeArabic("۴۵۶")).toBe("456");
  });
  test("is case-insensitive and collapses spaces", () => {
    expect(normalizeArabic("  Renew   PASSPORT ")).toBe("renew passport");
  });
});

describe("matchesQuery", () => {
  const option = { value: "id", label: "إصدار هوية وطنية", keywords: ["identity"] };
  test("matches inside words, whatever the spelling variant", () => {
    expect(matchesQuery(option, "هويه")).toBe(true);
    expect(matchesQuery(option, "اصدار")).toBe(true);
    expect(matchesQuery(option, "وطنيه")).toBe(true);
  });
  test("matches keywords and the value, ignoring case", () => {
    expect(matchesQuery(option, "IDENT")).toBe(true);
    expect(matchesQuery(option, "id")).toBe(true);
  });
  test("an empty query matches everything and a stranger matches nothing", () => {
    expect(matchesQuery(option, "")).toBe(true);
    expect(matchesQuery(option, "   ")).toBe(true);
    expect(matchesQuery(option, "رخصة")).toBe(false);
  });
  test("the create row always shows", () => {
    expect(matchesQuery({ value: "x", label: "Add “zzz”", creatable: "zzz" }, "zzz")).toBe(true);
    expect(matchesQuery({ value: "x", label: "Add “zzz”", creatable: "zzz" }, "other")).toBe(true);
  });
});

describe("registry items", () => {
  test("each is a registry:ui item installed under components/dga", () => {
    for (const name of ITEMS) {
      const entry = item(name);
      expect(entry.type).toBe("registry:ui");
      expect(entry.files).toHaveLength(1);
      expect(entry.files[0]?.target).toBe(`components/dga/${name}.tsx`);
      expect(existsSync(join(ROOT, "registry", entry.files[0]?.path as string))).toBe(true);
    }
  });
  test("it declares the @dga items it imports", () => {
    for (const name of ITEMS) {
      const source = read(`registry/bases/base/ui/${name}.tsx`);
      const imported = [...source.matchAll(/from "@\/components\/dga\/([a-z-]+)"/g)].map(
        (m) => m[1] as string,
      );
      const declared = (item(name).registryDependencies ?? []).map(
        (d) => /\/r\/([a-z-]+)\.json$/.exec(d)?.[1],
      );
      for (const dependency of imported) expect(declared).toContain(dependency);
      if (source.includes("@/lib/dga/direction")) expect(declared).toContain("direction");
    }
  });
  test("Command reuses Combobox, Input and Dialog", () => {
    const names = (item("command").registryDependencies ?? []).map((d) => d.split("/r/")[1]);
    expect(names).toEqual(expect.arrayContaining(["combobox.json", "input.json", "dialog.json"]));
  });
  test("no new package: only Base UI and Hugeicons, and no cmdk", () => {
    for (const name of ITEMS) {
      const deps = item(name).dependencies ?? [];
      expect(deps.every((d) => /^@(base-ui|hugeicons)\//.test(d))).toBe(true);
    }
    const pkg = read("registry/package.json");
    expect(pkg).not.toContain("cmdk");
  });
  test("the Header declares no extra dependency for the stamp slot", () => {
    const header = item("header");
    expect(header.registryDependencies?.some((d) => d.includes("digital-stamp"))).toBe(false);
    expect(read("registry/bases/base/ui/header.tsx")).toContain("stamp?: React.ReactNode");
  });
});

describe("source rules", () => {
  test("no hex colours and no Arabic in the components: strings are props", () => {
    for (const name of ITEMS) {
      const source = read(`registry/bases/base/ui/${name}.tsx`);
      expect(/#[0-9a-fA-F]{3,8}\b/.test(source.replace(/&#\d+;/g, ""))).toBe(false);
      // The Arabic search normaliser has to name Arabic letters; nothing else may.
      const outside = source
        .split("\n")
        .filter((line) => !/\.replace\(|^\s*\*|^\s*\/\//.test(line))
        .join("\n");
      expect(/[؀-ۿ]/.test(outside)).toBe(false);
    }
  });
  test("logical properties only", () => {
    const physical =
      /(?<![\w-])-?(ml|mr|pl|pr|left|right|border-l|border-r|rounded-l|rounded-r)-[\w[]|text-(left|right)\b/;
    for (const name of ITEMS) {
      const source = read(`registry/bases/base/ui/${name}.tsx`);
      expect(physical.test(source)).toBe(false);
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
  test("the style map only uses DGA tokens: no raw colour functions", () => {
    const css = read("registry/styles/style-dga.css");
    const start = css.indexOf("Combobox (Platform Code extension");
    expect(start).toBeGreaterThan(0);
    const section = css.slice(start);
    expect(/(#[0-9a-fA-F]{3,8}\b|rgb\(|hsl\(|oklch\()/.test(section)).toBe(false);
  });
});

describe("docs", () => {
  const map = read("apps/docs/components/previews/ext-misc-map.ts");
  const previews = [...map.matchAll(/"([a-z-]+)":/g)].map((m) => m[1] as string);
  // The Header preview is listed in the index itself, where the older tests look for it.
  previews.push("header-stamp");
  expect(read("apps/docs/components/previews/index.tsx")).toContain('"header-stamp": HeaderStamp');
  test("both languages exist and use only listed previews", () => {
    for (const name of ITEMS) {
      for (const file of [`${name}.mdx`, `${name}.ar.mdx`]) {
        expect(existsSync(join(ROOT, "apps/docs/content/docs/components", file))).toBe(true);
        const page = read(`apps/docs/content/docs/components/${file}`);
        for (const m of page.matchAll(/<(?:Preview|DirectionCompare)[^>]*\bname="([^"]+)"/g)) {
          expect(previews).toContain(m[1] as string);
        }
      }
    }
  });
  test("the extension pages carry the note, the Digital Stamp page does not", () => {
    for (const name of EXTENSIONS) {
      for (const file of [`${name}.mdx`, `${name}.ar.mdx`]) {
        expect(read(`apps/docs/content/docs/components/${file}`)).toContain("<ExtensionNote");
      }
    }
    for (const file of ["digital-stamp.mdx", "digital-stamp.ar.mdx"]) {
      expect(read(`apps/docs/content/docs/components/${file}`)).not.toContain("<ExtensionNote");
    }
  });
  test("the Header pages document the stamp slot", () => {
    for (const file of ["header.mdx", "header.ar.mdx"]) {
      const page = read(`apps/docs/content/docs/components/${file}`);
      expect(page).toContain("stamp");
      expect(page).toContain("digital-stamp");
    }
  });
});

describe("Arabic API descriptions", () => {
  test("every part and prop has one, and the Header stamp slot too", () => {
    const api = JSON.parse(read("apps/docs/lib/generated/api.json")) as Record<
      string,
      {
        name: string;
        description: string;
        descriptionAr: string;
        props: { name: string; description: string; descriptionAr: string }[];
      }[]
    >;
    for (const slug of ITEMS) {
      for (const part of api[slug] ?? []) {
        if (part.description) expect(part.descriptionAr).not.toBe("");
        for (const prop of part.props) {
          if (prop.description) expect(prop.descriptionAr).not.toBe("");
        }
      }
    }
    expect(API_DESCRIPTIONS_AR["header.Header.stamp"]).toBeTruthy();
  });
});

describe("audit and deviations", () => {
  const model = buildModel();
  test("every component has audited states in light and dark, all passing", () => {
    const audit = auditContrast(model);
    for (const name of ITEMS) {
      const checks = audit.filter((c) => c.component === name);
      expect(checks.length).toBeGreaterThan(5);
      expect(new Set(checks.map((c) => c.mode))).toEqual(new Set(["light", "dark"]));
      expect(checks.filter((c) => c.ratio < c.min)).toEqual([]);
    }
  });
  test("each has a Deviations entry, and the extensions are logged as new, no DGA source", () => {
    for (const name of ITEMS) {
      expect(model.deviations.some((d) => d.component === name)).toBe(true);
    }
    for (const name of EXTENSIONS) {
      const entries = model.deviations.filter((d) => d.component === name);
      expect(entries.every((d) => d.area === "Extensions")).toBe(true);
      expect(entries.some((d) => /new, no DGA source/i.test(d.reason))).toBe(true);
    }
    // The Digital Stamp is a DGA component (its wording and artwork follow DGA), not an extension.
    expect(model.deviations.some((d) => d.component === "digital-stamp")).toBe(true);
  });
  test("no colour token was added for these components", () => {
    const added = model.deviations.filter(
      (d) => ITEMS.includes(d.component ?? "") && /\(new\)$/.test(d.item),
    );
    expect(added).toEqual([]);
  });
  test("Deviation texts are English: no Arabic letters", () => {
    const arabic = /[؀-ٟ٭-ۯۺ-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/;
    const bad = model.deviations
      .filter((d) => ITEMS.includes(d.component ?? ""))
      .filter((d) => arabic.test(`${d.item} ${d.original} ${d.ours} ${d.reason}`));
    expect(bad).toEqual([]);
  });
});
