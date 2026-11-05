import {
  Alert02Icon,
  AlertCircleIcon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";
import { cn } from "cn";
import type { ReactNode } from "react";
import { Icon } from "@/components/shell/icon";

type Kind = "note" | "info" | "warning" | "error" | "success";

// Full class names, so Tailwind can see them. The same tokens an Alert component will use:
// background-*-50, border-*-light, text-* and icon-*.
const KINDS: Record<Kind, { icon: IconSvgElement; box: string; title: string; icon_: string }> = {
  note: {
    icon: InformationCircleIcon,
    box: "border-border-neutral-secondary bg-background-neutral-50",
    title: "text-text-default",
    icon_: "text-icon-default-500",
  },
  info: {
    icon: InformationCircleIcon,
    box: "border-border-info-light bg-background-info-50",
    title: "text-text-info",
    icon_: "text-icon-info",
  },
  success: {
    icon: CheckmarkCircle02Icon,
    box: "border-border-success-light bg-background-success-50",
    title: "text-text-success",
    icon_: "text-icon-success",
  },
  warning: {
    icon: Alert02Icon,
    box: "border-border-warning-light bg-background-warning-50",
    title: "text-text-warning",
    icon_: "text-icon-warning",
  },
  error: {
    icon: AlertCircleIcon,
    box: "border-border-error-light bg-background-error-50",
    title: "text-text-error",
    icon_: "text-icon-error",
  },
};

const ALIASES: Record<string, Kind> = { warn: "warning", idea: "note" };

/** The one callout in the docs: a note or a warning, with a title. */
export function Callout({
  type = "note",
  title,
  children,
}: {
  type?: Kind | "warn" | "idea";
  title?: string;
  children?: ReactNode;
}) {
  const kind = KINDS[(ALIASES[type] ?? type) as Kind];
  return (
    <aside
      aria-label={title}
      className={cn("not-prose my-6 flex gap-3 rounded-md border p-4", kind.box)}
    >
      <Icon icon={kind.icon} className={cn("mt-0.5", kind.icon_)} />
      <div className="flex min-w-0 flex-col gap-1 text-sm text-text-primary-paragraph [&_a]:underline [&_a]:underline-offset-4 [&_code]:rounded-xs [&_code]:bg-background-neutral-100 [&_code]:px-1 [&_code]:font-mono [&_code]:text-[0.8125rem] [&_p]:m-0">
        {title ? <p className={cn("font-semibold", kind.title)}>{title}</p> : null}
        {children}
      </div>
    </aside>
  );
}
