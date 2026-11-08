import type { ComponentType } from "react";
import {
  AlertDialogBasic,
  AlertDialogControlled,
  AlertDialogNeutral,
  ContextMenuBasic,
  ContextMenuGroups,
  ContextMenuSubmenu,
  HoverCardBasic,
  HoverCardPlacements,
  HoverCardStates,
  PopoverBasic,
  PopoverForm,
  PopoverPlacements,
  PopoverStates,
} from "./ext-overlays";

// The demos are client components in ext-overlays.tsx. This map is not: a server component
// cannot spread an object that a "use client" file exports, so the map lives in a plain module.

/** Phase 7 overlay previews. Names are the `<Preview name>` values on the docs pages. */
export const overlaysPreviews = {
  "popover-basic": PopoverBasic,
  "popover-placements": PopoverPlacements,
  "popover-form": PopoverForm,
  "popover-states": PopoverStates,
  "hover-card-basic": HoverCardBasic,
  "hover-card-placements": HoverCardPlacements,
  "hover-card-states": HoverCardStates,
  "alert-dialog-basic": AlertDialogBasic,
  "alert-dialog-neutral": AlertDialogNeutral,
  "alert-dialog-controlled": AlertDialogControlled,
  "context-menu-basic": ContextMenuBasic,
  "context-menu-groups": ContextMenuGroups,
  "context-menu-submenu": ContextMenuSubmenu,
} satisfies Record<string, ComponentType>;
