import { fileURLToPath } from "node:url";
import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // A branded 404 for URLs that match no route (there are several root layouts).
  experimental: { globalNotFound: true },
  // The docs import generated CSS from ../../registry, so Turbopack needs the repo root.
  turbopack: { root: fileURLToPath(new URL("../..", import.meta.url)) },
  outputFileTracingRoot: fileURLToPath(new URL("../..", import.meta.url)),
  // Every docs page as Markdown, per language: /en/docs/components/button.md, /ar/docs/index.md.
  async rewrites() {
    return [
      { source: "/:lang(en|ar)/docs/:path*.md", destination: "/:lang/llms.mdx/:path*" },
      // Links from before the locales existed: /docs/components/button.md is English.
      { source: "/docs/:path*.md", destination: "/en/llms.mdx/:path*" },
    ];
  },
};

export default withMDX(config);
