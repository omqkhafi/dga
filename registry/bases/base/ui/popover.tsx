"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type * as React from "react";
import { AutoDirection, useDocumentDirection } from "@/lib/dga/direction";
import { cn } from "@/registry/bases/base/lib/utils";

/**
 * A panel of content or a small form that opens from a button and stays until it is dismissed
 * (Platform Code extension, not part of DGA). Its surface is the DGA Menu and its optional beak is
 * the DGA Tooltip's. Focus moves into the panel when it opens, Escape or a click outside closes
 * it, and focus returns to the trigger. For a hint that only names something, use a Tooltip; for
 * a list of actions, use a Menu.
 */
function Popover(props: PopoverPrimitive.Root.Props) {
  return (
    <AutoDirection>
      <PopoverPrimitive.Root {...props} />
    </AutoDirection>
  );
}

/** The button that opens the popover. Render your own Button with `render`. */
function PopoverTrigger({ className, ...props }: PopoverPrimitive.Trigger.Props) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" className={className} {...props} />;
}

type PopoverSide = "top" | "bottom" | "start" | "end";

type PopoverContentProps = PopoverPrimitive.Popup.Props &
  Pick<PopoverPrimitive.Positioner.Props, "align" | "alignOffset"> & {
    /** The gap between the trigger and the panel in pixels. */
    sideOffset?: number;
    /** Where it opens. `start` and `end` are the sides of the text, so they swap on Arabic pages. */
    side?: PopoverSide;
    /** Shows the beak that points to the trigger. */
    showArrow?: boolean;
    /** Shows a close button in the corner. */
    showCloseButton?: boolean;
    /** Accessible name of the close button. Translate it on Arabic pages. */
    closeLabel?: string;
  };

/** The panel. It is at most 320px wide, and keeps clear of the screen edges. */
function PopoverContent({
  className,
  children,
  side = "bottom",
  align = "center",
  sideOffset = 8,
  alignOffset = 0,
  showArrow = false,
  showCloseButton = false,
  closeLabel = "Close",
  ...props
}: PopoverContentProps) {
  const rtl = useDocumentDirection() === "rtl";
  const physical =
    side === "start" ? (rtl ? "right" : "left") : side === "end" ? (rtl ? "left" : "right") : side;
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        side={physical}
        align={align}
        sideOffset={showArrow ? sideOffset + 4 : sideOffset}
        alignOffset={alignOffset}
        className="cn-popover-positioner"
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          data-has-close={showCloseButton ? "" : undefined}
          className={cn("cn-popover", className)}
          {...props}
        >
          {children}
          {showCloseButton ? (
            <PopoverPrimitive.Close
              data-slot="popover-close-icon"
              aria-label={closeLabel}
              className="cn-popover-close"
            >
              <HugeiconsIcon icon={Cancel01Icon} aria-hidden />
            </PopoverPrimitive.Close>
          ) : null}
          {showArrow ? (
            <PopoverPrimitive.Arrow data-slot="popover-arrow" className="cn-popover-arrow">
              <svg width="20" height="10" viewBox="0 0 20 10" fill="none" aria-hidden="true">
                <path d="M0 10 L10 0 L20 10 Z" className="cn-popover-arrow-fill" />
                <path d="M0 10 L10 0 L20 10" className="cn-popover-arrow-line" />
              </svg>
            </PopoverPrimitive.Arrow>
          ) : null}
        </PopoverPrimitive.Popup>
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

/** Groups the title and description at the top of the panel. */
function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="popover-header" className={cn("cn-popover-header", className)} {...props} />
  );
}

/** The name of the popover. Screen readers read it with the panel. */
function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      className={cn("cn-popover-title", className)}
      {...props}
    />
  );
}

/** Explains the popover. Linked to the panel with `aria-describedby`. */
function PopoverDescription({ className, ...props }: PopoverPrimitive.Description.Props) {
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      className={cn("cn-popover-description", className)}
      {...props}
    />
  );
}

/** Closes the popover. Render a Button with it: `<PopoverClose render={<Button />}>`. */
function PopoverClose({ className, ...props }: PopoverPrimitive.Close.Props) {
  return <PopoverPrimitive.Close data-slot="popover-close" className={className} {...props} />;
}

/** The actions at the bottom of the panel, aligned to the end. */
function PopoverFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="popover-footer" className={cn("cn-popover-footer", className)} {...props} />
  );
}

export type { PopoverContentProps, PopoverSide };
export {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
};
