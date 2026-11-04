import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/registry/bases/base/lib/utils";

const tagVariants = cva("inline-flex shrink-0 items-center justify-center gap-1 rounded-sm border font-semibold whitespace-nowrap border-(--tag-border) bg-(--tag-bg) text-(--tag-fg) [&_svg]:shrink-0 [&_svg]:text-(--tag-icon)", {
  variants: {
    variant: {
      neutral: "[--tag-bg:var(--tag-background-neutral-light)] [--tag-border:var(--border-neutral-secondary)] [--tag-border-outlined:var(--tag-border-neutral)] [--tag-fg:var(--tag-text-neutral)] [--tag-icon:var(--icon-default)]",
      success: "[--tag-bg:var(--tag-background-success-light)] [--tag-border:var(--tag-border-success-light)] [--tag-border-outlined:var(--tag-border-success)] [--tag-fg:var(--tag-text-success)] [--tag-icon:var(--tag-icon-success)]",
      info: "[--tag-bg:var(--tag-background-info-light)] [--tag-border:var(--tag-border-info-light)] [--tag-border-outlined:var(--tag-border-info)] [--tag-fg:var(--tag-text-info)] [--tag-icon:var(--tag-icon-info)]",
      warning: "[--tag-bg:var(--tag-background-warning-light)] [--tag-border:var(--tag-border-warning-light)] [--tag-border-outlined:var(--tag-border-warning)] [--tag-fg:var(--tag-text-warning)] [--tag-icon:var(--tag-icon-warning)]",
      error: "[--tag-bg:var(--tag-background-error-light)] [--tag-border:var(--tag-border-error-light)] [--tag-border-outlined:var(--tag-border-error)] [--tag-fg:var(--tag-text-error)] [--tag-icon:var(--tag-icon-error)]",
      "on-color": "[--tag-bg:var(--tag-background-on-color)] [--tag-border:transparent] [--tag-border-outlined:var(--tag-border-on-color)] [--tag-fg:var(--text-oncolor-primary)] [--tag-icon:var(--icon-oncolor)] [&_.cn-tag-dismiss]:focus-visible:outline-icon-oncolor",
    },
    size: {
      xs: "h-5 px-2 text-2xs [&_svg:not([class*='size-'])]:size-3",
      sm: "h-6 px-2 text-xs [&_svg:not([class*='size-'])]:size-3.5",
      md: "h-8 px-3 text-sm [&_svg:not([class*='size-'])]:size-4.5",
    },
    outlined: { true: "border-(--tag-border-outlined) bg-transparent", false: "" },
    rounded: { true: "rounded-full", false: "" },
    iconOnly: { true: "aspect-square px-0.5", false: "" },
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
          className="relative -me-1 inline-flex size-4 cursor-pointer items-center justify-center rounded-xs text-(--tag-icon) hover:bg-alpha-black-10 after:absolute after:-inset-1 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-border-black [&_svg]:size-3"
        >
          <HugeiconsIcon icon={Cancel01Icon} aria-hidden />
        </button>
      ) : null}
    </span>
  );
}

const statusTagVariants = cva("inline-flex shrink-0 items-center gap-2 rounded-full font-medium whitespace-nowrap", {
  variants: {
    variant: {
      neutral: "[--status-bg:var(--tag-background-neutral-light)] [--status-dot:var(--icon-default)] [--status-fg:var(--tag-text-neutral)] [--status-solid:var(--tag-background-neutral)]",
      success: "[--status-bg:var(--tag-background-success-light)] [--status-dot:var(--tag-icon-success)] [--status-fg:var(--tag-text-success)] [--status-solid:var(--tag-background-success)]",
      info: "[--status-bg:var(--tag-background-info-light)] [--status-dot:var(--tag-icon-info)] [--status-fg:var(--tag-text-info)] [--status-solid:var(--tag-background-info)]",
      warning: "[--status-bg:var(--tag-background-warning-light)] [--status-dot:var(--tag-icon-warning)] [--status-fg:var(--tag-text-warning)] [--status-solid:var(--tag-background-warning)]",
      error: "[--status-bg:var(--tag-background-error-light)] [--status-dot:var(--tag-icon-error)] [--status-fg:var(--tag-text-error)] [--status-solid:var(--tag-background-error)]",
    },
    appearance: {
      subtle: "bg-(--status-bg) text-(--status-fg)",
      inverted: "bg-(--status-solid) text-text-oncolor-primary [&>span:first-child]:bg-tag-dot",
      ghost: "bg-transparent px-0 text-tag-text-neutral",
    },
    size: {
      xs: "h-5 px-2 text-xs",
      sm: "h-6 px-2 text-sm",
      md: "h-8 px-4 text-md",
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
      <span aria-hidden="true" className="size-2 shrink-0 rounded-full bg-(--status-dot)" />
      {children}
    </span>
  );
}

export type { StatusTagProps, TagProps };
export { StatusTag, statusTagVariants, Tag, tagVariants };
