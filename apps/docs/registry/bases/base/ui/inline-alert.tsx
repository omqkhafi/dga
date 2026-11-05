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

const inlineAlertVariants = cva("relative flex w-full items-start gap-notification-gap overflow-hidden rounded-md border border-(--a-border) bg-(--a-bg) py-notification-padding pe-4 ps-[calc(var(--spacing-notification-h-padding)+0.5rem)] text-(--a-title) [--a-text:var(--text-primary-paragraph)] [--a-title:var(--text-display)] before:absolute before:inset-y-0 before:start-0 before:w-2 before:bg-(--a-bar)", {
  variants: {
    variant: {
      neutral: "[--a-bar:var(--border-neutral-primary)] [--a-bg:var(--background-notification-white)] [--a-border:var(--border-neutral-primary)] [--a-icon:var(--icon-default)] [--a-tint-bg:var(--background-neutral-25)] [--a-tint-border:var(--border-neutral-primary)] [--a-tint-text:var(--text-display)]",
      info: "[--a-bar:var(--colors-blue-400)] [--a-bg:var(--background-notification-white)] [--a-border:var(--border-neutral-primary)] [--a-icon:var(--icon-info)] [--a-tint-bg:var(--background-info-25)] [--a-tint-border:var(--border-info-light)] [--a-tint-text:var(--text-info)]",
      success: "[--a-bar:var(--colors-green-400)] [--a-bg:var(--background-notification-white)] [--a-border:var(--border-neutral-primary)] [--a-icon:var(--icon-success)] [--a-tint-bg:var(--background-success-25)] [--a-tint-border:var(--border-success-light)] [--a-tint-text:var(--text-success)]",
      warning: "[--a-bar:var(--colors-yellow-400)] [--a-bg:var(--background-notification-white)] [--a-border:var(--border-neutral-primary)] [--a-icon:var(--icon-warning)] [--a-tint-bg:var(--background-warning-25)] [--a-tint-border:var(--border-warning-light)] [--a-tint-text:var(--text-warning)]",
      destructive: "[--a-bar:var(--colors-red-400)] [--a-bg:var(--background-notification-white)] [--a-border:var(--border-neutral-primary)] [--a-icon:var(--icon-error)] [--a-tint-bg:var(--background-error-25)] [--a-tint-border:var(--border-error-light)] [--a-tint-text:var(--text-error)]",
    },
    tinted: { true: "[--a-bg:var(--a-tint-bg)] [--a-border:var(--a-tint-border)] [--a-text:var(--a-tint-text)] [--a-title:var(--a-tint-text)]", false: "" },
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
      {hideIcon ? null : <HugeiconsIcon icon={ICONS[kind]} aria-hidden className="mt-0.5 size-6 shrink-0 text-(--a-icon)" />}
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="m-0 text-md font-semibold">{title}</p>
        {children ? <div className="text-sm text-(--a-text)">{children}</div> : null}
        {actions ? <div className="mt-2 flex flex-wrap items-center gap-3">{actions}</div> : null}
      </div>
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

export type { InlineAlertProps };
export { InlineAlert, inlineAlertVariants };
