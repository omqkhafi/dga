"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { AutoDirection } from "@/registry/bases/base/lib/direction";
import { cn } from "@/registry/bases/base/lib/utils";

const contentSwitcherVariants = cva("cn-switcher", {
  variants: {
    size: { sm: "cn-switcher-size-sm", md: "cn-switcher-size-md", lg: "cn-switcher-size-lg" },
    onColor: { true: "cn-switcher-on-color", false: "" },
  },
  defaultVariants: { size: "md", onColor: false },
});

type ContentSwitcherProps = Omit<
  ToggleGroupPrimitive.Props,
  "value" | "defaultValue" | "onValueChange" | "multiple"
> &
  VariantProps<typeof contentSwitcherVariants> & {
    /** The chosen option (controlled). */
    value?: string;
    /** The option chosen at first (uncontrolled). The first option if you leave it out. */
    defaultValue?: string;
    /** Called with the new value. One option is always chosen, so it is never empty. */
    onValueChange?: (value: string) => void;
  };

/**
 * A short row of two to four options that switch the view below it (DGA: Content Switcher). One
 * option is always chosen. One option is in the tab order; the arrow keys move between options
 * (Left and Right swap on Arabic pages). Name it with `aria-label`.
 */
function ContentSwitcher({
  className,
  size,
  onColor,
  value,
  defaultValue,
  onValueChange,
  ...props
}: ContentSwitcherProps) {
  const [inner, setInner] = React.useState<string | undefined>(defaultValue);
  const current = value ?? inner;
  return (
    <AutoDirection>
      <ToggleGroupPrimitive
        data-slot="content-switcher"
        data-size={size ?? "md"}
        value={current === undefined ? [] : [current]}
        onValueChange={(next) => {
          const chosen = next[0];
          // A pressed option cannot be turned off: one is always chosen.
          if (chosen === undefined) return;
          if (value === undefined) setInner(chosen);
          onValueChange?.(chosen);
        }}
        className={cn(contentSwitcherVariants({ size, onColor }), className)}
        {...props}
      />
    </AutoDirection>
  );
}

/** One option. Its `value` is what ContentSwitcher reports. Put an icon first if you need one. */
function ContentSwitcherItem({
  className,
  ...props
}: Omit<TogglePrimitive.Props, "pressed" | "defaultPressed" | "onPressedChange"> & {
  /** What this option is called in code. */
  value: string;
}) {
  return (
    <TogglePrimitive
      data-slot="content-switcher-item"
      className={cn("cn-switcher-item", className)}
      {...props}
    />
  );
}

export type { ContentSwitcherProps };
export { ContentSwitcher, ContentSwitcherItem, contentSwitcherVariants };
