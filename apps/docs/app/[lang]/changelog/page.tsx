import { Markdown } from "fumadocs-core/content/md";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getReleases, latestVersion } from "@/lib/changelog";
import { getT } from "@/lib/dictionary";
import { isLocale, locales } from "@/lib/i18n";
import { githubUrl } from "@/lib/shared";
import { Badge } from "@/registry/bases/base/ui/badge";
import { Divider } from "@/registry/bases/base/ui/divider";
import { Link } from "@/registry/bases/base/ui/link";

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/changelog">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getT(lang);
  return {
    title: t("changelog.eyebrow"),
    description: t("changelog.meta"),
    openGraph: { images: [{ url: `/og/${lang}/home/image.png`, width: 1200, height: 630 }] },
    alternates: {
      canonical: `/${lang}/changelog`,
      languages: {
        ...Object.fromEntries(locales.map((l) => [l, `/${l}/changelog`])),
        "x-default": "/en/changelog",
      },
    },
  };
}

export default async function ChangelogPage({ params }: PageProps<"/[lang]/changelog">) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const t = getT(lang);
  const releases = getReleases().filter((r) => r.body.length > 0);
  const latest = latestVersion();
  return (
    <div className="flex flex-1 flex-col md:flex-row">
      <aside className="bg-background-white px-6 py-10 md:sticky md:top-14 md:flex md:h-[calc(100dvh-3.5rem)] md:w-100 md:shrink-0 md:flex-col md:justify-center md:px-10">
        <p className="t-eyebrow text-text-secondary-paragraph">{t("changelog.eyebrow")}</p>
        <h1 className="mt-3 t-h1 text-text-display">{t("changelog.title")}</h1>
        <p className="mt-4 text-md text-text-primary-paragraph">{t("changelog.intro")}</p>
        <dl className="mt-8 flex flex-col">
          <div className="flex items-center justify-between py-2">
            <dt className="t-eyebrow text-text-secondary-paragraph">{t("changelog.latest")}</dt>
            <dd>
              <Badge variant={latest ? "success" : "neutral"} rounded>
                {latest ? `v${latest}` : t("release.unreleased")}
              </Badge>
            </dd>
          </div>
          <Divider />
          <div className="flex items-center justify-between py-2">
            <dt className="t-eyebrow text-text-secondary-paragraph">{t("changelog.source")}</dt>
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
            {t("changelog.releases")}
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
                      {release.version === "Unreleased" ? t("release.unreleased") : release.version}
                    </a>
                  </h3>
                  <span className="text-sm text-text-secondary-paragraph tabular-nums">
                    {release.date ?? "–"}
                  </span>
                </div>
                <div className="prose mt-4 max-w-none" dir="ltr" lang="en">
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

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}
