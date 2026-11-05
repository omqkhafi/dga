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

import { useDocumentDirection } from "@/registry/bases/base/lib/direction";

type ToastType = "neutral" | "info" | "success" | "warning" | "error";

const toastVariants = cva("relative w-full overflow-hidden rounded-md bg-background-notification-white text-text-display shadow-3xl select-none [transform:translate(var(--toast-swipe-movement-x,0px),var(--toast-swipe-movement-y,0px))] transition-[transform,opacity] duration-300 ease-out data-ending-style:opacity-0 data-limited:hidden data-starting-style:translate-y-4 data-starting-style:opacity-0 motion-reduce:transition-none before:absolute before:inset-y-0 before:start-0 before:w-2 before:bg-(--toast-bar)", {
  variants: {
    type: {
      neutral: "[--toast-bar:var(--border-neutral-primary)] [--toast-icon:var(--icon-default)]",
      info: "[--toast-bar:var(--colors-blue-400)] [--toast-icon:var(--icon-info)]",
      success: "[--toast-bar:var(--colors-green-400)] [--toast-icon:var(--icon-success)]",
      warning: "[--toast-bar:var(--colors-yellow-400)] [--toast-icon:var(--icon-warning)]",
      error: "[--toast-bar:var(--colors-red-400)] [--toast-icon:var(--icon-error)]",
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
          className="fixed inset-x-4 bottom-4 z-60 flex flex-col items-end gap-3 outline-hidden sm:inset-x-auto sm:end-6 sm:bottom-6 sm:w-121 pointer-events-none [&>*]:pointer-events-auto"
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
        <ToastPrimitive.Content className="flex items-start gap-4 py-notification-toast-v-padding pe-4 ps-[calc(var(--spacing-notification-toast-desktop-h-padding)+0.5rem)]">
          <HugeiconsIcon icon={ICONS[type]} aria-hidden className="mt-0.5 size-6 shrink-0 text-(--toast-icon)" />
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <ToastPrimitive.Title className="m-0 text-md font-semibold text-text-display" />
            <ToastPrimitive.Description className="m-0 text-sm text-text-primary-paragraph" />
            <ToastPrimitive.Action className="mt-2 inline-flex h-8 w-fit cursor-pointer items-center rounded-sm border border-button-border-neutral bg-button-background-neutral-default px-3 text-sm font-medium text-text-default transition-colors hover:bg-button-background-neutral-pressed focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-1 focus-visible:outline-border-black motion-reduce:transition-none" />
          </div>
          <ToastPrimitive.Close aria-label={closeLabel} className="-me-1 inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-sm border-0 bg-transparent text-icon-default transition-colors hover:bg-button-background-neutral-hovered active:bg-button-background-neutral-pressed focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-1 focus-visible:outline-border-black [&_svg]:size-5 motion-reduce:transition-none">
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
