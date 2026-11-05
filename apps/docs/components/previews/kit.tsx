import { cn } from "cn";
import type { ReactNode } from "react";

/** A labelled row of examples inside a component preview. */
export function Row({
  label,
  children,
  className,
}: {
  label?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      {label ? (
        <p className="text-[0.8125rem] font-medium text-text-secondary-paragraph">
          <bdi>{label}</bdi>
        </p>
      ) : null}
      <div className={cn("flex flex-wrap items-center gap-3", className)}>{children}</div>
    </div>
  );
}

/** Centres a demo that is a single trigger (a Dialog, Drawer or Menu button) in the preview. */
export function Center({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("flex min-h-40 items-center justify-center", className)}>{children}</div>
  );
}

export function Stack({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("flex flex-col gap-4", className)}>{children}</div>;
}

/** The brand fill that on-colour variants are designed for. */
export function OnColorSurface({
  children,
  tone = "primary",
}: {
  children: ReactNode;
  tone?: "primary" | "nav";
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3 rounded-md p-4",
        tone === "primary" ? "bg-background-primary" : "bg-background-nav-header",
      )}
    >
      {children}
    </div>
  );
}
