import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { cn } from "cn";
import type { ComponentProps } from "react";

/**
 * The one icon style in the docs shell: Hugeicons stroke, 1.5 weight, 18px. Pass `className`
 * only for colour or flipping (`rtl:-scale-x-100`), never for size.
 */
export function Icon({
  icon,
  className,
  ...props
}: { icon: IconSvgElement } & Omit<ComponentProps<"svg">, "ref" | "strokeWidth">) {
  return (
    <HugeiconsIcon
      icon={icon}
      size={18}
      strokeWidth={1.5}
      aria-hidden
      className={cn("size-[18px] shrink-0", className)}
      {...props}
    />
  );
}
