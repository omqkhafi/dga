"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { AutoDirection } from "@/lib/dga/direction";
import { cn } from "@/registry/bases/base/lib/utils";

const ratingVariants = cva("cn-rating", {
  variants: {
    size: { sm: "cn-rating-size-sm", md: "cn-rating-size-md", lg: "cn-rating-size-lg" },
    brand: { true: "cn-rating-brand", false: "" },
  },
  defaultVariants: { size: "md", brand: false },
});

/** A five-point star. Filled stars use the colour; empty ones keep only the outline. */
function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden
      focusable="false"
      data-filled={filled ? "" : undefined}
      className="cn-rating-star"
    >
      <path
        d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3 6.1 20.6l1.3-6.6L2.5 9.4l6.6-.8L12 2.5z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type RatingProps = Omit<React.ComponentProps<"div">, "defaultValue" | "onChange" | "children"> &
  VariantProps<typeof ratingVariants> & {
    /** The rating, from 0 to `max` (controlled). */
    value?: number;
    /** The rating at first (uncontrolled). Default 0, meaning none. */
    defaultValue?: number;
    /** Called with the star the person chose, from 1 to `max`. */
    onValueChange?: (value: number) => void;
    /** How many stars there are. Default 5. */
    max?: number;
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
 * hovering a star previews it. With `readOnly` it is an image with a text alternative. Whole
 * stars only, as DGA defines. The first star sits on the start side, so the fill runs right to
 * left on Arabic pages. `brand` uses the primary colour instead of gold.
 */
function Rating({
  className,
  size,
  brand,
  value: valueProp,
  defaultValue = 0,
  onValueChange,
  max = 5,
  readOnly,
  disabled,
  required,
  name,
  starLabel = (n) => (n === 1 ? "1 star" : `${n} stars`),
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
          <Star key={n} filled={n <= value} />
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
          <RadioPrimitive.Root
            key={n}
            value={String(n)}
            aria-label={starLabel(n)}
            data-slot="rating-star"
            className="cn-rating-item"
            onMouseEnter={() => !disabled && setHover(n)}
          >
            <Star filled={n <= shown} />
          </RadioPrimitive.Root>
        ))}
      </RadioGroupPrimitive>
    </AutoDirection>
  );
}

export type { RatingProps };
export { Rating, ratingVariants };
