"use client";

import {
  Alert02Icon,
  AlertCircleIcon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";
import { cn } from "@/registry/bases/base/lib/utils";

const inlineAlertVariants = cva("cn-alert", {
  variants: {
    variant: {
      neutral: "cn-alert-neutral",
      info: "cn-alert-info",
      success: "cn-alert-success",
      warning: "cn-alert-warning",
      destructive: "cn-alert-destructive",
    },
    tinted: { true: "cn-alert-tinted", false: "" },
  },
  defaultVariants: { variant: "neutral", tinted: false },
});

const ICONS = {
  neutral: InformationCircleIcon,
  info: InformationCircleIcon,
  success: CheckmarkCircle02Icon,
  warning: Alert02Icon,
  destructive: AlertCircleIcon,
};

type InlineAlertProps = Omit<React.ComponentProps<"div">, "title"> &
  VariantProps<typeof inlineAlertVariants> & {
    /** The short heading of the alert. */
    title: React.ReactNode;
    /** Hides the status icon. */
    hideIcon?: boolean;
    /** Buttons or links under the text (at most two). */
    actions?: React.ReactNode;
    /** Shows the close button. The alert hides itself, then calls `onDismiss`. */
    dismissible?: boolean;
    /** Called after the alert is dismissed. */
    onDismiss?: () => void;
    /** Accessible name of the close button. Translate it on Arabic pages. */
    dismissLabel?: string;
  };

/**
 * A message inside the page next to what it is about (DGA: Inline Alert): a form, a card, a
 * section. A coloured bar on the start side and an icon carry the kind, so colour is never the
 * only cue. `destructive` and `warning` are announced at once (`role="alert"`), the others
 * politely (`role="status"`). Mount it when it applies so it is announced.
 */
function InlineAlert({
  className,
  variant,
  tinted,
  title,
  hideIcon,
  actions,
  dismissible,
  onDismiss,
  dismissLabel = "Dismiss",
  children,
  ...props
}: InlineAlertProps) {
  const [open, setOpen] = React.useState(true);
  if (!open) return null;
  const kind = variant ?? "neutral";
  return (
    <div
      data-slot="inline-alert"
      role={kind === "destructive" || kind === "warning" ? "alert" : "status"}
      className={cn(inlineAlertVariants({ variant, tinted }), className)}
      {...props}
    >
      {hideIcon ? null : <HugeiconsIcon icon={ICONS[kind]} aria-hidden className="cn-alert-icon" />}
      <div className="cn-alert-body">
        <p className="cn-alert-title">{title}</p>
        {children ? <div className="cn-alert-text">{children}</div> : null}
        {actions ? <div className="cn-alert-actions">{actions}</div> : null}
      </div>
      {dismissible ? (
        <button
          type="button"
          aria-label={dismissLabel}
          className="cn-alert-close"
          onClick={() => {
            setOpen(false);
            onDismiss?.();
          }}
        >
          <HugeiconsIcon icon={Cancel01Icon} aria-hidden />
        </button>
      ) : null}
    </div>
  );
}

export type { InlineAlertProps };
export { InlineAlert, inlineAlertVariants };
