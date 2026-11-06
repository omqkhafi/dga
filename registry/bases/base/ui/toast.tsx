"use client";

import { Toast as ToastPrimitive } from "@base-ui/react/toast";
import {
  Alert02Icon,
  AlertCircleIcon,
  Cancel01Icon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cva } from "class-variance-authority";

import { useDocumentDirection } from "@/lib/dga/direction";

type ToastType = "neutral" | "info" | "success" | "warning" | "error";

const toastVariants = cva("cn-toast", {
  variants: {
    type: {
      neutral: "cn-toast-neutral",
      info: "cn-toast-info",
      success: "cn-toast-success",
      warning: "cn-toast-warning",
      error: "cn-toast-error",
    },
  },
  defaultVariants: { type: "neutral" },
});

const ICONS = {
  neutral: InformationCircleIcon,
  info: InformationCircleIcon,
  success: CheckmarkCircle02Icon,
  warning: Alert02Icon,
  error: AlertCircleIcon,
};

const manager = ToastPrimitive.createToastManager();

/**
 * The toast manager. Call `toast.add({ title, description, type })` from anywhere, also outside
 * React; it also has `close`, `update` and `promise`. `type` is `neutral`, `info`, `success`,
 * `warning` or `error`. `error` and `warning` toasts are announced at once (`priority: "high"`)
 * unless you set another priority; the others are announced politely.
 */
const toast = {
  ...manager,
  add: (options: Parameters<typeof manager.add>[0]) =>
    manager.add({
      priority: options.type === "error" || options.type === "warning" ? "high" : "low",
      ...options,
    }),
};

type ToasterProps = {
  /** The most toasts shown at once. */
  limit?: number;
  /** How long a toast stays, in milliseconds. `0` keeps it until it is closed. */
  timeout?: number;
  /** Accessible name of the close button. Translate it on Arabic pages. */
  closeLabel?: string;
  /** Accessible name of the region that holds the toasts. Translate it on Arabic pages. */
  regionLabel?: string;
};

/**
 * Put one Toaster at the root of the app (DGA: Notification Toast). It lists the toasts at the
 * bottom end of the screen: bottom right on English pages, bottom left on Arabic pages. A toast
 * is announced to screen readers when it appears (a polite live region, assertive for errors and
 * warnings), stays while it is hovered or focused, and can be swiped away.
 */
function Toaster({
  limit = 3,
  timeout = 6000,
  closeLabel = "Close",
  regionLabel = "Notifications",
}: ToasterProps) {
  return (
    <ToastPrimitive.Provider toastManager={manager} limit={limit} timeout={timeout}>
      <ToastPrimitive.Portal>
        <ToastPrimitive.Viewport
          data-slot="toaster"
          aria-label={regionLabel}
          className="cn-toaster"
        >
          <ToastList closeLabel={closeLabel} />
        </ToastPrimitive.Viewport>
      </ToastPrimitive.Portal>
    </ToastPrimitive.Provider>
  );
}

function ToastList({ closeLabel }: { closeLabel: string }) {
  const { toasts } = ToastPrimitive.useToastManager();
  const rtl = useDocumentDirection() === "rtl";
  return toasts.map((item) => {
    const type = (item.type as ToastType | undefined) ?? "neutral";
    return (
      <ToastPrimitive.Root
        key={item.id}
        toast={item}
        swipeDirection={rtl ? ["left", "down"] : ["right", "down"]}
        data-slot="toast"
        className={toastVariants({ type })}
      >
        <ToastPrimitive.Content className="cn-toast-content">
          <HugeiconsIcon icon={ICONS[type]} aria-hidden className="cn-toast-icon" />
          <div className="cn-toast-text">
            <ToastPrimitive.Title className="cn-toast-title" />
            <ToastPrimitive.Description className="cn-toast-description" />
            <ToastPrimitive.Action className="cn-toast-action" />
          </div>
          <ToastPrimitive.Close aria-label={closeLabel} className="cn-toast-close">
            <HugeiconsIcon icon={Cancel01Icon} aria-hidden />
          </ToastPrimitive.Close>
        </ToastPrimitive.Content>
      </ToastPrimitive.Root>
    );
  });
}

/** The toast manager for use inside React components: `const { add, close } = useToast()`. */
function useToast() {
  return ToastPrimitive.useToastManager();
}

export type { ToasterProps, ToastType };
export { Toaster, toast, toastVariants, useToast };
