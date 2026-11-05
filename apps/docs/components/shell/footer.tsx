import NextLink from "next/link";
import { getT, type Key } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { githubUrl } from "@/lib/shared";
import { Lockup } from "./logo";

type FooterLink = [key: Key, href: string, external?: boolean];

const columns = (lang: Locale): { title: Key; links: FooterLink[] }[] => [
  {
    title: "footer.product",
    links: [
      ["footer.components", `/${lang}/docs/components/button`],
      ["footer.colors", `/${lang}/docs/foundations/colors`],
      ["footer.darkMode", `/${lang}/docs/foundations/dark-mode`],
      ["footer.typography", `/${lang}/docs/foundations/typography`],
    ],
  },
  {
    title: "footer.docs",
    links: [
      ["footer.installation", `/${lang}/docs/installation`],
      ["footer.deviations", `/${lang}/docs/deviations`],
      ["footer.contrast", `/${lang}/docs/contrast`],
      ["footer.llms", `/${lang}/llms.txt`],
    ],
  },
  {
    title: "footer.project",
    links: [
      ["footer.github", githubUrl, true],
      ["footer.changelog", `/${lang}/changelog`],
      ["footer.issue", `${githubUrl}/issues`, true],
      ["footer.licence", `${githubUrl}/blob/main/LICENSE`, true],
    ],
  },
];

/** Footer on every page: links, licence, the disclaimer and the credit to the DGA design system. */
export function Footer({ lang, version }: { lang: Locale; version: string | null }) {
  const t = getT(lang);
  return (
    <footer className="mt-auto bg-background-white">
      <div aria-hidden className="pattern-band" />
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-x-6 gap-y-12 px-4 py-16 sm:px-8 lg:grid-cols-[1.3fr_repeat(3,1fr)]">
        <div className="col-span-2 flex flex-col gap-4 lg:col-span-1">
          <NextLink href={`/${lang}`} aria-label={t("app.name")} className="inline-flex">
            <Lockup />
          </NextLink>
          <p className="max-w-xs text-sm text-text-primary-paragraph">
            {t("footer.tagline", { version: version ? `v${version}` : t("release.unreleased") })}
          </p>
        </div>
        {columns(lang).map((column) => (
          <nav key={column.title} aria-label={t(column.title)}>
            <h2 className="t-eyebrow mb-4 text-text-secondary-paragraph">{t(column.title)}</h2>
            <ul className="flex flex-col gap-1">
              {column.links.map(([label, href, external]) => (
                <li key={label}>
                  <NextLink
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="inline-flex min-h-8 items-center text-sm text-text-primary-paragraph hover:text-text-default hover:underline hover:underline-offset-4"
                  >
                    {t(label)}
                    {external ? <span className="sr-only"> {t("newTab")}</span> : null}
                  </NextLink>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="mx-auto w-full max-w-6xl border-t border-border-neutral-secondary px-4 py-8 sm:px-8">
        <p className="max-w-3xl text-[0.8125rem] text-text-secondary-paragraph">
          {t("footer.disclaimerBefore")}
          <a
            href="https://design.dga.gov.sa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-primary-paragraph underline underline-offset-4 hover:text-text-default"
          >
            design.dga.gov.sa
            <span className="sr-only"> {t("newTab")}</span>
          </a>
          {t("footer.disclaimerAfter")}
        </p>
      </div>
    </footer>
  );
}
