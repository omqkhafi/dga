import {
  Alert02Icon,
  ArrowRight02Icon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "cn";
import NextLink from "next/link";
import type { ReactNode } from "react";
import { Icon } from "@/components/shell/icon";
import { getT } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import { Avatar, AvatarGroup } from "@/registry/bases/base/ui/avatar";
import { Badge } from "@/registry/bases/base/ui/badge";
import { Button } from "@/registry/bases/base/ui/button";
import { Divider } from "@/registry/bases/base/ui/divider";
import { FeaturedIcon } from "@/registry/bases/base/ui/featured-icon";
import { Link } from "@/registry/bases/base/ui/link";
import { Skeleton } from "@/registry/bases/base/ui/skeleton";
import { Spinner } from "@/registry/bases/base/ui/spinner";
import { StatusTag, Tag } from "@/registry/bases/base/ui/tag";

/**
 * A bento tile: a small composition of real components. The composition is inert (not focusable,
 * hidden from screen readers) and the tile is one link. The name and the link slide in on hover
 * and on keyboard focus, and are always visible on touch screens.
 */
function Tile({
  name,
  href,
  lang,
  className,
  children,
}: {
  name: string;
  href: string;
  lang: Locale;
  className?: string;
  children: ReactNode;
}) {
  const t = getT(lang);
  return (
    <li
      className={cn(
        "group relative overflow-hidden rounded-lg border border-border-neutral-secondary bg-background-card transition-colors duration-150 hover:border-border-neutral-primary",
        className,
      )}
    >
      <div inert aria-hidden className="flex h-full flex-col p-6">
        {children}
      </div>
      <NextLink
        href={`/${lang}${href}`}
        className="absolute inset-0 flex items-end rounded-lg focus-visible:outline-offset-[-2px]"
      >
        <span
          className={cn(
            "flex w-full items-center justify-between gap-2 border-t border-border-neutral-secondary bg-background-card/95 px-6 py-3 text-sm font-semibold text-text-default backdrop-blur-sm",
            "translate-y-full opacity-0 transition duration-200 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:translate-y-0 group-hover:opacity-100",
            "[@media(hover:none)]:translate-y-0 [@media(hover:none)]:opacity-100",
          )}
        >
          <span>{name}</span>
          <span className="flex items-center gap-1 text-text-primary">
            {t("bento.viewDocs")}
            <Icon icon={ArrowRight02Icon} className="rtl:-scale-x-100" />
          </span>
        </span>
      </NextLink>
    </li>
  );
}

const KV = ({ k, v }: { k: string; v: ReactNode }) => (
  <div className="flex items-center justify-between gap-4 py-2 text-sm">
    <dt className="text-text-secondary-paragraph">{k}</dt>
    <dd className="font-medium text-text-default">{v}</dd>
  </div>
);

export function Bento({ lang }: { lang: Locale }) {
  const t = getT(lang);
  return (
    <ul className="grid grid-cols-1 gap-4 md:grid-cols-6">
      <Tile
        lang={lang}
        name="Status Tag"
        href="/docs/components/tag"
        className="md:col-span-4 md:row-span-2"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <Avatar size={48} initials={lang === "ar" ? "ن ق" : "NQ"} />
            <div>
              <p className="text-md font-semibold text-text-display">{t("bento.person")}</p>
              <p className="text-sm text-text-secondary-paragraph">{t("bento.request")}</p>
            </div>
          </div>
          <StatusTag variant="info">{t("bento.status")}</StatusTag>
        </div>
        <dl className="mt-6 divide-y divide-border-neutral-secondary">
          <KV k={t("bento.service")} v={t("bento.serviceValue")} />
          <KV k={t("bento.submitted")} v={t("bento.submittedValue")} />
          <KV
            k={t("bento.documents")}
            v={
              <span className="flex gap-2">
                <Badge variant="success">{t("bento.verified")}</Badge>
                <Badge variant="neutral">{t("bento.files")}</Badge>
              </span>
            }
          />
          <KV k={t("bento.priority")} v={<Tag variant="warning">{t("bento.standard")}</Tag>} />
        </dl>
        <div className="mt-auto flex gap-2 pt-8 pb-8">
          <Button variant="secondary">{t("bento.withdraw")}</Button>
          <Button variant="outline">{t("bento.addDocument")}</Button>
        </div>
      </Tile>

      <Tile lang={lang} name="Tag" href="/docs/components/tag" className="md:col-span-2">
        <p className="text-sm font-semibold text-text-default">{t("bento.filters")}</p>
        <div className="mt-4 flex flex-wrap gap-2 pb-6">
          <Tag variant="neutral">{t("bento.filter1")}</Tag>
          <Tag variant="info">{t("bento.filter2")}</Tag>
          <Tag variant="neutral" outlined>
            {t("bento.filter3")}
          </Tag>
          <Tag variant="success">{t("bento.filter4")}</Tag>
        </div>
      </Tile>

      <Tile lang={lang} name="Button" href="/docs/components/button" className="md:col-span-2">
        <p className="text-sm font-semibold text-text-default">{t("bento.actions")}</p>
        <div className="mt-4 flex flex-col gap-3 pb-6">
          <div className="flex flex-wrap items-center gap-2">
            <Button size="sm">{t("bento.continue")}</Button>
            <Button size="sm" variant="secondary">
              {t("bento.back")}
            </Button>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button>{t("bento.payFee")}</Button>
            <Button variant="outline" destructive>
              {t("bento.cancel")}
            </Button>
          </div>
        </div>
      </Tile>

      <Tile lang={lang} name="Skeleton" href="/docs/components/skeleton" className="md:col-span-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-text-default">{t("bento.loading")}</p>
          <Spinner size="sm" label={null} />
        </div>
        <div className="mt-4 flex flex-col gap-3 pb-6">
          <div className="flex items-center gap-3">
            <Skeleton shape="circle" size={48} />
            <div className="flex flex-1 flex-col gap-2">
              <Skeleton shape="line" size="lg" className="w-3/4" />
              <Skeleton shape="line" size="sm" className="w-1/2" />
            </div>
          </div>
          <Skeleton shape="line" size="sm" />
          <Skeleton shape="line" size="sm" className="w-5/6" />
        </div>
      </Tile>

      <Tile lang={lang} name="Avatar" href="/docs/components/avatar" className="md:col-span-2">
        <p className="text-sm font-semibold text-text-default">{t("bento.team")}</p>
        <div className="mt-4 flex items-center gap-4 pb-6">
          <AvatarGroup>
            <Avatar size={40} initials={lang === "ar" ? "ن ق" : "NQ"} />
            <Avatar size={40} initials={lang === "ar" ? "ف أ" : "FA"} />
            <Avatar size={40} initials={lang === "ar" ? "٣+" : "+3"} />
          </AvatarGroup>
          <p className="text-sm text-text-primary-paragraph">{t("bento.reviewers")}</p>
        </div>
      </Tile>

      <Tile
        lang={lang}
        name="Featured Icon"
        href="/docs/components/featured-icon"
        className="md:col-span-2"
      >
        <p className="text-sm font-semibold text-text-default">{t("bento.updates")}</p>
        <ul className="mt-4 flex flex-col gap-3 pb-6">
          {[
            { v: "success", icon: CheckmarkCircle02Icon, t: t("bento.update1") },
            { v: "warning", icon: Alert02Icon, t: t("bento.update2") },
            { v: "info", icon: InformationCircleIcon, t: t("bento.update3") },
          ].map((row) => (
            <li key={row.t} className="flex items-center gap-3 text-sm text-text-default">
              <FeaturedIcon variant={row.v as "success" | "warning" | "info"} size="sm">
                <Icon icon={row.icon} />
              </FeaturedIcon>
              {row.t}
            </li>
          ))}
        </ul>
      </Tile>

      <Tile lang={lang} name="Divider, Link" href="/docs/components/link" className="md:col-span-6">
        <div className="flex flex-col gap-4 pb-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-md text-text-default">
            {t("bento.terms", { link: "\u0000" })
              .split("\u0000")
              .flatMap((part, i, all) =>
                i < all.length - 1
                  ? [
                      part,
                      <Link key="terms" href="#">
                        {t("bento.termsLink")}
                      </Link>,
                    ]
                  : [part],
              )}
          </p>
          <Divider className="hidden h-6 sm:block" orientation="vertical" />
          <div className="flex flex-wrap gap-4">
            <Link href="#" variant="neutral">
              {t("bento.privacy")}
            </Link>
            <Link href="#" variant="neutral">
              {t("bento.accessibility")}
            </Link>
            <Link href="#" external externalLabel={t("newTab")}>
              dga.gov.sa
            </Link>
          </div>
        </div>
      </Tile>
    </ul>
  );
}
