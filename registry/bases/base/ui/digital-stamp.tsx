"use client";

import { ArrowDown01Icon, GlobalIcon, LockIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import * as React from "react";
import { cn } from "@/registry/bases/base/lib/utils";

/** The domain suffixes DGA lists for the Extension part of the Digital Stamp. */
type DigitalStampDomain = "gov.sa" | "edu.sa" | "med.sa" | "org.sa" | "sch.sa" | ".sa";

/** The English wording of each domain variant: the heading before the suffix, and the sentence under it. */
const DOMAIN_TEXT: Record<DigitalStampDomain, { title: string; text: string }> = {
  "gov.sa": {
    title: "Official government websites use",
    text: "Official government websites end with .gov.sa, a domain only Saudi government entities can have.",
  },
  "edu.sa": {
    title: "Official educational websites use",
    text: "Official websites of universities and educational bodies end with .edu.sa.",
  },
  "med.sa": {
    title: "Official health websites use",
    text: "Official websites of health entities and hospitals end with .med.sa.",
  },
  "org.sa": {
    title: "Official non-profit websites use",
    text: "Official websites of non-profit organisations end with .org.sa.",
  },
  "sch.sa": {
    title: "Official school websites use",
    text: "Official websites of schools end with .sch.sa.",
  },
  ".sa": {
    title: "Official Saudi websites use",
    text: "Official Saudi websites end with .sa. Check the whole address before you trust a site.",
  },
};

type DigitalStampProps = Omit<React.ComponentProps<"section">, "children" | "title"> & {
  /** The suffix the site's address ends with. It sets the default wording of the domain item. */
  domain?: DigitalStampDomain;
  /** The line in the strip. Translate it on Arabic pages. */
  label?: React.ReactNode;
  /** The text of the button that opens the panel. Translate it on Arabic pages. */
  toggleLabel?: React.ReactNode;
  /** Heading of the domain item in the panel (the suffix follows it in green). Default: by `domain`. */
  domainTitle?: React.ReactNode;
  /** Explains the domain. Default: by `domain`. */
  domainText?: React.ReactNode;
  /** Heading of the secure connection item. */
  httpsTitle?: React.ReactNode;
  /** Explains the padlock and https. */
  httpsText?: React.ReactNode;
  /** The line before the registration number in the registration card. Pass `null` to leave the card out. */
  registrationLabel?: React.ReactNode | null;
  /** The site's registration number with the Digital Government Authority. It is shown as a link. */
  registrationNumber?: React.ReactNode;
  /** Where the registration number links to (the site's record at the Authority). */
  registrationHref?: string;
  /** The logo in the registration card. Default: the DGA mark. */
  registrationLogo?: React.ReactNode;
  /** Accessible name of the default logo. Translate it on Arabic pages. */
  logoLabel?: string;
  /** Opens or closes the panel. Use it to control the stamp. */
  open?: boolean;
  /** Whether the panel starts open. */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Hides the Saudi flag at the start of the strip. */
  hideIcon?: boolean;
};

/** The Saudi flag mark: a green field with the white inscription and the sword. */
function SaudiFlag({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 16"
      aria-hidden
      focusable="false"
      className={cn("cn-digital-stamp-flag", className)}
    >
      <rect width="24" height="16" rx="2" className="fill-icon-success" />
      <path
        d="M5 5.4h14M6.5 7.2h11M8 4.2c1-.9 2-.9 3 0M13 4.2c1-.9 2-.9 3 0"
        fill="none"
        stroke="white"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
      <path d="M5.5 11.4h13" stroke="white" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M17.5 10.2l1.4 1.2-1.4 1.2" fill="none" stroke="white" strokeWidth="1" />
    </svg>
  );
}

/** The Digital Government Authority mark used in the registration card. */
function AuthorityMark({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 32 32" role="img" aria-label={label} className="cn-digital-stamp-logo">
      <circle cx="16" cy="16" r="15" className="fill-icon-success" />
      <path
        d="M9 20.5c2-5.5 4.6-8.2 7-8.2s5 2.7 7 8.2M12 21h8M16 8.5v3.8"
        fill="none"
        stroke="white"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/**
 * The official-site banner (DGA: Digital Stamp): a bar at the very top of a government site
 * with the Saudi flag, the line "A government website registered with the Digital Government
 * Authority." and a button ("How you know?") that opens a panel. The panel explains the domain
 * (`gov.sa`, `edu.sa`, `med.sa`, `org.sa`, `sch.sa` or `.sa`, each with its own text), the https
 * connection, and shows a registration card with the site's registration number as a link. Put
 * it in the `stamp` slot of the Header. The button is a real disclosure button (`aria-expanded`),
 * and Escape closes the panel and returns focus to it.
 */
function DigitalStamp({
  className,
  domain = "gov.sa",
  label = "A government website registered with the Digital Government Authority.",
  toggleLabel = "How you know?",
  domainTitle,
  domainText,
  httpsTitle = "Secure websites use HTTPS",
  httpsText = "Look for the padlock and https:// before the address. It means the connection to this site is encrypted.",
  registrationLabel = "Registered on Digital Government Authority:",
  registrationNumber,
  registrationHref = "#",
  registrationLogo,
  logoLabel = "Digital Government Authority",
  open: openProp,
  defaultOpen = false,
  onOpenChange,
  hideIcon = false,
  ...props
}: DigitalStampProps) {
  const [inner, setInner] = React.useState(defaultOpen);
  const open = openProp ?? inner;
  const panelId = React.useId();
  const button = React.useRef<HTMLButtonElement>(null);
  const change = (next: boolean) => {
    if (openProp === undefined) setInner(next);
    onOpenChange?.(next);
  };
  const suffix = domain.startsWith(".") ? domain : `.${domain}`;
  const fallback = DOMAIN_TEXT[domain];

  return (
    <section
      data-slot="digital-stamp"
      data-open={open ? "" : undefined}
      aria-label={typeof label === "string" ? label : undefined}
      className={cn("cn-digital-stamp", className)}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.stopPropagation();
          change(false);
          button.current?.focus();
        }
      }}
      {...props}
    >
      <div className="cn-digital-stamp-bar">
        {hideIcon ? null : <SaudiFlag />}
        <span className="cn-digital-stamp-label">{label}</span>
        <button
          ref={button}
          type="button"
          data-slot="digital-stamp-toggle"
          aria-expanded={open}
          aria-controls={panelId}
          className="cn-digital-stamp-toggle"
          onClick={() => change(!open)}
        >
          {toggleLabel}
          <HugeiconsIcon icon={ArrowDown01Icon} aria-hidden />
        </button>
      </div>
      <div
        id={panelId}
        hidden={!open}
        data-slot="digital-stamp-panel"
        className="cn-digital-stamp-panel"
      >
        <div className="cn-digital-stamp-items">
          <div className="cn-digital-stamp-item">
            <span className="cn-digital-stamp-icon">
              <HugeiconsIcon icon={GlobalIcon} aria-hidden />
            </span>
            <div className="cn-digital-stamp-text">
              <p className="cn-digital-stamp-title">
                {domainTitle ?? fallback.title}{" "}
                <bdi dir="ltr" className="cn-digital-stamp-domain">
                  {suffix}
                </bdi>
              </p>
              <p className="cn-digital-stamp-description">{domainText ?? fallback.text}</p>
            </div>
          </div>
          <div className="cn-digital-stamp-item">
            <span className="cn-digital-stamp-icon">
              <HugeiconsIcon icon={LockIcon} aria-hidden />
            </span>
            <div className="cn-digital-stamp-text">
              <p className="cn-digital-stamp-title">{httpsTitle}</p>
              <p className="cn-digital-stamp-description">{httpsText}</p>
            </div>
          </div>
          {registrationLabel === null ? null : (
            <div className="cn-digital-stamp-card" data-slot="digital-stamp-registration">
              {registrationLogo ?? <AuthorityMark label={logoLabel} />}
              <p className="cn-digital-stamp-card-text">
                {registrationLabel}{" "}
                {registrationNumber === undefined ? null : (
                  <a href={registrationHref} className="cn-digital-stamp-link">
                    <bdi dir="ltr">{registrationNumber}</bdi>
                  </a>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export type { DigitalStampDomain, DigitalStampProps };
export { DigitalStamp };
