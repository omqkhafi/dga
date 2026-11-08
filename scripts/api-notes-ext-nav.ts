// English notes the types cannot carry, for the Phase 7 part 2 nav work stream.
import type { ApiNote } from "./api-notes";

export const API_NOTES_EXT_NAV: Record<string, ApiNote> = {};

const notes: Record<string, ApiNote> = {
  "menubar.Menubar.modal": {
    include: true,
    type: "boolean",
    description:
      "Locks page scroll and makes the rest of the page inert while a menu is open. Default `true`.",
  },
  "menubar.Menubar.loopFocus": {
    include: true,
    type: "boolean",
    description: "Wraps the arrow keys from the last trigger to the first. Default `true`.",
  },
  "menubar.Menubar.disabled": {
    include: true,
    type: "boolean",
    description: "Disables every menu of the bar.",
  },
  "menubar.MenubarMenu.open": {
    include: true,
    type: "boolean",
    description: "Controlled open state of this menu.",
  },
  "menubar.MenubarMenu.defaultOpen": {
    include: true,
    type: "boolean",
    description: "Open at first (uncontrolled).",
  },
  "menubar.MenubarMenu.onOpenChange": {
    include: true,
    type: "(open: boolean) => void",
    description: "Called when this menu opens or closes.",
  },
  "navigation-menu.NavigationMenu.value": {
    include: true,
    type: "string | null",
    description: "The `value` of the open item (controlled). `null` is closed.",
  },
  "navigation-menu.NavigationMenu.defaultValue": {
    include: true,
    type: "string | null",
    description: "The `value` of the item that is open at first (uncontrolled).",
  },
  "navigation-menu.NavigationMenu.onValueChange": {
    include: true,
    type: "(value: string | null) => void",
    description: "Called when an item opens or closes.",
  },
  "navigation-menu.NavigationMenu.delay": {
    include: true,
    type: "number",
    description: "Milliseconds the pointer rests on a trigger before its panel opens. Default 50.",
  },
  "navigation-menu.NavigationMenu.closeDelay": {
    include: true,
    type: "number",
    description: "Milliseconds the panel stays after the pointer leaves. Default 50.",
  },
  "navigation-menu.NavigationMenu.orientation": {
    include: true,
    type: '"horizontal" | "vertical"',
    description: "The direction of the list. Vertical uses Up and Down instead of Left and Right.",
  },
  "navigation-menu.NavigationMenuItem.value": {
    include: true,
    type: "string",
    description: "Names the item, so `value` and `defaultValue` of the root can open it.",
  },
  "navigation-menu.NavigationMenuLink.variant": {
    description: "`item` is a link in a panel (default). `bar` is a link directly in the bar.",
  },
  "navigation-menu.NavigationMenuLink.active": {
    include: true,
    type: "boolean",
    description: 'This is the current page: sets `aria-current="page"` and the current look.',
  },
  "sidebar.Sidebar.side": {
    description:
      "`start` or `end`, the sides of the text. `start` is on the right on Arabic pages.",
  },
  "sidebar.SidebarTrigger.variant": {
    include: true,
    type: "Button variant",
    description: "The Button style. Default `subtle`.",
  },
};
Object.assign(API_NOTES_EXT_NAV, notes);
