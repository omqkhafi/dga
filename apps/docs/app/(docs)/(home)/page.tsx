import {
  ArrowRight02Icon,
  CheckmarkBadge01Icon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
  Layers01Icon,
  Moon02Icon,
  PaintBoardIcon,
  TextAlignRightIcon,
  UniversalAccessIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import NextLink from "next/link";
import type { ReactNode } from "react";
import { InstallCommand } from "@/components/shell/install-command";
import { siteUrl } from "@/lib/shared";
import { Avatar, AvatarGroup } from "@/registry/bases/base/ui/avatar";
import { Badge } from "@/registry/bases/base/ui/badge";
import { Button } from "@/registry/bases/base/ui/button";
import { Divider } from "@/registry/bases/base/ui/divider";
import { FeaturedIcon } from "@/registry/bases/base/ui/featured-icon";
import { Link } from "@/registry/bases/base/ui/link";
import { Skeleton } from "@/registry/bases/base/ui/skeleton";
import { Spinner } from "@/registry/bases/base/ui/spinner";
import { StatusTag, Tag } from "@/registry/bases/base/ui/tag";

const FEATURES: { icon: IconSvgElement; title: string; body: string }[] = [
  {
    icon: Layers01Icon,
    title: "Built on Base UI",
    body: "Unstyled, accessible primitives with DGA tokens on top. Copy the source into your project.",
  },
  {
    icon: TextAlignRightIcon,
    title: "RTL first",
    body: "Logical properties only, so every component works in Arabic and English without changes.",
  },
  {
    icon: Moon02Icon,
    title: "Dark mode",
    body: "A tinted dark theme with the same roles and hierarchy as light. No flash on load.",
  },
  {
    icon: UniversalAccessIcon,
    title: "AA contrast",
    body: "Every state of every component is checked in both modes. The build fails on a regression.",
  },
  {
    icon: CheckmarkBadge01Icon,
    title: "DGA-faithful, with fixes",
    body: "From the DGA Figma file. Where it fails WCAG or has a typo, we fix it and log it.",
  },
];

/** A live component card. The preview is inert: the whole card is one link to the page. */
function Card({
  href,
  title,
  description,
  children,
}: {
  href: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <li className="group relative flex flex-col overflow-hidden rounded-md border border-border-neutral-secondary bg-background-card transition-colors hover:border-border-neutral-primary has-[a:active]:bg-background-neutral-50">
      <div
        inert
        aria-hidden
        className="flex min-h-36 flex-wrap content-center items-center justify-center gap-3 border-b border-border-neutral-secondary bg-background-neutral-50 p-5"
      >
        {children}
      </div>
      <div className="flex flex-1 flex-col gap-0.5 p-4">
        <h3 className="text-md font-semibold text-text-default">
          <NextLink
            href={href}
            className="flex items-center gap-1 after:absolute after:inset-0 after:content-['']"
          >
            {title}
            <HugeiconsIcon
              icon={ArrowRight02Icon}
              className="size-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5"
              aria-hidden
            />
          </NextLink>
        </h3>
        <p className="text-sm text-text-primary-paragraph">{description}</p>
      </div>
    </li>
  );
}

export default function HomePage() {
  return (
    <main id="main" className="flex flex-1 flex-col">
      <section className="border-b border-border-neutral-secondary bg-background-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 px-4 py-14 text-center md:py-20">
          <Badge variant="success" rounded size="lg">
            منصات الكود الموحد · Platforms Code
          </Badge>
          <h1 className="text-display-md font-bold text-text-display md:text-display-xl">DGA UI</h1>
          <p className="max-w-2xl text-lg text-text-primary-paragraph">
            The Saudi DGA design system as a shadcn registry. Base UI components, Arabic-first, WCAG
            AA in light and dark.
          </p>
          <div className="w-full max-w-xl">
            <InstallCommand command={`npx shadcn@latest init ${siteUrl}/r/dga.json`} />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" nativeButton={false} render={<NextLink href="/docs/installation" />}>
              Get started
              <HugeiconsIcon
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
              Components
            </Button>
          </div>
        </div>
      </section>

      <section aria-labelledby="components" className="mx-auto w-full max-w-5xl px-4 py-12">
        <h2 id="components" className="mb-1 text-display-xs font-bold text-text-display">
          Components
        </h2>
        <p className="mb-6 text-text-primary-paragraph">
          Live, not screenshots. Each one links to its page with RTL, dark mode and API.
        </p>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Card
            href="/docs/components/button"
            title="Button"
            description="Six styles, three sizes, loading."
          >
            <Button>Submit</Button>
            <Button variant="secondary">Cancel</Button>
            <Button variant="outline" destructive>
              Delete
            </Button>
          </Card>
          <Card
            href="/docs/components/badge"
            title="Badge"
            description="A short, non-interactive label."
          >
            <Badge variant="success">Approved</Badge>
            <Badge variant="error">Rejected</Badge>
            <Badge variant="warning" outlined>
              Pending
            </Badge>
            <Badge variant="purple" rounded>
              New
            </Badge>
          </Card>
          <Card
            href="/docs/components/tag"
            title="Tag"
            description="Categories, filters and statuses."
          >
            <Tag variant="info">Technology</Tag>
            <Tag variant="neutral" outlined>
              Riyadh
            </Tag>
            <StatusTag variant="success">Completed</StatusTag>
          </Card>
          <Card
            href="/docs/components/link"
            title="Link"
            description="Primary, neutral, inline, external."
          >
            <Link href="#" tabIndex={-1}>
              Services
            </Link>
            <Link href="#" variant="neutral" tabIndex={-1}>
              Policies
            </Link>
          </Card>
          <Card
            href="/docs/components/avatar"
            title="Avatar"
            description="Picture, initials or icon, and groups."
          >
            <AvatarGroup>
              <Avatar size={40} src="/avatar-sample.svg" alt="" />
              <Avatar size={40} initials="NQ" />
              <Avatar size={40} initials="+4" />
            </AvatarGroup>
          </Card>
          <Card
            href="/docs/components/featured-icon"
            title="Featured Icon"
            description="An icon in a tinted container."
          >
            <FeaturedIcon variant="success" size="lg">
              <HugeiconsIcon icon={CheckmarkCircle02Icon} />
            </FeaturedIcon>
            <FeaturedIcon variant="info" appearance="outlined" circle size="lg">
              <HugeiconsIcon icon={InformationCircleIcon} />
            </FeaturedIcon>
            <FeaturedIcon variant="brand" appearance="hard" size="lg">
              <HugeiconsIcon icon={PaintBoardIcon} />
            </FeaturedIcon>
          </Card>
          <Card
            href="/docs/components/spinner"
            title="Spinner"
            description="Shows that a process is running."
          >
            <Spinner size="sm" label={null} />
            <Spinner size="lg" label={null} />
            <Spinner size="2xl" variant="neutral" label={null} />
          </Card>
          <Card
            href="/docs/components/skeleton"
            title="Skeleton"
            description="Placeholders while content loads."
          >
            <div className="flex w-full max-w-60 items-center gap-3">
              <Skeleton shape="circle" size={48} />
              <div className="flex flex-1 flex-col gap-2">
                <Skeleton shape="line" size="lg" className="w-2/3" />
                <Skeleton shape="line" size="sm" />
              </div>
            </div>
          </Card>
          <Card
            href="/docs/components/divider"
            title="Divider"
            description="Separates content into sections."
          >
            <div className="flex w-full max-w-60 flex-col gap-3">
              <span className="text-sm text-text-default">Personal services</span>
              <Divider />
              <span className="text-sm text-text-default">Business services</span>
            </div>
          </Card>
        </ul>
      </section>

      <section
        aria-labelledby="why"
        className="border-t border-border-neutral-secondary bg-background-white"
      >
        <div className="mx-auto w-full max-w-5xl px-4 py-12">
          <h2 id="why" className="sr-only">
            Why DGA UI
          </h2>
          <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {FEATURES.map((f) => (
              <li key={f.title} className="flex flex-col gap-3">
                <FeaturedIcon size="md">
                  <HugeiconsIcon icon={f.icon} />
                </FeaturedIcon>
                <h3 className="text-md font-semibold text-text-default">{f.title}</h3>
                <p className="text-sm text-text-primary-paragraph">{f.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
