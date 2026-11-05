import { createI18nMiddleware } from "fumadocs-core/i18n/middleware";
import { type NextFetchEvent, type NextRequest, NextResponse } from "next/server";
import { i18n, isLocale, LOCALE_COOKIE } from "@/lib/i18n";

const fumadocs = createI18nMiddleware(i18n);

/**
 * A URL without a locale (/, /docs/installation) goes to /en or /ar: first the language the
 * visitor chose with the switcher (the `dga_locale` cookie), then Accept-Language, then English.
 * Old links keep working because they are redirected, not removed.
 */
export default function proxy(request: NextRequest, event: NextFetchEvent) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];
  if (!isLocale(first)) {
    const saved = request.cookies.get(LOCALE_COOKIE)?.value;
    if (isLocale(saved)) {
      const url = request.nextUrl.clone();
      url.pathname = `/${saved}${pathname === "/" ? "" : pathname}`;
      return NextResponse.redirect(url);
    }
  }
  return fumadocs(request, event);
}

export const config = {
  // Not the registry (/r), preview frames, OG images, the search index, API routes, or any
  // file (icons, sitemaps, llms.txt, .md exports).
  matcher: ["/((?!_next|r/|preview|og/|search-index|api|.*\\..*).*)"],
};
