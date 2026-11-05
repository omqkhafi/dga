"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { Cancel01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import { cn } from "@/registry/bases/base/lib/utils";

const dialogVariants = cva("relative flex max-h-[calc(100dvh-2rem)] w-full flex-col gap-modal-gap overflow-y-auto rounded-md bg-background-white p-modal-padding text-text-default shadow-3xl outline-hidden transition-[opacity,scale] duration-200 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 motion-reduce:transition-none", {
  variants: {
    size: { sm: "max-w-100", md: "max-w-150", lg: "max-w-200" },
  },
  defaultVariants: { size: "md" },
});

/**
 * A window over the page for a decision or a short task (DGA: Modal). Compose it from
 * DialogTrigger and DialogContent. Focus moves into the window and stays there, the page behind
 * it is inert, Escape closes it, and focus returns to the trigger.
 */
function Dialog(props: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root {...props} />;
}

/** The button that opens the dialog. */
function DialogTrigger({ className, ...props }: DialogPrimitive.Trigger.Props) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" className={className} {...props} />;
}

type DialogContentProps = DialogPrimitive.Popup.Props &
  VariantProps<typeof dialogVariants> & {
    /** Shows the close button in the corner. Turn it off when the footer has its own. */
    showCloseButton?: boolean;
    /** Accessible name of the close button. Translate it on Arabic pages. */
    closeLabel?: string;
  };

/** The window: a dimmed backdrop and the card. It is centred and scrolls when it is too tall. */
function DialogContent({
  className,
  children,
  size,
  showCloseButton = true,
  closeLabel = "Close",
  ...props
}: DialogContentProps) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop data-slot="dialog-backdrop" className="fixed inset-0 z-50 bg-alpha-black-50 transition-opacity duration-200 data-ending-style:opacity-0 data-starting-style:opacity-0 motion-reduce:transition-none" />
      <DialogPrimitive.Viewport data-slot="dialog-viewport" className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
        <DialogPrimitive.Popup
          data-slot="dialog-content"
          className={cn(dialogVariants({ size }), className)}
          {...props}
        >
          {children}
          {showCloseButton ? (
            <DialogPrimitive.Close
              data-slot="dialog-close-icon"
              aria-label={closeLabel}
              className="absolute end-4 top-4 inline-flex size-8 cursor-pointer items-center justify-center rounded-sm text-icon-default transition-colors hover:bg-button-background-neutral-hovered active:bg-button-background-neutral-pressed focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-1 focus-visible:outline-border-black [&_svg]:size-5 motion-reduce:transition-none"
            >
              <HugeiconsIcon icon={Cancel01Icon} aria-hidden />
            </DialogPrimitive.Close>
          ) : null}
        </DialogPrimitive.Popup>
      </DialogPrimitive.Viewport>
    </DialogPrimitive.Portal>
  );
}

/** Groups the title and description at the top of the window. */
function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="dialog-header" className={cn("flex flex-col gap-modal-gap pe-10", className)} {...props} />;
}

/** The name of the dialog. Screen readers announce it when the dialog opens. */
function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("m-0 text-lg font-semibold text-text-display", className)}
      {...props}
    />
  );
}

/** Explains the dialog. Linked to the dialog with `aria-describedby`. */
function DialogDescription({ className, ...props }: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("m-0 text-md text-text-primary-paragraph", className)}
      {...props}
    />
  );
}

/** The scrollable middle of a tall dialog. */
function DialogBody({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="dialog-body" className={cn("flex flex-col gap-4", className)} {...props} />;
}

/** The actions, aligned to the end. Put the main action last. */
function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="dialog-footer" className={cn("flex flex-col-reverse gap-3 pt-modal-content-bottom-padding sm:flex-row sm:flex-wrap sm:justify-end", className)} {...props} />;
}

/** Closes the dialog. Render a Button with it: `<DialogClose render={<Button />}>`. */
function DialogClose({ className, ...props }: DialogPrimitive.Close.Props) {
  return <DialogPrimitive.Close data-slot="dialog-close" className={className} {...props} />;
}

export type { DialogContentProps };
export {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  dialogVariants,
};
