import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/registry/bases/base/lib/utils";

const spinnerVariants = cva("inline-flex shrink-0 items-center justify-center", {
  variants: {
    size: {
      "2xs": "size-5",
      xs: "size-6",
      sm: "size-7",
      md: "size-8",
      lg: "size-9",
      xl: "size-10",
      "2xl": "size-11",
    },
    variant: {
      primary: "[&_circle:last-child]:stroke-icon-primary",
      neutral: "[&_circle:last-child]:stroke-icon-default",
      "on-color": "[&_circle:first-child]:stroke-alpha-white-40 [&_circle:last-child]:stroke-icon-oncolor",
      /** Inherits the text colour. Used inside buttons. */
      current: "[&_circle:first-child]:stroke-current/25 [&_circle:last-child]:stroke-current",
    },
  },
  defaultVariants: { size: "md", variant: "primary" },
});

type SpinnerProps = Omit<React.ComponentProps<"span">, "children"> &
  VariantProps<typeof spinnerVariants> & {
    /**
     * Text announced to screen readers. Pass `null` when something else already announces
     * the busy state (for example a button with aria-busy).
     */
    label?: string | null;
  };

/** A loading indicator. Turns slowly with reduced motion. */
function Spinner({ className, size, variant, label = "Loading", ...props }: SpinnerProps) {
  const decorative = label === null;
  return (
    <span
      data-slot="spinner"
      role={decorative ? undefined : "status"}
      aria-hidden={decorative || undefined}
      className={cn(spinnerVariants({ size, variant }), className)}
      {...props}
    >
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="size-full animate-spin motion-reduce:animate-[spin_3s_linear_infinite]">
        <circle cx="12" cy="12" r="9.5" strokeWidth="3" className="stroke-border-neutral-secondary" />
        <circle
          cx="12"
          cy="12"
          r="9.5"
          strokeWidth="3"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray="25 75"
          className="stroke-icon-primary"
        />
      </svg>
      {decorative ? null : <span className="sr-only">{label}</span>}
    </span>
  );
}

export type { SpinnerProps };
export { Spinner, spinnerVariants };
