import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/registry/bases/base/lib/utils";

const featuredIconVariants = cva("inline-flex shrink-0 items-center justify-center rounded-sm border border-transparent [&_svg]:shrink-0", {
  variants: {
    variant: {
      brand: "[--fi-border:var(--featured-icon-brand-border)] [--fi-hard:var(--featured-icon-brand-background)] [--fi-icon:var(--featured-icon-brand-icon)] [--fi-light:var(--featured-icon-brand-background-light)]",
      neutral: "[--fi-border:var(--featured-icon-neutral-border)] [--fi-hard:var(--featured-icon-neutral-background)] [--fi-icon:var(--featured-icon-neutral-icon)] [--fi-light:var(--featured-icon-neutral-background-light)]",
      success: "[--fi-border:var(--featured-icon-success-border)] [--fi-hard:var(--featured-icon-success-background)] [--fi-icon:var(--featured-icon-success-icon)] [--fi-light:var(--featured-icon-success-background-light)]",
      error: "[--fi-border:var(--featured-icon-error-border)] [--fi-hard:var(--featured-icon-error-background)] [--fi-icon:var(--featured-icon-error-icon)] [--fi-light:var(--featured-icon-error-background-light)]",
      warning: "[--fi-border:var(--featured-icon-warning-border)] [--fi-hard:var(--featured-icon-warning-background)] [--fi-icon:var(--featured-icon-warning-icon)] [--fi-light:var(--featured-icon-warning-background-light)]",
      info: "[--fi-border:var(--featured-icon-info-border)] [--fi-hard:var(--featured-icon-info-background)] [--fi-icon:var(--featured-icon-info-icon)] [--fi-light:var(--featured-icon-info-background-light)]",
    },
    appearance: {
      light: "bg-(--fi-light) text-(--fi-icon)",
      hard: "bg-(--fi-hard) text-icon-oncolor",
      outlined: "border-(--fi-border) bg-transparent text-(--fi-icon)",
    },
    size: {
      sm: "size-8 [&_svg:not([class*='size-'])]:size-4",
      md: "size-10 [&_svg:not([class*='size-'])]:size-5",
      lg: "size-12 [&_svg:not([class*='size-'])]:size-6",
      xl: "size-14 [&_svg:not([class*='size-'])]:size-7",
    },
    circle: { true: "rounded-full", false: "" },
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
