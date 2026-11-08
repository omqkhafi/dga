// The map of the Phase 7 part 2 "layout" previews (Collapsible, Scroll Area, Resizable and Aspect Ratio). It lives outside the "use client" file
// because a server component (the preview index) cannot read an object exported from a client module.
import type { ComponentType } from "react";

/** Names are the `<Preview name>` values on the docs pages. */
export const layoutPreviews = {} satisfies Record<string, ComponentType>;
