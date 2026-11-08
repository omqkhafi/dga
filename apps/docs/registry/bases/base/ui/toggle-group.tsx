"use client";

import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { Toggle, type ToggleProps } from "@/components/dga/toggle";
import { AutoDirection } from "@/lib/dga/direction";
import { cn } from "@/registry/bases/base/lib/utils";

const toggleGroupVariants = cva("flex w-fit max-w-full items-stretch data-[orientation=vertical]:flex-col", {
  variants: {
    attached: { true: "gap-0 [&>*]:rounded-none [&>*]:focus-visible:z-10 [&>*]:hover:z-10 [&>[aria-pressed=true]]:z-10 data-[orientation=horizontal]:[&>*:first-child]:rounded-s-sm data-[orientation=horizontal]:[&>*:last-child]:rounded-e-sm data-[orientation=horizontal]:[&>*:not(:first-child)]:-ms-px data-[orientation=vertical]:[&>*:first-child]:rounded-t-sm data-[orientation=vertical]:[&>*:last-child]:rounded-b-sm data-[orientation=vertical]:[&>*:not(:first-child)]:-mt-px", false: "flex-wrap gap-2" },
  },
  defaultVariants: { attached: true },
});

type GroupStyle = Pick<ToggleProps, "variant" | "size" | "iconOnly">;
const GroupStyleContext = React.createContext<GroupStyle>({});

type ToggleGroupProps = ToggleGroupPrimitive.Props &
  VariantProps<typeof toggleGroupVariants> &
  GroupStyle;

/**
 * A row (or column) of Toggles that belong together (Platform Code extension). By default one
 * option can be pressed at a time; set `multiple` to allow several, as in a text style toolbar.
 * Unlike a Content Switcher, nothing has to stay chosen: pressing the pressed option turns it off.
 * One toggle is in the tab order and the arrow keys move between them (they swap in RTL). Name
 * the group with `aria-label`.
 */
function ToggleGroup({
  className,
  attached = true,
  variant = "outline",
  size = "md",
  iconOnly,
  orientation = "horizontal",
  ...props
}: ToggleGroupProps) {
  const style = React.useMemo(() => ({ variant, size, iconOnly }), [variant, size, iconOnly]);
  return (
    <AutoDirection>
      <GroupStyleContext.Provider value={style}>
        <ToggleGroupPrimitive
          data-slot="toggle-group"
          orientation={orientation}
          className={cn(toggleGroupVariants({ attached }), className)}
          {...props}
        />
      </GroupStyleContext.Provider>
    </AutoDirection>
  );
}

/** One option. It takes the look of its group; `value` identifies it in the group's value. */
function ToggleGroupItem(props: ToggleProps) {
  const style = React.useContext(GroupStyleContext);
  return <Toggle {...style} {...props} />;
}

export type { ToggleGroupProps };
export { ToggleGroup, ToggleGroupItem, toggleGroupVariants };
