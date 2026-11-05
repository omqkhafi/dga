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
    <nav aria-label="Main" className="hidden h-full items-stretch gap-1 md:flex">
      {TABS.map((tab) => {
        const active = tab.match(pathname);
        return (
          <NextLink
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative flex items-center px-3 text-[0.8125rem] font-medium tracking-wider",
              "focus-visible:-outline-offset-2",
              "after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:rounded-full after:bg-border-primary after:transition-opacity after:duration-150",
              active
                ? "text-text-default after:opacity-100"
                : "text-text-secondary-paragraph after:opacity-0 hover:text-text-default hover:after:bg-border-neutral-primary hover:after:opacity-100 active:text-text-default",
            )}
          >
            {tab.label}
          </NextLink>
        );
      })}
    </nav>
  );
}
