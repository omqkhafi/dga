import { ArrowLeft02Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { createRelativeLink } from "fumadocs-ui/mdx";
import type { Metadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/components/mdx";
import { CopyPage } from "@/components/shell/copy-page";
import { InlineToc, Toc } from "@/components/shell/toc";
import api from "@/lib/generated/api.json";
import { FIGMA_URL, orderedPages, RELATED } from "@/lib/nav";
import { gitConfig } from "@/lib/shared";
import { source } from "@/lib/source";
import { Button } from "@/registry/bases/base/ui/button";
import { Divider } from "@/registry/bases/base/ui/divider";
import { Link } from "@/registry/bases/base/ui/link";
import type { Api } from "../../../../../../scripts/api-types";

const repo = `https://github.com/${gitConfig.user}/${gitConfig.repo}`;

/** Links under the title of a component page: Base UI docs, DGA Figma, source. */
function componentLinks(slug: string) {
  const baseUi = (api as Api)[slug]?.find((part) => part.inherits)?.inherits;
  return [
    ...(baseUi ? [{ label: "Base UI docs", href: baseUi.url }] : []),
    { label: "DGA Figma", href: FIGMA_URL },
    {
      label: "Source",
      href: `${repo}/blob/${gitConfig.branch}/registry/bases/base/ui/${slug}.tsx`,
    },
  ];
}

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();
  const MDX = page.data.body;
  const markdownUrl = `${page.url === "/docs" ? "/docs/index" : page.url}.md`;
  const isComponent = page.slugs[0] === "components" && page.slugs.length === 2;
  const slug = page.slugs[1] ?? "";
  const links = isComponent ? componentLinks(slug) : [];
  const ordered = orderedPages();
  const at = ordered.findIndex((p) => p.url === page.url);
  const previous = at > 0 ? ordered[at - 1] : undefined;
  const next = at >= 0 ? ordered[at + 1] : undefined;
  const related = (isComponent ? (RELATED[slug] ?? []) : [])
    .map((name) => source.getPage(["components", name]))
    .filter((p) => p !== undefined);

  return (
    <>
      <main id="main" className="min-w-0 flex-1 px-4 py-8 sm:px-8 md:py-10 lg:px-8">
        <article className="mx-auto max-w-3xl">
          <header className="flex flex-col gap-3">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h1 className="text-display-sm font-bold text-text-display md:text-display-md">
                {page.data.title}
              </h1>
              <CopyPage markdownUrl={markdownUrl} />
            </div>
            {page.data.description ? (
              <p className="text-lg text-text-secondary-paragraph">{page.data.description}</p>
            ) : null}
            {links.length > 0 ? (
              <ul className="flex flex-wrap gap-x-5 gap-y-1">
                {links.map((l) => (
                  <li key={l.label}>
                    <Link size="sm" variant="neutral" external href={l.href}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </header>
          <Divider className="my-6" />
          <InlineToc toc={page.data.toc} />
          <div className="prose max-w-none">
            <MDX components={getMDXComponents({ a: createRelativeLink(source, page) })} />
          </div>
          <Divider className="mt-12 mb-6" />
          <footer className="flex flex-col gap-6">
            {related.length > 0 ? (
              <nav aria-label="Related components" className="flex flex-col gap-2">
                <h2 className="text-sm font-semibold text-text-default">Related components</h2>
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
            <nav aria-label="Previous and next page" className="grid gap-3 sm:grid-cols-2">
              {previous ? (
                <NextLink
                  href={previous.url}
                  rel="prev"
                  className="group flex min-h-16 flex-col gap-0.5 rounded-md border border-border-neutral-secondary p-3 hover:border-border-neutral-primary hover:bg-button-background-neutral-default active:bg-button-background-neutral-pressed"
                >
                  <span className="text-[0.8125rem] text-text-secondary-paragraph">Previous</span>
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
                  <span className="text-[0.8125rem] text-text-secondary-paragraph">Next</span>
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
              href={`${repo}/blob/${gitConfig.branch}/apps/docs/content/docs/${page.path}`}
            >
              Edit this page on GitHub
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

export async function generateMetadata(props: PageProps<"/docs/[[...slug]]">): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();
  const image = `/og/docs/${[...(params.slug ?? []), "image.png"].join("/")}`;
  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: { images: [{ url: image, width: 1200, height: 630 }] },
    alternates: { canonical: page.url },
  };
}
