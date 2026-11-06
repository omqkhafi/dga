import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { Spinner } from "@/components/dga/spinner";
import { cn } from "@/registry/bases/base/lib/utils";

const buttonVariants = cva("cn-button", {
  variants: {
    variant: {
      primary: "",
      neutral: "",
      secondary: "",
      outline: "",
      subtle: "",
      transparent: "",
    },
    size: {
      sm: "cn-button-size-sm",
      md: "cn-button-size-md",
      lg: "cn-button-size-lg",
    },
    destructive: { true: "", false: "" },
    onColor: { true: "", false: "" },
    iconOnly: { true: "cn-button-icon-only", false: "" },
  },
  compoundVariants: [
    { variant: "primary", destructive: false, onColor: false, class: "cn-button-primary" },
    { variant: "neutral", destructive: false, onColor: false, class: "cn-button-neutral" },
    { variant: "secondary", destructive: false, onColor: false, class: "cn-button-secondary" },
    { variant: "outline", destructive: false, onColor: false, class: "cn-button-outline" },
    { variant: "subtle", destructive: false, onColor: false, class: "cn-button-subtle" },
    {
      variant: "transparent",
      destructive: false,
      onColor: false,
      class: "cn-button-transparent",
    },
    { variant: "primary", destructive: false, onColor: true, class: "cn-button-primary-on-color" },
    { variant: "neutral", destructive: false, onColor: true, class: "cn-button-neutral-on-color" },
    {
      variant: "secondary",
      destructive: false,
      onColor: true,
      class: "cn-button-secondary-on-color",
    },
    { variant: "outline", destructive: false, onColor: true, class: "cn-button-outline-on-color" },
    { variant: "subtle", destructive: false, onColor: true, class: "cn-button-subtle-on-color" },
    {
      variant: "transparent",
      destructive: false,
      onColor: true,
      class: "cn-button-transparent-on-color",
    },
    {
      variant: "primary",
      destructive: true,
      onColor: false,
      class: "cn-button-primary-destructive",
    },
    {
      variant: "secondary",
      destructive: true,
      onColor: false,
      class: "cn-button-secondary-destructive",
    },
    {
      variant: "outline",
      destructive: true,
      onColor: false,
      class: "cn-button-outline-destructive",
    },
    {
      variant: "subtle",
      destructive: true,
      onColor: false,
      class: "cn-button-subtle-destructive",
    },
    {
      variant: "transparent",
      destructive: true,
      onColor: false,
      class: "cn-button-transparent-destructive",
    },
    {
      variant: "primary",
      destructive: true,
      onColor: true,
      class: "cn-button-primary-destructive-on-color",
    },
    {
      variant: "secondary",
      destructive: true,
      onColor: true,
      class: "cn-button-secondary-destructive-on-color",
    },
    {
      variant: "outline",
      destructive: true,
      onColor: true,
      class: "cn-button-outline-destructive-on-color",
    },
    {
      variant: "subtle",
      destructive: true,
      onColor: true,
      class: "cn-button-subtle-destructive-on-color",
    },
    {
      variant: "transparent",
      destructive: true,
      onColor: true,
      class: "cn-button-transparent-destructive-on-color",
    },
    { iconOnly: true, size: "sm", class: "cn-button-icon-only-sm" },
    { iconOnly: true, size: "md", class: "cn-button-icon-only-md" },
    { iconOnly: true, size: "lg", class: "cn-button-icon-only-lg" },
  ],
  defaultVariants: {
    variant: "primary",
    size: "md",
    destructive: false,
    onColor: false,
    iconOnly: false,
  },
});

type ButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & {
    /**
     * Shows a spinner in place of the leading icon (or the icon, for icon-only buttons),
     * sets aria-busy and ignores clicks. The button keeps its width and stays focusable.
     */
    loading?: boolean;
  };

/** Triggers an action. Six styles, destructive and on-colour versions, three sizes, icon-only and loading. */
function Button({
  className,
  variant = "primary",
  size = "md",
  destructive = false,
  onColor = false,
  iconOnly = false,
  loading = false,
  children,
  onClick,
  ...props
}: ButtonProps) {
  // Figma has no destructive neutral button: it falls back to destructive primary.
  const style = destructive && variant === "neutral" ? "primary" : variant;
  return (
    <ButtonPrimitive
      data-slot="button"
      data-variant={style}
      data-size={size}
      data-loading={loading || undefined}
      aria-busy={loading || undefined}
      aria-disabled={loading || undefined}
      onClick={loading ? (event) => event.preventDefault() : onClick}
      className={cn(
        buttonVariants({ variant: style, size, destructive, onColor, iconOnly }),
        className,
      )}
      {...props}
    >
      {loading ? <Spinner variant="current" size={null} label={null} /> : null}
      {children}
    </ButtonPrimitive>
  );
}

export type { ButtonProps };
export { Button, buttonVariants };
