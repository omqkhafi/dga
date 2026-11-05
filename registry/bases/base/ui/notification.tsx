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

const notificationVariants = cva("cn-notification", {
  variants: {
    variant: {
      neutral: "cn-notification-neutral",
      info: "cn-notification-info",
      success: "cn-notification-success",
      warning: "cn-notification-warning",
      critical: "cn-notification-critical",
    },
  },
  defaultVariants: { variant: "neutral" },
});

const ICONS = {
  neutral: InformationCircleIcon,
  info: InformationCircleIcon,
  success: CheckmarkCircle02Icon,
  warning: Alert02Icon,
  critical: AlertCircleIcon,
};

type NotificationProps = Omit<React.ComponentProps<"div">, "title"> &
  VariantProps<typeof notificationVariants> & {
    /** Bold lead-in text before the message, such as "Important:". */
    title?: React.ReactNode;
    /** Hides the status icon. */
    hideIcon?: boolean;
    /** A link or a small Button after the message. */
    action?: React.ReactNode;
    /** Shows the close button. The notification hides itself, then calls `onDismiss`. */
    dismissible?: boolean;
    /** Called after the notification is dismissed. */
    onDismiss?: () => void;
    /** Accessible name of the close button. Translate it on Arabic pages. */
    dismissLabel?: string;
  };

/**
 * A full-width banner for a message that concerns the whole page (DGA: Notification), at the top
 * of the page or a section. It is a live region: `critical` is announced at once (`role="alert"`),
 * the others politely (`role="status"`). Mount it when the message applies, not before, so it is
 * announced.
 */
function Notification({
  className,
  variant,
  title,
  hideIcon,
  action,
  dismissible,
  onDismiss,
  dismissLabel = "Dismiss",
  children,
  ...props
}: NotificationProps) {
  const [open, setOpen] = React.useState(true);
  if (!open) return null;
  const kind = variant ?? "neutral";
  return (
    <div
      data-slot="notification"
      role={kind === "critical" ? "alert" : "status"}
      className={cn(notificationVariants({ variant }), className)}
      {...props}
    >
      {hideIcon ? null : (
        <HugeiconsIcon icon={ICONS[kind]} aria-hidden className="cn-notification-icon" />
      )}
      <p className="cn-notification-text">
        {title ? <strong className="cn-notification-title">{title} </strong> : null}
        {children}
      </p>
      {action ? <div className="cn-notification-action">{action}</div> : null}
      {dismissible ? (
        <button
          type="button"
          aria-label={dismissLabel}
          className="cn-notification-close"
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

export type { NotificationProps };
export { Notification, notificationVariants };
