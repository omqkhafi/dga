"use client";

import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type * as React from "react";
import {
  MenuCheckboxItem,
  MenuGroup,
  MenuItem,
  MenuLabel,
  MenuRadioGroup,
  MenuRadioItem,
  MenuSeparator,
  MenuShortcut,
} from "@/components/dga/menu";
import { AutoDirection } from "@/lib/dga/direction";
import { cn } from "@/registry/bases/base/lib/utils";

/**
 * A menu of actions that opens where people click with the secondary mouse button, long-press on a touch
 * screen, or press Shift+F10 or the Menu key on a focused area (Platform Code extension, not part of DGA). The
 * list is the DGA Menu, so items, checkbox and radio items, groups and submenus are the same.
 * A context menu is a shortcut: every action in it must also be reachable another way on the
 * page, because most people never open it.
 */
function ContextMenu(props: ContextMenuPrimitive.Root.Props) {
  return (
    <AutoDirection>
      <ContextMenuPrimitive.Root {...props} />
    </AutoDirection>
  );
}

/**
 * The area that opens the menu. It can be focused with the keyboard, so Shift+F10 or the Menu
 * key opens the menu at the area. Style it, or render your own element with `render`.
 */
function ContextMenuTrigger({
  className,
  tabIndex = 0,
  ...props
}: ContextMenuPrimitive.Trigger.Props) {
  return (
    <ContextMenuPrimitive.Trigger
      data-slot="context-menu-trigger"
      tabIndex={tabIndex}
      className={cn("rounded-sm outline-hidden select-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-border-black", className)}
      {...props}
    />
  );
}

type ContextMenuContentProps = ContextMenuPrimitive.Popup.Props &
  Pick<ContextMenuPrimitive.Positioner.Props, "align" | "sideOffset" | "alignOffset">;

/** The popup list. It opens at the pointer and keeps clear of the screen edges. */
function ContextMenuContent({
  className,
  children,
  align = "start",
  sideOffset = 2,
  alignOffset = 0,
  ...props
}: ContextMenuContentProps) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Positioner
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        className="z-50 outline-hidden"
      >
        <ContextMenuPrimitive.Popup
          data-slot="context-menu-content"
          className={cn("max-h-(--available-height) min-w-52 origin-(--transform-origin) overflow-y-auto rounded-md border border-border-neutral-primary bg-background-menu p-1 text-text-default shadow-2xl outline-hidden transition-[opacity,scale] duration-100 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 motion-reduce:transition-none", className)}
          {...props}
        >
          {children}
        </ContextMenuPrimitive.Popup>
      </ContextMenuPrimitive.Positioner>
    </ContextMenuPrimitive.Portal>
  );
}

/** One action. Put an icon first, the label, then an optional ContextMenuShortcut. */
function ContextMenuItem(props: React.ComponentProps<typeof MenuItem>) {
  return <MenuItem {...props} />;
}

/** An item that can be turned on and off. It shows a check mark while it is on. */
function ContextMenuCheckboxItem(props: React.ComponentProps<typeof MenuCheckboxItem>) {
  return <MenuCheckboxItem {...props} />;
}

/** Groups ContextMenuRadioItem options so only one is chosen. */
function ContextMenuRadioGroup(props: React.ComponentProps<typeof MenuRadioGroup>) {
  return <MenuRadioGroup {...props} />;
}

/** One option of a ContextMenuRadioGroup. The chosen one shows a dot. */
function ContextMenuRadioItem(props: React.ComponentProps<typeof MenuRadioItem>) {
  return <MenuRadioItem {...props} />;
}

/** Groups related items under a ContextMenuLabel. */
function ContextMenuGroup(props: React.ComponentProps<typeof MenuGroup>) {
  return <MenuGroup {...props} />;
}

/** The heading of a ContextMenuGroup. */
function ContextMenuLabel(props: React.ComponentProps<typeof MenuLabel>) {
  return <MenuLabel {...props} />;
}

/** A line between groups of items. */
function ContextMenuSeparator(props: React.ComponentProps<typeof MenuSeparator>) {
  return <MenuSeparator {...props} />;
}

/** Trailing text of an item, such as a shortcut. Digits and symbols stay left to right. */
function ContextMenuShortcut(props: React.ComponentProps<typeof MenuShortcut>) {
  return <MenuShortcut {...props} />;
}

/** Groups a ContextMenuSubTrigger and its ContextMenuSubContent. */
function ContextMenuSub(props: ContextMenuPrimitive.SubmenuRoot.Props) {
  return <ContextMenuPrimitive.SubmenuRoot {...props} />;
}

/** An item that opens a submenu. Its chevron points to the end side and mirrors in RTL. */
function ContextMenuSubTrigger({
  className,
  children,
  ...props
}: ContextMenuPrimitive.SubmenuTrigger.Props) {
  return (
    <ContextMenuPrimitive.SubmenuTrigger
      data-slot="context-menu-sub-trigger"
      className={cn("relative flex min-h-10 w-full cursor-pointer items-center gap-button-menu-gap rounded-sm px-button-menu-h-padding py-button-menu-v-padding text-start text-md text-text-default outline-hidden select-none data-highlighted:bg-button-background-neutral-hovered active:bg-button-background-neutral-pressed data-popup-open:bg-button-background-neutral-hovered focus-visible:outline-2 focus-visible:outline-solid focus-visible:-outline-offset-2 focus-visible:outline-border-black data-disabled:cursor-not-allowed data-disabled:bg-transparent data-disabled:text-text-default-disabled data-disabled:[&_svg]:text-icon-default-disabled [&_svg]:size-5 [&_svg]:shrink-0 [&_svg]:text-icon-default", className)}
      {...props}
    >
      {children}
      <HugeiconsIcon icon={ArrowRight01Icon} aria-hidden className="ms-auto rtl:-scale-x-100" />
    </ContextMenuPrimitive.SubmenuTrigger>
  );
}

/** The submenu list. It opens beside its trigger on the end side. */
function ContextMenuSubContent({
  className,
  children,
  sideOffset = 0,
  alignOffset = -5,
  ...props
}: ContextMenuContentProps) {
  return (
    <ContextMenuPrimitive.Portal>
      <ContextMenuPrimitive.Positioner
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        className="z-50 outline-hidden"
      >
        <ContextMenuPrimitive.Popup
          data-slot="context-menu-sub-content"
          className={cn("max-h-(--available-height) min-w-52 origin-(--transform-origin) overflow-y-auto rounded-md border border-border-neutral-primary bg-background-menu p-1 text-text-default shadow-2xl outline-hidden transition-[opacity,scale] duration-100 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 motion-reduce:transition-none", className)}
          {...props}
        >
          {children}
        </ContextMenuPrimitive.Popup>
      </ContextMenuPrimitive.Positioner>
    </ContextMenuPrimitive.Portal>
  );
}

export type { ContextMenuContentProps };
export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
};
