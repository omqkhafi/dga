"use client";

import NextLink from "next/link";
import { useLocale, useT } from "@/lib/locale-context";
import { Button } from "@/registry/bases/base/ui/button";
import { Mark } from "./logo";

/** The 404 page: the motif, the message in both scripts, and the three places to go next. */
export function NotFoundView() {
  const { lang } = useLocale();
  const t = useT();
  return (
    <main id="main" className="relative flex flex-1 items-center justify-center overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_45%,black,transparent_75%)]"
      >
        <div className="pattern size-full" />
      </div>
      <div className="relative mx-auto flex max-w-xl flex-col items-center gap-6 px-6 py-24 text-center">
        <Mark className="h-16" />
        <p className="t-eyebrow text-text-primary">{t("nf.eyebrow")}</p>
        <h1 className="t-h1 text-text-display">{t("nf.title")}</h1>
        <p className="t-body max-w-md text-text-primary-paragraph">{t("nf.body")}</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button size="lg" nativeButton={false} render={<NextLink href={`/${lang}/docs`} />}>
            {t("nf.docs")}
          </Button>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<NextLink href={`/${lang}/docs/components/button`} />}
          >
            {t("nf.components")}
          </Button>
          <Button
            size="lg"
            variant="subtle"
            nativeButton={false}
            render={<NextLink href={`/${lang}`} />}
          >
            {t("nf.home")}
          </Button>
        </div>
      </div>
    </main>
  );
}
