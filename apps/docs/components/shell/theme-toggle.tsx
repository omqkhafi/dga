"use client";

import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons";
import { cn } from "cn";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useT } from "@/lib/locale-context";
import { Icon } from "./icon";

/** `cell` is the full-height square in the desktop header; `icon` is the small mobile button. */
export function ThemeToggle({ variant = "icon" }: { variant?: "cell" | "icon" }) {
  const t = useT();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === "dark";
  return (
    <button
      type="button"
      aria-label={dark ? t("theme.toLight") : t("theme.toDark")}
      onClick={() => setTheme(dark ? "light" : "dark")}
      className={cn(
        "flex shrink-0 items-center justify-center text-text-secondary-paragraph transition-colors duration-150 hover:text-text-default motion-reduce:transition-none",
        variant === "cell"
          ? "aspect-square h-full hover:bg-background-neutral-50"
          : "size-8 rounded-sm",
      )}
    >
      <Icon icon={dark ? Sun03Icon : Moon02Icon} />
    </button>
  );
}
