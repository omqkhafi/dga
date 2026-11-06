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
import allowlist from "./locale-allowlist.json";

// Arabic letters and words. The Arabic-Indic digits (U+0660 to U+0669) and the decimal and
// thousands marks (U+066B, U+066C) are not words: the docs name them when they describe the
// numerals convention.
const ARABIC = /[\u0600-\u065F\u066D-\u06EF\u06FA-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;

/**
 * Proper nouns, standards, key names, component names and Hugeicons names that stay in Latin
 * script inside Arabic text (scripts/locale-allowlist.json, shared with the browser audit in
 * scripts/e2e.mjs).
 */
const ALLOWED = new Set((allowlist as string[]).map((w) => w.toLowerCase()));

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
