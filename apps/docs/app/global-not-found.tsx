import type { Metadata } from "next";
import { headers } from "next/headers";
import { NotFoundView } from "@/components/shell/not-found-view";
import { getDictionary, getT } from "@/lib/dictionary";
import { ibmPlexSansArabic } from "@/lib/fonts";
import { dirOf, isLocale, LANG_HEADER, type Locale } from "@/lib/i18n";
import { LocaleProvider } from "@/lib/locale-context";
import "./global.css";

/**
 * The page for a URL that matches no route (/ar/nope, /ar/docs/nope). Next serves it outside the
 * layouts: the locale layout cannot render a not-found itself (a root layout on a dynamic
 * segment gets an empty error shell for notFound()), so this page sets its own <html lang dir>.
 * The proxy puts the language of the URL in the `x-dga-lang` request header; without one (a
 * path with no locale, /r/nope) the page is English.
 */
async function requestLocale(): Promise<Locale> {
  const lang = (await headers()).get(LANG_HEADER) ?? undefined;
  return isLocale(lang) ? lang : "en";
}

export async function generateMetadata(): Promise<Metadata> {
  const lang = await requestLocale();
  const t = getT(lang);
  return { title: `${t("nf.title")} | ${t("app.name")}`, robots: { index: false } };
}

// This page bypasses the layouts, so it sets the theme itself, before first paint.
const theme = `(() => { try { const t = localStorage.getItem("theme"); const dark = t === "dark" || ((!t || t === "system") && matchMedia("(prefers-color-scheme: dark)").matches); document.documentElement.classList.toggle("dark", dark); document.documentElement.style.colorScheme = dark ? "dark" : "light"; } catch {} })();`;

export default async function GlobalNotFound() {
  const lang = await requestLocale();
  return (
    <html
      lang={lang}
      dir={dirOf(lang)}
      className={ibmPlexSansArabic.variable}
      suppressHydrationWarning
    >
      <head>
        <script
          // biome-ignore lint/security/noDangerouslySetInnerHtml: a fixed string, no user input
          dangerouslySetInnerHTML={{ __html: theme }}
        />
      </head>
      <body className="flex min-h-screen flex-col bg-background-body text-text-default">
        <LocaleProvider lang={lang} dictionary={getDictionary(lang)}>
          <NotFoundView />
        </LocaleProvider>
      </body>
    </html>
  );
}
