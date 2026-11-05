import { CheckmarkCircle02Icon, Upload04Icon } from "@hugeicons/core-free-icons";
import type { ReactNode } from "react";
import { Icon } from "@/components/shell/icon";
import { Avatar, AvatarGroup } from "@/registry/bases/base/ui/avatar";
import { Badge } from "@/registry/bases/base/ui/badge";
import { Button } from "@/registry/bases/base/ui/button";
import { Checkbox } from "@/registry/bases/base/ui/checkbox";
import { Divider } from "@/registry/bases/base/ui/divider";
import { FeaturedIcon } from "@/registry/bases/base/ui/featured-icon";
import { Input } from "@/registry/bases/base/ui/input";
import { Link } from "@/registry/bases/base/ui/link";
import { NumberInput } from "@/registry/bases/base/ui/number-input";
import { Radio, RadioGroup } from "@/registry/bases/base/ui/radio";
import { SearchBox } from "@/registry/bases/base/ui/search-box";
import { Select, SelectTrigger, SelectValue } from "@/registry/bases/base/ui/select";
import { Skeleton } from "@/registry/bases/base/ui/skeleton";
import { Spinner } from "@/registry/bases/base/ui/spinner";
import { Switch } from "@/registry/bases/base/ui/switch";
import { StatusTag, Tag } from "@/registry/bases/base/ui/tag";
import { Textarea } from "@/registry/bases/base/ui/textarea";

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
  field: (
    <div className="flex w-32 flex-col gap-1.5">
      <span className="text-xs font-medium text-field-text-label">
        Full name <span className="text-field-border-error">*</span>
      </span>
      <Input size="md" defaultValue="Noura" readOnly tabIndex={-1} />
      <span className="text-xs text-field-text-helper">As on your ID</span>
    </div>
  ),
  input: (
    <div className="flex w-32 flex-col gap-2">
      <Input size="md" placeholder="Placeholder" tabIndex={-1} />
      <Input size="md" appearance="darker" defaultValue="Filled" tabIndex={-1} />
    </div>
  ),
  textarea: (
    <div className="w-32">
      <Textarea rows={3} defaultValue="Describe your request" tabIndex={-1} />
    </div>
  ),
  select: (
    <div className="w-32">
      <Select defaultValue="renew">
        <SelectTrigger size="md" tabIndex={-1}>
          <SelectValue>Renew</SelectValue>
        </SelectTrigger>
      </Select>
    </div>
  ),
  "number-input": (
    <div className="w-32">
      <NumberInput size="md" defaultValue={3} />
    </div>
  ),
  "search-box": (
    <div className="w-32">
      <SearchBox size="md" defaultValue="Permit" />
    </div>
  ),
  checkbox: (
    <div className="flex flex-col gap-2 text-sm text-text-default">
      <span className="flex items-center gap-2">
        <Checkbox defaultChecked tabIndex={-1} /> Agree
      </span>
      <span className="flex items-center gap-2">
        <Checkbox indeterminate tabIndex={-1} /> Some
      </span>
    </div>
  ),
  radio: (
    <RadioGroup defaultValue="a" className="gap-2 text-sm text-text-default">
      <span className="flex items-center gap-2">
        <Radio value="a" tabIndex={-1} /> Email
      </span>
      <span className="flex items-center gap-2">
        <Radio value="b" tabIndex={-1} /> Phone
      </span>
    </RadioGroup>
  ),
  switch: (
    <div className="flex flex-col gap-2 text-sm text-text-default">
      <span className="flex items-center gap-2">
        <Switch defaultChecked tabIndex={-1} /> On
      </span>
      <span className="flex items-center gap-2">
        <Switch tabIndex={-1} /> Off
      </span>
    </div>
  ),
  "file-upload": (
    <div className="flex h-14 w-32 flex-col items-center justify-center gap-1 rounded-sm border border-dashed border-field-border-default text-xs text-text-default">
      <Icon icon={Upload04Icon} />
      Drop files
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
