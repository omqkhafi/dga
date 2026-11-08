"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar";
import type * as React from "react";
import {
  Menu,
  MenuCheckboxItem,
  MenuContent,
  type MenuContentProps,
  MenuGroup,
  MenuItem,
  MenuLabel,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
  MenuSub,
  MenuSubContent,
  MenuSubTrigger,
} from "@/components/dga/menu";
import { AutoDirection } from "@/lib/dga/direction";
import { cn } from "@/registry/bases/base/lib/utils";

/**
 * A horizontal bar of menus, like the File, Edit and View bar of an application (Platform Code
 * extension, not part of DGA). Each trigger opens a DGA Menu. Left and Right move between the
 * triggers (swapped on Arabic pages), Down opens a menu, and while one is open, moving to the next
 * trigger opens its menu. For one menu behind one button, use a Menu; for links to pages, use a
 * Navigation Menu.
 */
function Menubar({ className, ...props }: MenubarPrimitive.Props) {
  return (
    <AutoDirection>
      <MenubarPrimitive data-slot="menubar" className={cn("cn-menubar", className)} {...props} />
    </AutoDirection>
  );
}

/** One menu of the bar. Put a MenubarTrigger and a MenubarContent inside. */
function MenubarMenu(props: React.ComponentProps<typeof Menu>) {
  return <Menu {...props} />;
}

/** The button in the bar that opens a menu. */
function MenubarTrigger({ className, ...props }: MenuPrimitive.Trigger.Props) {
  return (
    <MenuPrimitive.Trigger
      data-slot="menubar-trigger"
      className={cn("cn-menubar-trigger", className)}
      {...props}
    />
  );
}

/** The menu list. It opens below its trigger, aligned to the start side. */
function MenubarContent({ sideOffset = 8, alignOffset = -4, ...props }: MenuContentProps) {
  return <MenuContent sideOffset={sideOffset} alignOffset={alignOffset} {...props} />;
}

/** One action. Put an icon first, the label, then an optional MenubarShortcut. */
function MenubarItem(props: React.ComponentProps<typeof MenuItem>) {
  return <MenuItem {...props} />;
}

/** An item that can be turned on and off. It shows a check mark while it is on. */
function MenubarCheckboxItem(props: React.ComponentProps<typeof MenuCheckboxItem>) {
  return <MenuCheckboxItem {...props} />;
}

/** Groups MenubarRadioItem options so only one is chosen. */
function MenubarRadioGroup(props: React.ComponentProps<typeof MenuRadioGroup>) {
  return <MenuRadioGroup {...props} />;
}

/** One option of a MenubarRadioGroup. The chosen one shows a dot. */
function MenubarRadioItem(props: React.ComponentProps<typeof MenuRadioItem>) {
  return <MenuRadioItem {...props} />;
}

/** Groups related items under a MenubarLabel. */
function MenubarGroup(props: React.ComponentProps<typeof MenuGroup>) {
  return <MenuGroup {...props} />;
}

/** The heading of a MenubarGroup. */
function MenubarLabel(props: React.ComponentProps<typeof MenuLabel>) {
  return <MenuLabel {...props} />;
}

/** A line between groups of items. */
function MenubarSeparator(props: React.ComponentProps<typeof MenuSeparator>) {
  return <MenuSeparator {...props} />;
}

/** Trailing text of an item, such as a shortcut. Digits and symbols stay left to right. */
function MenubarShortcut(props: React.ComponentProps<typeof MenuShortcut>) {
  return <MenuShortcut {...props} />;
}

/** Groups a MenubarSubTrigger and its MenubarSubContent. */
function MenubarSub(props: React.ComponentProps<typeof MenuSub>) {
  return <MenuSub {...props} />;
}

/** An item that opens a submenu on the end side. Its chevron mirrors in RTL. */
function MenubarSubTrigger(props: React.ComponentProps<typeof MenuSubTrigger>) {
  return <MenuSubTrigger {...props} />;
}

/** The submenu list. It opens beside its trigger on the end side. */
function MenubarSubContent(props: MenuContentProps) {
  return <MenuSubContent {...props} />;
}

export {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
};
