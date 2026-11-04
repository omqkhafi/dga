import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/registry/bases/base/lib/utils";

const dividerVariants = cva("shrink-0 border-0", {
  variants: {
    variant: {
      neutral: "bg-border-neutral-secondary",
      primary: "bg-border-primary",
      "alpha-white": "bg-border-oncolor-transparent-30",
      white: "bg-icon-oncolor",
    },
    orientation: {
      horizontal: "h-px w-full",
      vertical: "w-px self-stretch",
    },
  },
  defaultVariants: { variant: "neutral", orientation: "horizontal" },
});

type DividerProps = SeparatorPrimitive.Props & VariantProps<typeof dividerVariants>;

/** Separates content into sections. Announced as a separator; pass role="none" if purely visual. */
function Divider({ className, variant, orientation = "horizontal", ...props }: DividerProps) {
  return (
    <SeparatorPrimitive
      data-slot="divider"
      orientation={orientation ?? "horizontal"}
      className={cn(dividerVariants({ variant, orientation }), className)}
      {...props}
    />
  );
}

export type { DividerProps };
export { Divider, dividerVariants };
