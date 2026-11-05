import type { MetadataRoute } from "next";
import { i18n } from "@/lib/i18n";
import { siteUrl } from "@/lib/shared";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/preview/", "/api/"] }],
    sitemap: i18n.languages.map((lang) => `${siteUrl}/sitemap/${lang}.xml`),
    host: siteUrl,
  };
}
