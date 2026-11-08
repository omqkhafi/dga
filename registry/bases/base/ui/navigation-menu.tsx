"use client";

import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { AutoDirection } from "@/lib/dga/direction";
import { cn } from "@/registry/bases/base/lib/utils";

type NavigationMenuProps = NavigationMenuPrimitive.Root.Props & {
  /**
   * Shows the shared panel under the bar where the content of the open item appears. Turn it
   * off only when you render `NavigationMenuViewport` yourself.
   */
  viewport?: boolean;
  /** The gap between the bar and the panel in pixels. */
  sideOffset?: number;
};

/**
 * The links of a site or an app, with panels that hold groups of links (Platform Code extension,
 * not part of DGA). Items open on hover and on keyboard focus, Left and Right move between them
 * (swapped on Arabic pages), Down opens the panel and Escape closes it. It is a `nav`
 * landmark, so give it an `aria-label`. For the site header with a logo, search and a drawer on
 * phones, use the Header; for a bar of actions, use a Menubar.
 */
function NavigationMenu({
  className,
  children,
  viewport = true,
  sideOffset = 8,
  ...props
}: NavigationMenuProps) {
  return (
    <AutoDirection>
      <NavigationMenuPrimitive.Root
        data-slot="navigation-menu"
        className={cn("cn-navigation-menu", className)}
        {...props}
      >
        {children}
        {viewport ? (
          <NavigationMenuPrimitive.Portal>
            <NavigationMenuPrimitive.Positioner
              sideOffset={sideOffset}
              align="start"
              collisionPadding={16}
              className="cn-navigation-menu-positioner"
            >
              <NavigationMenuPrimitive.Popup
                data-slot="navigation-menu-popup"
                className="cn-navigation-menu-popup"
              >
                <NavigationMenuPrimitive.Viewport
                  data-slot="navigation-menu-viewport"
                  className="cn-navigation-menu-viewport"
                />
              </NavigationMenuPrimitive.Popup>
            </NavigationMenuPrimitive.Positioner>
          </NavigationMenuPrimitive.Portal>
        ) : null}
      </NavigationMenuPrimitive.Root>
    </AutoDirection>
  );
}

/** The row of items. */
function NavigationMenuList({ className, ...props }: NavigationMenuPrimitive.List.Props) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn("cn-navigation-menu-list", className)}
      {...props}
    />
  );
}

/** One entry of the list: a NavigationMenuLink, or a NavigationMenuTrigger with its content. */
function NavigationMenuItem({ className, ...props }: NavigationMenuPrimitive.Item.Props) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("cn-navigation-menu-item", className)}
      {...props}
    />
  );
}

/** The button that opens the panel of its item. A chevron turns while the panel is open. */
function NavigationMenuTrigger({
  className,
  children,
  ...props
}: NavigationMenuPrimitive.Trigger.Props) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn("cn-navigation-menu-trigger", className)}
      {...props}
    >
      {children}
      <NavigationMenuPrimitive.Icon className="cn-navigation-menu-chevron">
        <HugeiconsIcon icon={ArrowDown01Icon} aria-hidden />
      </NavigationMenuPrimitive.Icon>
    </NavigationMenuPrimitive.Trigger>
  );
}

/** The panel of an item. It appears in the shared panel under the bar. */
function NavigationMenuContent({ className, ...props }: NavigationMenuPrimitive.Content.Props) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn("cn-navigation-menu-content", className)}
      {...props}
    />
  );
}

const linkVariants = cva("", {
  variants: {
    variant: {
      /** A top-level link in the bar. */
      bar: "cn-navigation-menu-bar-link",
      /** A link in a panel, with an optional icon, title and description. */
      item: "cn-navigation-menu-link",
    },
  },
  defaultVariants: { variant: "item" },
});

type NavigationMenuLinkProps = NavigationMenuPrimitive.Link.Props &
  VariantProps<typeof linkVariants>;

/**
 * A link. Pass `active` for the current page: it sets `aria-current="page"`. Use `variant="bar"`
 * for a link directly in the bar. Render your own link component with `render`.
 */
function NavigationMenuLink({ className, variant, ...props }: NavigationMenuLinkProps) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(linkVariants({ variant }), className)}
      {...props}
    />
  );
}

/** The name of a link in a panel. */
function NavigationMenuLinkTitle({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="navigation-menu-link-title"
      className={cn("cn-navigation-menu-link-title", className)}
      {...props}
    />
  );
}

/** A line of help under the title of a link in a panel. */
function NavigationMenuLinkDescription({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="navigation-menu-link-description"
      className={cn("cn-navigation-menu-link-description", className)}
      {...props}
    />
  );
}

export type { NavigationMenuLinkProps, NavigationMenuProps };
export {
  linkVariants as navigationMenuLinkVariants,
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuLinkDescription,
  NavigationMenuLinkTitle,
  NavigationMenuList,
  NavigationMenuTrigger,
};
