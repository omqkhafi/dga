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
        className={cn("relative flex max-w-full items-center text-text-default", className)}
        {...props}
      >
        {children}
        {viewport ? (
          <NavigationMenuPrimitive.Portal>
            <NavigationMenuPrimitive.Positioner
              sideOffset={sideOffset}
              align="start"
              collisionPadding={16}
              className="z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) outline-hidden"
            >
              <NavigationMenuPrimitive.Popup
                data-slot="navigation-menu-popup"
                className="relative h-(--popup-height) w-(--popup-width) origin-(--transform-origin) overflow-hidden rounded-md border border-border-neutral-primary bg-background-menu text-text-default shadow-2xl outline-hidden transition-[opacity,scale,width,height] duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 motion-reduce:transition-none"
              >
                <NavigationMenuPrimitive.Viewport
                  data-slot="navigation-menu-viewport"
                  className="relative h-full w-full overflow-hidden"
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
      className={cn("m-0 flex list-none flex-wrap items-center gap-1 p-0", className)}
      {...props}
    />
  );
}

/** One entry of the list: a NavigationMenuLink, or a NavigationMenuTrigger with its content. */
function NavigationMenuItem({ className, ...props }: NavigationMenuPrimitive.Item.Props) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)}
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
      className={cn("inline-flex h-10 cursor-pointer items-center gap-1 rounded-sm border-0 bg-transparent px-4 py-2 text-md font-medium whitespace-nowrap text-text-default no-underline hover:bg-button-background-neutral-hovered active:bg-button-background-neutral-pressed data-popup-open:bg-button-background-neutral-hovered focus-visible:outline-2 focus-visible:outline-solid focus-visible:-outline-offset-2 focus-visible:outline-border-black disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-transparent disabled:text-text-default-disabled disabled:[&_svg]:text-icon-default-disabled transition-colors motion-reduce:transition-none", className)}
      {...props}
    >
      {children}
      <NavigationMenuPrimitive.Icon className="inline-flex shrink-0 text-icon-default transition-transform in-data-popup-open:rotate-180 motion-reduce:transition-none [&_svg]:size-4">
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
      className={cn("w-max max-w-[calc(100vw-2rem)] min-w-72 p-2 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none", className)}
      {...props}
    />
  );
}

const linkVariants = cva("", {
  variants: {
    variant: {
      /** A top-level link in the bar. */
      bar: "inline-flex h-10 cursor-pointer items-center gap-1 rounded-sm border-0 bg-transparent px-4 py-2 text-md font-medium whitespace-nowrap text-text-default no-underline hover:bg-button-background-neutral-hovered active:bg-button-background-neutral-pressed focus-visible:outline-2 focus-visible:outline-solid focus-visible:-outline-offset-2 focus-visible:outline-border-black aria-[current=page]:bg-button-background-primary-default aria-[current=page]:text-text-oncolor-primary aria-[current=page]:hover:bg-button-background-primary-hovered aria-[current=page]:active:bg-button-background-primary-pressed aria-[current=page]:[&_svg]:text-icon-oncolor aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:bg-transparent aria-disabled:text-text-default-disabled transition-colors motion-reduce:transition-none",
      /** A link in a panel, with an optional icon, title and description. */
      item: "flex min-h-12 w-full cursor-pointer flex-col justify-center gap-0.5 rounded-md px-3 py-2 text-start text-md font-medium text-text-display no-underline outline-hidden select-none hover:bg-button-background-neutral-hovered active:bg-button-background-neutral-pressed focus-visible:outline-2 focus-visible:outline-solid focus-visible:-outline-offset-2 focus-visible:outline-border-black aria-[current=page]:font-bold aria-[current=page]:[&>:first-child]:underline aria-[current=page]:[&>:first-child]:underline-offset-4 aria-disabled:pointer-events-none aria-disabled:cursor-not-allowed aria-disabled:text-text-default-disabled [&_svg]:size-5 [&_svg]:shrink-0 [&_svg]:text-icon-default",
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
      className={cn("flex items-center gap-2 text-md font-medium", className)}
      {...props}
    />
  );
}

/** A line of help under the title of a link in a panel. */
function NavigationMenuLinkDescription({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="navigation-menu-link-description"
      className={cn("block text-sm font-normal text-text-primary-paragraph", className)}
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
