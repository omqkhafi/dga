"use client";

import type { SharedProps } from "fumadocs-ui/contexts/search";
import { lazy, Suspense, useEffect, useState } from "react";

const Dialog = lazy(() => import("./search-dialog"));

/**
 * Keeps the search dialog (and its index) out of the first load. After the page has loaded
 * and the browser is idle, the dialog chunk and the index are fetched in the background, so
 * the first ⌘K is instant too.
 */
export default function SearchDialog(props: SharedProps) {
  const [wanted, setWanted] = useState(props.open);
  useEffect(() => {
    if (props.open) setWanted(true);
  }, [props.open]);
  useEffect(() => {
    const warm = () => {
      setWanted(true);
    };
    const start = () => {
      if ("requestIdleCallback" in window) window.requestIdleCallback(warm, { timeout: 5000 });
      else setTimeout(warm, 3000);
    };
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);
  if (!wanted) return null;
  return (
    <Suspense fallback={null}>
      <Dialog {...props} />
    </Suspense>
  );
}
