"use client";

import { cn } from "cn";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { localeName, locales, switchLocalePath } from "@/lib/i18n";
import { useLocale, useT } from "@/lib/locale-context";

/**
 * EN | العربية. Each side is a link to the same page in that language, so it works without
 * JavaScript and search engines can follow it. The current language is marked with aria-current.
 */
export function LocaleSwitch() {
  const pathname = usePathname();
  const { lang } = useLocale();
  const t = useT();
  return (
    <nav
      aria-label={t("locale.label")}
      className="me-1 inline-flex rounded-sm bg-background-neutral-100 p-0.5"
    >
      {locales.map((locale) => {
        const current = locale === lang;
        return (
          <NextLink
            key={locale}
            href={switchLocalePath(pathname, locale)}
            hrefLang={locale}
            lang={locale}
            aria-current={current ? "true" : undefined}
            className={cn(
              "inline-flex min-h-8 items-center rounded-xs px-2.5 text-[0.8125rem] font-medium",
              current
                ? "bg-background-card text-text-default shadow-xs"
                : "text-text-primary-paragraph hover:text-text-default",
            )}
          >
            {locale === "en" ? "EN" : localeName[locale]}
          </NextLink>
        );
      })}
    </nav>
  );
}
