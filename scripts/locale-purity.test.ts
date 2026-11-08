// Locale purity: English pages and strings contain no Arabic, Arabic ones contain no English
// words. Allowed: code (fences, inline code, JSX attributes, URLs, anchors) and proper nouns
// (product, standard and key names). A generic English word in Arabic prose is a failure.
//
// ACCEPTED EXCEPTION (owner decision, 0.4.2, not a failure for an audit): on Arabic pages the
// generated Deviation reasons and the Contrast state labels stay in English. Their source data
// (the logged reasons, the Figma variant and state names) is English, and a full translation
// would be unclear. They are rendered as <span lang="en" dir="ltr">, and the browser audit in
// scripts/e2e.mjs skips any element marked with a language other than the page's, which is how
// they are covered. Do not translate them, and do not extend the exception to prose: only these
// two generated kinds of text may be English on an Arabic page.
import { expect, test } from "bun:test";
import { Glob } from "bun";
import { ar } from "../apps/docs/lib/dictionary/ar";
import { en } from "../apps/docs/lib/dictionary/en";
import { dirOf } from "../apps/docs/lib/i18n";
import { contentLang, previewSrc } from "../apps/docs/lib/preview";
import allowlist from "./locale-allowlist.json";

// Arabic letters and words. The Arabic-Indic digits (U+0660 to U+0669) and the decimal and
// thousands marks (U+066B, U+066C) are not words: the docs name them when they describe the
// numerals convention.
const ARABIC = /[\u0600-\u065F\u066D-\u06EF\u06FA-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;

/**
 * Proper nouns, standards, key names, component names and Hugeicons names that stay in Latin
 * script inside Arabic text (scripts/locale-allowlist.json, shared with the browser audit in
 * scripts/e2e.mjs). The same list applies to Arabic pages and to RTL preview content.
 */
const ALLOWED = new Set(allowlist.words.map((w) => w.toLowerCase()));

/** Latin words left in a string once code-like parts are removed. */
function latinWords(text: string): string[] {
  const prose = text
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/\]\([^)]*\)/g, "] ")
    .replace(/https?:\/\/\S+/g, " ")
    .replace(/\[#[\w-]+\]/g, " ")
    .replace(/<[A-Za-z][^>]*>/g, " ")
    .replace(/<\/[A-Za-z][^>]*>/g, " ")
    .replace(/\{[\w.]+\}/g, " ")
    .replace(/[\w.-]+(\/[\w.-]+)+/g, " ") // a path
    .replace(/[\w.-]+\.(txt|md|json|mdx|tsx|ts|css|dev)\b/g, " ");
  return (prose.match(/[A-Za-z][\w.+-]*/g) ?? []).filter((w) => {
    const word = w.replace(/[.-]+$/, "");
    if (ALLOWED.has(word.toLowerCase())) return false;
    if (word.length < 2) return false; // a single letter, such as a key
    if (/^v\d/.test(word)) return false; // a version
    if (/^[a-f0-9]{6,}$/.test(word)) return false; // a hash
    if (/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(word)) return false; // a domain or file name
    if (/^[A-Z][a-z0-9]+([A-Z][a-z0-9]*)+$/.test(word)) return false; // PascalCase identifier
    if (/^[a-z0-9]+(-[a-z0-9]+)+$/.test(word) || /-$/.test(w)) return false; // token or kebab name
    if (/^[a-z]+[A-Z]\w*$/.test(word)) return false; // camelCase identifier
    return true;
  });
}

test("the English dictionary has no Arabic", () => {
  const bad = Object.entries(en).filter(([, value]) => ARABIC.test(value));
  expect(bad.map(([key]) => key)).toEqual([]);
});

test("the Arabic dictionary has no English words", () => {
  const bad = Object.entries(ar)
    .map(([key, value]) => [key, latinWords(value)] as const)
    .filter(([, words]) => words.length > 0);
  expect(bad).toEqual([]);
});

test("the Arabic API descriptions have no English words", async () => {
  const api = (await Bun.file("apps/docs/lib/generated/api.json").json()) as Record<
    string,
    { name: string; descriptionAr: string; props: { name: string; descriptionAr: string }[] }[]
  >;
  const bad: string[] = [];
  // The Phase 5 and 6 components (0.5.0, 0.6.0). Earlier ones are covered by the browser audit, which skips code.
  const phase5 = [
    "breadcrumb",
    "pagination",
    "table-of-contents",
    "card",
    "list",
    "table",
    "data-table",
    "rating",
    "progress",
    "stepper",
    // The Phase 6 components (0.6.0).
    "header",
    "second-nav",
    "footer",
    "date-picker",
    "carousel",
    "filtration",
    // The Phase 7 components (0.7.0).
    "slider",
    "digital-stamp",
    "popover",
    "hover-card",
    "alert-dialog",
    "context-menu",
    "toggle",
    "toggle-group",
    "combobox",
    "command",
    "input-otp",
    "input-group",
    "button-group",
    // The Phase 7 part 2 components (0.7.1).
    "menubar",
    "navigation-menu",
    "sidebar",
    "collapsible",
    "scroll-area",
    "resizable",
    "aspect-ratio",
    "kbd",
    "empty",
    "item",
    "chart",
  ];
  for (const [slug, parts] of Object.entries(api)) {
    if (!phase5.includes(slug)) continue;
    for (const part of parts) {
      for (const [name, text] of [
        [part.name, part.descriptionAr],
        ...part.props.map((p) => [`${part.name}.${p.name}`, p.descriptionAr] as const),
      ] as const) {
        const words = latinWords(text);
        if (words.length > 0) bad.push(`${slug}.${name}: ${[...new Set(words)].join(", ")}`);
      }
    }
  }
  expect(bad).toEqual([]);
});

const files = async () => {
  const out: string[] = [];
  for await (const file of new Glob("apps/docs/content/docs/**/*.mdx").scan()) out.push(file);
  return out.sort();
};

test("English docs pages have no Arabic, code samples included", async () => {
  const bad: string[] = [];
  for (const file of await files()) {
    if (file.endsWith(".ar.mdx")) continue;
    (await Bun.file(file).text()).split("\n").forEach((line, i) => {
      if (ARABIC.test(line)) bad.push(`${file}:${i + 1}`);
    });
  }
  expect(bad).toEqual([]);
});

test("Arabic docs pages have no English prose", async () => {
  const bad: string[] = [];
  for (const file of await files()) {
    if (!file.endsWith(".ar.mdx")) continue;
    const text = (await Bun.file(file).text()).replace(/^---[\s\S]*?---/, (fm) =>
      fm.replace(/^sourceHash.*$/gm, "").replace(/^\w+:/gm, ""),
    );
    const words = latinWords(text);
    if (words.length > 0) bad.push(`${file}: ${[...new Set(words)].slice(0, 8).join(", ")}`);
  }
  expect(bad).toEqual([]);
});

// ------------------------------------------------------------- Preview content
//
// Preview content is exempt from the page-language check: inside a preview the content
// language follows the direction toggle (RTL is Arabic, LTR is English), on /en and /ar pages
// alike. Each direction must be pure, with the same allowlist. The browser audit in
// scripts/e2e.mjs checks the rendered frames; these tests check the rule and the source strings.

test("preview content follows the direction toggle, on an English and an Arabic page", () => {
  for (const page of ["en", "ar"] as const) {
    // The default direction is the page's, so the default view is in the page language.
    expect(contentLang(dirOf(page))).toBe(page);
    // Toggled, the content follows the direction, whatever the page language.
    expect(contentLang("rtl")).toBe("ar");
    expect(contentLang("ltr")).toBe("en");
    expect(previewSrc("field-anatomy", "rtl", "light")).toBe(
      "/preview/field-anatomy?dir=rtl&theme=light&lang=ar",
    );
    expect(previewSrc("field-anatomy", "ltr", "dark", 2)).toBe(
      "/preview/field-anatomy?dir=ltr&theme=dark&lang=en&r=2",
    );
  }
});

test("the preview frame takes its content language from the direction, not the page", async () => {
  const preview = await Bun.file("apps/docs/components/preview/preview.tsx").text();
  // No frame URL or message is built from the page locale's lang.
  expect(preview).not.toMatch(/\blang\b\s*\}\s*=\s*useLocale\(\)/);
  expect(preview).toContain("contentLang(dir)");
  expect(preview).not.toMatch(/`\/preview\/\$\{name\}\?/);
  const bridge = await Bun.file("apps/docs/components/preview/frame-bridge.tsx").text();
  expect(bridge).toContain('const lang = dir === "rtl" ? "ar" : "en";');
});

/** Every string literal and JSX text run in the preview sources, with its file and line. */
async function previewStrings() {
  const out: { file: string; line: number; text: string; source: string }[] = [];
  for await (const file of new Glob("apps/docs/components/previews/*.tsx").scan()) {
    const source = await Bun.file(file).text();
    const at = (index: number) => source.slice(0, index).split("\n").length;
    for (const m of source.matchAll(/"((?:[^"\\\n]|\\.)*)"/g))
      out.push({ file, line: at(m.index), text: m[1] ?? "", source });
    for (const m of source.matchAll(/>([^<>{}\n]*[؀-ۿ][^<>{}\n]*)</g))
      out.push({ file, line: at(m.index), text: m[1] ?? "", source });
  }
  return out;
}

/** English–Arabic pairs: <Bi en ar>, t("en", "ar"), ["en", "ar"], { en, ar } and rtl ternaries. */
async function previewPairs() {
  const pairs: { file: string; en: string; ar: string }[] = [];
  const s = String.raw`"((?:[^"\\]|\\.)*)"`;
  const attr = String.raw`(?:${s}|\{${s}\})`;
  // A tuple of two Arabic strings is one language's content (a question and its answer), not a pair.
  const patterns: [RegExp, (m: RegExpMatchArray) => [string, string], boolean?][] = [
    [
      new RegExp(String.raw`\ben=${attr}\s+ar=${attr}`, "g"),
      (m) => [m[1] ?? m[2] ?? "", m[3] ?? m[4] ?? ""],
    ],
    [
      new RegExp(String.raw`\bar=${attr}\s+en=${attr}`, "g"),
      (m) => [m[3] ?? m[4] ?? "", m[1] ?? m[2] ?? ""],
    ],
    [new RegExp(String.raw`\ben:\s*${s},\s*ar:\s*${s}`, "g"), (m) => [m[1] ?? "", m[2] ?? ""]],
    [
      new RegExp(String.raw`[(\[]\s*${s},\s*${s},?\s*[)\]]`, "g"),
      (m) => [m[1] ?? "", m[2] ?? ""],
      true,
    ],
    [
      new RegExp(String.raw`(?:rtl|arabic)\s*\?\s*${s}\s*:\s*${s}`, "g"),
      (m) => [m[2] ?? "", m[1] ?? ""],
    ],
  ];
  for await (const file of new Glob("apps/docs/components/previews/*.tsx").scan()) {
    const source = await Bun.file(file).text();
    for (const [pattern, pick, tuple] of patterns)
      for (const m of source.matchAll(pattern)) {
        const [en, ar] = pick(m);
        if (tuple && ARABIC.test(en) && ARABIC.test(ar)) continue;
        if (ARABIC.test(ar) || ARABIC.test(en)) pairs.push({ file, en, ar });
      }
  }
  return pairs;
}

