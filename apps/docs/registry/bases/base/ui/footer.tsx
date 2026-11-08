"use client";

import { LinkSquare02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { cva, type VariantProps } from "class-variance-authority";
import type * as React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/dga/accordion";
import { cn } from "@/registry/bases/base/lib/utils";

type IconSvg = React.ComponentProps<typeof HugeiconsIcon>["icon"];

const footerVariants = cva("w-full text-md", {
  variants: {
    tone: { default: "bg-background-neutral-100 text-text-default", green: "bg-background-sa-flag text-text-oncolor-primary" },
  },
  defaultVariants: { tone: "default" },
});

type FooterLink = {
  label: string;
  href: string;
  /** Opens in a new tab with an external-link icon. */
  external?: boolean;
};

/** A column of navigation links with a heading. */
type FooterColumn = {
  title: string;
  links: FooterLink[];
};

type FooterSocialLink = {
  /** The accessible name, for example "X" or "LinkedIn". */
  label: string;
  href: string;
  icon: IconSvg;
};

/** One accessibility tool: a bordered icon button, for example text size or contrast. */
type FooterTool = {
  /** The accessible name, for example "Increase text size". */
  label: string;
  icon: IconSvg;
  /** Makes the tool a button. */
  onClick?: () => void;
  /** Makes the tool a link. */
  href?: string;
  /** For a toggle (such as high contrast): whether it is on. */
  pressed?: boolean;
};

type FooterContactItem = {
  /** The kind of detail, for example "Phone". */
  label: string;
  /** The value, for example "920000000". */
  value: string;
  /** Makes the value a link, for example `tel:920000000`. */
  href?: string;
  icon?: IconSvg;
};

type FooterProps = Omit<React.ComponentProps<"footer">, "children"> &
  VariantProps<typeof footerVariants> & {
    /** The entity's logo. */
    logo?: React.ReactNode;
    /** Platform and partner logos (Vision 2030, national platforms), shown on a white tile. */
    partnerLogos?: React.ReactNode;
    /** A short text under the logo. */
    description?: React.ReactNode;
    /** Navigation link columns. */
    columns?: FooterColumn[];
    /** The name of the links area. Translate it on Arabic pages. */
    columnsLabel?: string;
    /** Social media links. */
    social?: FooterSocialLink[];
    /** The heading of the social media block. */
    socialTitle?: string;
    /** The name of the social links list. */
    socialLabel?: string;
    /** Accessibility tools: bordered icon buttons in a block of their own. */
    accessibilityTools?: FooterTool[];
    /** The heading of the accessibility tools block. */
    accessibilityTitle?: string;
    /** The heading of the contact block. */
    contactTitle?: string;
    contact?: FooterContactItem[];
    /** The heading of the app badges block. */
    badgesTitle?: string;
    /** App store badges: pass links with their images. */
    badges?: React.ReactNode;
    /** A row of underlined links above the legal row, for example the owning entity's sites. */
    bottomLinks?: FooterLink[];
    /** The name of the bottom links list. */
    bottomLabel?: string;
    /** The legal links row: terms and conditions, privacy policy. */
    legalLinks?: FooterLink[];
    /** The name of the legal links list. */
    legalLabel?: string;
    /** The copyright line. */
    copyright?: React.ReactNode;
    /** Folds the link columns into an Accordion on narrow screens. Default false: two columns. */
    collapsible?: boolean;
    /** Spans the whole width. Default: centred, 1280px at most. */
    fullWidth?: boolean;
    /** Screen-reader text added to external links. */
    externalLabel?: string;
  };

function FooterAnchor({
  link,
  externalLabel,
  className,
}: {
  link: FooterLink;
  externalLabel: string;
  className?: string;
}) {
  return (
    <a
      className={cn("inline-flex items-center gap-1 rounded-xs text-md font-normal text-inherit underline-offset-4 hover:underline active:underline focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-border-black in-data-[tone=green]:focus-visible:outline-border-white", className)}
      href={link.href}
      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {link.label}
      {link.external ? (
        <>
          <HugeiconsIcon icon={LinkSquare02Icon} aria-hidden className="size-4 shrink-0 rtl:-scale-x-100" />
          <span className="sr-only">{externalLabel}</span>
        </>
      ) : null}
    </a>
  );
}

function FooterToolButton({ tool }: { tool: FooterTool }) {
  const content = <HugeiconsIcon icon={tool.icon} aria-hidden />;
  if (tool.href && !tool.onClick) {
    return (
      <a className="inline-flex size-10 cursor-pointer items-center justify-center rounded-sm border border-border-neutral-primary bg-transparent p-0 text-icon-default no-underline hover:bg-button-background-neutral-hovered active:bg-button-background-neutral-pressed aria-pressed:bg-button-background-neutral-pressed focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-1 focus-visible:outline-border-black [&_svg]:size-5 in-data-[tone=green]:border-alpha-white-40 in-data-[tone=green]:text-icon-oncolor in-data-[tone=green]:hover:bg-button-background-transparent-hovered in-data-[tone=green]:active:bg-button-background-transparent-pressed in-data-[tone=green]:aria-pressed:bg-button-background-transparent-pressed in-data-[tone=green]:focus-visible:outline-border-white" href={tool.href} aria-label={tool.label}>
        {content}
      </a>
    );
  }
  return (
    <button
      type="button"
      className="inline-flex size-10 cursor-pointer items-center justify-center rounded-sm border border-border-neutral-primary bg-transparent p-0 text-icon-default no-underline hover:bg-button-background-neutral-hovered active:bg-button-background-neutral-pressed aria-pressed:bg-button-background-neutral-pressed focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-1 focus-visible:outline-border-black [&_svg]:size-5 in-data-[tone=green]:border-alpha-white-40 in-data-[tone=green]:text-icon-oncolor in-data-[tone=green]:hover:bg-button-background-transparent-hovered in-data-[tone=green]:active:bg-button-background-transparent-pressed in-data-[tone=green]:aria-pressed:bg-button-background-transparent-pressed in-data-[tone=green]:focus-visible:outline-border-white"
      aria-label={tool.label}
      aria-pressed={tool.pressed}
      onClick={tool.onClick}
    >
      {content}
    </button>
  );
}

/**
 * The site footer (DGA: Footer): logos (platform logos on white), link groups, a Social Media
 * block, an Accessibility Tools block, a row of underlined links, and the legal row with the
 * copyright, terms and privacy. Contact details, a description and app badges are optional.
 * Default (gray) or dark green. Below `sm` the groups sit in two columns and the legal row is
 * centred; `collapsible` folds them into an Accordion instead. Every visible text is a prop, so
 * translate it on Arabic pages.
 */
function Footer({
  className,
  tone,
  logo,
  partnerLogos,
  description,
  columns = [],
  columnsLabel = "Footer links",
  social = [],
  socialTitle,
  socialLabel = "Social media",
  accessibilityTools = [],
  accessibilityTitle,
  contactTitle,
  contact = [],
  badgesTitle,
  badges,
  bottomLinks = [],
  bottomLabel = "More links",
  legalLinks = [],
  legalLabel = "Legal",
  copyright,
  collapsible = false,
  fullWidth = false,
  externalLabel = "(opens in a new tab)",
  ...props
}: FooterProps) {
  const hasBrand = logo || partnerLogos || description;
  const hasAside =
    social.length > 0 || accessibilityTools.length > 0 || contact.length > 0 || badges;
  return (
    <footer
      data-slot="footer"
      data-tone={tone ?? "default"}
      className={cn(footerVariants({ tone }), className)}
      {...props}
    >
      <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 px-4 py-6 lg:px-8 data-full:max-w-none" data-full={fullWidth ? "" : undefined}>
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          {hasBrand ? (
            <div data-slot="footer-brand" className="flex flex-col gap-4 lg:w-80 lg:shrink-0">
              {logo ? <div className="flex flex-wrap items-center gap-4">{logo}</div> : null}
              {partnerLogos ? (
                <div data-slot="footer-partner-logos" className="flex w-fit max-w-full flex-wrap items-center gap-4 rounded-sm bg-white p-3 text-black">
                  {partnerLogos}
                </div>
              ) : null}
              {description ? <p className="m-0 max-w-prose text-md">{description}</p> : null}
            </div>
          ) : null}

          {columns.length > 0 ? (
            <nav aria-label={columnsLabel} data-slot="footer-columns" className="min-w-0 flex-1">
              <div
                className={cn("grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-8 sm:[grid-template-columns:repeat(min(var(--footer-columns,1),4),minmax(0,1fr))]", collapsible && "max-sm:hidden")}
                style={{ "--footer-columns": columns.length } as React.CSSProperties}
              >
                {columns.map((column) => (
                  <div key={column.title} className="flex min-w-0 flex-col gap-3">
                    <h2 className="m-0 border-b border-border-neutral-primary pb-2 text-md font-bold text-inherit in-data-[tone=green]:border-alpha-white-30">{column.title}</h2>
                    <ul className="m-0 flex list-none flex-col gap-2 p-0">
                      {column.links.map((link) => (
                        <li key={link.href}>
                          <FooterAnchor link={link} externalLabel={externalLabel} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              {collapsible ? (
                <Accordion multiple size="md" className="in-data-[tone=green]:border-alpha-white-30 in-data-[tone=green]:[&_[data-slot=accordion-item]]:border-alpha-white-30 in-data-[tone=green]:[&_[data-slot=accordion-trigger]]:text-text-oncolor-primary in-data-[tone=green]:[&_[data-slot=accordion-trigger]]:hover:bg-button-background-transparent-hovered in-data-[tone=green]:[&_[data-slot=accordion-trigger]]:active:bg-button-background-transparent-pressed in-data-[tone=green]:[&_[data-slot=accordion-trigger]]:focus-visible:outline-border-white in-data-[tone=green]:[&_[data-slot=accordion-trigger]_svg]:text-icon-oncolor in-data-[tone=green]:[&_[data-slot=accordion-content]]:text-text-oncolor-primary sm:hidden">
                  {columns.map((column) => (
                    <AccordionItem key={column.title} value={column.title}>
                      <AccordionTrigger>{column.title}</AccordionTrigger>
                      <AccordionContent>
                        <ul className="m-0 flex list-none flex-col gap-2 p-0">
                          {column.links.map((link) => (
                            <li key={link.href}>
                              <FooterAnchor link={link} externalLabel={externalLabel} />
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              ) : null}
            </nav>
          ) : null}

          {hasAside ? (
            <div data-slot="footer-aside" className="flex flex-col gap-6 lg:w-64 lg:shrink-0">
              {social.length > 0 ? (
                <section className="flex min-w-0 flex-col gap-3">
                  {socialTitle ? <h2 className="m-0 border-b border-border-neutral-primary pb-2 text-md font-bold text-inherit in-data-[tone=green]:border-alpha-white-30">{socialTitle}</h2> : null}
                  <ul aria-label={socialLabel} className="m-0 flex list-none flex-wrap gap-2 p-0">
                    {social.map((item) => (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          aria-label={item.label}
                          className="inline-flex size-10 cursor-pointer items-center justify-center rounded-sm border border-border-neutral-primary bg-transparent p-0 text-icon-default no-underline hover:bg-button-background-neutral-hovered active:bg-button-background-neutral-pressed aria-pressed:bg-button-background-neutral-pressed focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-1 focus-visible:outline-border-black [&_svg]:size-5 in-data-[tone=green]:border-alpha-white-40 in-data-[tone=green]:text-icon-oncolor in-data-[tone=green]:hover:bg-button-background-transparent-hovered in-data-[tone=green]:active:bg-button-background-transparent-pressed in-data-[tone=green]:aria-pressed:bg-button-background-transparent-pressed in-data-[tone=green]:focus-visible:outline-border-white"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <HugeiconsIcon icon={item.icon} aria-hidden />
                        </a>
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
              {accessibilityTools.length > 0 ? (
                <section className="flex min-w-0 flex-col gap-3">
                  {accessibilityTitle ? (
                    <h2 className="m-0 border-b border-border-neutral-primary pb-2 text-md font-bold text-inherit in-data-[tone=green]:border-alpha-white-30">{accessibilityTitle}</h2>
                  ) : null}
                  <ul aria-label={accessibilityTitle} className="m-0 flex list-none flex-wrap gap-2 p-0">
                    {accessibilityTools.map((tool) => (
                      <li key={tool.label}>
                        <FooterToolButton tool={tool} />
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
              {contact.length > 0 ? (
                <section className="flex min-w-0 flex-col gap-3">
                  {contactTitle ? <h2 className="m-0 border-b border-border-neutral-primary pb-2 text-md font-bold text-inherit in-data-[tone=green]:border-alpha-white-30">{contactTitle}</h2> : null}
                  <ul className="m-0 flex list-none flex-col gap-2 p-0">
                    {contact.map((item) => (
                      <li key={item.label} className="flex items-center gap-2">
                        {item.icon ? (
                          <HugeiconsIcon
                            icon={item.icon}
                            aria-hidden
                            className="size-5 shrink-0 text-icon-default in-data-[tone=green]:text-icon-oncolor"
                          />
                        ) : null}
                        <span className="sr-only">{item.label}: </span>
                        {item.href ? (
                          <a className="inline-flex items-center gap-1 rounded-xs text-md font-normal text-inherit underline-offset-4 hover:underline active:underline focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-border-black in-data-[tone=green]:focus-visible:outline-border-white" href={item.href}>
                            {item.value}
                          </a>
                        ) : (
                          <span>{item.value}</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </section>
              ) : null}
              {badges ? (
                <section className="flex min-w-0 flex-col gap-3">
                  {badgesTitle ? <h2 className="m-0 border-b border-border-neutral-primary pb-2 text-md font-bold text-inherit in-data-[tone=green]:border-alpha-white-30">{badgesTitle}</h2> : null}
                  <div className="flex flex-wrap items-center gap-3">{badges}</div>
                </section>
              ) : null}
            </div>
          ) : null}
        </div>

        {bottomLinks.length > 0 ? (
          <nav aria-label={bottomLabel} data-slot="footer-bottom-links">
            <ul className="m-0 flex list-none flex-wrap justify-center gap-x-6 gap-y-2 border-t border-border-neutral-primary p-0 pt-6 in-data-[tone=green]:border-alpha-white-30 sm:justify-start">
              {bottomLinks.map((link) => (
                <li key={link.href}>
                  <FooterAnchor link={link} externalLabel={externalLabel} className="underline" />
                </li>
              ))}
            </ul>
          </nav>
        ) : null}

        {legalLinks.length > 0 || copyright ? (
          <div data-slot="footer-bottom" className="flex flex-col items-center gap-4 border-t border-border-neutral-primary pt-6 text-center in-data-[tone=green]:border-alpha-white-30 sm:flex-row sm:justify-between sm:text-start">
            {copyright ? <p className="m-0 text-md">{copyright}</p> : null}
            {legalLinks.length > 0 ? (
              <nav aria-label={legalLabel}>
                <ul className="m-0 flex list-none flex-wrap justify-center gap-x-6 gap-y-2 p-0">
                  {legalLinks.map((link) => (
                    <li key={link.href}>
                      <FooterAnchor link={link} externalLabel={externalLabel} />
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
          </div>
        ) : null}
      </div>
    </footer>
  );
}

export type {
  FooterColumn,
  FooterContactItem,
  FooterLink,
  FooterProps,
  FooterSocialLink,
  FooterTool,
};
export { Footer, footerVariants };
