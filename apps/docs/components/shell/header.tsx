import type * as PageTree from "fumadocs-core/page-tree";
import { GithubLink } from "./github-link";
import { LocaleSwitch } from "./locale-switch";
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
        <LocaleSwitch />
        <ThemeToggle />
        <GithubLink />
        <MobileNav tree={tree} version={version} />
      </div>
    </header>
  );
}
