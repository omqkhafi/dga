import { Select as SelectPrimitive } from "@base-ui/react/select";
import { ArrowDown01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/registry/bases/base/lib/utils";

const selectTriggerVariants = cva("cn-select-trigger", {
  variants: {
    size: { md: "cn-input-size-md", lg: "cn-input-size-lg" },
    appearance: {
      default: "",
      lighter: "cn-select-lighter",
      darker: "cn-select-darker",
    },
  },
  defaultVariants: { size: "lg", appearance: "default" },
});

/**
 * Lets people pick one option from a list (DGA: Dropdown Input). Compose it from
 * SelectTrigger, SelectValue and SelectContent. Pass `items` so the trigger shows the
 * label of the chosen value, and label it with a Field.
 */
function Select<Value, Multiple extends boolean | undefined = false>(
  props: SelectPrimitive.Root.Props<Value, Multiple>,
) {
  return <SelectPrimitive.Root {...props} />;
}

/** Groups related options under a SelectLabel. */
function SelectGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="select-group"
      className={cn("cn-select-group", className)}
      {...props}
    />
  );
}

type SelectTriggerProps = SelectPrimitive.Trigger.Props &
  VariantProps<typeof selectTriggerVariants>;

/** The button that shows the chosen option and opens the list. */
function SelectTrigger({ className, size, appearance, children, ...props }: SelectTriggerProps) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size ?? "lg"}
      className={cn(selectTriggerVariants({ size, appearance }), className)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon data-slot="select-icon" className="cn-select-icon">
        <HugeiconsIcon icon={ArrowDown01Icon} aria-hidden className="size-5" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

/** The chosen option, or the `placeholder` while there is none. */
function SelectValue({ className, ...props }: SelectPrimitive.Value.Props) {
  return (
    <SelectPrimitive.Value
      data-slot="select-value"
      className={cn("cn-select-value", className)}
      {...props}
    />
  );
}

type SelectContentProps = SelectPrimitive.Popup.Props &
  Pick<SelectPrimitive.Positioner.Props, "side" | "align" | "sideOffset" | "alignItemWithTrigger">;

/** The popup list. It opens below the trigger by default and is as wide as the trigger. */
function SelectContent({
  className,
  children,
  side = "bottom",
  align = "start",
  sideOffset = 4,
  alignItemWithTrigger = false,
  ...props
}: SelectContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        align={align}
        sideOffset={sideOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="cn-select-positioner"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          className={cn("cn-select-content", className)}
          {...props}
        >
          <SelectPrimitive.List className="cn-select-list">{children}</SelectPrimitive.List>
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

/** One option. The chosen option shows a check mark on the end side. */
function SelectItem({ className, children, ...props }: SelectPrimitive.Item.Props) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn("cn-select-item", className)}
      {...props}
    >
      <SelectPrimitive.ItemText className="cn-select-item-text">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="cn-select-item-indicator">
        <HugeiconsIcon icon={Tick02Icon} aria-hidden className="size-4" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  );
}

/** The heading of a SelectGroup. */
function SelectLabel({ className, ...props }: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
      data-slot="select-label"
      className={cn("cn-select-label", className)}
      {...props}
    />
  );
}

function SelectSeparator({ className, ...props }: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("cn-select-separator", className)}
      {...props}
    />
  );
}

export type { SelectContentProps, SelectTriggerProps };
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  selectTriggerVariants,
};
