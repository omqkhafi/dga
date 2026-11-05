"use client";

import { useSyncExternalStore } from "react";
import { getDictionary, type Key, translate } from "@/lib/dictionary";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["dir", "lang"],
  });
  return () => observer.disconnect();
}

/** The language of the sample content. It is the docs page's language, not the direction. */
export function useLanguage() {
  return useSyncExternalStore(
    subscribe,
    () => (document.documentElement.lang === "ar" ? "ar" : "en"),
    () => "en" as const,
  );
}

export function useDirection() {
  return useSyncExternalStore(
    subscribe,
    () => (document.documentElement.dir === "rtl" ? "rtl" : "ltr"),
    () => "ltr" as const,
  );
}

/** Text in the page language: Arabic on an Arabic page, English on an English one, in either direction. */
export function Bi({ ar, en }: { ar: string; en: string }) {
  return <>{useLanguage() === "ar" ? ar : en}</>;
}

/** Default strings of the components (clear, remove, optional…) from the locale dictionary. */
export function useUi() {
  const dictionary = getDictionary(useLanguage());
  return (key: Key, values?: Record<string, string | number>) => translate(dictionary, key, values);
}

/** For attributes (aria-label, placeholder) that cannot hold an element: `const t = useBi()`. */
export function useBi() {
  const arabic = useLanguage() === "ar";
  return (en: string, ar: string) => (arabic ? ar : en);
}
