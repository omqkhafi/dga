"use client";

import { useEffect } from "react";
import { applyPreviewState, type Direction, isPreviewMessage, type Theme } from "@/lib/preview";

/** Runs inside the preview iframe: receives dir/theme and reports content height. */
export function FrameBridge() {
  useEffect(() => {
    const root = document.documentElement;
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin || !isPreviewMessage(event.data)) return;
      if (event.data.type === "dga-preview:set")
        applyPreviewState(root, event.data.dir, event.data.theme);
    };
    window.addEventListener("message", onMessage);

    const body = document.body;
    const report = () =>
      window.parent.postMessage(
        { type: "dga-preview:height", height: Math.ceil(body.scrollHeight) },
        window.location.origin,
      );
    const observer = new ResizeObserver(report);
    observer.observe(body);
    report();
    return () => {
      window.removeEventListener("message", onMessage);
      observer.disconnect();
    };
  }, []);
  return null;
}

/** Inline script that applies ?dir=&theme= before first paint, to avoid a flash. */
export const initialStateScript = `(() => {
  const p = new URLSearchParams(location.search);
  const dir = p.get("dir") === "rtl" ? "rtl" : "ltr";
  const theme = p.get("theme") === "dark" ? "dark" : "light";
  const r = document.documentElement;
  r.dir = dir; r.lang = dir === "rtl" ? "ar" : "en"; r.dataset.theme = theme;
  r.classList.toggle("dark", theme === "dark"); r.style.colorScheme = theme;
})();`;

export type { Direction, Theme };
