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

/**
 * The three tabs share the width that is left of the lockup pane, like the other omqkhafi docs
 * sites: equal cells, a border on the end side of each, and a 2px bar under the current one.
 */
export function Tabs() {
  const pathname = usePathname();
  const tabs = useTabs();
  const t = useT();
  return (
    <nav aria-label={t("nav.main")} className="flex min-w-0 flex-1 items-stretch">
      {tabs.map((tab) => {
        const active = tab.match(pathname);
        return (
          <NextLink
            key={tab.href}
            href={tab.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "group/tab relative flex flex-1 items-center justify-center border-e border-border-neutral-secondary px-2 xl:px-4",
              "text-[0.8125rem] font-medium tracking-wider whitespace-nowrap uppercase transition-colors duration-150 motion-reduce:transition-none",
              "focus-visible:-outline-offset-2",
              active
                ? "text-text-default"
                : "text-text-secondary-paragraph hover:bg-background-neutral-50 hover:text-text-default",
            )}
          >
            {tab.label}
            {active ? (
              <span aria-hidden className="absolute inset-x-0 -bottom-px h-0.5 bg-border-primary" />
            ) : null}
          </NextLink>
        );
      })}
    </nav>
  );
}
