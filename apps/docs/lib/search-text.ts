// Text normalisation for search, shared by the index and the query so both sides agree.
//
// Arabic is written with optional marks and with letter forms that people type
// interchangeably, so "الإعدادات", "الاعدادات" and "الإعْدادَات" must find each other:
//   - diacritics (tashkeel, U+064B–U+0652), the dagger alef (U+0670) and tatweel (U+0640) are dropped
//   - alef with hamza or madda (أ إ آ ٱ) becomes a bare alef (ا)
//   - taa marbuta (ة) becomes haa (ه): the two are often swapped at the end of a word
//   - alef maqsura (ى) becomes yaa (ي)
//   - hamza carriers on waw and yaa (ؤ ئ) become waw and yaa
//   - Arabic-Indic and Persian digits become 0–9
// Latin text is lower-cased. Arabic text keeps its length except where marks are removed.

const MARKS = /[ً-ْٰـ]/g;

export function normalize(text: string) {
  return text
    .normalize("NFKC")
    .replace(MARKS, "")
    .replace(/[أإآٱ]/g, "ا")
    .replace(/ة/g, "ه")
    .replace(/ى/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .toLowerCase();
}

/** Arabic definite article and the common one-letter prefixes, so "الزر" finds "زر". */
const PREFIX = /^(وال|بال|كال|فال|لل|ال)(?=.{2,})/;

/** Query terms: normalised, split on spaces, with the Arabic article removed. */
export function queryTerms(query: string) {
  return normalize(query)
    .split(/\s+/)
    .filter(Boolean)
    .map((term) => term.replace(PREFIX, ""));
}

/** Letters that normalise together, as a regex class, so a highlight can match any spelling. */
const VARIANTS: Record<string, string> = {
  ا: "[اأإآٱ]",
  ه: "[هة]",
  ي: "[يىئ]",
  و: "[وؤ]",
};

/** A regex that finds `term` in the original (un-normalised) text, ignoring marks between letters. */
export function highlightPattern(terms: string[]) {
  const escapeChar = (c: string) => c.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const body = terms
    .map((term) =>
      [...term].map((c) => VARIANTS[c] ?? escapeChar(c)).join("[\\u064B-\\u0652\\u0670\\u0640]*"),
    )
    .join("|");
  return new RegExp(`(${body})`, "gi");
}
