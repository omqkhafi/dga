import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { MinusSignIcon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/registry/bases/base/lib/utils";

const checkboxVariants = cva("cn-control-box cn-checkbox", {
  variants: {
    size: { xs: "cn-control-size-xs", sm: "cn-control-size-sm", md: "cn-control-size-md" },
    tone: { primary: "cn-control-primary", neutral: "cn-control-neutral" },
  },
  defaultVariants: { size: "md", tone: "primary" },
});

type CheckboxProps = CheckboxPrimitive.Root.Props & VariantProps<typeof checkboxVariants>;

/**
 * A box for a yes/no choice, or one of several. `indeterminate` shows a dash for a parent that
 * is partly selected. Label it with a Field (`orientation="horizontal"`) or an enclosing label.
 */
function Checkbox({ className, size, tone, ...props }: CheckboxProps) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(checkboxVariants({ size, tone }), className)}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        keepMounted
        data-slot="checkbox-indicator"
        className="cn-checkbox-indicator"
      >
        <HugeiconsIcon icon={Tick02Icon} aria-hidden className="cn-checkbox-tick" />
        <HugeiconsIcon icon={MinusSignIcon} aria-hidden className="cn-checkbox-dash" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export type { CheckboxProps };
export { Checkbox, checkboxVariants };
