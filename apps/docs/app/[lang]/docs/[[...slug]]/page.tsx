import { ArrowLeft02Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createRelativeLink } from "fumadocs-ui/mdx";
import type { Metadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { Callout } from "@/components/docs/callout";
import { Thumb } from "@/components/docs/thumb";
import { localizedLink } from "@/components/localized-link";
import { getMDXComponents } from "@/components/mdx";
import { CopyPage } from "@/components/shell/copy-page";
import { InlineToc, Toc } from "@/components/shell/toc";
import { latestVersion } from "@/lib/changelog";
import { getT } from "@/lib/dictionary";
import api from "@/lib/generated/api.json";
import { isLocale, type Locale, locales } from "@/lib/i18n";
import { lastUpdated } from "@/lib/last-updated";
import { FIGMA_URL, orderedPages, RELATED } from "@/lib/nav";
import { gitConfig, siteUrl } from "@/lib/shared";
import { source } from "@/lib/source";
import { translationStatus } from "@/lib/translations";
import { Button } from "@/registry/bases/base/ui/button";
import { Divider } from "@/registry/bases/base/ui/divider";
import { Link } from "@/registry/bases/base/ui/link";
import type { Api } from "../../../../../../scripts/api-types";

const repo = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

/** Links under the title of a component page: Base UI docs, DGA Figma, source. */
function componentLinks(slug: string, t: ReturnType<typeof getT>) {
  const baseUi = (api as Api)[slug]?.find((part) => part.inherits)?.inherits;
  return [
    ...(baseUi ? [{ label: t("page.baseUi"), href: baseUi.url }] : []),
    { label: t("page.figma"), href: FIGMA_URL },
    {
      label: t("page.source"),
      href: `${repo}/blob/${gitConfig.branch}/registry/bases/base/ui/${slug}.tsx`,
    },
  ];
}

export default async function Page(props: PageProps<"/[lang]/docs/[[...slug]]">) {
  const params = await props.params;
  if (!isLocale(params.lang)) notFound();
  const lang: Locale = params.lang;
  const t = getT(lang);
  const page = source.getPage(params.slug, lang);
  if (!page) notFound();
  const MDX = page.data.body;
  const markdownUrl = `${page.url === `/${lang}/docs` ? `/${lang}/docs/index` : page.url}.md`;
  const translated = lang === "en" || /\.ar\.mdx$/.test(page.path);
  const status = lang === "ar" ? translationStatus(page.path) : null;
  const version = latestVersion();
  const updated = lastUpdated(page.path);
  const isComponent = page.slugs[0] === "components" && page.slugs.length === 2;
  const slug = page.slugs[1] ?? "";
  const links = isComponent ? componentLinks(slug, t) : [];
  const ordered = orderedPages(lang);
  const at = ordered.findIndex((p) => p.url === page.url);
  const previous = at > 0 ? ordered[at - 1] : undefined;
  const next = at >= 0 ? ordered[at + 1] : undefined;
  const related = (isComponent ? (RELATED[slug] ?? []) : [])
    .map((name) => source.getPage(["components", name], lang))
    .filter((p) => p !== undefined);

  return (
    <>
      <main id="main" className="min-w-0 flex-1 px-4 py-8 sm:px-8 md:py-10 lg:px-8">
        <article className="mx-auto max-w-3xl">
          {!translated ? (
            <Callout type="note" title={t("page.englishOnly")}>
              <NextLink href={`/en${page.url.replace(/^\/[a-z]{2}/, "")}`} hrefLang="en">
                {t("page.englishOnlyLink")}
              </NextLink>
            </Callout>
          ) : null}
          {status === "outdated" || status === "unrecorded" ? (
            <Callout type="warning" title={t("page.outdated")}>
              <NextLink href={`/en${page.url.replace(/^\/[a-z]{2}/, "")}`} hrefLang="en">
                {t("page.outdatedLink")}
              </NextLink>
            </Callout>
          ) : null}
          <header className="flex flex-col gap-6">
            <div className="flex items-start justify-between gap-6">
              <div className="flex min-w-0 flex-col gap-3">
                <h1 className="t-h1 text-text-display">{page.data.title}</h1>
                {page.data.description ? (
                  <p className="t-body max-w-xl text-text-primary-paragraph">
                    {page.data.description}
                  </p>
                ) : null}
              </div>
              {isComponent ? <Thumb slug={slug} lang={lang} /> : null}
            </div>
            <p className="-mt-3 text-[0.8125rem] text-text-secondary-paragraph">
              {version ? t("page.version", { version }) : t("release.unreleased")}
              {updated ? (
                <>
                  {" · "}
                  <time dateTime={updated}>
                    {t("page.updated", {
                      date: new Date(updated).toLocaleDateString(
                        lang === "ar" ? "ar-u-ca-gregory-nu-latn" : "en-GB",
                        { day: "numeric", month: "short", year: "numeric" },
                      ),
                    })}
                  </time>
                </>
              ) : null}
            </p>
            <div className="flex justify-end">
              <CopyPage markdownUrl={markdownUrl} />
            </div>
          </header>
          <Divider className="my-8" />
          <InlineToc toc={page.data.toc} />
          <div className="prose max-w-none">
            <MDX
              components={getMDXComponents(
                { a: localizedLink(createRelativeLink(source, page), lang) },
                lang,
              )}
            />
          </div>
          <Divider className="mt-12 mb-6" />
          <footer className="flex flex-col gap-6">
            {related.length > 0 ? (
              <nav aria-label={t("nav.related")} className="flex flex-col gap-2">
                <h2 className="text-sm font-semibold text-text-default">{t("nav.related")}</h2>
                <ul className="flex flex-wrap gap-2">
                  {related.map((p) => (
                    <li key={p.url}>
                      <Button
                        variant="outline"
                        size="sm"
                        nativeButton={false}
                        render={<NextLink href={p.url} />}
                      >
                        {p.data.title}
                      </Button>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
            {links.length > 0 ? (
              <nav aria-label={t("page.references")} className="flex flex-col gap-2">
                <h2 className="text-sm font-semibold text-text-default">{t("page.references")}</h2>
                <p className="text-[0.8125rem] text-text-secondary-paragraph">
                  {t("page.referencesNote")}
                </p>
                <ul className="flex flex-wrap gap-x-6 gap-y-1">
                  {links.map((l) => (
                    <li key={l.label}>
                      <Link
                        size="sm"
                        variant="neutral"
                        external
                        externalLabel={t("newTab")}
                        href={l.href}
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
            <nav aria-label={t("nav.prevNext")} className="grid gap-3 sm:grid-cols-2">
              {previous ? (
                <NextLink
                  href={previous.url}
                  rel="prev"
                  className="group flex min-h-16 flex-col gap-0.5 rounded-md border border-border-neutral-secondary p-3 hover:border-border-neutral-primary hover:bg-button-background-neutral-default active:bg-button-background-neutral-pressed"
                >
                  <span className="text-[0.8125rem] text-text-secondary-paragraph">
                    {t("page.prev")}
                  </span>
                  <span className="flex items-center gap-1 text-sm font-medium text-text-default">
                    <HugeiconsIcon
                      icon={ArrowLeft02Icon}
                      className="size-4 rtl:-scale-x-100"
                      aria-hidden
                    />
                    {previous.name}
                  </span>
                </NextLink>
              ) : (
                <span />
              )}
              {next ? (
                <NextLink
                  href={next.url}
                  rel="next"
                  className="group flex min-h-16 flex-col items-end gap-0.5 rounded-md border border-border-neutral-secondary p-3 text-end hover:border-border-neutral-primary hover:bg-button-background-neutral-default active:bg-button-background-neutral-pressed"
                >
                  <span className="text-[0.8125rem] text-text-secondary-paragraph">
                    {t("page.next")}
                  </span>
                  <span className="flex items-center gap-1 text-sm font-medium text-text-default">
                    {next.name}
                    <HugeiconsIcon
                      icon={ArrowRight02Icon}
                      className="size-4 rtl:-scale-x-100"
                      aria-hidden
                    />
                  </span>
                </NextLink>
              ) : null}
            </nav>
            <Link
              size="sm"
              variant="neutral"
              external
              externalLabel={t("newTab")}
              href={`${repo}/blob/${gitConfig.branch}/apps/docs/content/docs/${page.path}`}
            >
              {t("page.edit")}
            </Link>
          </footer>
        </article>
      </main>
      <Toc toc={page.data.toc} />
    </>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(
  props: PageProps<"/[lang]/docs/[[...slug]]">,
): Promise<Metadata> {
  const params = await props.params;
  if (!isLocale(params.lang)) notFound();
  const page = source.getPage(params.slug, params.lang);
  if (!page) notFound();
  const rest = (params.slug ?? []).join("/");
  const image = `/og/${params.lang}/docs/${[...(params.slug ?? []), "image.png"].join("/")}`;
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    const other = source.getPage(params.slug, locale);
    // Only list a language that has its own page (the Arabic page may be an English fallback).
    if (other && (locale === "en" || /\.ar\.mdx$/.test(other.path)))
      languages[locale] = `/${locale}/docs${rest ? `/${rest}` : ""}`;
  }
  languages["x-default"] = `/en/docs${rest ? `/${rest}` : ""}`;
  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      images: [{ url: image, width: 1200, height: 630 }],
      url: `${siteUrl}${page.url}`,
      locale: params.lang === "ar" ? "ar_SA" : "en_US",
    },
    alternates: {
      canonical: page.url,
      languages,
      // The page's Markdown twin, for an agent that reads the HTML head.
      types: {
        "text/markdown": `/${params.lang}/docs${rest ? `/${rest}` : "/index"}.md`,
      },
    },
  };
}
