"use client";

import { cn } from "cn";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_COOKIE, type Locale, localeName, locales, switchLocalePath } from "@/lib/i18n";
import { useLocale, useT } from "@/lib/locale-context";

/** Remember the choice for a year, so `/` and old links open in this language next time. */
function rememberLocale(locale: Locale) {
  // biome-ignore lint/suspicious/noDocumentCookie: one small cookie, and the Cookie Store API is not in every browser yet
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; SameSite=Lax`;
}

/**
 * A link to the same page in the other language, named in that language ("العربية" on the
 * English site, "English" on the Arabic one). It is a real link, so it works without JavaScript
 * and search engines can follow it; clicking it also writes the `dga_locale` cookie.
 */
export function LocaleSwitch({ variant = "icon" }: { variant?: "cell" | "icon" }) {
  const pathname = usePathname();
  const { lang } = useLocale();
  const t = useT();
  const target = locales.find((l) => l !== lang) ?? lang;
  return (
    <NextLink
      href={switchLocalePath(pathname, target)}
      hrefLang={target}
      lang={target}
      aria-label={`${t("locale.label")}: ${localeName[target]}`}
      onClick={() => rememberLocale(target)}
      className={cn(
        "flex shrink-0 items-center justify-center text-[0.8125rem] font-medium whitespace-nowrap text-text-secondary-paragraph transition-colors duration-150 hover:text-text-default motion-reduce:transition-none",
        variant === "cell"
          ? "h-full border-s border-border-neutral-secondary px-4 hover:bg-background-neutral-50"
          : "h-8 rounded-sm px-2",
      )}
    >
      {localeName[target]}
    </NextLink>
  );
}
