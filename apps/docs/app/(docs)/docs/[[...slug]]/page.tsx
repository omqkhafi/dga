import { createRelativeLink } from "fumadocs-ui/mdx";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMDXComponents } from "@/components/mdx";
import { CopyPage } from "@/components/shell/copy-page";
import { InlineToc, Toc } from "@/components/shell/toc";
import { gitConfig } from "@/lib/shared";
import { source } from "@/lib/source";
import { Divider } from "@/registry/bases/base/ui/divider";
import { Link } from "@/registry/bases/base/ui/link";

export default async function Page(props: PageProps<"/docs/[[...slug]]">) {
  const params = await props.params;
  const page = source.getPage(params.slug);
  if (!page) notFound();
  const MDX = page.data.body;
  const markdownUrl = `${page.url === "/docs" ? "/docs/index" : page.url}.md`;

  return (
    <>
      <main id="main" className="min-w-0 flex-1 px-4 py-8 sm:px-8 md:py-10 lg:px-12">
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
          </header>
          <Divider className="my-6" />
          <InlineToc toc={page.data.toc} />
          <div className="prose max-w-none">
            <MDX components={getMDXComponents({ a: createRelativeLink(source, page) })} />
          </div>
          <Divider className="mt-12 mb-4" />
          <Link
            size="sm"
            variant="neutral"
            external
            href={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/apps/docs/content/docs/${page.path}`}
          >
            Edit this page on GitHub
          </Link>
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
