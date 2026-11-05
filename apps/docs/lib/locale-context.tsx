"use client";

import { createContext, type ReactNode, use } from "react";
import type { Dictionary, Key, Translate } from "./dictionary";
import { translate } from "./dictionary";
import { dirOf, type Locale } from "./i18n";

type Value = { lang: Locale; dir: "ltr" | "rtl"; dictionary: Dictionary };

const LocaleContext = createContext<Value | null>(null);

/** Gives client components the active locale and its dictionary (passed from the server layout). */
export function LocaleProvider({
  lang,
  dictionary,
  children,
}: {
  lang: Locale;
  dictionary: Dictionary;
  children: ReactNode;
}) {
  return <LocaleContext value={{ lang, dir: dirOf(lang), dictionary }}>{children}</LocaleContext>;
}

export function useLocale() {
  const value = use(LocaleContext);
  if (!value) throw new Error("useLocale must be used inside <LocaleProvider>");
  return value;
}

export function useT(): Translate {
  const { dictionary } = useLocale();
  return (key: Key, values) => translate(dictionary, key, values);
}
