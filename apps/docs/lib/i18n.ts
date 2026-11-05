import { defineI18n } from "fumadocs-core/i18n";

/**
 * English and Arabic. Every URL carries its locale (/en/docs/..., /ar/docs/...); the proxy
 * sends a bare URL to the locale in Accept-Language, English if there is none.
 */
export const i18n = defineI18n({
  languages: ["en", "ar"],
  defaultLanguage: "en",
  hideLocale: "never",
  // button.mdx is English, button.ar.mdx is its Arabic translation.
  parser: "dot",
});

export type Locale = (typeof i18n.languages)[number];

export const locales = i18n.languages;
export const defaultLocale: Locale = i18n.defaultLanguage;

export const isLocale = (value: string | undefined): value is Locale =>
  locales.includes(value as Locale);

export const dirOf = (locale: Locale): "ltr" | "rtl" => (locale === "ar" ? "rtl" : "ltr");

/** The locale's name in its own language, for the switcher. */
export const localeName: Record<Locale, string> = { en: "English", ar: "العربية" };

/** Prefix a path with a locale: `/docs` → `/ar/docs`. */
export const localePath = (locale: Locale, path = "/") =>
  `/${locale}${path === "/" ? "" : path.startsWith("/") ? path : `/${path}`}`;

/** Swap the locale in a pathname: `/en/docs/x` → `/ar/docs/x`. */
export function switchLocalePath(pathname: string, to: Locale) {
  const [, first, ...rest] = pathname.split("/");
  return isLocale(first) ? `/${[to, ...rest].join("/")}` : localePath(to, pathname);
}
