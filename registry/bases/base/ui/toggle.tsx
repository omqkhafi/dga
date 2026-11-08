"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/dga/button";
import { cn } from "@/registry/bases/base/lib/utils";

type ToggleProps = Omit<TogglePrimitive.Props, "value"> &
  Pick<VariantProps<typeof buttonVariants>, "size" | "iconOnly" | "onColor"> & {
    /**
     * Look of the button. `outline` (default), `subtle` and `transparent` follow the DGA Button
     * styles; `secondary` is the solid one.
     */
    variant?: "outline" | "subtle" | "transparent" | "secondary";
    /** The value inside a ToggleGroup. */
    value?: string;
  };

/**
 * A two-state button that stays pressed (Platform Code extension; looks like a DGA Button).
 * Use it for a setting that applies right away and can be turned off again, such as Bold or
 * Show filters. Space and Enter flip it. The pressed state is the Button selected fill, shown
 * with `aria-pressed`, so it is not colour alone. An icon-only toggle needs an `aria-label`.
 * Use a Switch for on and off settings in a form, and a Checkbox for choices sent with a form.
 */
function Toggle({
  className,
  variant = "outline",
  size = "md",
  iconOnly = false,
  onColor = false,
  ...props
}: ToggleProps) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, iconOnly, onColor }), className)}
      {...props}
    />
  );
}

export type { ToggleProps };
export { Toggle };
