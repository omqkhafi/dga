import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { Divider } from "@/components/dga/divider";
import { cn } from "@/registry/bases/base/lib/utils";

const buttonGroupVariants = cva("gap-0 [&>*]:rounded-none [&>*]:focus-visible:z-10 [&>*]:hover:z-10 [&>[aria-pressed=true]]:z-10 data-[orientation=horizontal]:[&>*:first-child]:rounded-s-sm data-[orientation=horizontal]:[&>*:last-child]:rounded-e-sm data-[orientation=horizontal]:[&>*:not(:first-child)]:-ms-px data-[orientation=vertical]:[&>*:first-child]:rounded-t-sm data-[orientation=vertical]:[&>*:last-child]:rounded-b-sm data-[orientation=vertical]:[&>*:not(:first-child)]:-mt-px flex w-fit max-w-full items-stretch", {
  variants: {
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col",
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
      className={cn("inline-flex min-h-8 items-center gap-2 border border-border-neutral-primary bg-background-neutral-100 px-buttons-md-padding text-sm font-medium whitespace-nowrap text-text-default [&_svg]:size-5 [&_svg]:shrink-0", className)}
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
      className={cn("self-stretch", className)}
      {...props}
    />
  );
}

export type { ButtonGroupProps };
export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants };
