import { createI18nMiddleware } from "fumadocs-core/i18n/middleware";
import { i18n } from "@/lib/i18n";

// A URL without a locale (/, /docs/installation) goes to /en or /ar, from Accept-Language and
// then English. Old links keep working because they are redirected, not removed.
export default createI18nMiddleware(i18n);

export const config = {
  // Not the registry (/r), preview frames, OG images, the search index, API routes, or any
  // file (icons, sitemaps, llms.txt, .md exports).
  matcher: ["/((?!_next|r/|preview|og/|search-index|api|.*\\..*).*)"],
};
