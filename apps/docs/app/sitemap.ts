import type { MetadataRoute } from "next";
import { i18n, type Locale, locales } from "@/lib/i18n";
import { siteUrl } from "@/lib/shared";
import { source } from "@/lib/source";

// One sitemap per language (/sitemap/en.xml, /sitemap/ar.xml). Every URL lists its
// translations as alternates, which is what search engines use for hreflang.
export function generateSitemaps() {
  return i18n.languages.map((id) => ({ id }));
}

const hasOwnPage = (path: string, locale: Locale) => locale === "en" || /\.ar\.mdx$/.test(path);

export default async function sitemap(props: {
  id: Promise<string>;
}): Promise<MetadataRoute.Sitemap> {
  const lang = (await props.id) as Locale;
  const alternatesFor = (path: string) => ({
    languages: {
      ...Object.fromEntries(locales.map((l) => [l, `${siteUrl}/${l}${path}`])),
      "x-default": `${siteUrl}/${i18n.defaultLanguage}${path}`,
    },
  });
  return [
    {
      url: `${siteUrl}/${lang}`,
      changeFrequency: "weekly",
      priority: 1,
      alternates: alternatesFor(""),
    },
    {
      url: `${siteUrl}/${lang}/changelog`,
      changeFrequency: "weekly",
      priority: 0.6,
      alternates: alternatesFor("/changelog"),
    },
    // For agents: both indexes (every language) and the agent skills.
    ...locales.map((l) => ({
      url: `${siteUrl}/${l}/llms.txt`,
      changeFrequency: "weekly" as const,
      priority: 0.5,
    })),
    {
      url: `${siteUrl}/.well-known/agent-skills/index.json`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
    ...source.getPages(lang).map((page) => {
      const path = page.url.replace(/^\/[a-z]{2}/, "");
      const translated = locales.filter((l) => {
        const other = source.getPage(page.slugs, l);
        return other && hasOwnPage(other.path, l);
      });
      const languages = {
        ...Object.fromEntries(translated.map((l) => [l, `${siteUrl}/${l}${path}`])),
        "x-default": `${siteUrl}/${i18n.defaultLanguage}${path}`,
      };
      return {
        url: `${siteUrl}${page.url}`,
        changeFrequency: "weekly" as const,
        priority: path === "/docs" ? 0.9 : 0.8,
        alternates: { languages },
      };
    }),
  ];
}
