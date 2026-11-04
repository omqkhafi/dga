import { Markdown } from "fumadocs-core/content/md";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { Metadata } from "next";
import { getReleases, latestVersion } from "@/lib/changelog";
import { githubUrl } from "@/lib/shared";
import { Badge } from "@/registry/bases/base/ui/badge";
import { Divider } from "@/registry/bases/base/ui/divider";
import { Link } from "@/registry/bases/base/ui/link";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Every DGA UI release, newest first. Generated from CHANGELOG.md.",
  openGraph: { images: [{ url: "/og/home/image.png", width: 1200, height: 630 }] },
};

export default function ChangelogPage() {
  const releases = getReleases();
  const latest = latestVersion();
  return (
    <div className="flex flex-1 flex-col md:flex-row">
      <aside className="border-b border-border-neutral-secondary bg-background-white px-6 py-10 md:sticky md:top-12 md:flex md:h-[calc(100dvh-3rem)] md:w-100 md:shrink-0 md:flex-col md:justify-center md:border-e md:border-b-0 md:px-10">
        <p className="text-xs font-semibold tracking-widest text-text-secondary-paragraph uppercase">
          Changelog
        </p>
        <h1 className="mt-3 text-display-sm font-bold text-text-display">
          Every release, newest first
        </h1>
        <p className="mt-4 text-md text-text-primary-paragraph">
          Written down before it ships. This page is generated from <code>CHANGELOG.md</code> in the
          repository and follows Keep a Changelog and Semantic Versioning.
        </p>
        <dl className="mt-8 flex flex-col">
          <div className="flex items-center justify-between py-2">
            <dt className="text-xs font-semibold tracking-widest text-text-secondary-paragraph uppercase">
              Latest
            </dt>
            <dd>
              <Badge variant={latest ? "success" : "neutral"} rounded>
                {latest ? `v${latest}` : "Unreleased"}
              </Badge>
            </dd>
          </div>
          <Divider />
          <div className="flex items-center justify-between py-2">
            <dt className="text-xs font-semibold tracking-widest text-text-secondary-paragraph uppercase">
              Source
            </dt>
            <dd>
              <Link size="sm" external href={`${githubUrl}/blob/main/CHANGELOG.md`}>
                CHANGELOG.md
              </Link>
            </dd>
          </div>
        </dl>
      </aside>
      <main id="main" className="min-w-0 flex-1 px-6 py-10 md:px-12">
        <div className="mx-auto max-w-3xl">
          <h2 className="flex items-center gap-4 text-sm font-semibold tracking-widest text-text-default uppercase">
            Releases
            <span aria-hidden className="h-px flex-1 bg-border-neutral-secondary" />
          </h2>
          <ol className="mt-6 flex flex-col">
            {releases.map((release) => (
              <li
                key={release.slug}
                id={release.slug}
                className="scroll-mt-16 border-b border-dashed border-border-neutral-secondary py-10 last:border-b-0"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="text-display-xs font-semibold text-text-display">
                    <a href={`#${release.slug}`} className="hover:underline">
                      {release.version === "Unreleased" ? "Unreleased" : release.version}
                    </a>
                  </h3>
                  <span className="text-sm text-text-secondary-paragraph tabular-nums">
                    {release.date ?? "Not released yet"}
                  </span>
                </div>
                <div className="prose mt-4 max-w-none">
                  <Markdown components={defaultMdxComponents}>{release.body}</Markdown>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </main>
    </div>
  );
}
