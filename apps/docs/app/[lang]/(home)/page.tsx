import { ArrowRight02Icon, GithubIcon } from "@hugeicons/core-free-icons";
import type { Metadata } from "next";
import NextLink from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import { Bento } from "@/components/home/bento";
import { HeroCard } from "@/components/home/hero-card";
import { Icon } from "@/components/shell/icon";
import { InstallCommand } from "@/components/shell/install-command";
import { latestVersion } from "@/lib/changelog";
import { getT } from "@/lib/dictionary";
import { isLocale, type Locale, locales } from "@/lib/i18n";
import { githubUrl, siteUrl } from "@/lib/shared";
import { deviations, tokens } from "@/lib/tokens";
import registry from "@/public/r/registry.json";
import { Button } from "@/registry/bases/base/ui/button";
import { Link } from "@/registry/bases/base/ui/link";

export async function generateMetadata({ params }: PageProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const t = getT(lang);
  return {
    title: { absolute: t("meta.title") },
    description: t("meta.description"),
    alternates: {
      canonical: `/${lang}`,
      languages: { ...Object.fromEntries(locales.map((l) => [l, `/${l}`])), "x-default": "/en" },
    },
  };
}

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

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang: raw } = await params;
  if (!isLocale(raw)) notFound();
  const lang: Locale = raw;
  const t = getT(lang);
  const components = registry.items.filter((item) => item.type === "registry:ui").length;
  const version = latestVersion();

  const facts = [
    {
      value: String(components),
      label: t("home.fact.components"),
      href: `/${lang}/docs/components/button`,
      cta: t("home.fact.components.cta"),
    },
    {
      value: number.format(tokens.audit.checks),
      label: t("home.fact.contrast"),
      href: `/${lang}/docs/contrast`,
      cta: t("home.fact.contrast.cta"),
    },
    {
      value: number.format(deviations.length),
      label: t("home.fact.deviations"),
      href: `/${lang}/docs/deviations`,
      cta: t("home.fact.deviations.cta"),
    },
    {
      value: t("home.fact.rtl.value"),
      label: t("home.fact.rtl"),
      href: `/${lang}/docs/components/button#usage`,
      cta: t("home.fact.rtl.cta"),
    },
  ];
  const steps = [
    {
      title: t("home.step1.title"),
      body: t("home.step1.body"),
      command: "npx create-next-app@latest my-app",
    },
    {
      title: t("home.step2.title"),
      body: t("home.step2.body"),
      command: `npx shadcn@latest init ${siteUrl}/r/dga.json`,
    },
    {
      title: t("home.step3.title"),
      body: t("home.step3.body"),
      command: "npx shadcn@latest add @dga/button",
    },
  ];
  // The pattern fades out toward the start side of the page, the side the text is on.
  const fade =
    lang === "ar"
      ? "[mask-image:radial-gradient(ellipse_70%_90%_at_15%_20%,black,transparent_75%)]"
      : "[mask-image:radial-gradient(ellipse_70%_90%_at_85%_20%,black,transparent_75%)]";

  return (
    <main id="main" className="flex flex-1 flex-col">
      <section className="relative overflow-hidden bg-background-white">
        <div aria-hidden className={`pointer-events-none absolute inset-0 ${fade}`}>
          <div className="pattern size-full" />
        </div>
        <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 gap-16 px-4 py-24 sm:px-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,32rem)] lg:items-start">
          <div className="flex min-w-0 flex-col gap-8 lg:pt-6">
            <p className="t-eyebrow text-text-primary">{t("home.eyebrow")}</p>
            <h1 className="t-display max-w-xl text-text-display text-[clamp(2.25rem,1.5rem+2.6vw,3.5rem)]">
              {t("home.title")}
            </h1>
            <p className="t-body max-w-lg text-text-primary-paragraph">{t("home.lede")}</p>
            <div className="flex max-w-lg flex-col gap-3">
              <InstallCommand command={`npx shadcn@latest init ${siteUrl}/r/dga.json`} />
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  size="lg"
                  nativeButton={false}
                  render={<NextLink href={`/${lang}/docs/installation`} />}
                >
                  {t("home.getStarted")}
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
                  render={<NextLink href={`/${lang}/docs/components/button`} />}
                >
                  {t("home.browse")}
                </Button>
              </div>
            </div>
          </div>
          <HeroCard />
        </div>
      </section>

      <div aria-hidden className="pattern-band" />

      <section
        aria-label={t("home.facts.label")}
        className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-8"
      >
        <dl className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {facts.map((fact) => (
            <div
              key={fact.href}
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
          eyebrow={t("home.components.eyebrow")}
          title={t("home.components.title")}
        >
          <Bento lang={lang} />
        </Section>
      </div>

      <Section id="install" eyebrow={t("home.install.eyebrow")} title={t("home.install.title")}>
        <ol className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {steps.map((step, i) => (
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
        <Section id="open" eyebrow={t("home.open.eyebrow")} title={t("home.open.title")}>
          <ul className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <li className="flex flex-col gap-2">
              <h3 className="t-h3 text-text-display">{t("home.open.source")}</h3>
              <p className="text-sm text-text-primary-paragraph">{t("home.open.sourceBody")}</p>
              <Link
                size="sm"
                external
                externalLabel={t("newTab")}
                href={githubUrl}
                className="mt-2 w-fit"
              >
                <Icon icon={GithubIcon} />
                omqkhafi/dga
              </Link>
            </li>
            <li className="flex flex-col gap-2">
              <h3 className="t-h3 text-text-display">
                {version ? t("home.open.version", { version }) : t("release.unreleased")}
              </h3>
              <p className="text-sm text-text-primary-paragraph">{t("home.open.versionBody")}</p>
              <Link
                size="sm"
                href={`/${lang}/changelog`}
                render={<NextLink href={`/${lang}/changelog`} />}
                className="mt-2 w-fit"
              >
                {t("home.open.changelog")}
              </Link>
            </li>
            <li className="flex flex-col gap-2">
              <h3 className="t-h3 text-text-display">{t("home.open.licence")}</h3>
              <p className="text-sm text-text-primary-paragraph">{t("home.open.licenceBody")}</p>
              <Link
                size="sm"
                external
                externalLabel={t("newTab")}
                href={`${githubUrl}/blob/main/LICENSE`}
                className="mt-2 w-fit"
              >
                {t("home.open.licenceLink")}
              </Link>
            </li>
          </ul>
        </Section>
      </div>
    </main>
  );
}
