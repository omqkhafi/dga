"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { AutoDirection } from "@/lib/dga/direction";
import { cn } from "@/registry/bases/base/lib/utils";

const ratingVariants = cva("inline-flex w-min items-center gap-1 [--r-fill:var(--background-secondary)] [--r-line:var(--icon-warning)] [--r-empty:var(--icon-default-500)]", {
  variants: {
    size: { sm: "[--r-size:1.5rem]", md: "[--r-size:2rem]", lg: "[--r-size:3rem]" },
    brand: { true: "[--r-fill:var(--background-primary)] [--r-line:var(--icon-primary)]", false: "" },
  },
  defaultVariants: { size: "md", brand: false },
});

const STAR_PATH =
  "M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8L12 2.5z";

/**
 * A five-point star. The outline layer is always drawn; the filled layer sits on top and is cut
 * from its end side, so a half star fills from the start edge (the left in English, the right in
 * Arabic). `fill` is 0 to 1.
 */
function Star({ fill }: { fill: number }) {
  const cut = `${Math.round((1 - Math.min(1, Math.max(0, fill))) * 1000) / 10}%`;
  return (
    <span aria-hidden className="scale-90 pointer-events-none relative block size-(--r-size) transition-transform motion-reduce:transition-none" style={{ ["--r-cut" as string]: cut }}>
      <svg viewBox="0 0 24 24" aria-hidden focusable="false" className="size-(--r-size) shrink-0 fill-transparent stroke-(--r-empty) stroke-[1.5] transition-colors motion-reduce:transition-none stroke-2">
        <path d={STAR_PATH} strokeLinejoin="round" />
      </svg>
      {fill > 0 ? (
        <svg
          viewBox="0 0 24 24"
          aria-hidden
          focusable="false"
          data-filled=""
          className="size-(--r-size) shrink-0 fill-transparent stroke-(--r-empty) stroke-[1.5] transition-colors motion-reduce:transition-none stroke-2 absolute inset-0 fill-(--r-fill) stroke-(--r-line) [clip-path:inset(0_var(--r-cut)_0_0)] rtl:[clip-path:inset(0_0_0_var(--r-cut))]"
        >
          <path d={STAR_PATH} strokeLinejoin="round" />
        </svg>
      ) : null}
    </span>
  );
}

type RatingProps = Omit<React.ComponentProps<"div">, "defaultValue" | "onChange" | "children"> &
  VariantProps<typeof ratingVariants> & {
    /** The rating, from 0 to `max` (controlled). */
    value?: number;
    /** The rating at first (uncontrolled). Default 0, meaning none. */
    defaultValue?: number;
    /** Called with the rating the person chose, from 1 to `max` (from 0.5 with `allowHalf`). */
    onValueChange?: (value: number) => void;
    /** How many stars there are. Default 5. */
    max?: number;
    /**
     * Lets the rating be a half star (DGA: half stars). Each star has a start half and an end
     * half, and the arrow keys move by half a star. In a read-only rating a fractional `value`
     * is drawn as it is (3.5 fills three and a half stars) with or without this prop.
     */
    allowHalf?: boolean;
    /** Shows the rating without letting anyone change it. */
    readOnly?: boolean;
    /** The rating cannot be changed and is dimmed. */
    disabled?: boolean;
    /** Marks the field as required in a form. */
    required?: boolean;
    /** The form field name. */
    name?: string;
    /**
     * The name of one star, for example "3 stars". It names each star for a screen reader, and
     * the read-only summary reads it as "3 stars out of 5" through `summaryLabel`.
     */
    starLabel?: (value: number) => string;
    /** The read-only text for a screen reader, for example "Rated 4 out of 5". */
    summaryLabel?: (value: number, max: number) => string;
  };

/**
 * A star rating (DGA: Rating). Interactive by default: a group of radio buttons, so one star is
 * in the tab order and the arrow keys change the rating (Left and Right swap on Arabic pages);
 * hovering a star previews it, pressing one shrinks it a little and the chosen one is drawn with
 * a heavier outline. `allowHalf` adds half stars. With `readOnly` it is an image with a text
 * alternative and shows fractional values. The first star sits on the start side, so the fill
 * runs right to left on Arabic pages. `brand` uses the primary colour instead of gold.
 */
function Rating({
  className,
  size,
  brand,
  value: valueProp,
  defaultValue = 0,
  onValueChange,
  max = 5,
  allowHalf,
  readOnly,
  disabled,
  required,
  name,
  starLabel = (n) => (n <= 1 ? `${n} star` : `${n} stars`),
  summaryLabel = (n, total) => `Rated ${n} out of ${total}`,
  ...props
}: RatingProps) {
  const [inner, setInner] = React.useState(defaultValue);
  const [hover, setHover] = React.useState<number | null>(null);
  const value = valueProp ?? inner;
  const shown = hover ?? value;
  const stars = Array.from({ length: max }, (_, i) => i + 1);
  const classes = cn(ratingVariants({ size, brand }), className);

  if (readOnly) {
    return (
      <div
        data-slot="rating"
        data-readonly=""
        role="img"
        aria-label={summaryLabel(value, max)}
        className={classes}
        {...props}
      >
        {stars.map((n) => (
          <Star key={n} fill={value - (n - 1)} />
        ))}
      </div>
    );
  }

  return (
    <AutoDirection>
      <RadioGroupPrimitive
        data-slot="rating"
        value={value === 0 ? "" : String(value)}
        onValueChange={(next) => {
          const chosen = Number(next);
          if (!Number.isFinite(chosen)) return;
          if (valueProp === undefined) setInner(chosen);
          onValueChange?.(chosen);
        }}
        disabled={disabled}
        required={required}
        name={name}
        className={classes}
        onMouseLeave={() => setHover(null)}
        {...(props as Record<string, unknown>)}
      >
        {stars.map((n) => (
          <span
            key={n}
            data-slot="rating-star"
            className="relative inline-flex size-(--r-size) shrink-0 cursor-pointer items-center justify-center rounded-xs has-focus-visible:outline-2 has-focus-visible:outline-solid has-focus-visible:outline-offset-1 has-focus-visible:outline-border-black has-data-disabled:cursor-not-allowed has-data-disabled:opacity-50"
            data-selected={value === n || value === n - 0.5 ? "" : undefined}
          >
            <Star fill={shown - (n - 1)} />
            {(allowHalf ? [n - 0.5, n] : [n]).map((v) => (
              <RadioPrimitive.Root
                key={v}
                value={String(v)}
                aria-label={starLabel(v)}
                data-half={v !== n ? "" : undefined}
                className="start-1/2 absolute inset-0 m-0 appearance-none border-0 bg-transparent p-0 outline-none data-half:end-1/2"
                onMouseEnter={() => !disabled && setHover(v)}
              />
            ))}
          </span>
        ))}
      </RadioGroupPrimitive>
    </AutoDirection>
  );
}

export type { RatingProps };
export { Rating, ratingVariants };
