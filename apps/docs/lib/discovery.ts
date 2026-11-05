/**
 * HTTP `Link` headers that advertise the docs to an agent that never parses HTML. Relations
 * follow the IANA link registry, plus `agent-skills` from the Agent Skills discovery draft.
 * No imports from the app, so unit tests can load it.
 */

export type DiscoveryLocale = "en" | "ar";

const LOCALES = ["en", "ar"];

/** The locale a pathname starts with, if any. */
export function localeOf(pathname: string): DiscoveryLocale | undefined {
  const first = pathname.split("/")[1];
  return LOCALES.includes(first ?? "") ? (first as DiscoveryLocale) : undefined;
}

/** Site-wide links, as one RFC 8288 field value. The index is the page's own locale's llms.txt. */
export function discoveryLink(locale: DiscoveryLocale = "en"): string {
  return [
    `</${locale}/llms.txt>; rel="describedby"; type="text/plain"; title="Site index for LLMs"`,
    `</sitemap.xml>; rel="sitemap"; type="application/xml"`,
    `</.well-known/agent-skills/index.json>; rel="agent-skills"; type="application/json"`,
  ].join(", ");
}

/**
 * Public Markdown twin of a docs HTML path: `/en/docs/installation` → `/en/docs/installation.md`,
 * `/ar/docs` → `/ar/docs/index.md`. Undefined for anything that is not a docs page.
 */
export function markdownTwinPath(pathname: string): string | undefined {
  const path = pathname.length > 1 && pathname.endsWith("/") ? pathname.slice(0, -1) : pathname;
  const locale = localeOf(path);
  if (!locale) return undefined;
  const rest = path.slice(locale.length + 1);
  if (rest === "/docs") return `/${locale}/docs/index.md`;
  if (rest.startsWith("/docs/") && !rest.endsWith(".md")) return `${path}.md`;
  return undefined;
}

/** The internal route behind a twin: `/en/docs/installation` → `/en/llms.mdx/installation`. */
export function markdownRoutePath(pathname: string): string | undefined {
  const twin = markdownTwinPath(pathname);
  if (!twin) return undefined;
  const locale = localeOf(twin) as DiscoveryLocale;
  const slug = twin.slice(`/${locale}/docs/`.length, -".md".length);
  return `/${locale}/llms.mdx/${slug}`;
}

/** `alternate` link for one docs path. */
export function markdownAlternateLink(pathname: string): string | undefined {
  const twin = markdownTwinPath(pathname);
  return twin ? `<${twin}>; rel="alternate"; type="text/markdown"` : undefined;
}
