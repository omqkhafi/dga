import NextLink from "next/link";
import { Button } from "@/registry/bases/base/ui/button";
import { Mark } from "./logo";

/** The 404 page: the motif, the message in both scripts, and the three places to go next. */
export function NotFoundView() {
  return (
    <main id="main" className="relative flex flex-1 items-center justify-center overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_70%_at_50%_45%,black,transparent_75%)]"
      >
        <div className="pattern size-full" />
      </div>
      <div className="relative mx-auto flex max-w-xl flex-col items-center gap-6 px-6 py-24 text-center">
        <Mark className="size-12 text-primary dark:text-text-primary" />
        <p className="t-eyebrow text-text-primary">Error 404</p>
        <h1 className="t-h1 text-text-display">This page does not exist</h1>
        <p lang="ar" dir="rtl" className="text-lg text-text-primary-paragraph">
          الصفحة غير موجودة
        </p>
        <p className="t-body max-w-md text-text-primary-paragraph">
          The address may have changed, or the page was never here. Start from the docs, or press
          Ctrl K (⌘ K on a Mac) to search.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Button size="lg" nativeButton={false} render={<NextLink href="/docs" />}>
            Open the docs
          </Button>
          <Button
            size="lg"
            variant="outline"
            nativeButton={false}
            render={<NextLink href="/docs/components/button" />}
          >
            Browse components
          </Button>
          <Button size="lg" variant="subtle" nativeButton={false} render={<NextLink href="/" />}>
            Home
          </Button>
        </div>
      </div>
    </main>
  );
}
