"use client";

import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { useDocumentDirection } from "@/registry/bases/base/lib/direction";
import { cn } from "@/registry/bases/base/lib/utils";

type DrawerSide = "start" | "end" | "top" | "bottom";

const drawerVariants = cva("relative flex flex-col overflow-y-auto overscroll-contain text-text-default shadow-lg outline-hidden [transform:translate(var(--drawer-swipe-movement-x,0px),var(--drawer-swipe-movement-y,0px))] transition-[transform,translate] duration-300 ease-out data-swiping:duration-0 data-swiping:select-none motion-reduce:transition-none", {
  variants: {
    side: {
      start: "h-full w-86.5 max-w-[calc(100vw-3rem)] border-e border-border-neutral-primary data-ending-style:-translate-x-full data-starting-style:-translate-x-full rtl:data-ending-style:translate-x-full rtl:data-starting-style:translate-x-full",
      end: "h-full w-86.5 max-w-[calc(100vw-3rem)] border-s border-border-neutral-primary data-ending-style:translate-x-full data-starting-style:translate-x-full rtl:data-ending-style:-translate-x-full rtl:data-starting-style:-translate-x-full",
      top: "max-h-[80dvh] w-full border-b border-border-neutral-primary data-ending-style:-translate-y-full data-starting-style:-translate-y-full",
      bottom: "max-h-[80dvh] w-full border-t border-border-neutral-primary data-ending-style:translate-y-full data-starting-style:translate-y-full",
    },
    tone: { white: "bg-background-menu", gray: "bg-background-neutral-100" },
  },
  defaultVariants: { side: "end", tone: "white" },
});

/** The physical swipe direction that closes a drawer on a side, for the page direction. */
function swipeFor(side: DrawerSide, rtl: boolean) {
  if (side === "top") return "up";
  if (side === "bottom") return "down";
  const left = (side === "start") !== rtl;
  return left ? "left" : "right";
}

const DrawerSideContext = React.createContext<DrawerSide>("end");

type DrawerProps = DrawerPrimitive.Root.Props & {
  /**
   * The edge the drawer slides in from. `start` and `end` follow the page direction, so a
   * `start` drawer is on the right on Arabic pages. Closing by swipe follows it.
   */
  side?: DrawerSide;
};

/**
 * A panel that slides in from an edge of the screen (DGA: Slideout Menu). It is a modal dialog:
 * focus is trapped inside, Escape closes it and focus returns to the trigger. On touch screens it
 * can be swiped closed.
 */
function Drawer({ side = "end", ...props }: DrawerProps) {
  const rtl = useDocumentDirection() === "rtl";
  return (
    <DrawerSideContext.Provider value={side}>
      <DrawerPrimitive.Root swipeDirection={swipeFor(side, rtl)} {...props} />
    </DrawerSideContext.Provider>
  );
}

/** The button that opens the drawer. */
function DrawerTrigger({ className, ...props }: DrawerPrimitive.Trigger.Props) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" className={className} {...props} />;
}

type DrawerContentProps = DrawerPrimitive.Popup.Props &
  Omit<VariantProps<typeof drawerVariants>, "side"> & {
    /** Shows the close button in the corner. */
    showCloseButton?: boolean;
    /** Accessible name of the close button. Translate it on Arabic pages. */
    closeLabel?: string;
  };

/** The panel: a dimmed backdrop and the card, 346px wide on the sides and full width at the top or bottom. */
function DrawerContent({
  className,
  children,
  tone,
  showCloseButton = true,
  closeLabel = "Close",
  ...props
}: DrawerContentProps) {
  const placed = React.useContext(DrawerSideContext);
  return (
    <DrawerPrimitive.Portal>
      <DrawerPrimitive.Backdrop data-slot="drawer-backdrop" className="fixed inset-0 z-50 bg-alpha-black-50 transition-opacity duration-300 data-ending-style:opacity-0 data-starting-style:opacity-0 data-swiping:duration-0 motion-reduce:transition-none" />
      <DrawerPrimitive.Viewport
        data-slot="drawer-viewport"
        data-side={placed}
        className="fixed inset-0 z-50 flex items-stretch data-[side=start]:justify-start data-[side=end]:justify-end data-[side=top]:flex-col data-[side=top]:justify-start data-[side=bottom]:flex-col data-[side=bottom]:justify-end"
      >
        <DrawerPrimitive.Popup
          data-slot="drawer-content"
          data-side={placed}
          className={cn(drawerVariants({ side: placed, tone }), className)}
          {...props}
        >
          <DrawerPrimitive.Content data-slot="drawer-inner" className="flex min-h-0 flex-1 flex-col gap-4 p-6">
            {children}
          </DrawerPrimitive.Content>
          {showCloseButton ? (
            <DrawerPrimitive.Close
              data-slot="drawer-close-icon"
              aria-label={closeLabel}
              className="absolute end-4 top-4 inline-flex size-8 cursor-pointer items-center justify-center rounded-sm text-icon-default transition-colors hover:bg-button-background-neutral-hovered active:bg-button-background-neutral-pressed focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-1 focus-visible:outline-border-black [&_svg]:size-5 motion-reduce:transition-none"
            >
              <HugeiconsIcon icon={Cancel01Icon} aria-hidden />
            </DrawerPrimitive.Close>
          ) : null}
        </DrawerPrimitive.Popup>
      </DrawerPrimitive.Viewport>
    </DrawerPrimitive.Portal>
  );
}

/** Groups the title and description at the top of the panel. */
function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="drawer-header" className={cn("flex flex-col gap-modal-gap pe-10", className)} {...props} />;
}

/** The name of the drawer. Screen readers announce it when the drawer opens. */
function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("m-0 text-lg font-semibold text-text-display", className)}
      {...props}
    />
  );
}

/** Explains the drawer. Linked to it with `aria-describedby`. */
function DrawerDescription({ className, ...props }: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("m-0 text-md text-text-primary-paragraph", className)}
      {...props}
    />
  );
}

/** The actions at the bottom of the panel, aligned to the end. */
function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="drawer-footer" className={cn("mt-auto flex flex-col-reverse gap-3 pt-modal-content-bottom-padding sm:flex-row sm:flex-wrap sm:justify-end", className)} {...props} />;
}

/** Closes the drawer. Render a Button with it: `<DrawerClose render={<Button />}>`. */
function DrawerClose({ className, ...props }: DrawerPrimitive.Close.Props) {
  return <DrawerPrimitive.Close data-slot="drawer-close" className={className} {...props} />;
}

export type { DrawerContentProps, DrawerProps, DrawerSide };
export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  drawerVariants,
};
