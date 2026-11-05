"use client";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { ArrowRight01Icon, CircleIcon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type * as React from "react";
import { AutoDirection } from "@/registry/bases/base/lib/direction";
import { cn } from "@/registry/bases/base/lib/utils";

/**
 * A list of actions on a temporary surface (DGA: Menu). Arrow keys move through the items, Home
 * and End jump to the first and last, typing a letter jumps to a match, Escape closes it and
 * focus returns to the trigger. Submenus open on the end side and mirror on Arabic pages. A
 * disabled item can still be reached with the arrow keys, but it cannot be chosen.
 */
function Menu(props: MenuPrimitive.Root.Props) {
  return (
    <AutoDirection>
      <MenuPrimitive.Root {...props} />
    </AutoDirection>
  );
}

/** The button that opens the menu. Render your own Button with `render`. */
function MenuTrigger({ className, ...props }: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot="menu-trigger" className={className} {...props} />;
}

type MenuContentProps = MenuPrimitive.Popup.Props &
  Pick<MenuPrimitive.Positioner.Props, "side" | "align" | "sideOffset" | "alignOffset">;

/** The popup list. It opens below the trigger, aligned to its start side. */
function MenuContent({
  className,
  children,
  side = "bottom",
  align = "start",
  sideOffset = 4,
  alignOffset = 0,
  ...props
}: MenuContentProps) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        className="cn-menu-positioner"
      >
        <MenuPrimitive.Popup
          data-slot="menu-content"
          className={cn("cn-menu", className)}
          {...props}
        >
          {children}
        </MenuPrimitive.Popup>
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

/**
 * One action. Put an icon first, the label, then an optional MenuShortcut, Tag or Switch. Use
 * `render` to make it a link: `<MenuItem render={<a href="/" />}>`.
 */
function MenuItem({ className, ...props }: MenuPrimitive.Item.Props) {
  return (
    <MenuPrimitive.Item
      data-slot="menu-item"
      className={cn("cn-menu-item", className)}
      {...props}
    />
  );
}

/** An item that can be turned on and off. It shows a check mark while it is on. */
function MenuCheckboxItem({ className, children, ...props }: MenuPrimitive.CheckboxItem.Props) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="menu-checkbox-item"
      className={cn("cn-menu-item cn-menu-item-selectable", className)}
      {...props}
    >
      {children}
      <MenuPrimitive.CheckboxItemIndicator className="cn-menu-indicator">
        <HugeiconsIcon icon={Tick02Icon} aria-hidden />
      </MenuPrimitive.CheckboxItemIndicator>
    </MenuPrimitive.CheckboxItem>
  );
}

/** Groups MenuRadioItem options so only one is chosen. */
function MenuRadioGroup({ className, ...props }: MenuPrimitive.RadioGroup.Props) {
  return (
    <MenuPrimitive.RadioGroup
      data-slot="menu-radio-group"
      className={cn("cn-menu-group", className)}
      {...props}
    />
  );
}

/** One option of a MenuRadioGroup. The chosen one shows a dot. */
function MenuRadioItem({ className, children, ...props }: MenuPrimitive.RadioItem.Props) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="menu-radio-item"
      className={cn("cn-menu-item cn-menu-item-selectable", className)}
      {...props}
    >
      {children}
      <MenuPrimitive.RadioItemIndicator className="cn-menu-indicator">
        <HugeiconsIcon icon={CircleIcon} aria-hidden className="cn-menu-dot" />
      </MenuPrimitive.RadioItemIndicator>
    </MenuPrimitive.RadioItem>
  );
}

/** Groups related items under a MenuLabel. */
function MenuGroup({ className, ...props }: MenuPrimitive.Group.Props) {
  return (
    <MenuPrimitive.Group
      data-slot="menu-group"
      className={cn("cn-menu-group", className)}
      {...props}
    />
  );
}

/** The heading of a MenuGroup. */
function MenuLabel({ className, ...props }: MenuPrimitive.GroupLabel.Props) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="menu-label"
      className={cn("cn-menu-label", className)}
      {...props}
    />
  );
}

/** A line between groups of items. */
function MenuSeparator({ className, ...props }: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      data-slot="menu-separator"
      className={cn("cn-menu-separator", className)}
      {...props}
    />
  );
}

/** Trailing text of an item, such as a shortcut or a count. Digits and symbols stay left to right. */
function MenuShortcut({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="menu-shortcut"
      dir="ltr"
      className={cn("cn-menu-shortcut", className)}
      {...props}
    />
  );
}

/** Groups a MenuSubTrigger and its MenuSubContent. */
function MenuSub(props: MenuPrimitive.SubmenuRoot.Props) {
  return <MenuPrimitive.SubmenuRoot {...props} />;
}

/** An item that opens a submenu. Its chevron points to the end side and mirrors in RTL. */
function MenuSubTrigger({ className, children, ...props }: MenuPrimitive.SubmenuTrigger.Props) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="menu-sub-trigger"
      className={cn("cn-menu-item", className)}
      {...props}
    >
      {children}
      <HugeiconsIcon icon={ArrowRight01Icon} aria-hidden className="cn-menu-chevron" />
    </MenuPrimitive.SubmenuTrigger>
  );
}

/** The submenu list. It opens beside its trigger on the end side. */
function MenuSubContent({
  className,
  children,
  sideOffset = 0,
  alignOffset = -5,
  ...props
}: MenuContentProps) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        sideOffset={sideOffset}
        alignOffset={alignOffset}
        className="cn-menu-positioner"
      >
        <MenuPrimitive.Popup
          data-slot="menu-sub-content"
          className={cn("cn-menu", className)}
          {...props}
        >
          {children}
        </MenuPrimitive.Popup>
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

export type { MenuContentProps };
export {
  Menu,
  MenuCheckboxItem,
  MenuContent,
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
  MenuTrigger,
};
