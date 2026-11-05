import { fileURLToPath } from "node:url";
import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

// The same relations as lib/discovery.ts. The proxy sets the Link header on pages; these are the
// files the proxy matcher skips.
const link = (lang) =>
  [
    `</${lang}/llms.txt>; rel="describedby"; type="text/plain"; title="Site index for LLMs"`,
    `</sitemap.xml>; rel="sitemap"; type="application/xml"`,
    `</.well-known/agent-skills/index.json>; rel="agent-skills"; type="application/json"`,
  ].join(", ");

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // A branded 404 for URLs that match no route (there are several root layouts).
  experimental: { globalNotFound: true },
  // The docs import generated CSS from ../../registry, so Turbopack needs the repo root.
  turbopack: { root: fileURLToPath(new URL("../..", import.meta.url)) },
  outputFileTracingRoot: fileURLToPath(new URL("../..", import.meta.url)),
  async headers() {
    const file = "llms.txt|llms.json|llms-full.txt";
    return [
      { source: `/:file(${file})`, headers: [{ key: "Link", value: link("en") }] },
      ...["en", "ar"].map((lang) => ({
        source: `/${lang}/:file(${file})`,
        headers: [{ key: "Link", value: link(lang) }],
      })),
    ];
  },
  // Every docs page as Markdown, per language: /en/docs/components/button.md, /ar/docs/index.md.
  async rewrites() {
    return [
      { source: "/:lang(en|ar)/docs/:path*.md", destination: "/:lang/llms.mdx/:path*" },
      // Links from before the locales existed: /docs/components/button.md is English.
      { source: "/docs/:path*.md", destination: "/en/llms.mdx/:path*" },
      // The sitemap index (app/sitemap-index/route.ts) lists /sitemap/en.xml and /sitemap/ar.xml.
      { source: "/sitemap.xml", destination: "/sitemap-index" },
    ];
  },
};

export default withMDX(config);
