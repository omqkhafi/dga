"use client";

import type { Collapsible as CollapsiblePrimitive } from "@base-ui/react/collapsible";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Checkbox } from "@/components/dga/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/dga/collapsible";
import { cn } from "@/registry/bases/base/lib/utils";

const cardVariants = cva("relative flex min-w-0 flex-col gap-(--card-gap) rounded-lg border border-transparent bg-background-card p-(--card-pad) text-text-default transition-colors has-[[data-slot=card-link]]:cursor-pointer has-[[data-slot=card-link]]:hover:bg-background-neutral-50 has-[[data-slot=card-link]:focus-visible]:outline-2 has-[[data-slot=card-link]:focus-visible]:outline-solid has-[[data-slot=card-link]:focus-visible]:outline-border-black data-disabled:pointer-events-none data-disabled:bg-background-disabled data-disabled:text-text-default-disabled data-disabled:shadow-none motion-reduce:transition-none", {
  variants: {
    effect: { shadow: "shadow-md", none: "", stroke: "border-border-neutral-primary data-disabled:border-border-disabled" },
    size: { sm: "[--card-gap:var(--spacing-card-sm-gap)] [--card-pad:var(--spacing-card-sm-padding)]", md: "[--card-gap:var(--spacing-card-md-gap)] [--card-pad:var(--spacing-card-md-padding)]", lg: "[--card-gap:var(--spacing-card-lg-gap)] [--card-pad:var(--spacing-card-lg-padding)]" },
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
  return <div data-slot="card-media" className={cn("-mx-(--card-pad) -mt-(--card-pad) overflow-hidden rounded-t-[calc(var(--radius-lg)-1px)] [&_img]:block [&_img]:h-auto [&_img]:w-full [&_img]:object-cover", className)} {...props} />;
}

/** The icon or Featured Icon above the title. */
function CardIcon({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-icon" className={cn("flex shrink-0 items-center text-icon-success in-data-disabled:text-icon-default-400", className)} {...props} />;
}

/** Groups the title and the description. */
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-header" className={cn("flex min-w-0 flex-col gap-1", className)} {...props} />;
}

/** The card's title. A heading: pass `level` (default 3) to fit the page outline. */
function CardTitle({
  className,
  level = 3,
  ...props
}: React.ComponentProps<"h3"> & { level?: 2 | 3 | 4 | 5 | 6 }) {
  const Heading = `h${level}` as "h3";
  return <Heading data-slot="card-title" className={cn("m-0 text-lg font-bold text-text-display in-data-disabled:text-text-default-disabled", className)} {...props} />;
}

function CardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p data-slot="card-description" className={cn("m-0 text-md text-text-primary-paragraph in-data-disabled:text-text-default-disabled", className)} {...props} />
  );
}

/** Free content: tags, a rating, a table, anything. */
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("flex min-w-0 flex-col gap-3", className)} {...props} />;
}

/**
 * The primary and secondary actions. They sit above the card's link, so they stay clickable when
 * the whole card is a link.
 */
function CardActions({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-actions" className={cn("relative z-10 mt-auto flex flex-wrap items-center gap-3", className)} {...props} />;
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
    className: cn("text-inherit no-underline after:absolute after:inset-0 after:z-0 after:rounded-lg after:content-[''] focus-visible:outline-none", className),
    ...props,
  };
  return render ? React.cloneElement(render, merged) : <a {...merged} />;
}

// ---------------------------------------------------------------------------------------------
// Expandable
// ---------------------------------------------------------------------------------------------

/**
 * A card whose details open and close (DGA: Expandable). Built on the Collapsible. Put a
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
    <Collapsible
      data-slot="card"
      data-size={size ?? "lg"}
      data-expandable=""
      disabled={disabled}
      className={cn(cardVariants({ effect, size }), "hover:bg-background-neutral-50 data-disabled:hover:bg-background-disabled", className)}
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
    <CollapsibleTrigger
      data-slot="card-expandable-trigger"
      showChevron
      className={cn("w-full", className)}
      {...props}
    >
      {children}
    </CollapsibleTrigger>
  );
}

function CardExpandablePanel({ className, ...props }: CollapsiblePrimitive.Panel.Props) {
  return (
    <CollapsibleContent data-slot="card-expandable-panel" className={cn(className)} {...props} />
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
      className={cn(cardVariants({ effect, size }), "cursor-pointer hover:bg-background-neutral-50 has-[[data-checked]]:border-border-primary has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-solid has-[:focus-visible]:outline-border-black data-disabled:cursor-not-allowed data-disabled:hover:bg-background-disabled", className)}
      {...props}
    >
      <Checkbox
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={(next) => onCheckedChange?.(next)}
        disabled={disabled}
        name={name}
        value={value}
        className="self-start"
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
