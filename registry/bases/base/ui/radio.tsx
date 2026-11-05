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
      className={cn("cn-radio-group", className)}
      {...props}
    />
  );
}

const radioVariants = cva("cn-control-box cn-radio", {
  variants: {
    tone: { primary: "cn-control-primary", neutral: "cn-control-neutral" },
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
        className="cn-radio-indicator"
      />
    </RadioPrimitive.Root>
  );
}

export type { RadioProps };
export { Radio, RadioGroup, radioVariants };
