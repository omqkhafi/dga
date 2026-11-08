"use client";

import {
  ArrowDown01Icon,
  CheckmarkCircle02Icon,
  Flag01Icon,
  LockIcon,
  SecurityCheckIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import * as React from "react";
import { cn } from "@/registry/bases/base/lib/utils";

/** The domain suffixes DGA lists for the Extension part of the Digital Stamp. */
type DigitalStampDomain = "gov.sa" | "edu.sa" | "med.sa" | "org.sa" | "sch.sa" | ".sa";

type DigitalStampProps = Omit<React.ComponentProps<"section">, "children" | "title"> & {
  /** The suffix the site's address ends with. It is shown in the opened panel. */
  domain?: DigitalStampDomain;
  /** The line in the strip. Translate it on Arabic pages. */
  label?: React.ReactNode;
  /** The text of the button that opens the panel. Translate it on Arabic pages. */
  toggleLabel?: React.ReactNode;
  /** Heading of the domain item in the panel. */
  domainTitle?: React.ReactNode;
  /** Explains the domain. Default: the address ends in the suffix of `domain`. */
  domainText?: React.ReactNode;
  /** Heading of the secure connection item. */
  httpsTitle?: React.ReactNode;
  /** Explains the padlock and https. */
  httpsText?: React.ReactNode;
  /** Heading of the registration item. Pass `null` to leave the item out. */
  registrationTitle?: React.ReactNode | null;
  /** Explains the Digital Government Authority registration. */
  registrationText?: React.ReactNode;
  /** Opens or closes the panel. Use it to control the stamp. */
  open?: boolean;
  /** Whether the panel starts open. */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  /** Hides the Saudi flag icon at the start of the strip. */
  hideIcon?: boolean;
};

/**
 * The official-site strip (DGA: Digital Stamp): a 32px bar at the very top of a government site
 * that says the site is official, with a button that opens a panel explaining how to check it:
 * the address ends in `gov.sa` (or `edu.sa`, `med.sa`, `org.sa`, `sch.sa`, `.sa`), the connection
 * is https, and the site is registered with the Digital Government Authority. Put it in the
 * `stamp` slot of the Header. The button is a real disclosure button (`aria-expanded`), and
 * Escape closes the panel and returns focus to it.
 */
function DigitalStamp({
  className,
  domain = "gov.sa",
  label = "An official website of the Saudi government",
  toggleLabel = "How to check",
  domainTitle = "Official websites end in a Saudi domain",
  domainText,
  httpsTitle = "Secure websites use https",
  httpsText = "Look for the padlock and https:// before the address. It means the connection to this site is encrypted.",
  registrationTitle = "Registered with the Digital Government Authority",
  registrationText = "Government websites are registered with the Digital Government Authority.",
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
        {hideIcon ? null : (
          <HugeiconsIcon icon={Flag01Icon} aria-hidden className="cn-digital-stamp-flag" />
        )}
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
        <ul className="cn-digital-stamp-items">
          <li className="cn-digital-stamp-item">
            <HugeiconsIcon
              icon={CheckmarkCircle02Icon}
              aria-hidden
              className="cn-digital-stamp-icon"
            />
            <div className="cn-digital-stamp-text">
              <p className="cn-digital-stamp-title">
                {domainTitle}{" "}
                <bdi dir="ltr" className="cn-digital-stamp-domain">
                  {suffix}
                </bdi>
              </p>
              <p className="cn-digital-stamp-description">
                {domainText ?? (
                  <>
                    The address of this site ends in{" "}
                    <bdi dir="ltr" className="cn-digital-stamp-domain">
                      {suffix}
                    </bdi>
                    .
                  </>
                )}
              </p>
            </div>
          </li>
          <li className="cn-digital-stamp-item">
            <HugeiconsIcon icon={LockIcon} aria-hidden className="cn-digital-stamp-icon" />
            <div className="cn-digital-stamp-text">
              <p className="cn-digital-stamp-title">{httpsTitle}</p>
              <p className="cn-digital-stamp-description">{httpsText}</p>
            </div>
          </li>
          {registrationTitle === null ? null : (
            <li className="cn-digital-stamp-item">
              <HugeiconsIcon
                icon={SecurityCheckIcon}
                aria-hidden
                className="cn-digital-stamp-icon"
              />
              <div className="cn-digital-stamp-text">
                <p className="cn-digital-stamp-title">{registrationTitle}</p>
                <p className="cn-digital-stamp-description">{registrationText}</p>
              </div>
            </li>
          )}
        </ul>
      </div>
    </section>
  );
}

export type { DigitalStampDomain, DigitalStampProps };
export { DigitalStamp };
