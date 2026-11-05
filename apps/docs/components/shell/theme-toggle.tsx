"use client";

import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons";
import { cn } from "cn";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useT } from "@/lib/locale-context";
import { Button } from "@/registry/bases/base/ui/button";
import { Icon } from "./icon";

/** `cell` is the full-height square in the desktop header; `icon` is the small mobile button. */
export function ThemeToggle({ variant = "icon" }: { variant?: "cell" | "icon" }) {
  const t = useT();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === "dark";
  const label = dark ? t("theme.toLight") : t("theme.toDark");
  const toggle = () => setTheme(dark ? "light" : "dark");
  // The small mobile control is the registry Button; the desktop cell is the header's own pane.
  if (variant === "icon") {
    return (
      <Button variant="transparent" size="md" iconOnly aria-label={label} onClick={toggle}>
        <Icon icon={dark ? Sun03Icon : Moon02Icon} />
      </Button>
    );
  }
  return (
    <button
      type="button"
      aria-label={label}
      onClick={toggle}
      className={cn(
        "flex aspect-square h-full shrink-0 items-center justify-center text-text-secondary-paragraph transition-colors duration-150 hover:bg-background-neutral-50 hover:text-text-default motion-reduce:transition-none",
      )}
    >
      <Icon icon={dark ? Sun03Icon : Moon02Icon} />
    </button>
  );
}
