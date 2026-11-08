"use client";

import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import * as React from "react";
import { Button } from "@/components/dga/button";
import { dialogVariants } from "@/components/dga/dialog";
import { cn } from "@/registry/bases/base/lib/utils";

/** The cancel button registers itself here, so the dialog can put focus on it first. */
const CancelContext = React.createContext<React.RefObject<HTMLElement | null> | null>(null);

/**
 * A dialog that interrupts to confirm an action that is hard to undo (Platform Code extension,
 * not part of DGA). It is the DGA Dialog (Modal) with the alert dialog behaviour: `role`
 * `alertdialog`, focus starts on the cancel button, and clicking outside does not close it, so
 * people must choose. Escape still cancels. For anything with a form or longer content, use a
 * Dialog.
 */
function AlertDialog(props: AlertDialogPrimitive.Root.Props) {
  return <AlertDialogPrimitive.Root {...props} />;
}

/** The button that opens the dialog. */
function AlertDialogTrigger({ className, ...props }: AlertDialogPrimitive.Trigger.Props) {
  return (
    <AlertDialogPrimitive.Trigger
      data-slot="alert-dialog-trigger"
      className={className}
      {...props}
    />
  );
}

type AlertDialogContentProps = AlertDialogPrimitive.Popup.Props & {
  /** Width: `sm` 400px (default), `md` 600px. */
  size?: "sm" | "md";
};

/** The window: a dimmed backdrop and the card, 400px wide by default. */
function AlertDialogContent({
  className,
  children,
  size = "sm",
  initialFocus,
  ...props
}: AlertDialogContentProps) {
  const cancelRef = React.useRef<HTMLElement | null>(null);
  return (
    <AlertDialogPrimitive.Portal>
      <AlertDialogPrimitive.Backdrop
        data-slot="alert-dialog-backdrop"
        className="cn-dialog-backdrop"
      />
      <AlertDialogPrimitive.Viewport
        data-slot="alert-dialog-viewport"
        className="cn-dialog-viewport"
      >
        <AlertDialogPrimitive.Popup
          data-slot="alert-dialog-content"
          initialFocus={initialFocus ?? (() => cancelRef.current ?? true)}
          className={cn(dialogVariants({ size }), className)}
          {...props}
        >
          <CancelContext.Provider value={cancelRef}>{children}</CancelContext.Provider>
        </AlertDialogPrimitive.Popup>
      </AlertDialogPrimitive.Viewport>
    </AlertDialogPrimitive.Portal>
  );
}

/** Groups the title and description at the top of the window. */
function AlertDialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn("cn-alert-dialog-header", className)}
      {...props}
    />
  );
}

/** The question or statement. Screen readers announce it when the dialog opens. */
function AlertDialogTitle({ className, ...props }: AlertDialogPrimitive.Title.Props) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn("cn-dialog-title", className)}
      {...props}
    />
  );
}

/** Says what will happen. Screen readers read it with the title. */
function AlertDialogDescription({ className, ...props }: AlertDialogPrimitive.Description.Props) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn("cn-dialog-description", className)}
      {...props}
    />
  );
}

/** The actions, aligned to the end. Put the main action last. */
function AlertDialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="alert-dialog-footer" className={cn("cn-dialog-footer", className)} {...props} />
  );
}

type AlertDialogActionProps = AlertDialogPrimitive.Close.Props & {
  /** Uses the destructive Button, for an action that deletes or withdraws something. */
  destructive?: boolean;
};

/** Confirms the action and closes the dialog. Run your code in `onClick`. */
function AlertDialogAction({ className, destructive = false, ...props }: AlertDialogActionProps) {
  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-action"
      render={<Button destructive={destructive} />}
      className={className}
      {...props}
    />
  );
}

/** Cancels and closes the dialog. Focus starts here when the dialog opens. */
function AlertDialogCancel({ className, ...props }: AlertDialogPrimitive.Close.Props) {
  const cancelRef = React.useContext(CancelContext);
  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-cancel"
      ref={(node) => {
        if (cancelRef) cancelRef.current = node;
      }}
      render={<Button variant="outline" />}
      className={className}
      {...props}
    />
  );
}

export type { AlertDialogActionProps, AlertDialogContentProps };
export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
};
