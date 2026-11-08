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
      className={cn("w-full bg-background-neutral-100 text-sm font-medium text-text-default", className)}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.stopPropagation();
          change(false);
          button.current?.focus();
        }
      }}
      {...props}
    >
      <div className="mx-auto flex min-h-8 w-full max-w-[1280px] flex-wrap items-center gap-x-2 px-section-padding py-1">
        {hideIcon ? null : (
          <HugeiconsIcon icon={Flag01Icon} aria-hidden className="size-4 shrink-0 text-icon-default" />
        )}
        <span className="min-w-0">{label}</span>
        <button
          ref={button}
          type="button"
          data-slot="digital-stamp-toggle"
          aria-expanded={open}
          aria-controls={panelId}
          className="inline-flex min-h-6 cursor-pointer items-center gap-1 rounded-xs border-0 bg-transparent p-0 text-sm font-medium text-text-default underline underline-offset-4 hover:decoration-2 active:decoration-2 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-border-black [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform aria-expanded:[&_svg]:rotate-180 motion-reduce:[&_svg]:transition-none"
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
        className="border-t border-border-neutral-secondary"
      >
        <ul className="mx-auto m-0 grid w-full max-w-[1280px] list-none gap-6 p-0 px-section-padding py-4 md:grid-cols-3">
          <li className="flex items-start gap-(--spacing-xl)">
            <HugeiconsIcon
              icon={CheckmarkCircle02Icon}
              aria-hidden
              className="size-6 shrink-0 text-icon-success"
            />
            <div className="flex min-w-0 flex-col gap-1">
              <p className="m-0 text-lg font-semibold text-text-default">
                {domainTitle}{" "}
                <bdi dir="ltr" className="font-bold">
                  {suffix}
                </bdi>
              </p>
              <p className="m-0 text-sm font-normal text-text-primary-paragraph">
                {domainText ?? (
                  <>
                    The address of this site ends in{" "}
                    <bdi dir="ltr" className="font-bold">
                      {suffix}
                    </bdi>
                    .
                  </>
                )}
              </p>
            </div>
          </li>
          <li className="flex items-start gap-(--spacing-xl)">
            <HugeiconsIcon icon={LockIcon} aria-hidden className="size-6 shrink-0 text-icon-success" />
            <div className="flex min-w-0 flex-col gap-1">
              <p className="m-0 text-lg font-semibold text-text-default">{httpsTitle}</p>
              <p className="m-0 text-sm font-normal text-text-primary-paragraph">{httpsText}</p>
            </div>
          </li>
          {registrationTitle === null ? null : (
            <li className="flex items-start gap-(--spacing-xl)">
              <HugeiconsIcon
                icon={SecurityCheckIcon}
                aria-hidden
                className="size-6 shrink-0 text-icon-success"
              />
              <div className="flex min-w-0 flex-col gap-1">
                <p className="m-0 text-lg font-semibold text-text-default">{registrationTitle}</p>
                <p className="m-0 text-sm font-normal text-text-primary-paragraph">{registrationText}</p>
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
