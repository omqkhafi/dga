import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/registry/bases/base/lib/utils";

/**
 * A group of radios where only one can be chosen. Arrow keys move and choose, Tab enters and
 * leaves the group. Wrap it in a Field with a FieldSet to give it a legend.
 */
function RadioGroup({ className, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      className={cn("flex flex-col gap-3", className)}
      {...props}
    />
  );
}

const radioVariants = cva("relative inline-flex shrink-0 cursor-pointer items-center justify-center border border-control-border bg-transparent p-0 text-(--control-mark) transition-colors hover:not-data-disabled:border-control-neutral-hovered hover:not-data-disabled:bg-control-ripple-effect active:not-data-disabled:bg-control-pressed focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-border-black data-checked:border-(--control-fill) hover:data-checked:not-data-disabled:border-(--control-fill-hover) active:data-checked:not-data-disabled:border-(--control-fill-pressed) data-invalid:not-data-checked:border-field-border-error data-disabled:cursor-not-allowed data-disabled:border-border-disabled data-disabled:bg-transparent data-readonly:cursor-default data-readonly:border-control-border data-readonly:bg-transparent data-readonly:text-icon-default-500 motion-reduce:transition-none size-6 rounded-full", {
  variants: {
    tone: { primary: "[--control-fill-hover:var(--control-primary-hovered)] [--control-fill-pressed:var(--control-primary-pressed)] [--control-fill:var(--control-primary-checked)] [--control-mark:var(--icon-oncolor)]", neutral: "[--control-fill-hover:var(--control-neutral-hovered)] [--control-fill-pressed:var(--control-neutral-pressed)] [--control-fill:var(--control-neutral-checked)] [--control-mark:var(--control-icon-neutral)]" },
  },
  defaultVariants: { tone: "primary" },
});

type RadioProps = RadioPrimitive.Root.Props & VariantProps<typeof radioVariants>;

/** One round option of a RadioGroup. Give every Radio a `value`. */
function Radio({ className, tone, ...props }: RadioProps) {
  return (
    <RadioPrimitive.Root
      data-slot="radio"
      className={cn(radioVariants({ tone }), className)}
      {...props}
    >
      <RadioPrimitive.Indicator
        keepMounted
        data-slot="radio-indicator"
        className="hidden size-3 rounded-full bg-(--control-fill) data-checked:block [:hover:not([data-disabled])>&]:bg-(--control-fill-hover) [:active:not([data-disabled])>&]:bg-(--control-fill-pressed) [[data-disabled]>&]:bg-border-disabled [[data-readonly]>&]:bg-icon-default-500"
      />
    </RadioPrimitive.Root>
  );
}

export type { RadioProps };
export { Radio, RadioGroup, radioVariants };
