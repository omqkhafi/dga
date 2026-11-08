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

const footerVariants = cva("cn-footer", {
  variants: {
    tone: { default: "cn-footer-tone-default", green: "cn-footer-tone-green" },
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
    /** More logos (partners, Vision 2030) shown after the main one. */
    partnerLogos?: React.ReactNode;
    /** A short text under the logo. */
    description?: React.ReactNode;
    /** Navigation link columns. */
    columns?: FooterColumn[];
    /** The name of the links area. Translate it on Arabic pages. */
    columnsLabel?: string;
    /** Social media links. */
    social?: FooterSocialLink[];
    /** The name of the social links list. */
    socialLabel?: string;
    /** The heading of the contact block. */
    contactTitle?: string;
    contact?: FooterContactItem[];
    /** The heading of the app badges block. */
    badgesTitle?: string;
    /** App store badges: pass links with their images. */
    badges?: React.ReactNode;
    /** The legal links row: privacy, terms, accessibility. */
    legalLinks?: FooterLink[];
    /** The name of the legal links list. */
    legalLabel?: string;
    /** The copyright line. */
    copyright?: React.ReactNode;
    /** Folds the link columns into an Accordion on narrow screens. Default true. */
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
      className={cn("cn-footer-link", className)}
      href={link.href}
      {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {link.label}
      {link.external ? (
        <>
          <HugeiconsIcon icon={LinkSquare02Icon} aria-hidden className="cn-footer-link-icon" />
          <span className="sr-only">{externalLabel}</span>
        </>
      ) : null}
    </a>
  );
}

/**
 * The site footer (DGA: Footer): logos, a description and social links, columns of navigation
 * links, contact details, app badges, and a row with the legal links and the copyright. Default
 * (gray) or dark green. Below the `sm` width the link columns fold into an Accordion, one
 * section per column. Every visible text is a prop, so translate it on Arabic pages.
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
  socialLabel = "Social media",
  contactTitle,
  contact = [],
  badgesTitle,
  badges,
  legalLinks = [],
  legalLabel = "Legal",
  copyright,
  collapsible = true,
  fullWidth = false,
  externalLabel = "(opens in a new tab)",
  ...props
}: FooterProps) {
  const hasBrand = logo || partnerLogos || description || social.length > 0;
  const hasAside = contact.length > 0 || badges;
  return (
    <footer
      data-slot="footer"
      data-tone={tone ?? "default"}
      className={cn(footerVariants({ tone }), className)}
      {...props}
    >
      <div className="cn-footer-inner" data-full={fullWidth ? "" : undefined}>
        <div className="cn-footer-top">
          {hasBrand ? (
            <div data-slot="footer-brand" className="cn-footer-brand">
              {logo || partnerLogos ? (
                <div className="cn-footer-logos">
                  {logo}
                  {partnerLogos}
                </div>
              ) : null}
              {description ? <p className="cn-footer-description">{description}</p> : null}
              {social.length > 0 ? (
                <ul aria-label={socialLabel} className="cn-footer-social">
                  {social.map((item) => (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        aria-label={item.label}
                        className="cn-footer-social-link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <HugeiconsIcon icon={item.icon} aria-hidden />
                      </a>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          ) : null}

          {columns.length > 0 ? (
            <nav aria-label={columnsLabel} data-slot="footer-columns" className="cn-footer-columns">
              <div
                className={cn("cn-footer-grid", collapsible && "max-sm:hidden")}
                style={{ "--footer-columns": columns.length } as React.CSSProperties}
              >
                {columns.map((column) => (
                  <div key={column.title} className="cn-footer-column">
                    <h2 className="cn-footer-column-title">{column.title}</h2>
                    <ul className="cn-footer-list">
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
                <Accordion multiple size="md" className="cn-footer-accordion sm:hidden">
                  {columns.map((column) => (
                    <AccordionItem key={column.title} value={column.title}>
                      <AccordionTrigger>{column.title}</AccordionTrigger>
                      <AccordionContent>
                        <ul className="cn-footer-list">
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
            <div data-slot="footer-aside" className="cn-footer-aside">
              {contact.length > 0 ? (
                <section className="cn-footer-column">
                  {contactTitle ? <h2 className="cn-footer-column-title">{contactTitle}</h2> : null}
                  <ul className="cn-footer-list">
                    {contact.map((item) => (
                      <li key={item.label} className="cn-footer-contact">
                        {item.icon ? (
                          <HugeiconsIcon
                            icon={item.icon}
                            aria-hidden
                            className="cn-footer-contact-icon"
                          />
                        ) : null}
                        <span className="sr-only">{item.label}: </span>
                        {item.href ? (
                          <a className="cn-footer-link" href={item.href}>
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
                <section className="cn-footer-column">
                  {badgesTitle ? <h2 className="cn-footer-column-title">{badgesTitle}</h2> : null}
                  <div className="cn-footer-badges">{badges}</div>
                </section>
              ) : null}
            </div>
          ) : null}
        </div>

        {legalLinks.length > 0 || copyright ? (
          <div data-slot="footer-bottom" className="cn-footer-bottom">
            {copyright ? <p className="cn-footer-copyright">{copyright}</p> : null}
            {legalLinks.length > 0 ? (
              <nav aria-label={legalLabel}>
                <ul className="cn-footer-legal">
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

export type { FooterColumn, FooterContactItem, FooterLink, FooterProps, FooterSocialLink };
export { Footer, footerVariants };
