import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/registry/bases/base/lib/utils";

/**
 * The state of a list, table or page with nothing to show (Platform Code extension, not part of
 * DGA). It follows the empty state of the Data Table: a centred icon, a title, a short
 * explanation and the next step. Use it for "no results", "nothing here yet" and for errors that
 * leave the area empty. Every string is yours; translate them on Arabic pages.
 */
function Empty({
  className,
  bordered = false,
  ...props
}: React.ComponentProps<"div"> & {
  /** Draws a dashed border, for an empty area inside a page. */
  bordered?: boolean;
}) {
  return (
    <div
      data-slot="empty"
      data-bordered={bordered ? "" : undefined}
      className={cn("flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-lg p-6 text-center text-balance md:p-10 data-bordered:border data-bordered:border-dashed data-bordered:border-border-neutral-primary", className)}
      {...props}
    />
  );
}

/** Groups the icon, title and description. */
function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="empty-header" className={cn("flex max-w-sm flex-col items-center gap-2 text-center", className)} {...props} />;
}

const emptyMediaVariants = cva("mb-2 flex shrink-0 items-center justify-center text-icon-default-500 [&_svg]:pointer-events-none [&_svg]:shrink-0", {
  variants: {
    variant: {
      default: "",
      icon: "size-12 rounded-full bg-background-neutral-100 text-icon-default [&_svg:not([class*='size-'])]:size-6",
    },
  },
  defaultVariants: { variant: "default" },
});

/** The icon or picture. `variant="icon"` puts an icon on a round neutral fill. */
function EmptyMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof emptyMediaVariants>) {
  return (
    <div
      data-slot="empty-media"
      data-variant={variant}
      className={cn(emptyMediaVariants({ variant }), className)}
      {...props}
    />
  );
}

/** The title. A paragraph, not a heading, so it fits under any heading level on the page. */
function EmptyTitle({ className, ...props }: React.ComponentProps<"p">) {
  return <p data-slot="empty-title" className={cn("m-0 text-lg font-semibold text-text-display", className)} {...props} />;
}

/** One or two sentences that say why it is empty and what to do. */
function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p data-slot="empty-description" className={cn("m-0 text-md text-text-primary-paragraph [&>a]:text-link-primary [&>a]:underline [&>a]:underline-offset-4", className)} {...props} />
  );
}

/** The next step: buttons or links. */
function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="empty-content" className={cn("flex w-full max-w-sm min-w-0 flex-col items-center gap-3 text-md", className)} {...props} />;
}

export { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle };
