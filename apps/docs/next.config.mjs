import { fileURLToPath } from "node:url";
import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  // The docs import generated CSS from ../../registry, so Turbopack needs the repo root.
  turbopack: { root: fileURLToPath(new URL("../..", import.meta.url)) },
  outputFileTracingRoot: fileURLToPath(new URL("../..", import.meta.url)),
  // Every docs page as Markdown: /docs/components/button.md, /docs/index.md.
  async rewrites() {
    return [{ source: "/docs/:path*.md", destination: "/llms.mdx/:path*" }];
  },
};

export default withMDX(config);
