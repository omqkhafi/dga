import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/registry/bases/base/lib/utils";

const spinnerVariants = cva("cn-spinner", {
  variants: {
    size: {
      "2xs": "cn-spinner-size-2xs",
      xs: "cn-spinner-size-xs",
      sm: "cn-spinner-size-sm",
      md: "cn-spinner-size-md",
      lg: "cn-spinner-size-lg",
      xl: "cn-spinner-size-xl",
      "2xl": "cn-spinner-size-2xl",
    },
    variant: {
      primary: "cn-spinner-variant-primary",
      neutral: "cn-spinner-variant-neutral",
      "on-color": "cn-spinner-variant-on-color",
      /** Inherits the text colour. Used inside buttons. */
      current: "cn-spinner-variant-current",
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
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="cn-spinner-svg">
        <circle cx="12" cy="12" r="9.5" strokeWidth="3" className="cn-spinner-track" />
        <circle
          cx="12"
          cy="12"
          r="9.5"
          strokeWidth="3"
          strokeLinecap="round"
          pathLength={100}
          strokeDasharray="25 75"
          className="cn-spinner-indicator"
        />
      </svg>
      {decorative ? null : <span className="sr-only">{label}</span>}
    </span>
  );
}

export type { SpinnerProps };
export { Spinner, spinnerVariants };
