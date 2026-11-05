"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { AutoDirection } from "@/registry/bases/base/lib/direction";
import { cn } from "@/registry/bases/base/lib/utils";

const contentSwitcherVariants = cva("inline-flex w-fit max-w-full items-stretch rounded-sm border border-border-neutral-primary bg-background-neutral-100 p-0.5", {
  variants: {
    size: { sm: "h-8 [&_[data-slot=content-switcher-item]]:text-sm", md: "h-10", lg: "h-12" },
    onColor: { true: "border-alpha-white-40 bg-alpha-alpha-black-20 [&_[data-slot=content-switcher-item]]:text-text-oncolor-primary [&_[data-slot=content-switcher-item]]:hover:bg-alpha-alpha-black-30 [&_[data-slot=content-switcher-item]]:active:bg-alpha-alpha-black-40 [&_[data-slot=content-switcher-item]]:focus-visible:outline-base-white [&_[data-slot=content-switcher-item][data-pressed]]:bg-base-white [&_[data-slot=content-switcher-item][data-pressed]]:text-primary-sa-flag-700 [&_[data-slot=content-switcher-item][data-pressed]]:hover:bg-base-white [&_[data-slot=content-switcher-item][data-pressed]]:active:bg-base-white", false: "" },
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
      className={cn("inline-flex min-w-0 flex-1 cursor-pointer items-center justify-center gap-2 rounded-xs border-0 bg-transparent px-4 text-md font-medium whitespace-nowrap text-text-default transition-colors select-none hover:bg-button-background-neutral-hovered active:bg-button-background-neutral-pressed focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-solid focus-visible:-outline-offset-2 focus-visible:outline-border-black data-pressed:bg-button-background-primary-default data-pressed:text-text-oncolor-primary data-pressed:hover:bg-button-background-primary-default data-pressed:active:bg-button-background-primary-default data-disabled:cursor-not-allowed data-disabled:bg-transparent data-disabled:text-text-default-disabled data-disabled:hover:bg-transparent data-pressed:data-disabled:bg-background-disabled [&_svg]:size-5 [&_svg]:shrink-0 motion-reduce:transition-none", className)}
      {...props}
    />
  );
}

export type { ContentSwitcherProps };
export { ContentSwitcher, ContentSwitcherItem, contentSwitcherVariants };
