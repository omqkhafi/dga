import { ArrowUpRight01Icon, GithubIcon } from "@hugeicons/core-free-icons";
import type * as PageTree from "fumadocs-core/page-tree";
import { githubUrl } from "@/lib/shared";
import { Button } from "@/registry/bases/base/ui/button";
import { Icon } from "./icon";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { SearchButton } from "./search-button";
import { Tabs } from "./tabs";
import { ThemeToggle } from "./theme-toggle";

export function Header({ tree, version }: { tree: PageTree.Root; version: string | null }) {
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center bg-background-white/95 shadow-[0_1px_0_var(--border-neutral-secondary)] backdrop-blur-sm">
      <div className="flex h-full shrink-0 items-center px-4 md:w-75 md:px-5">
        <Logo />
      </div>
      <Tabs />
      <div className="ms-auto flex h-full items-center gap-1 px-2 md:px-4">
        <div className="md:hidden">
          <SearchButton compact />
        </div>
        <ThemeToggle />
        <Button
          variant="subtle"
          nativeButton={false}
          className="hidden sm:inline-flex"
          render={<a href={githubUrl} target="_blank" rel="noopener noreferrer" />}
        >
          <Icon icon={GithubIcon} data-icon="inline-start" />
          GitHub
          <Icon icon={ArrowUpRight01Icon} data-icon="inline-end" className="rtl:-scale-x-100" />
          <span className="sr-only"> (opens in a new tab)</span>
        </Button>
        <MobileNav tree={tree} version={version} />
      </div>
    </header>
  );
}
