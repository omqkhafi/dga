"use client";

import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useT } from "@/lib/locale-context";
import { Button } from "@/registry/bases/base/ui/button";
import { Icon } from "./icon";

export function ThemeToggle({ className }: { className?: string }) {
  const t = useT();
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === "dark";
  return (
    <Button
      variant="subtle"
      iconOnly
      className={className}
      aria-label={dark ? t("theme.toLight") : t("theme.toDark")}
      onClick={() => setTheme(dark ? "light" : "dark")}
    >
      <Icon icon={dark ? Sun03Icon : Moon02Icon} />
    </Button>
  );
}
