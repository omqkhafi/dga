"use client";

import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import { AutoDirection } from "@/lib/dga/direction";
import { cn } from "@/registry/bases/base/lib/utils";

type ScrollAreaOrientation = "vertical" | "horizontal" | "both";

type ScrollAreaProps = ScrollAreaPrimitive.Root.Props & {
  /** Which scrollbars it has. `vertical` is the default. */
  orientation?: ScrollAreaOrientation;
  /**
   * When the scrollbar shows. `hover` shows it while the pointer is over the area, while it
   * scrolls and while the content has focus; `always` keeps it visible.
   */
  visibility?: "hover" | "always";
  /**
   * Accessible name of the scrollable region. Without it a screen reader announces an unnamed
   * region, so always pass one and translate it on Arabic pages.
   */
  label?: string;
  /** Classes for the scrolling element (the viewport). */
  viewportClassName?: string;
};

/**
 * A region with custom scrollbars (Platform Code extension, not part of DGA). Built on the Base UI
 * Scroll Area. The viewport can take focus, so keyboard users scroll it with the arrow keys, Page
 * Up and Down, Home and End, and the vertical scrollbar sits on the end side in Arabic. Give it a
 * height or a width: it scrolls whatever overflows.
 */
function ScrollArea({
  className,
  viewportClassName,
  children,
  orientation = "vertical",
  visibility = "hover",
  label = "Scrollable content",
  ...props
}: ScrollAreaProps) {
  return (
    <AutoDirection>
      <ScrollAreaPrimitive.Root
        data-slot="scroll-area"
        data-visibility={visibility}
        className={cn("cn-scroll-area", className)}
        {...props}
      >
        <ScrollAreaPrimitive.Viewport
          data-slot="scroll-area-viewport"
          role="region"
          aria-label={label}
          tabIndex={0}
          className={cn("cn-scroll-area-viewport", viewportClassName)}
        >
          <ScrollAreaPrimitive.Content data-slot="scroll-area-content">
            {children}
          </ScrollAreaPrimitive.Content>
        </ScrollAreaPrimitive.Viewport>
        {orientation !== "horizontal" ? <ScrollBar orientation="vertical" /> : null}
        {orientation !== "vertical" ? <ScrollBar orientation="horizontal" /> : null}
        {orientation === "both" ? <ScrollAreaPrimitive.Corner /> : null}
      </ScrollAreaPrimitive.Root>
    </AutoDirection>
  );
}

/** One scrollbar. `ScrollArea` adds the ones its `orientation` needs. */
function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: ScrollAreaPrimitive.Scrollbar.Props) {
  return (
    <ScrollAreaPrimitive.Scrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={cn("cn-scroll-area-scrollbar", className)}
      {...props}
    >
      <ScrollAreaPrimitive.Thumb data-slot="scroll-area-thumb" className="cn-scroll-area-thumb" />
    </ScrollAreaPrimitive.Scrollbar>
  );
}

export { ScrollArea, ScrollBar };
