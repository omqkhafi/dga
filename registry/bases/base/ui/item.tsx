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
        className: cn("cn-item-group", className),
      } as React.ComponentProps<"div">,
      props,
    ),
  });
}

/** A line between two Items. */
function ItemSeparator({ className, ...props }: React.ComponentProps<typeof Divider>) {
  return (
    <Divider data-slot="item-separator" className={cn("cn-item-separator", className)} {...props} />
  );
}

const itemVariants = cva("cn-item", {
  variants: {
    variant: {
      default: "cn-item-variant-default",
      outline: "cn-item-variant-outline",
      muted: "cn-item-variant-muted",
    },
    size: {
      default: "cn-item-size-default",
      sm: "cn-item-size-sm",
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

const itemMediaVariants = cva("cn-item-media", {
  variants: {
    variant: {
      default: "",
      icon: "cn-item-media-icon",
      image: "cn-item-media-image",
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
  return <div data-slot="item-content" className={cn("cn-item-content", className)} {...props} />;
}

function ItemTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-title" className={cn("cn-item-title", className)} {...props} />;
}

/** Up to two lines, then it is cut off with an ellipsis. */
function ItemDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p data-slot="item-description" className={cn("cn-item-description", className)} {...props} />
  );
}

/** Buttons or a badge at the end. */
function ItemActions({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-actions" className={cn("cn-item-actions", className)} {...props} />;
}

/** A full-width line above the row's content. */
function ItemHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-header" className={cn("cn-item-header", className)} {...props} />;
}

/** A full-width line below the row's content. */
function ItemFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="item-footer" className={cn("cn-item-footer", className)} {...props} />;
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
