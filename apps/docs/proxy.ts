import { createI18nMiddleware } from "fumadocs-core/i18n/middleware";
import { isMarkdownPreferred } from "fumadocs-core/negotiation";
import { type NextFetchEvent, type NextRequest, NextResponse } from "next/server";
import { discoveryLink, localeOf, markdownAlternateLink, markdownRoutePath } from "@/lib/discovery";
import { i18n, isLocale, LANG_HEADER, LOCALE_COOKIE } from "@/lib/i18n";

const fumadocs = createI18nMiddleware(i18n);

/**
 * A URL without a locale (/, /docs/installation) goes to /en or /ar: first the language the
 * visitor chose with the switcher (the `dga_locale` cookie), then Accept-Language, then English.
 * Old links keep working because they are redirected, not removed. The bare
 * /manifest.webmanifest is routed the same way (the matcher below lets it through).
 */
export default async function proxy(request: NextRequest, event: NextFetchEvent) {
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

  // A docs page asked for with `Accept: text/markdown` answers with its Markdown twin.
  const route = markdownRoutePath(pathname);
  if (route && isMarkdownPreferred(request)) {
    const url = request.nextUrl.clone();
    url.pathname = route;
    const response = NextResponse.rewrite(url);
    stamp(response, pathname);
    return response;
  }

  const response = (await fumadocs(request, event)) ?? NextResponse.next();
  stamp(response, pathname);
  return response;
}

/**
 * Discovery for an agent that never parses HTML: the Link header names the index, the sitemap
 * and the skills, and a docs page also names its Markdown twin (and varies on Accept).
 */
function stamp(response: Response, pathname: string) {
  // The language of the URL, for app/global-not-found.tsx: Next renders it outside the layouts
  // and it reads this header to answer /ar/nope in Arabic.
  const lang = localeOf(pathname);
  if (lang) response.headers.set(LANG_HEADER, lang);
  response.headers.append("Link", discoveryLink(localeOf(pathname)));
  const alternate = markdownAlternateLink(pathname);
  if (alternate) {
    response.headers.append("Link", alternate);
    response.headers.set("Vary", "Accept");
  }
}

export const config = {
  // Not the registry (/r), preview frames, OG images, the search index, API routes, or any
  // file (icons, sitemaps, llms.txt, .md exports). The one file that is let through is the bare
  // manifest, which redirects to the manifest of the visitor's language.
  matcher: ["/((?!_next|r/|preview|og/|search-index|api|.*\\..*).*)", "/manifest.webmanifest"],
};
