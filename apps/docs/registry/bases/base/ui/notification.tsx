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

const notificationVariants = cva("flex w-full items-center gap-notification-gap rounded-xs border-b-2 px-notification-alert-h-padding py-notification-alert-v-padding text-md border-(--n-border) bg-(--n-bg) text-(--n-text)", {
  variants: {
    variant: {
      neutral: "[--n-bg:var(--background-neutral-50)] [--n-border:var(--colors-neutral-400)] [--n-icon:var(--icon-default)] [--n-text:var(--text-primary-paragraph)]",
      info: "[--n-bg:var(--background-info-50)] [--n-border:var(--colors-blue-400)] [--n-icon:var(--icon-info)] [--n-text:var(--text-info)]",
      success: "[--n-bg:var(--background-success-50)] [--n-border:var(--colors-green-400)] [--n-icon:var(--icon-success)] [--n-text:var(--text-success)]",
      warning: "[--n-bg:var(--background-warning-50)] [--n-border:var(--colors-yellow-400)] [--n-icon:var(--icon-warning)] [--n-text:var(--text-warning)]",
      critical: "[--n-bg:var(--background-error-50)] [--n-border:var(--colors-red-400)] [--n-icon:var(--icon-error)] [--n-text:var(--text-error)]",
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
        <HugeiconsIcon icon={ICONS[kind]} aria-hidden className="size-6 shrink-0 text-(--n-icon)" />
      )}
      <p className="m-0 min-w-0 flex-1">
        {title ? <strong className="font-bold">{title} </strong> : null}
        {children}
      </p>
      {action ? <div className="shrink-0 text-sm [&_a]:text-inherit [&_a]:underline">{action}</div> : null}
      {dismissible ? (
        <button
          type="button"
          aria-label={dismissLabel}
          className="-me-1 inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-sm border-0 bg-transparent text-icon-default transition-colors hover:bg-alpha-black-10 active:bg-alpha-black-20 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-1 focus-visible:outline-border-black [&_svg]:size-5 motion-reduce:transition-none"
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
