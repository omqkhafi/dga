import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/registry/bases/base/lib/utils";

const featuredIconVariants = cva("cn-featured-icon", {
  variants: {
    variant: {
      brand: "cn-featured-icon-variant-brand",
      neutral: "cn-featured-icon-variant-neutral",
      success: "cn-featured-icon-variant-success",
      error: "cn-featured-icon-variant-error",
      warning: "cn-featured-icon-variant-warning",
      info: "cn-featured-icon-variant-info",
    },
    appearance: {
      light: "cn-featured-icon-light",
      hard: "cn-featured-icon-hard",
      outlined: "cn-featured-icon-outlined",
    },
    size: {
      sm: "cn-featured-icon-size-sm",
      md: "cn-featured-icon-size-md",
      lg: "cn-featured-icon-size-lg",
      xl: "cn-featured-icon-size-xl",
    },
    circle: { true: "cn-featured-icon-circle", false: "" },
  },
  defaultVariants: { variant: "brand", appearance: "light", size: "xl", circle: false },
});

type FeaturedIconProps = React.ComponentProps<"span"> & VariantProps<typeof featuredIconVariants>;

/**
 * An icon in a tinted container, used to lead cards, empty states and dialogs.
 * Decorative by default; pass role="img" and an aria-label if the icon carries meaning.
 */
function FeaturedIcon({
  className,
  variant,
  appearance,
  size,
  circle,
  ...props
}: FeaturedIconProps) {
  const labelled = props["aria-label"] !== undefined || props["aria-labelledby"] !== undefined;
  return (
    <span
      data-slot="featured-icon"
      aria-hidden={labelled ? undefined : true}
      className={cn(featuredIconVariants({ variant, appearance, size, circle }), className)}
      {...props}
    />
  );
}

export type { FeaturedIconProps };
export { FeaturedIcon, featuredIconVariants };
