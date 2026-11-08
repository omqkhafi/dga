"use client";

import { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Checkbox } from "@/components/dga/checkbox";
import { cn } from "@/registry/bases/base/lib/utils";

const cardVariants = cva("cn-card", {
  variants: {
    effect: { shadow: "cn-card-shadow", none: "", stroke: "cn-card-stroke" },
    size: { sm: "cn-card-size-sm", md: "cn-card-size-md", lg: "cn-card-size-lg" },
  },
  defaultVariants: { effect: "shadow", size: "lg" },
});

type CardProps = React.ComponentProps<"div"> &
  VariantProps<typeof cardVariants> & {
    /** Greys the card out and ignores clicks. Use it for something that is not available now. */
    disabled?: boolean;
  };

/**
 * A container for information and actions about one thing (DGA: Card). `effect` is a soft
 * `shadow` (default), a `stroke`, or `none`; `size` sets the padding and gaps (`lg` is the DGA
 * default). A card that goes somewhere holds a `CardLink` in its title: the whole card then
 * works as that link and keeps real link semantics. Give a card that is a list item or an
 * article the matching `role`.
 */
function Card({ className, effect, size, disabled, ...props }: CardProps) {
  return (
    <div
      data-slot="card"
      data-size={size ?? "lg"}
      data-disabled={disabled ? "" : undefined}
      aria-disabled={disabled || undefined}
      className={cn(cardVariants({ effect, size }), className)}
      {...props}
    />
  );
}

/** An image or other media across the top of the card, edge to edge. */
function CardMedia({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-media" className={cn("cn-card-media", className)} {...props} />;
}

/** The icon or Featured Icon above the title. */
function CardIcon({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-icon" className={cn("cn-card-icon", className)} {...props} />;
}

/** Groups the title and the description. */
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-header" className={cn("cn-card-header", className)} {...props} />;
}

/** The card's title. A heading: pass `level` (default 3) to fit the page outline. */
function CardTitle({
  className,
  level = 3,
  ...props
}: React.ComponentProps<"h3"> & { level?: 2 | 3 | 4 | 5 | 6 }) {
  const Heading = `h${level}` as "h3";
  return <Heading data-slot="card-title" className={cn("cn-card-title", className)} {...props} />;
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p data-slot="card-description" className={cn("cn-card-description", className)} {...props} />
  );
}

/** Free content: tags, a rating, a table, anything. */
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("cn-card-content", className)} {...props} />;
}

/**
 * The primary and secondary actions. They sit above the card's link, so they stay clickable when
 * the whole card is a link.
 */
function CardActions({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-actions" className={cn("cn-card-actions", className)} {...props} />;
}

/**
 * The link that makes the whole card clickable. Put it around the title text. Its click area
 * stretches over the card, so a screen reader still gets one link named by the title, and
 * keyboard focus draws the ring around the card. Pass `render` to use your router's link.
 */
function CardLink({
  className,
  render,
  ...props
}: React.ComponentProps<"a"> & { render?: React.ReactElement<React.ComponentProps<"a">> }) {
  const merged = {
    "data-slot": "card-link",
    className: cn("cn-card-link", className),
    ...props,
  };
  return render ? React.cloneElement(render, merged) : <a {...merged} />;
}

// ---------------------------------------------------------------------------------------------
// Expandable
// ---------------------------------------------------------------------------------------------

/**
 * A card whose details open and close (DGA: Expandable). Built on Base UI Collapsible. Put a
 * `CardExpandableTrigger` and a `CardExpandablePanel` inside, with the always-visible part first.
 */
function CardExpandable({
  className,
  effect,
  size,
  disabled,
  ...props
}: CollapsiblePrimitive.Root.Props & VariantProps<typeof cardVariants>) {
  return (
    <CollapsiblePrimitive.Root
      data-slot="card"
      data-size={size ?? "lg"}
      data-expandable=""
      disabled={disabled}
      className={cn(cardVariants({ effect, size }), "cn-card-expandable", className)}
      {...props}
    />
  );
}

/** The button that opens and closes the details. Its `aria-expanded` tells screen readers. */
function CardExpandableTrigger({
  className,
  children,
  ...props
}: CollapsiblePrimitive.Trigger.Props) {
  return (
    <CollapsiblePrimitive.Trigger
      data-slot="card-expandable-trigger"
      className={cn("cn-card-expand-trigger", className)}
      {...props}
    >
      {children}
      <HugeiconsIcon icon={ArrowDown01Icon} aria-hidden className="cn-card-expand-chevron" />
    </CollapsiblePrimitive.Trigger>
  );
}

function CardExpandablePanel({ className, ...props }: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsiblePrimitive.Panel
      data-slot="card-expandable-panel"
      className={cn("cn-card-expand-panel", className)}
      {...props}
    />
  );
}

// ---------------------------------------------------------------------------------------------
// Selectable
// ---------------------------------------------------------------------------------------------

type SelectableCardProps = Omit<React.ComponentProps<"label">, "onChange"> &
  VariantProps<typeof cardVariants> & {
    /** Whether the card is selected (controlled). */
    checked?: boolean;
    /** Whether the card is selected at first (uncontrolled). */
    defaultChecked?: boolean;
    /** Called with the new state. */
    onCheckedChange?: (checked: boolean) => void;
    /** The card cannot be selected. */
    disabled?: boolean;
    /** The form field name. */
    name?: string;
    /** The form field value. */
    value?: string;
  };

/**
 * A card you pick (DGA: Selectable), built on a checkbox: clicking anywhere on the card, or
 * pressing Space on the focused checkbox, toggles it. The card's text names the checkbox. Do not
 * put links or buttons inside; use a `Card` with a `CardLink` for something that navigates.
 */
function SelectableCard({
  className,
  effect,
  size,
  checked,
  defaultChecked,
  onCheckedChange,
  disabled,
  name,
  value,
  children,
  ...props
}: SelectableCardProps) {
  return (
    // biome-ignore lint/a11y/noLabelWithoutControl: the Checkbox inside is the control
    <label
      data-slot="card"
      data-selectable=""
      data-size={size ?? "lg"}
      data-disabled={disabled ? "" : undefined}
      className={cn(cardVariants({ effect, size }), "cn-card-selectable", className)}
      {...props}
    >
      <Checkbox
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={(next) => onCheckedChange?.(next)}
        disabled={disabled}
        name={name}
        value={value}
        className="cn-card-checkbox"
      />
      {children}
    </label>
  );
}

export type { CardProps, SelectableCardProps };
export {
  Card,
  CardActions,
  CardContent,
  CardDescription,
  CardExpandable,
  CardExpandablePanel,
  CardExpandableTrigger,
  CardHeader,
  CardIcon,
  CardLink,
  CardMedia,
  CardTitle,
  cardVariants,
  SelectableCard,
};
