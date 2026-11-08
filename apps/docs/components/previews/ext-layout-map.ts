// The map of the Phase 7 part 2 "layout" previews (Collapsible, Scroll Area, Resizable and Aspect
// Ratio). It lives outside the "use client" file because a server component (the preview index)
// cannot read an object exported from a client module.
import type { ComponentType } from "react";
import {
  AspectRatioFit,
  AspectRatioRatios,
  CollapsibleBasic,
  CollapsibleList,
  CollapsibleStates,
  ResizableCollapsible,
  ResizableHandleGrip,
  ResizableHorizontal,
  ResizableSaved,
  ResizableVertical,
  ScrollAreaBoth,
  ScrollAreaHorizontal,
  ScrollAreaVertical,
  ScrollAreaVisibility,
} from "./ext-layout";

/** Names are the `<Preview name>` values on the docs pages. */
export const layoutPreviews = {
  "collapsible-basic": CollapsibleBasic,
  "collapsible-states": CollapsibleStates,
  "collapsible-list": CollapsibleList,
  "scroll-area-vertical": ScrollAreaVertical,
  "scroll-area-horizontal": ScrollAreaHorizontal,
  "scroll-area-both": ScrollAreaBoth,
  "scroll-area-visibility": ScrollAreaVisibility,
  "resizable-horizontal": ResizableHorizontal,
  "resizable-vertical": ResizableVertical,
  "resizable-handle": ResizableHandleGrip,
  "resizable-collapsible": ResizableCollapsible,
  "resizable-saved": ResizableSaved,
  "aspect-ratio-ratios": AspectRatioRatios,
  "aspect-ratio-fit": AspectRatioFit,
} satisfies Record<string, ComponentType>;
