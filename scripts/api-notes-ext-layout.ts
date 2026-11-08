// English notes the types cannot carry, for the Phase 7 part 2 layout work stream (Collapsible,
// Scroll Area, Resizable, Aspect Ratio). Keyed `slug.Component.prop`.
import type { ApiNote } from "./api-notes";

export const API_NOTES_EXT_LAYOUT: Record<string, ApiNote> = {
  "collapsible.Collapsible.open": {
    include: true,
    type: "boolean",
    description: "Controlled open state.",
  },
  "collapsible.Collapsible.defaultOpen": {
    include: true,
    type: "boolean",
    description: "Open at first (uncontrolled).",
  },
  "collapsible.Collapsible.onOpenChange": {
    include: true,
    type: "(open: boolean) => void",
    description: "Called when it opens or closes.",
  },
  "collapsible.Collapsible.disabled": {
    include: true,
    type: "boolean",
    description: "The trigger cannot open or close it.",
  },
  "collapsible.CollapsibleTrigger.render": {
    include: true,
    type: "ReactElement | function",
    description: "Render as another element, for example a Button. From Base UI.",
  },
  "scroll-area.ScrollBar.orientation": {
    include: true,
    type: '"vertical" | "horizontal"',
    description: "Which axis the bar scrolls.",
  },
  "resizable.ResizablePanelGroup.orientation": {
    include: true,
    type: '"horizontal" | "vertical"',
    description: "Whether the panels sit side by side (`horizontal`, the default) or stacked.",
  },
  "resizable.ResizablePanelGroup.onLayoutChanged": {
    include: true,
    type: "(layout: Record<string, number>) => void",
    description: "Called after a resize ends, with each panel's size in percent keyed by its `id`.",
  },
  "resizable.ResizablePanelGroup.defaultLayout": {
    include: true,
    type: "Record<string, number>",
    description: "Sizes in percent keyed by panel `id`, to start from.",
  },
  "resizable.ResizablePanel.id": {
    include: true,
    type: "string",
    description: "Names the panel. Needed to save and restore the layout.",
  },
  "resizable.ResizablePanel.defaultSize": {
    include: true,
    type: "number | string",
    description: 'Size at first. A number is pixels, a string such as `"30%"` is a percentage.',
  },
  "resizable.ResizablePanel.minSize": {
    include: true,
    type: "number | string",
    description: "The smallest it can be dragged to.",
  },
  "resizable.ResizablePanel.maxSize": {
    include: true,
    type: "number | string",
    description: "The largest it can be dragged to.",
  },
  "resizable.ResizablePanel.collapsible": {
    include: true,
    type: "boolean",
    description:
      "Dragging past `minSize` collapses it to `collapsedSize`. Enter on the handle collapses and expands it.",
  },
  "resizable.ResizablePanel.collapsedSize": {
    include: true,
    type: "number | string",
    description: "Size when collapsed. Default `0%`.",
  },
  "resizable.ResizableHandle.disabled": {
    include: true,
    type: "boolean",
    description: "The handle cannot be dragged or moved with the keyboard.",
  },
  "resizable.ResizableHandle.aria-label": {
    include: true,
    type: "string",
    description: "Accessible name of the handle. Translate it on Arabic pages.",
  },
};
