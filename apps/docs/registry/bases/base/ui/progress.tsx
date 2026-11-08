"use client";

import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import { Alert02Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/registry/bases/base/lib/utils";

const progressVariants = cva("flex w-full min-w-0 flex-col gap-1 [--p-fill:var(--icon-primary)] [--p-track:var(--border-neutral-secondary)]", {
  variants: {
    size: { sm: "[--p-bar:0.5rem]", md: "[--p-bar:0.75rem]", lg: "[--p-bar:1rem]" },
    tone: { primary: "[--p-fill:var(--icon-primary)]", neutral: "[--p-fill:var(--progress-bar-neutral)]" },
    status: { default: "", success: "[--p-badge:var(--background-success)] [--p-fill:var(--icon-success)] [--p-status:var(--text-success)]", error: "[--p-badge:var(--background-error)] [--p-fill:var(--icon-error)] [--p-status:var(--text-error)]" },
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
        <div className="flex items-baseline justify-between gap-3 text-sm">
          {label ? (
            <ProgressPrimitive.Label data-slot="progress-label" className="min-w-0 text-sm font-medium text-field-text-label">
              {label}
            </ProgressPrimitive.Label>
          ) : null}
          {showValue && percent !== null ? (
            <ProgressPrimitive.Value data-slot="progress-value" className="shrink-0 text-sm font-medium text-field-text-label tabular-nums">
              {() => formatValue(percent)}
            </ProgressPrimitive.Value>
          ) : null}
        </div>
      ) : null}
      <ProgressPrimitive.Track data-slot="progress-track" className="relative block h-(--p-bar) w-full overflow-hidden rounded-full bg-(--p-track)">
        <ProgressPrimitive.Indicator
          data-slot="progress-indicator"
          className="block h-full rounded-full bg-(--p-fill) transition-[width] duration-300 ease-out motion-reduce:transition-none data-indeterminate:w-full data-indeterminate:animate-pulse motion-reduce:data-indeterminate:animate-none motion-reduce:data-indeterminate:opacity-50"
        />
      </ProgressPrimitive.Track>
      {helperText || status === "success" || status === "error" ? (
        <p className="m-0 flex items-center gap-1.5 text-sm text-(--p-status,var(--text-primary-paragraph))">
          {status === "success" || status === "error" ? (
            <span aria-hidden className="inline-flex size-4 shrink-0 items-center justify-center rounded-full bg-(--p-badge) text-icon-oncolor [&_svg]:size-3">
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

const progressCircleVariants = cva("relative inline-flex shrink-0 items-center justify-center [--p-fill:var(--icon-primary)] [--p-track:var(--border-neutral-secondary)]", {
  variants: {
    size: {
      64: "size-16 [--p-stroke:8]",
      80: "size-20 [--p-stroke:8]",
      120: "size-30 [--p-stroke:8]",
      160: "size-40 [--p-stroke:8]",
      200: "size-50 [--p-stroke:8]",
    },
    tone: { primary: "[--p-fill:var(--icon-primary)]", neutral: "[--p-fill:var(--progress-bar-neutral)]" },
    status: { default: "", success: "[--p-badge:var(--background-success)] [--p-fill:var(--icon-success)] [--p-status:var(--text-success)]", error: "[--p-badge:var(--background-error)] [--p-fill:var(--icon-error)] [--p-status:var(--text-error)]" },
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
      <svg viewBox="0 0 100 100" aria-hidden focusable="false" className="absolute inset-0 size-full -rotate-90 rtl:-scale-x-100">
        <circle cx="50" cy="50" r={RADIUS} fill="none" className="stroke-(--p-track) [stroke-width:var(--p-stroke)]" />
        <circle
          cx="50"
          cy="50"
          r={RADIUS}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={`${dash} ${CIRCUMFERENCE - dash}`}
          data-indeterminate={percent === null ? "" : undefined}
          className="stroke-(--p-fill) transition-[stroke-dasharray] duration-300 [stroke-width:var(--p-stroke)] motion-reduce:transition-none data-indeterminate:origin-center data-indeterminate:animate-spin motion-reduce:data-indeterminate:animate-none"
        />
      </svg>
      <div className="relative flex flex-col items-center justify-center text-center">
        {status === "success" || status === "error" ? (
          <span aria-hidden className="inline-flex size-1/3 items-center justify-center rounded-full bg-(--p-badge) text-icon-oncolor [&_svg]:size-3/5">
            <HugeiconsIcon icon={status === "success" ? Tick02Icon : Alert02Icon} />
          </span>
        ) : showValue && percent !== null ? (
          <ProgressPrimitive.Value className="text-sm font-bold text-text-primary-paragraph tabular-nums">
            {() => formatValue(percent)}
          </ProgressPrimitive.Value>
        ) : null}
        {label ? (
          <ProgressPrimitive.Label className="max-w-[70%] text-xs text-text-primary-paragraph in-data-[size='64']:sr-only in-data-[size='80']:sr-only">
            {label}
          </ProgressPrimitive.Label>
        ) : null}
      </div>
    </ProgressPrimitive.Root>
  );
}

export type { ProgressCircleProps, ProgressProps };
export { Progress, ProgressCircle, progressCircleVariants, progressVariants };
