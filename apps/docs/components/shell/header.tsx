import type * as PageTree from "fumadocs-core/page-tree";
import { GithubLink } from "./github-link";
import { LocaleSwitch } from "./locale-switch";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";
import { SearchButton } from "./search-button";
import { Tabs } from "./tabs";
import { ThemeToggle } from "./theme-toggle";

/**
 * The header follows the layout shared by the omqkhafi docs sites (okm, oke): a bar of fixed
 * height under a 1px border. From 1024px the lockup sits in a pane as wide as the docs sidebar,
 * then three equal tabs, then the theme toggle, the language link and the GitHub block. Below
 * 1024px it is the lockup and four small buttons (search, language, theme, menu). Search sits
 * at the top of the sidebar on desktop.
 */
export function Header({ tree, version }: { tree: PageTree.Root; version: string | null }) {
  return (
    <header className="sticky top-0 z-40 bg-background-white">
      <div className="relative flex h-(--topbar-h) items-stretch border-b border-border-neutral-secondary">
        <div className="relative hidden w-(--left-pane-w) shrink-0 items-stretch border-e border-border-neutral-secondary px-4 lg:flex">
          <Logo />
        </div>
        <div className="flex w-full items-center gap-1 px-3 lg:hidden">
          <Logo className="me-auto" />
          <SearchButton compact />
          <LocaleSwitch />
          <ThemeToggle />
          <MobileNav tree={tree} version={version} />
        </div>
        <div className="relative hidden min-w-0 flex-1 items-stretch lg:flex">
          <Tabs />
          <ThemeToggle variant="cell" />
          <LocaleSwitch variant="cell" />
          <GithubLink />
        </div>
      </div>
    </header>
  );
}
