// The map of the Phase 7 part 2 "nav" previews (Menubar, Navigation Menu and Sidebar). It lives
// outside the "use client" file because a server component (the preview index) cannot read an
// object exported from a client module.
import type { ComponentType } from "react";
import {
  MenubarBasic,
  MenubarGroups,
  MenubarStates,
  NavigationMenuBasic,
  NavigationMenuLinks,
  NavigationMenuOpen,
  SidebarBasic,
  SidebarEnd,
  SidebarIcon,
  SidebarMobile,
  SidebarNested,
  SidebarOffcanvas,
  SidebarPersisted,
  SidebarRail,
} from "./ext-nav";

/** Names are the `<Preview name>` values on the docs pages. */
export const navPreviews = {
  "menubar-basic": MenubarBasic,
  "menubar-groups": MenubarGroups,
  "menubar-states": MenubarStates,
  "navigation-menu-basic": NavigationMenuBasic,
  "navigation-menu-links": NavigationMenuLinks,
  "navigation-menu-open": NavigationMenuOpen,
  "sidebar-basic": SidebarBasic,
  "sidebar-nested": SidebarNested,
  "sidebar-icon": SidebarIcon,
  "sidebar-rail": SidebarRail,
  "sidebar-offcanvas": SidebarOffcanvas,
  "sidebar-end": SidebarEnd,
  "sidebar-persisted": SidebarPersisted,
  "sidebar-mobile": SidebarMobile,
} satisfies Record<string, ComponentType>;
