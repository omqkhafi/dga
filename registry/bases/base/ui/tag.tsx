import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/registry/bases/base/lib/utils";

const tagVariants = cva("cn-tag", {
  variants: {
    variant: {
      neutral: "cn-tag-variant-neutral",
      success: "cn-tag-variant-success",
      info: "cn-tag-variant-info",
      warning: "cn-tag-variant-warning",
      error: "cn-tag-variant-error",
      "on-color": "cn-tag-variant-on-color",
    },
    size: {
      xs: "cn-tag-size-xs",
      sm: "cn-tag-size-sm",
      md: "cn-tag-size-md",
    },
    outlined: { true: "cn-tag-outlined", false: "" },
    rounded: { true: "cn-tag-rounded", false: "" },
    iconOnly: { true: "cn-tag-icon-only", false: "" },
  },
  defaultVariants: {
    variant: "neutral",
    size: "sm",
    outlined: false,
    rounded: false,
    iconOnly: false,
  },
});

type TagProps = React.ComponentProps<"span"> &
  VariantProps<typeof tagVariants> & {
    /** Adds a trailing close button. */
    onDismiss?: () => void;
    /** Accessible name of the close button. Translate it on Arabic pages. */
    dismissLabel?: string;
  };

/** A label for a category or a selected filter. Optionally removable. */
function Tag({
  className,
  variant,
  size,
  outlined,
  rounded,
  iconOnly,
  onDismiss,
  dismissLabel = "Remove",
  children,
  ...props
}: TagProps) {
  return (
    <span
      data-slot="tag"
      className={cn(tagVariants({ variant, size, outlined, rounded, iconOnly }), className)}
      {...props}
    >
      {children}
      {onDismiss ? (
        <button
          type="button"
          data-slot="tag-dismiss"
          aria-label={dismissLabel}
          onClick={onDismiss}
          className="cn-tag-dismiss"
        >
          <HugeiconsIcon icon={Cancel01Icon} aria-hidden />
        </button>
      ) : null}
    </span>
  );
}

const statusTagVariants = cva("cn-status-tag", {
  variants: {
    variant: {
      neutral: "cn-status-tag-variant-neutral",
      success: "cn-status-tag-variant-success",
      info: "cn-status-tag-variant-info",
      warning: "cn-status-tag-variant-warning",
      error: "cn-status-tag-variant-error",
    },
    appearance: {
      subtle: "cn-status-tag-subtle",
      inverted: "cn-status-tag-inverted",
      ghost: "cn-status-tag-ghost",
    },
    size: {
      xs: "cn-status-tag-size-xs",
      sm: "cn-status-tag-size-sm",
      md: "cn-status-tag-size-md",
    },
  },
  defaultVariants: { variant: "neutral", appearance: "subtle", size: "sm" },
});

type StatusTagProps = React.ComponentProps<"span"> & VariantProps<typeof statusTagVariants>;

/** The status of an item, task or request, with a coloured dot. */
function StatusTag({ className, variant, appearance, size, children, ...props }: StatusTagProps) {
  return (
    <span
      data-slot="status-tag"
      className={cn(statusTagVariants({ variant, appearance, size }), className)}
      {...props}
    >
      <span aria-hidden="true" className="cn-status-tag-dot" />
      {children}
    </span>
  );
}

export type { StatusTagProps, TagProps };
export { StatusTag, statusTagVariants, Tag, tagVariants };
