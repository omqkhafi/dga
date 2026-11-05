"use client";

import { cn } from "cn";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

export const TABS = [
  { href: "/", label: "README", match: (p: string) => p === "/" },
  { href: "/docs", label: "DOCS", match: (p: string) => p.startsWith("/docs") },
  { href: "/changelog", label: "CHANGELOG", match: (p: string) => p.startsWith("/changelog") },
];

export function Tabs() {
  const pathname = usePathname();
  return (
    <nav aria-label="Main" className="hidden h-full flex-1 md:flex">
      {TABS.map((tab) => {
        const active = tab.match(pathname);
        return (
          <NextLink
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex flex-1 items-center justify-center border-e border-border-neutral-secondary text-[0.8125rem] font-medium tracking-widest transition-colors",
              "focus-visible:-outline-offset-2",
              active
                ? "text-text-default shadow-[inset_0_-2px_0_var(--border-primary)]"
                : "text-text-secondary-paragraph hover:bg-button-background-neutral-default hover:text-text-default active:bg-button-background-neutral-pressed",
            )}
          >
            {tab.label}
          </NextLink>
        );
      })}
    </nav>
  );
}
