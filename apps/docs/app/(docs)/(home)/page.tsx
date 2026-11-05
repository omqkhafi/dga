import { ArrowRight02Icon, GithubIcon } from "@hugeicons/core-free-icons";
import type { Metadata } from "next";
import NextLink from "next/link";
import type { ReactNode } from "react";
import { Bento } from "@/components/home/bento";
import { HeroCard } from "@/components/home/hero-card";
import { Icon } from "@/components/shell/icon";
import { InstallCommand } from "@/components/shell/install-command";
import { latestVersion } from "@/lib/changelog";
import { githubUrl, siteUrl } from "@/lib/shared";
import { deviations, tokens } from "@/lib/tokens";
import registry from "@/public/r/registry.json";
import { Button } from "@/registry/bases/base/ui/button";
import { Link } from "@/registry/bases/base/ui/link";

export const metadata: Metadata = {
  title: { absolute: "DGA UI: the Saudi government design system as React components" },
  description:
    "Copy-paste React components for the Saudi DGA unified design system. Base UI primitives, Arabic and English layouts, light and dark, every colour pair checked for WCAG AA.",
  alternates: { canonical: "/" },
};

const number = new Intl.NumberFormat("en");

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section aria-labelledby={id} className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-8">
      <p className="t-eyebrow mb-3 text-text-primary">{eyebrow}</p>
      <h2 id={id} className="t-h1 mb-16 max-w-2xl text-text-display">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function HomePage() {
  const components = registry.items.filter((item) => item.type === "registry:ui").length;
  const version = latestVersion();

  const facts = [
    {
      value: String(components),
      label: "components, each on a Base UI primitive",
      href: "/docs/components/button",
      cta: "Browse components",
    },
    {
      value: number.format(tokens.audit.checks),
      label: "colour pairs checked against WCAG AA, in light and dark",
      href: "/docs/contrast",
      cta: "Open the audit",
    },
    {
      value: number.format(deviations.length),
      label: "changes to the DGA files, each logged with its reason",
      href: "/docs/deviations",
      cta: "Read the log",
    },
    {
      value: "RTL + LTR",
      label: "every component page shows both directions side by side",
      href: "/docs/components/button#rtl",
      cta: "See the Button page",
    },
  ];

  return (
    <main id="main" className="flex flex-1 flex-col">
      <section className="relative overflow-hidden bg-background-white">
        {/* The motif, masked to fade out toward the page edges. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_90%_at_85%_20%,black,transparent_75%)]"
        >
          <div className="pattern size-full" />
        </div>
        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-16 px-4 py-24 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,32rem)] lg:items-start">
          <div className="flex min-w-0 flex-col gap-8 lg:pt-6">
            <p className="t-eyebrow text-text-primary">
              DGA unified design system <span aria-hidden>·</span>{" "}
              <span lang="ar" dir="rtl">
                منصات الكود الموحد
              </span>
            </p>
            <h1 className="t-display max-w-xl text-text-display text-[clamp(2.25rem,1.5rem+2.6vw,3.5rem)]">
              The Saudi government design system, as copy-paste React components
            </h1>
            <p className="t-body max-w-lg text-text-primary-paragraph">
              DGA tokens, Base UI primitives and Arabic-first layouts, installed into your project
              with the shadcn CLI. You own the code, and every colour pair in it is checked for WCAG
              AA.
            </p>
            <div className="flex max-w-lg flex-col gap-3">
              <InstallCommand command={`npx shadcn@latest init ${siteUrl}/r/dga.json`} />
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  size="lg"
                  nativeButton={false}
                  render={<NextLink href="/docs/installation" />}
                >
                  Get started
                  <Icon
                    icon={ArrowRight02Icon}
                    data-icon="inline-end"
                    className="rtl:-scale-x-100"
                  />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  nativeButton={false}
                  render={<NextLink href="/docs/components/button" />}
                >
                  Browse components
                </Button>
              </div>
            </div>
          </div>
          <HeroCard />
        </div>
      </section>

      <div aria-hidden className="pattern-band" />

      <section
        aria-label="What is in the repository"
        className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-8"
      >
        <dl className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="flex flex-col gap-3 border-t-2 border-border-primary pt-4"
            >
              <dt className="order-2 text-sm text-text-primary-paragraph">{fact.label}</dt>
              <dd className="order-1 text-[2.25rem] leading-none font-bold tracking-tight text-text-display tabular-nums">
                {fact.value}
              </dd>
              <dd className="order-3">
                <Link size="sm" href={fact.href} render={<NextLink href={fact.href} />}>
                  {fact.cta}
                </Link>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <div className="bg-background-white">
        <Section
          id="showcase"
          eyebrow="Components"
          title="Small compositions, built from the parts you install"
        >
          <Bento />
        </Section>
      </div>

      <Section
        id="install"
        eyebrow="Install"
        title="Three commands, and the source is in your project"
      >
        <ol className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {[
            {
              title: "Create an app",
              body: "Any React project with Tailwind CSS v4. These steps use Next.js.",
              command: "npx create-next-app@latest my-app",
            },
            {
              title: "Add the DGA style",
              body: "Sets the tokens, the font, RTL and the Base UI style in components.json.",
              command: `npx shadcn@latest init ${siteUrl}/r/dga.json`,
            },
            {
              title: "Add a component",
              body: "Copies the source into components/ui. Edit it like your own code.",
              command: "npx shadcn@latest add @dga/button",
            },
          ].map((step, i) => (
            <li key={step.title} className="flex flex-col gap-4">
              <span className="text-[3rem] leading-none font-bold text-border-neutral-primary tabular-nums">
                {i + 1}
              </span>
              <h3 className="t-h3 text-text-display">{step.title}</h3>
              <p className="text-sm text-text-primary-paragraph">{step.body}</p>
              <InstallCommand command={step.command} />
            </li>
          ))}
        </ol>
      </Section>

      <div className="bg-background-white">
        <Section id="open" eyebrow="Open source" title="Built in the open">
          <ul className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <li className="flex flex-col gap-2">
              <h3 className="t-h3 text-text-display">Source</h3>
              <p className="text-sm text-text-primary-paragraph">
                Components, tokens and the audit scripts are in one repository. Issues and pull
                requests are open.
              </p>
              <Link size="sm" external href={githubUrl} className="mt-2 w-fit">
                <Icon icon={GithubIcon} />
                omqkhafi/dga
              </Link>
            </li>
            <li className="flex flex-col gap-2">
              <h3 className="t-h3 text-text-display">
                {version ? `Version ${version}` : "Unreleased"}
              </h3>
              <p className="text-sm text-text-primary-paragraph">
                Every release is written down in the changelog before it ships, with what changed
                and why.
              </p>
              <Link
                size="sm"
                href="/changelog"
                render={<NextLink href="/changelog" />}
                className="mt-2 w-fit"
              >
                Read the changelog
              </Link>
            </li>
            <li className="flex flex-col gap-2">
              <h3 className="t-h3 text-text-display">MIT licence</h3>
              <p className="text-sm text-text-primary-paragraph">
                Use it in commercial and government projects. Keep the notice. The DGA brand and
                logo belong to the Digital Government Authority.
              </p>
              <Link
                size="sm"
                external
                href={`${githubUrl}/blob/main/LICENSE`}
                className="mt-2 w-fit"
              >
                Read the licence
              </Link>
            </li>
          </ul>
        </Section>
      </div>
    </main>
  );
}