test("LTR preview content (the English side of every pair) has no Arabic", async () => {
  const pairs = await previewPairs();
  expect(pairs.length).toBeGreaterThan(200);
  const bad = pairs.filter((p) => ARABIC.test(p.en)).map((p) => `${p.file}: ${p.en}`);
  expect(bad).toEqual([]);
});

test("RTL preview content (every Arabic string) has no English words", async () => {
  const bad = (await previewStrings())
    .filter((s) => ARABIC.test(s.text))
    .map((s) => [`${s.file}:${s.line}`, latinWords(s.text)] as const)
    .filter(([, words]) => words.length > 0);
  expect(bad).toEqual([]);
});

test("RTL preview content uses one digit system: Arabic-Indic digits in sample content", async () => {
  // Names, IDs, dates and counts use natural Arabic forms. Technical values (sizes in px, file
  // sizes, the 1 to 10 range of a number input) keep Western digits, as CONTRIBUTING says.
  // The Second Nav strip keeps Figma's Western-digit date, time and temperature (0.7.3).
  const figmaStrip = /\d-سبتمبر-\d{4}|\d:\d{2} [صم]|\d°/;
  const technical = /px|MB|KB|\d+\s*(إلى|و)\s*\d+|من \d+ إلى|بين \d/;
  const bad = (await previewPairs())
    .filter(
      (p) =>
        /[0-9]/.test(p.ar) && ARABIC.test(p.ar) && !technical.test(p.ar) && !figmaStrip.test(p.ar),
    )
    .map((p) => `${p.file}: ${p.ar}`);
  expect(bad).toEqual([]);
});
