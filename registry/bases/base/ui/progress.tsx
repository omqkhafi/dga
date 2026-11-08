"use client";

import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import { Alert02Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/registry/bases/base/lib/utils";

const progressVariants = cva("cn-progress", {
  variants: {
    size: { sm: "cn-progress-size-sm", md: "cn-progress-size-md", lg: "cn-progress-size-lg" },
    tone: { primary: "cn-progress-primary", neutral: "cn-progress-neutral" },
    status: { default: "", success: "cn-progress-success", error: "cn-progress-error" },
  },
  defaultVariants: { size: "md", tone: "primary", status: "default" },
});

type ProgressProps = Omit<ProgressPrimitive.Root.Props, "children" | "format"> &
  VariantProps<typeof progressVariants> & {
    /** The label above the bar. It also names the progress bar for screen readers. */
    label?: React.ReactNode;
    /** Shows the percentage at the end of the label row. Default true. */
    showValue?: boolean;
    /** A line of help below the bar. */
    helperText?: React.ReactNode;
    /** Turns the value into the text shown, for example Arabic-Indic digits: `(v) => "٥٠٪"`. */
    formatValue?: (value: number) => string;
  };

/**
 * A bar showing how far a task has got (DGA: Progress Bar), on Base UI Progress. `value` is
 * 0 to `max` (100); pass `null` while the length is unknown and the bar animates. `status` is
 * `success` or `error` for a finished task: it adds an icon and the matching colour, and the
 * helper text should say what happened. Name it with `label` (or `aria-label`).
 */
function Progress({
  className,
  size,
  tone,
  status,
  label,
  showValue = true,
  helperText,
  formatValue = (v) => `${Math.round(v)}%`,
  value,
  max = 100,
  ...props
}: ProgressProps) {
  const percent = value == null ? null : (value / max) * 100;
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      data-status={status ?? "default"}
      value={value}
      max={max}
      className={cn(progressVariants({ size, tone, status }), className)}
      {...props}
    >
      {label || showValue ? (
        <div className="cn-progress-header">
          {label ? (
            <ProgressPrimitive.Label data-slot="progress-label" className="cn-progress-label">
              {label}
            </ProgressPrimitive.Label>
          ) : null}
          {showValue && percent !== null ? (
            <ProgressPrimitive.Value data-slot="progress-value" className="cn-progress-value">
              {() => formatValue(percent)}
            </ProgressPrimitive.Value>
          ) : null}
        </div>
      ) : null}
      <ProgressPrimitive.Track data-slot="progress-track" className="cn-progress-track">
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className="cn-progress-indicator"
        />
      </ProgressPrimitive.Track>
      {helperText || status === "success" || status === "error" ? (
        <p className="cn-progress-helper">
          {status === "success" || status === "error" ? (
            <span aria-hidden className="cn-progress-status-icon">
              <HugeiconsIcon icon={status === "success" ? Tick02Icon : Alert02Icon} />
            </span>
          ) : null}
          {helperText}
        </p>
      ) : null}
    </ProgressPrimitive.Root>
  );
}

// ---------------------------------------------------------------------------------------------
// Circular
// ---------------------------------------------------------------------------------------------

const progressCircleVariants = cva("cn-progress-circle", {
  variants: {
    size: {
      64: "cn-progress-circle-64",
      80: "cn-progress-circle-80",
      120: "cn-progress-circle-120",
      160: "cn-progress-circle-160",
      200: "cn-progress-circle-200",
    },
    tone: { primary: "cn-progress-primary", neutral: "cn-progress-neutral" },
    status: { default: "", success: "cn-progress-success", error: "cn-progress-error" },
  },
  defaultVariants: { size: 120, tone: "primary", status: "default" },
});

type ProgressCircleProps = Omit<ProgressPrimitive.Root.Props, "children" | "format"> &
  VariantProps<typeof progressCircleVariants> & {
    /** A short caption under the percentage, for example "Active users". Hidden below 120px. */
    label?: React.ReactNode;
    /** Shows the percentage in the middle. Default true. */
    showValue?: boolean;
    /** Turns the value into the text shown. Default `"50%"`. */
    formatValue?: (value: number) => string;
  };

const RADIUS = 45;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/**
 * A ring showing progress (DGA: Circular Progress Bar), on Base UI Progress. Sizes 64, 80, 120,
 * 160 and 200px. `status` `success` shows a tick and `error` an alert in place of the percentage.
 * With `value={null}` the ring turns (a still arc when the person prefers reduced motion).
 */
function ProgressCircle({
  className,
  size,
  tone,
  status,
  label,
  showValue = true,
  formatValue = (v) => `${Math.round(v)}%`,
  value,
  max = 100,
  ...props
}: ProgressCircleProps) {
  const percent = value == null ? null : Math.min(Math.max((value / max) * 100, 0), 100);
  const dash = percent === null ? CIRCUMFERENCE * 0.25 : (CIRCUMFERENCE * percent) / 100;
  return (
    <ProgressPrimitive.Root
      data-slot="progress-circle"
      data-size={size ?? 120}
      data-status={status ?? "default"}
      value={value}
      max={max}
      className={cn(progressCircleVariants({ size, tone, status }), className)}
      {...props}
    >
      <svg viewBox="0 0 100 100" aria-hidden focusable="false" className="cn-progress-ring">
        <circle cx="50" cy="50" r={RADIUS} fill="none" className="cn-progress-ring-track" />
        <circle
          cx="50"
          cy="50"
          r={RADIUS}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${CIRCUMFERENCE - dash}`}
          data-indeterminate={percent === null ? "" : undefined}
          className="cn-progress-ring-indicator"
        />
      </svg>
      <div className="cn-progress-circle-content">
        {status === "success" || status === "error" ? (
          <span aria-hidden className="cn-progress-circle-icon">
            <HugeiconsIcon icon={status === "success" ? Tick02Icon : Alert02Icon} />
          </span>
        ) : showValue && percent !== null ? (
          <ProgressPrimitive.Value className="cn-progress-circle-value">
            {() => formatValue(percent)}
          </ProgressPrimitive.Value>
        ) : null}
        {label ? (
          <ProgressPrimitive.Label className="cn-progress-circle-label">
            {label}
          </ProgressPrimitive.Label>
        ) : null}
      </div>
    </ProgressPrimitive.Root>
  );
}

export type { ProgressCircleProps, ProgressProps };
export { Progress, ProgressCircle, progressCircleVariants, progressVariants };
