import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/registry/bases/base/lib/utils";

const skeletonVariants = cva("cn-skeleton", {
  variants: {
    shape: {
      rectangle: "cn-skeleton-rectangle",
      square: "cn-skeleton-square",
      circle: "cn-skeleton-circle",
      line: "cn-skeleton-line",
    },
    size: {
      sm: "",
      md: "",
      lg: "",
      24: "",
      48: "",
      64: "",
      80: "",
      120: "",
      170: "",
      240: "",
    },
  },
  compoundVariants: [
    { shape: "rectangle", size: "sm", class: "cn-skeleton-rectangle-sm" },
    { shape: "rectangle", size: "md", class: "cn-skeleton-rectangle-md" },
    { shape: "rectangle", size: "lg", class: "cn-skeleton-rectangle-lg" },
    { shape: "line", size: "sm", class: "cn-skeleton-line-sm" },
    { shape: "line", size: "lg", class: "cn-skeleton-line-lg" },
    { shape: ["square", "circle"], size: 24, class: "cn-skeleton-box-24" },
    { shape: ["square", "circle"], size: 48, class: "cn-skeleton-box-48" },
    { shape: ["square", "circle"], size: 64, class: "cn-skeleton-box-64" },
    { shape: ["square", "circle"], size: 80, class: "cn-skeleton-box-80" },
    { shape: ["square", "circle"], size: 120, class: "cn-skeleton-box-120" },
    { shape: ["square", "circle"], size: 170, class: "cn-skeleton-box-170" },
    { shape: ["square", "circle"], size: 240, class: "cn-skeleton-box-240" },
    { shape: "square", size: 48, class: "cn-skeleton-square-radius-xs" },
    { shape: "square", size: [64, 80], class: "cn-skeleton-square-radius-sm" },
    { shape: "square", size: [120, 170], class: "cn-skeleton-square-radius-md" },
    { shape: "square", size: 240, class: "cn-skeleton-square-radius-lg" },
  ],
  defaultVariants: { shape: "rectangle" },
});

type SkeletonProps = React.ComponentProps<"div"> & VariantProps<typeof skeletonVariants>;

/**
 * A placeholder shown while content loads. Hidden from screen readers: set aria-busy="true"
 * on the region that is loading instead.
 */
function Skeleton({ className, shape, size, ...props }: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      aria-hidden="true"
      className={cn(skeletonVariants({ shape, size }), className)}
      {...props}
    />
  );
}

export type { SkeletonProps };
export { Skeleton, skeletonVariants };
