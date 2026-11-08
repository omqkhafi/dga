import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { Divider } from "@/components/dga/divider";
import { cn } from "@/registry/bases/base/lib/utils";

const buttonGroupVariants = cva("cn-button-group", {
  variants: {
    orientation: {
      horizontal: "cn-button-group-horizontal",
      vertical: "cn-button-group-vertical",
    },
  },
  defaultVariants: { orientation: "horizontal" },
});

type ButtonGroupProps = React.ComponentProps<"div"> & VariantProps<typeof buttonGroupVariants>;

/**
 * Joins related Buttons into one block with shared edges (Platform Code extension). Put Buttons,
 * a ButtonGroupText and a ButtonGroupSeparator inside. It is only layout: each Button keeps its
 * own action. Use a Toggle Group when the buttons are pressed on and off, and a Content Switcher
 * when exactly one option is always chosen. Name the group with `aria-label`.
 */
function ButtonGroup({ className, orientation = "horizontal", ...props }: ButtonGroupProps) {
  return (
    // biome-ignore lint/a11y/useSemanticElements: a fieldset would add its own border and legend layout
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  );
}

/** A non-interactive text segment, such as a count or a label, drawn like the buttons. */
function ButtonGroupText({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="button-group-text"
      className={cn("cn-button-group-text", className)}
      {...props}
    />
  );
}

/** A thin line between two buttons that share a fill, so their edge stays visible. */
function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Divider>) {
  return (
    <Divider
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn("cn-button-group-separator", className)}
      {...props}
    />
  );
}

export type { ButtonGroupProps };
export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants };
