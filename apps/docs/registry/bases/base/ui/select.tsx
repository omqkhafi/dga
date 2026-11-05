import { Select as SelectPrimitive } from "@base-ui/react/select";
import { ArrowDown01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/registry/bases/base/lib/utils";

const selectTriggerVariants = cva("relative flex w-full min-w-0 cursor-pointer items-center justify-between gap-2 rounded-sm border border-field-border-default bg-field-background-default px-3 text-start text-field-text-filled transition-colors hover:border-field-border-hovered active:bg-field-background-pressed data-popup-open:border-field-border-pressed after:pointer-events-none after:absolute after:inset-x-0 after:-bottom-px after:h-0.5 after:w-0 after:rounded-b-sm after:bg-field-border-pressed after:transition-[width] after:duration-200 motion-reduce:after:transition-none active:after:w-1/2 focus-visible:after:w-full data-popup-open:after:w-full data-invalid:after:bg-field-border-error focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-1 focus-visible:outline-border-black data-readonly:after:hidden data-readonly:active:bg-field-background-default data-disabled:after:hidden data-disabled:active:bg-field-background-default data-readonly:cursor-default data-readonly:border-dashed data-readonly:border-field-border-default data-readonly:text-field-text-readonly data-readonly:hover:border-field-border-default data-disabled:cursor-not-allowed data-disabled:border-border-disabled data-disabled:text-text-default-disabled data-invalid:border-field-border-error motion-reduce:transition-none", {
  variants: {
    size: { md: "h-8 text-sm [&_svg:not([class*='size-'])]:size-5", lg: "h-10 text-md [&_svg:not([class*='size-'])]:size-6" },
    appearance: {
      default: "",
      lighter: "bg-field-background-lighter focus-visible:bg-field-background-default data-popup-open:bg-field-background-default",
      darker: "bg-field-background-darker focus-visible:bg-field-background-default data-popup-open:bg-field-background-default",
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
      className={cn("flex flex-col", className)}
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
      <SelectPrimitive.Icon data-slot="select-icon" className="inline-flex shrink-0 text-icon-default-500 transition-transform data-popup-open:rotate-180 motion-reduce:transition-none [&_svg]:size-5">
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
      className={cn("min-w-0 flex-1 truncate text-start data-placeholder:text-field-text-placeholder in-data-disabled:text-text-default-disabled", className)}
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
        className="z-50 outline-hidden select-none"
      >
        <SelectPrimitive.Popup
          data-slot="select-content"
          className={cn("max-h-(--available-height) min-w-(--anchor-width) origin-(--transform-origin) overflow-hidden rounded-sm border border-border-neutral-primary bg-background-card text-text-default shadow-md outline-hidden transition-[scale,opacity] duration-100 data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0 motion-reduce:transition-none", className)}
          {...props}
        >
          <SelectPrimitive.List className="relative max-h-(--available-height) overflow-y-auto p-1 outline-hidden">{children}</SelectPrimitive.List>
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
      className={cn("relative flex min-h-8 cursor-default items-center gap-2 rounded-xs px-3 py-1.5 text-sm text-text-default outline-hidden select-none data-highlighted:bg-button-background-neutral-default data-highlighted:before:absolute data-highlighted:before:inset-y-1 data-highlighted:before:start-0 data-highlighted:before:w-0.5 data-highlighted:before:rounded-full data-highlighted:before:bg-border-black data-selected:font-medium data-disabled:cursor-not-allowed data-disabled:text-text-default-disabled", className)}
      {...props}
    >
      <SelectPrimitive.ItemText className="min-w-0 flex-1 truncate">
        {children}
      </SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="inline-flex shrink-0 text-icon-primary [&_svg]:size-4">
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
      className={cn("px-3 py-1.5 text-xs font-semibold text-field-text-helper", className)}
      {...props}
    />
  );
}

function SelectSeparator({ className, ...props }: SelectPrimitive.Separator.Props) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("-mx-1 my-1 h-px bg-border-neutral-secondary", className)}
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
