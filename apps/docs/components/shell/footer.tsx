import NextLink from "next/link";
import { githubUrl } from "@/lib/shared";
import { Mark } from "./logo";

const COLUMNS: { title: string; links: [label: string, href: string, external?: boolean][] }[] = [
  {
    title: "Product",
    links: [
      ["Components", "/docs/components/button"],
      ["Colors", "/docs/foundations/colors"],
      ["Dark mode", "/docs/foundations/dark-mode"],
      ["Typography", "/docs/foundations/typography"],
    ],
  },
  {
    title: "Docs",
    links: [
      ["Installation", "/docs/installation"],
      ["Deviations from DGA", "/docs/deviations"],
      ["Contrast audit", "/docs/contrast"],
      ["llms.txt", "/llms.txt"],
    ],
  },
  {
    title: "Project",
    links: [
      ["GitHub", githubUrl, true],
      ["Changelog", "/changelog"],
      ["Report an issue", `${githubUrl}/issues`, true],
      ["MIT licence", `${githubUrl}/blob/main/LICENSE`, true],
    ],
  },
];

/** Footer on every page: links, licence, the disclaimer and the credit to the DGA design system. */
export function Footer({ version }: { version: string | null }) {
  return (
    <footer className="mt-auto bg-background-white">
      <div aria-hidden className="pattern-band" />
      <div className="mx-auto grid w-full max-w-6xl grid-cols-2 gap-x-6 gap-y-12 px-4 py-16 sm:px-8 lg:grid-cols-[1.3fr_repeat(3,1fr)]">
        <div className="col-span-2 flex flex-col gap-4 lg:col-span-1">
          <NextLink href="/" className="inline-flex items-center gap-2 font-bold text-text-default">
            <Mark className="text-primary dark:text-text-primary" />
            <span className="text-md">DGA UI</span>
          </NextLink>
          <p className="max-w-xs text-sm text-text-primary-paragraph">
            The Saudi government design system as copy-paste React components. Version{" "}
            {version ? `v${version}` : "unreleased"}.
          </p>
        </div>
        {COLUMNS.map((column) => (
          <nav key={column.title} aria-label={column.title}>
            <h2 className="t-eyebrow mb-4 text-text-secondary-paragraph">{column.title}</h2>
            <ul className="flex flex-col gap-1">
              {column.links.map(([label, href, external]) => (
                <li key={label}>
                  <NextLink
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="inline-flex min-h-8 items-center text-sm text-text-primary-paragraph hover:text-text-default hover:underline hover:underline-offset-4"
                  >
                    {label}
                    {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
                  </NextLink>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="mx-auto w-full max-w-6xl border-t border-border-neutral-secondary px-4 py-8 sm:px-8">
        <p className="max-w-3xl text-[0.8125rem] text-text-secondary-paragraph">
          DGA UI is an independent open-source project. It is not an official product of the Digital
          Government Authority and is not endorsed by it. The design language, tokens and component
          specifications come from the DGA unified design system, published at{" "}
          <a
            href="https://design.dga.gov.sa"
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-primary-paragraph underline underline-offset-4 hover:text-text-default"
          >
            design.dga.gov.sa
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          . MIT licence, © 2026 Omq Khafi.
        </p>
      </div>
    </footer>
  );
}
