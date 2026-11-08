"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { AlertCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { AutoDirection } from "@/lib/dga/direction";
import { cn } from "@/registry/bases/base/lib/utils";

const sliderVariants = cva("flex w-full min-w-0 flex-col gap-field-label-gap", {
  variants: {
    size: { sm: "[--slider-thumb:1rem] [--slider-track:0.25rem]", md: "[--slider-thumb:1.25rem] [--slider-track:0.375rem]" },
  },
  defaultVariants: { size: "md" },
});

type SliderProps<Value extends number | readonly number[] = number | readonly number[]> = Omit<
  SliderPrimitive.Root.Props<Value>,
  "children"
> &
  VariantProps<typeof sliderVariants> & {
    /** The visible name, above the track. Inside a Field leave it out and use FieldLabel. */
    label?: React.ReactNode;
    /** Helper text under the track. Inside a Field use FieldDescription. */
    helperText?: React.ReactNode;
    /** An error message with an icon; also turns the thumbs red. Inside a Field use FieldError. */
    error?: React.ReactNode;
    /** Shows the current value (or both values of a range) opposite the label. */
    showValue?: boolean;
    /**
     * Accessible names of the thumbs. A range needs two (for example Minimum and Maximum); a
     * single slider is named by the label. Translate them on Arabic pages.
     */
    thumbLabels?: string[];
  };

/**
 * Picks a value, or a range of two values, by dragging a handle along a track (DGA: Slider). Left
 * and Right (or Up and Down) move a thumb by `step`, Page Up and Down by `largeStep`, Home and End
 * to the ends. The fill and the arrow keys follow the page direction: on Arabic pages the minimum
 * is on the right, Left raises the value and Right lowers it. Pass an array as `value` or
 * `defaultValue` for a range.
 */
function Slider<Value extends number | readonly number[] = number>({
  className,
  size,
  label,
  helperText,
  error,
  showValue = false,
  thumbLabels,
  ...props
}: SliderProps<Value>) {
  const id = React.useId();
  const current = props.value ?? props.defaultValue;
  const count = Array.isArray(current) ? current.length : 1;
  const names = thumbLabels ?? (count > 1 ? ["Minimum", "Maximum"] : []);
  const describedBy =
    [error ? `${id}-error` : null, helperText ? `${id}-helper` : null].filter(Boolean).join(" ") ||
    undefined;
  return (
    <AutoDirection>
      <SliderPrimitive.Root
        data-slot="slider"
        data-size={size ?? "md"}
        data-invalid={error ? "" : undefined}
        className={cn(sliderVariants({ size }), className)}
        {...(props as SliderPrimitive.Root.Props<Value>)}
      >
        {label || showValue ? (
          <div data-slot="slider-header" className="flex items-baseline justify-between gap-3">
            {label ? (
              <SliderPrimitive.Label data-slot="slider-label" className="text-sm font-medium text-field-text-label data-disabled:text-text-default-disabled">
                {label}
              </SliderPrimitive.Label>
            ) : (
              <span />
            )}
            {showValue ? (
              <SliderPrimitive.Value data-slot="slider-value" className="text-sm text-field-text-helper tabular-nums [unicode-bidi:isolate] in-data-disabled:text-text-default-disabled" />
            ) : null}
          </div>
        ) : null}
        <SliderPrimitive.Control data-slot="slider-control" className="relative flex w-full touch-none items-center py-2 select-none data-disabled:cursor-not-allowed">
          <SliderPrimitive.Track data-slot="slider-track" className="relative w-full rounded-full bg-control-border select-none h-(--slider-track) in-data-disabled:bg-border-disabled">
            <SliderPrimitive.Indicator
              data-slot="slider-indicator"
              className="rounded-full bg-control-primary-checked select-none in-data-disabled:bg-text-default-disabled in-data-invalid:bg-field-border-error"
            />
            {Array.from({ length: count }, (_, index) => (
              <SliderPrimitive.Thumb
                // biome-ignore lint/suspicious/noArrayIndexKey: thumbs are positional
                key={index}
                index={index}
                data-slot="slider-thumb"
                className="rounded-full border-2 border-control-thumb bg-control-primary-checked shadow-sm outline-hidden transition-colors size-(--slider-thumb) hover:bg-control-primary-hovered data-dragging:bg-control-primary-pressed active:bg-control-primary-pressed has-focus-visible:outline-2 has-focus-visible:outline-solid has-focus-visible:outline-offset-2 has-focus-visible:outline-border-black in-data-invalid:bg-field-border-error in-data-invalid:hover:bg-field-border-error data-disabled:cursor-not-allowed data-disabled:bg-text-default-disabled data-disabled:hover:bg-text-default-disabled motion-reduce:transition-none"
                aria-label={names[index]}
                aria-describedby={describedBy}
                aria-invalid={error ? true : undefined}
              />
            ))}
          </SliderPrimitive.Track>
        </SliderPrimitive.Control>
        {helperText ? (
          <p id={`${id}-helper`} data-slot="slider-helper" className="m-0 text-sm text-field-text-helper">
            {helperText}
          </p>
        ) : null}
        {error ? (
          <p id={`${id}-error`} data-slot="slider-error" className="m-0 flex items-start gap-1.5 text-sm text-text-error [&_svg]:mt-0.5 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:text-icon-error">
            <HugeiconsIcon icon={AlertCircleIcon} aria-hidden />
            <span>{error}</span>
          </p>
        ) : null}
      </SliderPrimitive.Root>
    </AutoDirection>
  );
}

export type { SliderProps };
export { Slider, sliderVariants };
