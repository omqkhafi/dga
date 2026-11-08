"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { AlertCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { AutoDirection } from "@/lib/dga/direction";
import { cn } from "@/registry/bases/base/lib/utils";

const sliderVariants = cva("cn-slider", {
  variants: {
    size: { sm: "cn-slider-size-sm", md: "cn-slider-size-md" },
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
     * Shows the Min/Max labels (DGA) under the two ends of the track: `min` on the start side and
     * `max` on the end side, formatted with `locale`. Replace either text with `minLabel` or
     * `maxLabel`.
     */
    showMinMax?: boolean;
    /** Replaces the text of the Min label, for example "0 SAR". */
    minLabel?: React.ReactNode;
    /** Replaces the text of the Max label, for example "500 SAR". */
    maxLabel?: React.ReactNode;
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
 * `defaultValue` for a range. DGA names two readouts: the Value (`showValue`) and the Min/Max
 * labels at the ends of the track (`showMinMax`).
 */
function Slider<Value extends number | readonly number[] = number>({
  className,
  size,
  label,
  helperText,
  error,
  showValue = false,
  showMinMax = false,
  minLabel,
  maxLabel,
  thumbLabels,
  ...props
}: SliderProps<Value>) {
  const id = React.useId();
  const current = props.value ?? props.defaultValue;
  const count = Array.isArray(current) ? current.length : 1;
  const names = thumbLabels ?? (count > 1 ? ["Minimum", "Maximum"] : []);
  const format = (n: number) => new Intl.NumberFormat(props.locale).format(n);
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
          <div data-slot="slider-header" className="cn-slider-header">
            {label ? (
              <SliderPrimitive.Label data-slot="slider-label" className="cn-slider-label">
                {label}
              </SliderPrimitive.Label>
            ) : (
              <span />
            )}
            {showValue ? (
              <SliderPrimitive.Value data-slot="slider-value" className="cn-slider-value" />
            ) : null}
          </div>
        ) : null}
        <SliderPrimitive.Control data-slot="slider-control" className="cn-slider-control">
          <SliderPrimitive.Track data-slot="slider-track" className="cn-slider-track">
            <SliderPrimitive.Indicator
              data-slot="slider-indicator"
              className="cn-slider-indicator"
            />
            {Array.from({ length: count }, (_, index) => (
              <SliderPrimitive.Thumb
                // biome-ignore lint/suspicious/noArrayIndexKey: thumbs are positional
                key={index}
                index={index}
                data-slot="slider-thumb"
                className="cn-slider-thumb"
                aria-label={names[index]}
                aria-describedby={describedBy}
                aria-invalid={error ? true : undefined}
              />
            ))}
          </SliderPrimitive.Track>
        </SliderPrimitive.Control>
        {showMinMax ? (
          <div data-slot="slider-range-labels" className="cn-slider-range-labels" aria-hidden>
            <span data-slot="slider-min" className="cn-slider-range-label">
              {minLabel ?? format(props.min ?? 0)}
            </span>
            <span data-slot="slider-max" className="cn-slider-range-label">
              {maxLabel ?? format(props.max ?? 100)}
            </span>
          </div>
        ) : null}
        {helperText ? (
          <p id={`${id}-helper`} data-slot="slider-helper" className="cn-slider-helper">
            {helperText}
          </p>
        ) : null}
        {error ? (
          <p id={`${id}-error`} data-slot="slider-error" className="cn-slider-error">
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
