import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/registry/bases/base/lib/utils";

const badgeVariants = cva("inline-flex h-6 shrink-0 items-center justify-center gap-1 rounded-xs border px-3 font-medium whitespace-nowrap border-(--badge-border) bg-(--badge-bg) text-(--badge-fg) [&_svg]:pointer-events-none [&_svg]:shrink-0", {
  variants: {
    variant: {
      neutral: "[--badge-bg:var(--badge-neutral-background)] [--badge-border:var(--badge-neutral-border)] [--badge-border-outlined:var(--badge-neutral-border-outlined)] [--badge-fg:var(--badge-neutral-text)]",
      success: "[--badge-bg:var(--badge-success-background)] [--badge-border:var(--badge-success-border)] [--badge-border-outlined:var(--badge-success-border-outlined)] [--badge-fg:var(--badge-success-text)]",
      error: "[--badge-bg:var(--badge-error-background)] [--badge-border:var(--badge-error-border)] [--badge-border-outlined:var(--badge-error-border-outlined)] [--badge-fg:var(--badge-error-text)]",
      warning: "[--badge-bg:var(--badge-warning-background)] [--badge-border:var(--badge-warning-border)] [--badge-border-outlined:var(--badge-warning-border-outlined)] [--badge-fg:var(--badge-warning-text)]",
      info: "[--badge-bg:var(--badge-info-background)] [--badge-border:var(--badge-info-border)] [--badge-border-outlined:var(--badge-info-border-outlined)] [--badge-fg:var(--badge-info-text)]",
      purple: "[--badge-bg:var(--badge-purple-background)] [--badge-border:var(--badge-purple-border)] [--badge-border-outlined:var(--badge-purple-border-outlined)] [--badge-fg:var(--badge-purple-text)]",
      orange: "[--badge-bg:var(--badge-orange-background)] [--badge-border:var(--badge-orange-border)] [--badge-border-outlined:var(--badge-orange-border-outlined)] [--badge-fg:var(--badge-orange-text)]",
      "on-color": "[--badge-bg:var(--badge-on-color-background)] [--badge-border:transparent] [--badge-border-outlined:var(--badge-on-color-border-outlined)] [--badge-fg:var(--text-oncolor-primary)]",
    },
    size: {
      sm: "h-5 px-2 text-2xs [&_svg:not([class*='size-'])]:size-2.5",
      md: "h-6 text-xs [&_svg:not([class*='size-'])]:size-3.5",
      lg: "h-8 text-sm [&_svg:not([class*='size-'])]:size-4.5",
    },
    outlined: { true: "border-(--badge-border-outlined) bg-transparent", false: "" },
    rounded: { true: "rounded-full", false: "" },
    iconOnly: { true: "aspect-square px-0", false: "" },
  },
  defaultVariants: {
    variant: "neutral",
    size: "md",
    outlined: false,
    rounded: false,
    iconOnly: false,
  },
});

type BadgeProps = useRender.ComponentProps<"span"> & VariantProps<typeof badgeVariants>;

/** A short, non-interactive label for status, counts or categories. */
function Badge({
  className,
  variant,
  size,
  outlined,
  rounded,
  iconOnly,
  render,
  ...props
}: BadgeProps) {
  return useRender({
    defaultTagName: "span",
    render,
    props: mergeProps<"span">(
      {
        "data-slot": "badge",
        className: cn(badgeVariants({ variant, size, outlined, rounded, iconOnly }), className),
      } as React.ComponentProps<"span">,
      props,
    ),
  });
}

export type { BadgeProps };
export { Badge, badgeVariants };
