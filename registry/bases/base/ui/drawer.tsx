"use client";

import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { useDocumentDirection } from "@/lib/dga/direction";
import { cn } from "@/registry/bases/base/lib/utils";

type DrawerSide = "start" | "end" | "top" | "bottom";

const drawerVariants = cva("cn-drawer", {
  variants: {
    side: {
      start: "cn-drawer-side-start",
      end: "cn-drawer-side-end",
      top: "cn-drawer-side-top",
      bottom: "cn-drawer-side-bottom",
    },
    tone: { white: "cn-drawer-tone-white", gray: "cn-drawer-tone-gray" },
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
      <DrawerPrimitive.Backdrop data-slot="drawer-backdrop" className="cn-drawer-backdrop" />
      <DrawerPrimitive.Viewport
        data-slot="drawer-viewport"
        data-side={placed}
        className="cn-drawer-viewport"
      >
        <DrawerPrimitive.Popup
          data-slot="drawer-content"
          data-side={placed}
          className={cn(drawerVariants({ side: placed, tone }), className)}
          {...props}
        >
          <DrawerPrimitive.Content data-slot="drawer-inner" className="cn-drawer-inner">
            {children}
          </DrawerPrimitive.Content>
          {showCloseButton ? (
            <DrawerPrimitive.Close
              data-slot="drawer-close-icon"
              aria-label={closeLabel}
              className="cn-drawer-close"
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
  return <div data-slot="drawer-header" className={cn("cn-drawer-header", className)} {...props} />;
}

/** The name of the drawer. Screen readers announce it when the drawer opens. */
function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn("cn-drawer-title", className)}
      {...props}
    />
  );
}

/** Explains the drawer. Linked to it with `aria-describedby`. */
function DrawerDescription({ className, ...props }: DrawerPrimitive.Description.Props) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn("cn-drawer-description", className)}
      {...props}
    />
  );
}

/** The actions at the bottom of the panel, aligned to the end. */
function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="drawer-footer" className={cn("cn-drawer-footer", className)} {...props} />;
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
