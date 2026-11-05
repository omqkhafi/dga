import type { Locale } from "../i18n";
import { ar } from "./ar";
import { type Dictionary, en } from "./en";

export type { Dictionary };
export type Key = keyof Dictionary;

const dictionaries: Record<Locale, Dictionary> = { en, ar };

export const getDictionary = (lang: Locale): Dictionary => dictionaries[lang];

export type Translate = (key: Key, values?: Record<string, string | number>) => string;

/** `{name}` placeholders are replaced from `values`. */
export function translate(
  dictionary: Dictionary,
  key: Key,
  values?: Record<string, string | number>,
) {
  const text = dictionary[key];
  return values
    ? text.replace(/\{(\w+)\}/g, (_, name: string) => String(values[name] ?? `{${name}}`))
    : text;
}

/** For server components: `const t = getT(lang)`. Client components use `useT()`. */
export const getT =
  (lang: Locale): Translate =>
  (key, values) =>
    translate(dictionaries[lang], key, values);
