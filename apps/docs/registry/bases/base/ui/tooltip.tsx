"use client";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { HelpCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { AutoDirection, useDocumentDirection } from "@/registry/bases/base/lib/direction";
import { cn } from "@/registry/bases/base/lib/utils";

const tooltipVariants = cva("relative flex w-max max-w-60 min-w-40 flex-col gap-1 rounded-xs bg-(--tt-bg) p-tooltip-padding text-xs text-(--tt-text) shadow-lg outline-hidden origin-(--transform-origin) transition-[opacity,scale] duration-150 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 motion-reduce:transition-none", {
  variants: {
    tone: { light: "[--tt-bg:var(--tooltip-background-light)] [--tt-heading:var(--tooltip-text-heading-light)] [--tt-text:var(--tooltip-text-paragraph-light)]", dark: "[--tt-bg:var(--tooltip-background-dark)] [--tt-heading:var(--tooltip-text-heading-dark)] [--tt-text:var(--tooltip-text-paragraph-dark)]" },
  },
  defaultVariants: { tone: "light" },
});

/**
 * Sets how long people hover before a tooltip opens, and lets the next one open at once while
 * they move between triggers. Wrap the page or a toolbar with it.
 */
function TooltipProvider({ delay = 300, ...props }: TooltipPrimitive.Provider.Props) {
  return <TooltipPrimitive.Provider delay={delay} {...props} />;
}

/**
 * A short hint for an element, shown on hover and on keyboard focus (DGA: Tooltip). Tooltips are
 * for sighted mouse and keyboard users: screen readers and touch screens do not rely on them, so
 * they never hold the only copy of something people need, and they are not for interactive
 * content. An icon-only trigger still needs an `aria-label`.
 */
function Tooltip(props: TooltipPrimitive.Root.Props) {
  return (
    <AutoDirection>
      <TooltipPrimitive.Root {...props} />
    </AutoDirection>
  );
}

/** The element the tooltip describes. Render your own button or link with `render`. */
function TooltipTrigger({ className, ...props }: TooltipPrimitive.Trigger.Props) {
  return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" className={className} {...props} />;
}

type TooltipSide = "top" | "bottom" | "start" | "end";

type TooltipContentProps = Omit<TooltipPrimitive.Popup.Props, "title"> &
  VariantProps<typeof tooltipVariants> &
  Pick<TooltipPrimitive.Positioner.Props, "align" | "sideOffset"> & {
    /** Where it opens. `start` and `end` are the sides of the text, so they swap on Arabic pages. */
    side?: TooltipSide;
    /** A bold heading above the text. */
    title?: React.ReactNode;
    /** Shows the beak that points to the trigger. */
    showArrow?: boolean;
  };

/** The bubble. It is at most 240px wide and keeps clear of the screen edges. */
function TooltipContent({
  className,
  children,
  title,
  tone,
  side = "top",
  align = "center",
  sideOffset = 10,
  showArrow = true,
  ...props
}: TooltipContentProps) {
  const rtl = useDocumentDirection() === "rtl";
  const physical =
    side === "start" ? (rtl ? "right" : "left") : side === "end" ? (rtl ? "left" : "right") : side;
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner
        side={physical}
        align={align}
        sideOffset={sideOffset}
        className="z-50"
      >
        <TooltipPrimitive.Popup
          data-slot="tooltip-content"
          className={cn(tooltipVariants({ tone }), className)}
          {...props}
        >
          {title ? <span className="block text-xs font-semibold text-(--tt-heading)">{title}</span> : null}
          <span className="block">{children}</span>
          {showArrow ? (
            <TooltipPrimitive.Arrow data-slot="tooltip-arrow" className="flex text-(--tt-bg) data-[side=bottom]:-top-2.25 data-[side=top]:-bottom-2.25 data-[side=top]:rotate-180 data-[side=left]:-right-3.25 data-[side=left]:rotate-90 data-[side=right]:-left-3.25 data-[side=right]:-rotate-90">
              <svg width="20" height="10" viewBox="0 0 20 10" fill="none" aria-hidden="true">
                <path d="M0 10 L10 0 L20 10 Z" fill="currentColor" />
              </svg>
            </TooltipPrimitive.Arrow>
          ) : null}
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}

type TooltipHelpProps = Omit<PopoverPrimitive.Trigger.Props, "title" | "children"> &
  VariantProps<typeof tooltipVariants> &
  Pick<PopoverPrimitive.Positioner.Props, "align" | "sideOffset"> & {
    /** Accessible name of the icon button. Translate it on Arabic pages. */
    label?: string;
    /** The explanation. It opens on hover, focus, click and touch, and screen readers can read it. */
    children: React.ReactNode;
    /** A bold heading above the text. */
    title?: React.ReactNode;
    /** Where it opens. `start` and `end` are the sides of the text, so they swap on Arabic pages. */
    side?: TooltipSide;
  };

/**
 * The DGA Help Icon: a 20px question-mark button next to a label, with an explanation in the
 * same bubble as a Tooltip. It is a Popover that also opens on hover, not a Tooltip: the button
 * exists to show the text, so keyboard, touch and screen reader users must be able to open and
 * read it too.
 */
function TooltipHelp({
  className,
  label = "More information",
  children,
  title,
  tone,
  side = "top",
  align = "center",
  sideOffset = 10,
  ...props
}: TooltipHelpProps) {
  const rtl = useDocumentDirection() === "rtl";
  const physical =
    side === "start" ? (rtl ? "right" : "left") : side === "end" ? (rtl ? "left" : "right") : side;
  return (
    <AutoDirection>
      <PopoverPrimitive.Root>
        <PopoverPrimitive.Trigger
          data-slot="tooltip-help"
          aria-label={label}
          openOnHover
          className={cn("inline-flex size-5 shrink-0 cursor-help items-center justify-center rounded-full border-0 bg-transparent p-0 text-icon-default-500 transition-colors hover:text-icon-default data-popup-open:text-icon-default focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-1 focus-visible:outline-border-black [&_svg]:size-5 motion-reduce:transition-none", className)}
          {...props}
        >
          <HugeiconsIcon icon={HelpCircleIcon} aria-hidden />
        </PopoverPrimitive.Trigger>
        <PopoverPrimitive.Portal>
          <PopoverPrimitive.Positioner
            side={physical}
            align={align}
            sideOffset={sideOffset}
            className="z-50"
          >
            <PopoverPrimitive.Popup
              data-slot="tooltip-help-content"
              className={cn(tooltipVariants({ tone }))}
            >
              {title ? (
                <PopoverPrimitive.Title className="block text-xs font-semibold text-(--tt-heading)">
                  {title}
                </PopoverPrimitive.Title>
              ) : null}
              <PopoverPrimitive.Description className="block">
                {children}
              </PopoverPrimitive.Description>
              <PopoverPrimitive.Arrow className="flex text-(--tt-bg) data-[side=bottom]:-top-2.25 data-[side=top]:-bottom-2.25 data-[side=top]:rotate-180 data-[side=left]:-right-3.25 data-[side=left]:rotate-90 data-[side=right]:-left-3.25 data-[side=right]:-rotate-90">
                <svg width="20" height="10" viewBox="0 0 20 10" fill="none" aria-hidden="true">
                  <path d="M0 10 L10 0 L20 10 Z" fill="currentColor" />
                </svg>
              </PopoverPrimitive.Arrow>
            </PopoverPrimitive.Popup>
          </PopoverPrimitive.Positioner>
        </PopoverPrimitive.Portal>
      </PopoverPrimitive.Root>
    </AutoDirection>
  );
}

export type { TooltipContentProps, TooltipHelpProps, TooltipSide };
export { Tooltip, TooltipContent, TooltipHelp, TooltipProvider, TooltipTrigger, tooltipVariants };
