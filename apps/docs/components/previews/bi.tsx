"use client";

import { useSyncExternalStore } from "react";

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
