import Link from "next/link";

export default function HomePage() {
  return (
    <main className="mx-auto flex w-full max-w-content flex-1 flex-col gap-12 px-4 py-16 md:px-8 md:py-24">
      <section className="flex max-w-paragraph flex-col gap-6">
        <p className="text-sm font-semibold text-primary">منصات الكود الموحد · Platforms Code</p>
        <h1 className="text-display-lg font-bold text-display">The DGA design system for shadcn</h1>
        <p className="text-lg text-primary-paragraph">
          Tokens, themes and components that follow the Saudi DGA unified design system. Built on
          Base UI and Tailwind CSS v4, Arabic-first, and WCAG AA in light and dark mode.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/docs/installation"
            className="inline-flex h-10 items-center rounded-sm bg-primary px-4 text-md font-medium text-primary-foreground hover:bg-button-background-primary-hovered"
          >
            Get started
          </Link>
          <Link
            href="/docs/foundations/colors"
            className="inline-flex h-10 items-center rounded-sm border border-border-neutral-primary bg-card px-4 text-md font-medium text-foreground hover:bg-accent"
          >
            Browse foundations
          </Link>
        </div>
      </section>
      <section className="rounded-md border border-border bg-card p-4">
        <code className="block overflow-x-auto font-mono text-sm text-foreground">
          npx shadcn@latest init https://dga.omqkhafi.dev/r/dga.json
        </code>
      </section>
    </main>
  );
}
