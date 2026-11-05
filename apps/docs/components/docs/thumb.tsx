import { CheckmarkCircle02Icon } from "@hugeicons/core-free-icons";
import type { ReactNode } from "react";
import { Icon } from "@/components/shell/icon";
import { Avatar, AvatarGroup } from "@/registry/bases/base/ui/avatar";
import { Badge } from "@/registry/bases/base/ui/badge";
import { Button } from "@/registry/bases/base/ui/button";
import { Divider } from "@/registry/bases/base/ui/divider";
import { FeaturedIcon } from "@/registry/bases/base/ui/featured-icon";
import { Link } from "@/registry/bases/base/ui/link";
import { Skeleton } from "@/registry/bases/base/ui/skeleton";
import { Spinner } from "@/registry/bases/base/ui/spinner";
import { StatusTag, Tag } from "@/registry/bases/base/ui/tag";

const THUMBS: Record<string, ReactNode> = {
  button: (
    <div className="flex flex-col gap-2">
      <Button>Submit</Button>
      <Button variant="outline">Cancel</Button>
    </div>
  ),
  link: (
    <div className="flex flex-col items-start gap-2">
      <Link href="#">Services</Link>
      <Link href="#" variant="neutral" inline>
        Policies
      </Link>
    </div>
  ),
  spinner: (
    <div className="flex items-center gap-3">
      <Spinner size="sm" label={null} />
      <Spinner size="xl" label={null} />
    </div>
  ),
  badge: (
    <div className="flex flex-col items-start gap-2">
      <Badge variant="success">Approved</Badge>
      <Badge variant="warning" outlined>
        Pending
      </Badge>
    </div>
  ),
  tag: (
    <div className="flex flex-col items-start gap-2">
      <Tag variant="info">Riyadh</Tag>
      <StatusTag variant="success">Completed</StatusTag>
    </div>
  ),
  divider: (
    <div className="flex w-24 flex-col gap-2 text-xs text-text-default">
      <span>Personal</span>
      <Divider />
      <span>Business</span>
    </div>
  ),
  avatar: (
    <AvatarGroup>
      <Avatar size={40} initials="NQ" />
      <Avatar size={40} initials="FA" />
      <Avatar size={40} initials="+3" />
    </AvatarGroup>
  ),
  "featured-icon": (
    <div className="flex gap-2">
      <FeaturedIcon variant="success" size="md">
        <Icon icon={CheckmarkCircle02Icon} />
      </FeaturedIcon>
      <FeaturedIcon variant="info" appearance="outlined" circle size="md">
        <Icon icon={CheckmarkCircle02Icon} />
      </FeaturedIcon>
    </div>
  ),
  skeleton: (
    <div className="flex w-28 items-center gap-2">
      <Skeleton shape="circle" size={24} />
      <div className="flex flex-1 flex-col gap-1.5">
        <Skeleton shape="line" size="sm" />
        <Skeleton shape="line" size="sm" className="w-2/3" />
      </div>
    </div>
  ),
};

/** The small preview next to the title of a component page. Inert: the real preview is below. */
export function Thumb({ slug }: { slug: string }) {
  const content = THUMBS[slug];
  if (!content) return null;
  return (
    <div
      inert
      aria-hidden
      className="hidden h-24 w-40 shrink-0 items-center justify-center rounded-md border border-border-neutral-secondary bg-background-white sm:flex"
    >
      {content}
    </div>
  );
}
