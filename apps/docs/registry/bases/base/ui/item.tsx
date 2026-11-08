import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { Divider } from "@/components/dga/divider";
import { cn } from "@/registry/bases/base/lib/utils";

/**
 * Wraps several Items in a column. It adds no role: for a real list, render the group as a `ul`
 * and each Item as an `li` (`render={<ul />}`, `render={<li />}`), so screen readers announce the
 * count. An Item that is a link keeps its link role.
 */
function ItemGroup({ className, render, ...props }: useRender.ComponentProps<"div">) {
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(
      {
        "data-slot": "item-group",
        className: cn("m-0 flex w-full list-none flex-col p-0", className),
      } as React.ComponentProps<"div">,
      props,
    ),
  });
}

/** A line between two Items. */
function ItemSeparator({ className, ...props }: React.ComponentProps<typeof Divider>) {
  return (
    <Divider data-slot="item-separator" className={cn("my-0", className)} {...props} />
  );
}

const itemVariants = cva("group/item relative flex w-full min-w-0 flex-wrap items-center rounded-md border border-transparent text-md text-text-default transition-colors duration-100 outline-hidden motion-reduce:transition-none data-interactive:cursor-pointer data-interactive:no-underline data-interactive:hover:bg-background-neutral-50 data-interactive:active:bg-background-neutral-100 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-border-black", {
  variants: {
    variant: {
      default: "bg-transparent",
      outline: "border-border-neutral-primary",
      muted: "bg-background-neutral-50",
    },
    size: {
      default: "gap-4 p-4",
      sm: "gap-2.5 px-4 py-3",
    },
  },
  defaultVariants: { variant: "default", size: "default" },
});

type ItemProps = useRender.ComponentProps<"div"> & VariantProps<typeof itemVariants>;

/**
 * One row: a picture or icon, a title and description, and actions (Platform Code extension, not
 * part of DGA). Its look is the DGA List and Card. Pass `render={<a href="…" />}` to make the whole
 * row a link: it then gets the hover tint and the focus outline. Put several in an ItemGroup.
 */
function Item({ className, variant, size, render, ...props }: ItemProps) {
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps<"div">(
      {
        "data-slot": "item",
        "data-variant": variant ?? "default",
        "data-size": size ?? "default",
        "data-interactive": render ? "" : undefined,
        className: cn(itemVariants({ variant, size }), className),
      } as React.ComponentProps<"div">,
      props,
    ),
  });
}

const itemMediaVariants = cva("flex shrink-0 items-center justify-center gap-2 group-has-[[data-slot=item-description]]/item:self-start [&_svg]:pointer-events-none", {
  variants: {
    variant: {
      default: "",
      icon: "size-10 rounded-sm border border-border-neutral-primary bg-background-neutral-100 text-icon-default [&_svg:not([class*='size-'])]:size-5",
      image: "size-10 overflow-hidden rounded-sm [&_img]:size-full [&_img]:object-cover",
    },
  },
  defaultVariants: { variant: "default" },
});

/** The icon or image at the start. `icon` draws a framed icon; `image` crops a picture. */
function ItemMedia({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof itemMediaVariants>) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant }), className)}
      {...props}
    />
  );
}

/** Holds the title and description. It takes the free space. */
function ItemContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-content" className={cn("flex min-w-0 flex-1 flex-col gap-1", className)} {...props} />;
}

function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-title" className={cn("flex w-fit max-w-full items-center gap-2 text-md leading-snug font-semibold text-text-display", className)} {...props} />;
}

/** Up to two lines, then it is cut off with an ellipsis. */
function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p data-slot="item-description" className={cn("m-0 line-clamp-2 text-sm leading-normal font-normal text-pretty text-text-primary-paragraph", className)} {...props} />
  );
}

/** Buttons or a badge at the end. */
function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-actions" className={cn("flex shrink-0 items-center gap-2", className)} {...props} />;
}

/** A full-width line above the row's content. */
function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-header" className={cn("flex basis-full items-center justify-between gap-2", className)} {...props} />;
}

/** A full-width line below the row's content. */
function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-footer" className={cn("flex basis-full items-center justify-between gap-2", className)} {...props} />;
}

export type { ItemProps };
export {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
  itemVariants,
};
