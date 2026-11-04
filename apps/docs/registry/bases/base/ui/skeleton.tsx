import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/registry/bases/base/lib/utils";

const skeletonVariants = cva("min-w-0 animate-pulse bg-skeleton-background motion-reduce:animate-none", {
  variants: {
    shape: {
      rectangle: "h-10 w-full rounded-sm",
      square: "size-16 shrink-0 rounded-none",
      circle: "size-16 shrink-0 rounded-full",
      line: "h-3.5 w-full rounded-full",
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
    { shape: "rectangle", size: "sm", class: "h-6" },
    { shape: "rectangle", size: "md", class: "h-8" },
    { shape: "rectangle", size: "lg", class: "h-10" },
    { shape: "line", size: "sm", class: "h-3.5" },
    { shape: "line", size: "lg", class: "h-5.5" },
    { shape: ["square", "circle"], size: 24, class: "size-6" },
    { shape: ["square", "circle"], size: 48, class: "size-12" },
    { shape: ["square", "circle"], size: 64, class: "size-16" },
    { shape: ["square", "circle"], size: 80, class: "size-20" },
    { shape: ["square", "circle"], size: 120, class: "size-30" },
    { shape: ["square", "circle"], size: 170, class: "size-42.5" },
    { shape: ["square", "circle"], size: 240, class: "size-60" },
    { shape: "square", size: 48, class: "rounded-xs" },
    { shape: "square", size: [64, 80], class: "rounded-sm" },
    { shape: "square", size: [120, 170], class: "rounded-md" },
    { shape: "square", size: 240, class: "rounded-lg" },
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
