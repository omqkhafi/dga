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
      className={cn("cn-empty", className)}
      {...props}
    />
  );
}

/** Groups the icon, title and description. */
function EmptyHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="empty-header" className={cn("cn-empty-header", className)} {...props} />;
}

const emptyMediaVariants = cva("cn-empty-media", {
  variants: {
    variant: {
      default: "",
      icon: "cn-empty-media-icon",
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
  return <p data-slot="empty-title" className={cn("cn-empty-title", className)} {...props} />;
}

/** One or two sentences that say why it is empty and what to do. */
function EmptyDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p data-slot="empty-description" className={cn("cn-empty-description", className)} {...props} />
  );
}

/** The next step: buttons or links. */
function EmptyContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="empty-content" className={cn("cn-empty-content", className)} {...props} />;
}

export { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle };
