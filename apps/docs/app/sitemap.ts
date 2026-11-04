import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/shared";
import { source } from "@/lib/source";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${siteUrl}/changelog`, changeFrequency: "weekly", priority: 0.6 },
    ...source.getPages().map((page) => ({
      url: `${siteUrl}${page.url}`,
      changeFrequency: "weekly" as const,
      priority: page.url === "/docs" ? 0.9 : 0.8,
    })),
  ];
}
