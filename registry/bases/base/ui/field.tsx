import { Field as FieldPrimitive } from "@base-ui/react/field";
import { Fieldset as FieldsetPrimitive } from "@base-ui/react/fieldset";
import { AlertCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type * as React from "react";
import { cn } from "@/registry/bases/base/lib/utils";

type FieldProps = FieldPrimitive.Root.Props & {
  /**
   * `vertical` stacks label, control, helper text and error. `horizontal` puts the control
   * (checkbox, radio, switch) beside its label and text.
   */
  orientation?: "vertical" | "horizontal";
};

/**
 * Wraps one form control with its label, helper text and error message. Links them for
 * assistive technology: the label names the control and the helper text and error are
 * announced through `aria-describedby`.
 */
function Field({ className, orientation = "vertical", ...props }: FieldProps) {
  return (
    <FieldPrimitive.Root
      data-slot="field"
      data-orientation={orientation}
      className={cn("cn-field", orientation === "horizontal" && "cn-field-horizontal", className)}
      {...props}
    />
  );
}

type FieldLabelProps = FieldPrimitive.Label.Props & {
  /** Shows the required marker (*). Also set `required` on the control so it is announced. */
  required?: boolean;
  /** Shows the optional marker, for fields that are not required in a form that mostly is. */
  optional?: boolean;
  /** Text of the optional marker. Translate it on Arabic pages. */
  optionalLabel?: string;
};

/** The visible name of the control. Clicking it focuses or toggles the control. */
function FieldLabel({
  className,
  required,
  optional,
  optionalLabel = "Optional",
  children,
  ...props
}: FieldLabelProps) {
  return (
    <FieldPrimitive.Label
      data-slot="field-label"
      className={cn("cn-field-label", className)}
      {...props}
    >
      {children}
      {required ? (
        <span aria-hidden="true" data-slot="field-required" className="cn-field-required">
          *
        </span>
      ) : null}
      {optional && !required ? (
        <span data-slot="field-optional" className="cn-field-optional">
          ({optionalLabel})
        </span>
      ) : null}
    </FieldPrimitive.Label>
  );
}

/** Helper text under the control. Linked to the control with `aria-describedby`. */
function FieldDescription({ className, ...props }: FieldPrimitive.Description.Props) {
  return (
    <FieldPrimitive.Description
      data-slot="field-description"
      className={cn("cn-field-description", className)}
      {...props}
    />
  );
}

/**
 * The error message, with an icon so the error never relies on colour alone. It renders when
 * the control fails validation, or whenever `match` is `true`. Set `invalid` on the Field and
 * `match` here to control it from your own state.
 */
function FieldError({ className, children, ...props }: FieldPrimitive.Error.Props) {
  return (
    <FieldPrimitive.Error
      data-slot="field-error"
      className={cn("cn-field-error", className)}
      {...props}
    >
      {children ? (
        <>
          <HugeiconsIcon icon={AlertCircleIcon} aria-hidden data-slot="field-error-icon" />
          <span>{children}</span>
        </>
      ) : null}
    </FieldPrimitive.Error>
  );
}

/** Groups the label, helper text and error beside a horizontal control. */
function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="field-content" className={cn("cn-field-content", className)} {...props} />;
}

/** Stacks several fields with the DGA spacing between them. */
function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="field-group" className={cn("cn-field-group", className)} {...props} />;
}

/** One checkbox or radio inside a group, so each has its own label and helper text. */
function FieldItem({ className, ...props }: FieldPrimitive.Item.Props) {
  return (
    <FieldPrimitive.Item
      data-slot="field-item"
      className={cn("cn-field-item", className)}
      {...props}
    />
  );
}

/** Groups related controls (a radio group, a set of checkboxes) under a legend. */
function FieldSet({ className, ...props }: FieldsetPrimitive.Root.Props) {
  return (
    <FieldsetPrimitive.Root
      data-slot="field-set"
      className={cn("cn-field-set", className)}
      {...props}
    />
  );
}

/** The name of a group of controls. Use it instead of a label on a Fieldset. */
function FieldLegend({
  className,
  required,
  optional,
  optionalLabel = "Optional",
  children,
  ...props
}: FieldsetPrimitive.Legend.Props &
  Pick<FieldLabelProps, "required" | "optional" | "optionalLabel">) {
  return (
    <FieldsetPrimitive.Legend
      data-slot="field-legend"
      className={cn("cn-field-label", className)}
      {...props}
    >
      {children}
      {required ? (
        <span aria-hidden="true" className="cn-field-required">
          *
        </span>
      ) : null}
      {optional && !required ? <span className="cn-field-optional">({optionalLabel})</span> : null}
    </FieldsetPrimitive.Legend>
  );
}

export type { FieldLabelProps, FieldProps };
export {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldItem,
  FieldLabel,
  FieldLegend,
  FieldSet,
};
