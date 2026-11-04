import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/registry/bases/base/lib/utils";

const badgeVariants = cva("cn-badge", {
  variants: {
    variant: {
      neutral: "cn-badge-variant-neutral",
      success: "cn-badge-variant-success",
      error: "cn-badge-variant-error",
      warning: "cn-badge-variant-warning",
      info: "cn-badge-variant-info",
      purple: "cn-badge-variant-purple",
      orange: "cn-badge-variant-orange",
      "on-color": "cn-badge-variant-on-color",
    },
    size: {
      sm: "cn-badge-size-sm",
      md: "cn-badge-size-md",
      lg: "cn-badge-size-lg",
    },
    outlined: { true: "cn-badge-outlined", false: "" },
    rounded: { true: "cn-badge-rounded", false: "" },
    iconOnly: { true: "cn-badge-icon-only", false: "" },
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
