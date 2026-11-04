import { ArrowUpRight01Icon, GithubIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type * as PageTree from "fumadocs-core/page-tree";
import { githubUrl } from "@/lib/shared";
import { Button } from "@/registry/bases/base/ui/button";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { SearchButton } from "./search-button";
import { Tabs } from "./tabs";
import { ThemeToggle } from "./theme-toggle";

export function Header({ tree, version }: { tree: PageTree.Root; version: string | null }) {
  return (
    <header className="sticky top-0 z-40 flex h-12 items-center border-b border-border-neutral-secondary bg-background-white">
      <div className="flex h-full shrink-0 items-center px-4 md:w-75 md:border-e md:border-border-neutral-secondary">
        <Logo />
      </div>
      <Tabs />
      <div className="ms-auto flex h-full items-center gap-1 px-2 md:ms-0">
        <div className="md:hidden">
          <SearchButton compact />
        </div>
        <ThemeToggle />
        <Button
          variant="neutral"
          size="md"
          nativeButton={false}
          className="hidden sm:inline-flex"
          render={<a href={githubUrl} target="_blank" rel="noopener noreferrer" />}
        >
          <HugeiconsIcon icon={GithubIcon} data-icon="inline-start" />
          GitHub
          <HugeiconsIcon
            icon={ArrowUpRight01Icon}
            data-icon="inline-end"
            className="size-4 rtl:-scale-x-100"
          />
          <span className="sr-only"> (opens in a new tab)</span>
        </Button>
        <MobileNav tree={tree} version={version} />
      </div>
    </header>
  );
}
