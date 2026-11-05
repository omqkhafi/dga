"use client";

import { cn } from "cn";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { useLocale, useT } from "@/lib/locale-context";

/** The three top tabs, with the active locale in each URL. */
export function useTabs() {
  const { lang } = useLocale();
  const t = useT();
  const home = `/${lang}`;
  return [
    { href: home, label: t("tab.home"), match: (p: string) => p === home },
    {
      href: `${home}/docs`,
      label: t("tab.docs"),
      match: (p: string) => p.startsWith(`${home}/docs`),
    },
    {
      href: `${home}/changelog`,
      label: t("tab.changelog"),
      match: (p: string) => p.startsWith(`${home}/changelog`),
    },
  ];
}

export function Tabs() {
  const pathname = usePathname();
  const tabs = useTabs();
  const t = useT();
  return (
    <nav aria-label={t("nav.main")} className="hidden h-full items-stretch gap-1 md:flex">
      {tabs.map((tab) => {
        const active = tab.match(pathname);
        return (
          <NextLink
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative flex items-center whitespace-nowrap px-3 text-[0.8125rem] font-medium tracking-wider",
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
