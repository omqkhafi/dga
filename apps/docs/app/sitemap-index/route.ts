import { i18n } from "@/lib/i18n";
import { siteUrl } from "@/lib/shared";

export const revalidate = false;

/** The sitemap index, served at /sitemap.xml by a rewrite in next.config.mjs (one sitemap per language: see app/sitemap.ts). */
function sitemapIndex() {
  const entries = i18n.languages.map(
    (lang) => `  <sitemap><loc>${siteUrl}/sitemap/${lang}.xml</loc></sitemap>`,
  );
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.join("\n")}
</sitemapindex>
`;
}

export const GET = () =>
  new Response(sitemapIndex(), { headers: { "Content-Type": "application/xml; charset=utf-8" } });
