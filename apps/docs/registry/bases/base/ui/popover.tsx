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
        className="z-50 outline-hidden"
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          data-has-close={showCloseButton ? "" : undefined}
          className={cn("relative flex w-72 max-w-(--available-width) flex-col gap-3 rounded-md border border-border-neutral-primary bg-background-menu p-4 text-md text-text-default shadow-2xl outline-hidden origin-(--transform-origin) transition-[opacity,scale] duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 motion-reduce:transition-none", className)}
          {...props}
        >
          {children}
          {showCloseButton ? (
            <PopoverPrimitive.Close
              data-slot="popover-close-icon"
              aria-label={closeLabel}
              className="absolute end-2 top-2 inline-flex size-8 cursor-pointer items-center justify-center rounded-sm border-0 bg-transparent p-0 text-icon-default transition-colors hover:bg-button-background-neutral-hovered active:bg-button-background-neutral-pressed focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-1 focus-visible:outline-border-black [&_svg]:size-5 motion-reduce:transition-none"
            >
              <HugeiconsIcon icon={Cancel01Icon} aria-hidden />
            </PopoverPrimitive.Close>
          ) : null}
          {showArrow ? (
            <PopoverPrimitive.Arrow data-slot="popover-arrow" className="flex data-[side=bottom]:-top-2.25 data-[side=top]:-bottom-2.25 data-[side=top]:rotate-180 data-[side=left]:-right-3.25 data-[side=left]:rotate-90 data-[side=right]:-left-3.25 data-[side=right]:-rotate-90">
              <svg width="20" height="10" viewBox="0 0 20 10" fill="none" aria-hidden="true">
                <path d="M0 10 L10 0 L20 10 Z" className="fill-background-menu stroke-none" />
                <path d="M0 10 L10 0 L20 10" className="fill-none stroke-border-neutral-primary stroke-1" />
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
    <div data-slot="popover-header" className={cn("flex flex-col gap-1 in-data-has-close:pe-8", className)} {...props} />
  );
}

/** The name of the popover. Screen readers read it with the panel. */
function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      className={cn("m-0 text-md font-semibold text-text-display", className)}
      {...props}
    />
  );
}

/** Explains the popover. Linked to the panel with `aria-describedby`. */
function PopoverDescription({ className, ...props }: PopoverPrimitive.Description.Props) {
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      className={cn("m-0 text-sm text-text-primary-paragraph", className)}
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
    <div data-slot="popover-footer" className={cn("flex flex-wrap justify-end gap-2 pt-1", className)} {...props} />
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
