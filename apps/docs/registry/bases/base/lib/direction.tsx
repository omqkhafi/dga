"use client";

import { DirectionProvider } from "@base-ui/react/direction-provider";
import * as React from "react";

type Direction = "ltr" | "rtl";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["dir"] });
  return () => observer.disconnect();
}

/** The direction of the page: the `dir` attribute of `<html>`, kept up to date when it changes. */
function useDocumentDirection(): Direction {
  return React.useSyncExternalStore(
    subscribe,
    () => (document.documentElement.dir === "rtl" ? "rtl" : "ltr"),
    () => "ltr",
  );
}

/**
 * Tells Base UI which way the page reads, so arrow keys, submenu placement and tooltip
 * alignment follow `<html dir>`. Base UI only knows the direction from a DirectionProvider;
 * this reads it from the page instead, so no setup is needed.
 */
function AutoDirection({ children }: { children: React.ReactNode }) {
  return <DirectionProvider direction={useDocumentDirection()}>{children}</DirectionProvider>;
}

export type { Direction };
export { AutoDirection, useDocumentDirection };
