// The map of the Phase 7 part 2 "display" previews (Kbd, Empty, Item and Chart). It lives outside
// the "use client" file because a server component (the preview index) cannot read an object
// exported from a client module.
import type { ComponentType } from "react";
import {
  ChartArea,
  ChartBar,
  ChartInteractive,
  ChartLine,
  ChartPalette,
  ChartPie,
  ChartTableDemo,
  EmptyBasic,
  EmptyBordered,
  EmptyError,
  EmptySearch,
  ItemGroupDemo,
  ItemHeaderFooter,
  ItemLink,
  ItemMediaKinds,
  ItemSizes,
  ItemVariants,
  KbdBasic,
  KbdInContext,
} from "./ext-display";

/** Names are the `<Preview name>` values on the docs pages. */
export const displayPreviews = {
  "kbd-basic": KbdBasic,
  "kbd-context": KbdInContext,
  "empty-basic": EmptyBasic,
  "empty-bordered": EmptyBordered,
  "empty-search": EmptySearch,
  "empty-error": EmptyError,
  "item-variants": ItemVariants,
  "item-sizes": ItemSizes,
  "item-media": ItemMediaKinds,
  "item-link": ItemLink,
  "item-group": ItemGroupDemo,
  "item-header-footer": ItemHeaderFooter,
  "chart-bar": ChartBar,
  "chart-line": ChartLine,
  "chart-area": ChartArea,
  "chart-pie": ChartPie,
  "chart-interactive": ChartInteractive,
  "chart-table": ChartTableDemo,
  "chart-palette": ChartPalette,
} satisfies Record<string, ComponentType>;
