"use client";

import { useSyncExternalStore } from "react";
import { getDictionary, type Key, translate } from "@/lib/dictionary";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["dir"] });
  return () => observer.disconnect();
}

export function useDirection() {
  return useSyncExternalStore(
    subscribe,
    () => (document.documentElement.dir === "rtl" ? "rtl" : "ltr"),
    () => "ltr" as const,
  );
}

/** Bilingual text: Arabic in RTL, English in LTR. */
export function Bi({ ar, en }: { ar: string; en: string }) {
  return <>{useDirection() === "rtl" ? ar : en}</>;
}

/** Default strings of the components (clear, remove, optional…) from the locale dictionary. */
export function useUi() {
  const dictionary = getDictionary(useDirection() === "rtl" ? "ar" : "en");
  return (key: Key, values?: Record<string, string | number>) => translate(dictionary, key, values);
}

/** For attributes (aria-label, placeholder) that cannot hold an element: `const t = useBi()`. */
export function useBi() {
  const rtl = useDirection() === "rtl";
  return (en: string, ar: string) => (rtl ? ar : en);
}
