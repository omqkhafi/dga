"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { LOCALE_COOKIE, type Locale, localeName, locales, switchLocalePath } from "@/lib/i18n";
import { useLocale, useT } from "@/lib/locale-context";
import { Button } from "@/registry/bases/base/ui/button";

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
  const href = switchLocalePath(pathname, target);
  const label = `${t("locale.label")}: ${localeName[target]}`;
  if (variant === "icon") {
    // The small mobile control is the registry Button, rendered as a link.
    return (
      <Button
        variant="transparent"
        size="md"
        nativeButton={false}
        aria-label={label}
        render={
          <NextLink
            href={href}
            hrefLang={target}
            lang={target}
            onClick={() => rememberLocale(target)}
          />
        }
      >
        {localeName[target]}
      </Button>
    );
  }
  return (
    <NextLink
      href={href}
      hrefLang={target}
      lang={target}
      aria-label={label}
      onClick={() => rememberLocale(target)}
      className="flex h-full shrink-0 items-center justify-center border-s border-border-neutral-secondary px-4 text-[0.8125rem] font-medium whitespace-nowrap text-text-secondary-paragraph transition-colors duration-150 hover:bg-background-neutral-50 hover:text-text-default motion-reduce:transition-none"
    >
      {localeName[target]}
    </NextLink>
  );
}
