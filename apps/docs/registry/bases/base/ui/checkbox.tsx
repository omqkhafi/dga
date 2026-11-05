import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { MinusSignIcon, Tick02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/registry/bases/base/lib/utils";

const checkboxVariants = cva("relative inline-flex shrink-0 cursor-pointer items-center justify-center border border-control-border bg-transparent p-0 text-(--control-mark) transition-colors hover:not-data-disabled:border-control-neutral-hovered hover:not-data-disabled:bg-control-ripple-effect active:not-data-disabled:bg-control-pressed focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-border-black data-checked:border-(--control-fill) hover:data-checked:not-data-disabled:border-(--control-fill-hover) active:data-checked:not-data-disabled:border-(--control-fill-pressed) data-invalid:not-data-checked:border-field-border-error data-disabled:cursor-not-allowed data-disabled:border-border-disabled data-disabled:bg-transparent data-readonly:cursor-default data-readonly:border-control-border data-readonly:bg-transparent data-readonly:text-icon-default-500 motion-reduce:transition-none rounded-xs data-checked:bg-(--control-fill) hover:data-checked:not-data-disabled:bg-(--control-fill-hover) active:data-checked:not-data-disabled:bg-(--control-fill-pressed) data-indeterminate:border-(--control-fill) data-indeterminate:bg-(--control-fill) data-disabled:data-checked:bg-border-disabled data-disabled:data-indeterminate:bg-border-disabled data-readonly:data-checked:bg-transparent data-readonly:data-indeterminate:bg-transparent", {
  variants: {
    size: { xs: "size-4 [&_svg]:size-3", sm: "size-5 [&_svg]:size-3.5", md: "size-6 [&_svg]:size-4" },
    tone: { primary: "[--control-fill-hover:var(--control-primary-hovered)] [--control-fill-pressed:var(--control-primary-pressed)] [--control-fill:var(--control-primary-checked)] [--control-mark:var(--icon-oncolor)]", neutral: "[--control-fill-hover:var(--control-neutral-hovered)] [--control-fill-pressed:var(--control-neutral-pressed)] [--control-fill:var(--control-neutral-checked)] [--control-mark:var(--control-icon-neutral)]" },
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
        className="hidden items-center justify-center data-checked:inline-flex data-indeterminate:inline-flex"
      >
        <HugeiconsIcon icon={Tick02Icon} aria-hidden className="[[data-indeterminate]>&]:hidden" />
        <HugeiconsIcon icon={MinusSignIcon} aria-hidden className="hidden [[data-indeterminate]>&]:block" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export type { CheckboxProps };
export { Checkbox, checkboxVariants };
