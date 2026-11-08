// English notes the types cannot carry, for the Phase 7 overlays work stream (Popover, Hover Card,
// Alert Dialog, Context Menu). Keyed `slug.Component.prop`.
import type { ApiNote } from "./api-notes";

const open: ApiNote = { include: true, type: "boolean", description: "Controlled open state." };
const defaultOpen: ApiNote = {
  include: true,
  type: "boolean",
  description: "Open at first (uncontrolled).",
};
const onOpenChange: ApiNote = {
  include: true,
  type: "(open: boolean) => void",
  description: "Called when it opens or closes.",
};
const align: ApiNote = {
  include: true,
  type: '"start" | "center" | "end"',
  description: "Alignment with the trigger. `start` is the right edge in RTL.",
};
const alignOffset: ApiNote = {
  include: true,
  type: "number",
  description: "Shifts it along the trigger's edge, in pixels.",
};

export const API_NOTES_EXT_OVERLAYS: Record<string, ApiNote> = {
  "popover.Popover.open": open,
  "popover.Popover.defaultOpen": defaultOpen,
  "popover.Popover.onOpenChange": onOpenChange,
  "popover.PopoverContent.align": align,
  "popover.PopoverContent.alignOffset": alignOffset,
  "hover-card.HoverCard.open": open,
  "hover-card.HoverCard.defaultOpen": defaultOpen,
  "hover-card.HoverCard.onOpenChange": onOpenChange,
  "hover-card.HoverCardTrigger.delay": {
    include: true,
    type: "number",
    description: "Milliseconds the pointer rests on the link before the card opens. Default 400.",
  },
  "hover-card.HoverCardTrigger.closeDelay": {
    include: true,
    type: "number",
    description: "Milliseconds the card stays after the pointer leaves. Default 200.",
  },
  "hover-card.HoverCardContent.align": align,
  "hover-card.HoverCardContent.alignOffset": alignOffset,
  "alert-dialog.AlertDialog.open": open,
  "alert-dialog.AlertDialog.defaultOpen": defaultOpen,
  "alert-dialog.AlertDialog.onOpenChange": onOpenChange,
  "alert-dialog.AlertDialogContent.initialFocus": {
    include: true,
    type: "RefObject | function",
    description: "The element that gets focus first. Default: the Cancel button.",
  },
  "alert-dialog.AlertDialogAction.onClick": {
    include: true,
    type: "(event) => void",
    description: "Called when the action is chosen. The dialog closes after it.",
  },
  "context-menu.ContextMenu.open": open,
  "context-menu.ContextMenu.defaultOpen": defaultOpen,
  "context-menu.ContextMenu.onOpenChange": onOpenChange,
  "context-menu.ContextMenuTrigger.tabIndex": {
    include: true,
    type: "number",
    description: "Tab order of the area. Default 0, so the keyboard can open the menu.",
  },
  "context-menu.ContextMenuContent.align": align,
  "context-menu.ContextMenuContent.sideOffset": {
    include: true,
    type: "number",
    description: "Gap between the pointer and the menu in pixels. Default 2.",
  },
  "context-menu.ContextMenuContent.alignOffset": alignOffset,
};
