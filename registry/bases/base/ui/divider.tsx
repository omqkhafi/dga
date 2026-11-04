import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/registry/bases/base/lib/utils";

const dividerVariants = cva("cn-divider", {
  variants: {
    variant: {
      neutral: "cn-divider-variant-neutral",
      primary: "cn-divider-variant-primary",
      "alpha-white": "cn-divider-variant-alpha-white",
      white: "cn-divider-variant-white",
    },
    orientation: {
      horizontal: "cn-divider-horizontal",
      vertical: "cn-divider-vertical",
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
