"use client";

import { PreviewCard as PreviewCardPrimitive } from "@base-ui/react/preview-card";
import { AutoDirection, useDocumentDirection } from "@/lib/dga/direction";
import { cn } from "@/registry/bases/base/lib/utils";

/**
 * A preview of what a link points to, shown when people hover or focus the link (Platform Code
 * extension, not part of DGA). Its surface is the DGA Menu and Popover. Touch screens and screen
 * readers do not get the card, so the trigger must be a real link to the same content, and the
 * card never holds the only copy of anything. The card stays open while the pointer is over it
 * and closes with Escape (WCAG 1.4.13).
 */
function HoverCard(props: PreviewCardPrimitive.Root.Props) {
  return (
    <AutoDirection>
      <PreviewCardPrimitive.Root {...props} />
    </AutoDirection>
  );
}

/**
 * The link the card previews. It renders an anchor: give it an `href`. `delay` is how long the
 * pointer must rest on it before the card opens, `closeDelay` how long the card stays after the
 * pointer leaves, both in milliseconds.
 */
function HoverCardTrigger({
  className,
  delay = 400,
  closeDelay = 200,
  ...props
}: PreviewCardPrimitive.Trigger.Props) {
  return (
    <PreviewCardPrimitive.Trigger
      data-slot="hover-card-trigger"
      delay={delay}
      closeDelay={closeDelay}
      className={cn("cursor-pointer rounded-xs text-link-primary underline underline-offset-4 transition-colors hover:text-link-primary-hovered active:text-link-primary-pressed focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-border-black motion-reduce:transition-none", className)}
      {...props}
    />
  );
}

type HoverCardSide = "top" | "bottom" | "start" | "end";

type HoverCardContentProps = PreviewCardPrimitive.Popup.Props &
  Pick<PreviewCardPrimitive.Positioner.Props, "align" | "alignOffset"> & {
    /** The gap between the link and the card in pixels. */
    sideOffset?: number;
    /** Where it opens. `start` and `end` are the sides of the text, so they swap on Arabic pages. */
    side?: HoverCardSide;
    /** Shows the beak that points to the link. */
    showArrow?: boolean;
  };

/** The card. It is 320px wide at most and keeps clear of the screen edges. */
function HoverCardContent({
  className,
  children,
  side = "bottom",
  align = "center",
  sideOffset = 8,
  alignOffset = 0,
  showArrow = false,
  ...props
}: HoverCardContentProps) {
  const rtl = useDocumentDirection() === "rtl";
  const physical =
    side === "start" ? (rtl ? "right" : "left") : side === "end" ? (rtl ? "left" : "right") : side;
  return (
    <PreviewCardPrimitive.Portal>
      <PreviewCardPrimitive.Positioner
        side={physical}
        align={align}
        sideOffset={showArrow ? sideOffset + 4 : sideOffset}
        alignOffset={alignOffset}
        className="z-50 outline-hidden"
      >
        <PreviewCardPrimitive.Popup
          data-slot="hover-card-content"
          className={cn("relative flex w-72 max-w-(--available-width) flex-col gap-3 rounded-md border border-border-neutral-primary bg-background-menu p-4 text-md text-text-default shadow-2xl outline-hidden origin-(--transform-origin) transition-[opacity,scale] duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 motion-reduce:transition-none w-80", className)}
          {...props}
        >
          {children}
          {showArrow ? (
            <PreviewCardPrimitive.Arrow data-slot="hover-card-arrow" className="flex data-[side=bottom]:-top-2.25 data-[side=top]:-bottom-2.25 data-[side=top]:rotate-180 data-[side=left]:-right-3.25 data-[side=left]:rotate-90 data-[side=right]:-left-3.25 data-[side=right]:-rotate-90">
              <svg width="20" height="10" viewBox="0 0 20 10" fill="none" aria-hidden="true">
                <path d="M0 10 L10 0 L20 10 Z" className="fill-background-menu stroke-none" />
                <path d="M0 10 L10 0 L20 10" className="fill-none stroke-border-neutral-primary stroke-1" />
              </svg>
            </PreviewCardPrimitive.Arrow>
          ) : null}
        </PreviewCardPrimitive.Popup>
      </PreviewCardPrimitive.Positioner>
    </PreviewCardPrimitive.Portal>
  );
}

export type { HoverCardContentProps, HoverCardSide };
export { HoverCard, HoverCardContent, HoverCardTrigger };
