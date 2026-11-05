import {
  Alert02Icon,
  AlertCircleIcon,
  CheckmarkCircle02Icon,
  InformationCircleIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import { cn } from "cn";
import { Badge } from "@/registry/bases/base/ui/badge";
import { Button } from "@/registry/bases/base/ui/button";
import { FeaturedIcon } from "@/registry/bases/base/ui/featured-icon";
import { Link } from "@/registry/bases/base/ui/link";
import { StatusTag, Tag } from "@/registry/bases/base/ui/tag";

type Mode = "light" | "dark";

const ALERTS: {
  status: "success" | "info" | "warning" | "error";
  icon: IconSvgElement;
  title: string;
  body: string;
  box: string;
  iconColor: string;
}[] = [
  {
    status: "success",
    icon: CheckmarkCircle02Icon,
    title: "Request submitted",
    body: "You will get an SMS when it is reviewed.",
    box: "border-border-success-light bg-background-success-50 text-text-success",
    iconColor: "text-icon-success",
  },
  {
    status: "info",
    icon: InformationCircleIcon,
    title: "Service hours",
    body: "Sunday to Thursday, 8:00 to 16:00.",
    box: "border-border-info-light bg-background-info-50 text-text-info",
    iconColor: "text-icon-info",
  },
  {
    status: "warning",
    icon: Alert02Icon,
    title: "Document expires soon",
    body: "Renew it within 14 days to avoid a fee.",
    box: "border-border-warning-light bg-background-warning-50 text-text-warning",
    iconColor: "text-icon-warning",
  },
  {
    status: "error",
    icon: AlertCircleIcon,
    title: "Payment failed",
    body: "Check the card details and try again.",
    box: "border-border-error-light bg-background-error-50 text-text-error",
    iconColor: "text-icon-error",
  },
];

const STYLES = ["primary", "neutral", "secondary", "outline", "subtle", "transparent"] as const;

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-2">
      <h4 className="text-[0.8125rem] font-semibold text-text-secondary-paragraph">{title}</h4>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </section>
  );
}

function Panel({ mode }: { mode: Mode }) {
  return (
    <div
      data-theme={mode}
      data-compare={mode}
      className={cn(
        mode === "dark" && "dark",
        "flex flex-col gap-5 rounded-md border border-border-neutral-secondary bg-background-body p-4 text-text-default",
      )}
    >
      <p className="text-sm font-semibold text-text-display">
        {mode === "light" ? "Light" : "Dark"}
      </p>

      <Group title="Surfaces: body, surface, raised">
        <div className="flex h-14 w-full overflow-hidden rounded-sm border border-border-neutral-secondary text-[0.8125rem]">
          <span className="flex flex-1 items-center justify-center bg-background-body">Body</span>
          <span className="flex flex-1 items-center justify-center bg-background-card">
            Surface
          </span>
          <span className="flex flex-1 items-center justify-center bg-background-menu">Raised</span>
        </div>
      </Group>

      <Group title="Text: default, primary paragraph, secondary paragraph">
        <span className="text-sm text-text-default">Default</span>
        <span className="text-sm text-text-primary-paragraph">Primary</span>
        <span className="text-sm text-text-secondary-paragraph">Secondary</span>
        <span className="text-sm text-text-primary">Brand</span>
      </Group>

      <Group title="Button">
        {STYLES.map((variant) => (
          <Button key={variant} variant={variant}>
            {variant}
          </Button>
        ))}
      </Group>
      <Group title="Button, destructive">
        {STYLES.filter((v) => v !== "neutral").map((variant) => (
          <Button key={variant} variant={variant} destructive>
            {variant}
          </Button>
        ))}
      </Group>

      <Group title="Badge">
        {(["neutral", "success", "error", "warning", "info", "purple", "orange"] as const).map(
          (variant) => (
            <Badge key={variant} variant={variant}>
              {variant}
            </Badge>
          ),
        )}
      </Group>
      <Group title="Badge, outlined">
        {(["neutral", "success", "error", "warning", "info"] as const).map((variant) => (
          <Badge key={variant} variant={variant} outlined>
            {variant}
          </Badge>
        ))}
      </Group>

      <Group title="Tag and Status Tag">
        {(["neutral", "success", "info", "warning", "error"] as const).map((variant) => (
          <Tag key={variant} variant={variant}>
            {variant}
          </Tag>
        ))}
        {(["neutral", "success", "info", "warning", "error"] as const).map((variant) => (
          <StatusTag key={variant} variant={variant}>
            {variant}
          </StatusTag>
        ))}
      </Group>

      <Group title="Link">
        <Link href="#compare">Primary</Link>
        <Link href="#compare" variant="neutral">
          Neutral
        </Link>
        <Link href="#compare" inline>
          Inline
        </Link>
        <Link href="#compare" external>
          External
        </Link>
      </Group>

      <Group title="Alert-like surfaces">
        <ul className="flex w-full flex-col gap-2">
          {ALERTS.map((a) => (
            <li
              key={a.status}
              className={cn("flex items-start gap-3 rounded-sm border p-3", a.box)}
            >
              <HugeiconsIcon
                icon={a.icon}
                className={cn("mt-0.5 size-5 shrink-0", a.iconColor)}
                aria-hidden
              />
              <div className="flex flex-col">
                <p className="text-sm font-semibold">{a.title}</p>
                <p className="text-sm text-text-primary-paragraph">{a.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </Group>

      <Group title="Featured icon">
        {(["brand", "neutral", "success", "info", "warning", "error"] as const).map((variant) => (
          <FeaturedIcon key={variant} variant={variant} size="md">
            <HugeiconsIcon icon={InformationCircleIcon} />
          </FeaturedIcon>
        ))}
      </Group>
    </div>
  );
}

/** Light and dark side by side in one page, from the same markup. Both panels are live. */
export function ThemeCompare() {
  return (
    <div id="compare" className="not-prose my-6 grid gap-4 lg:grid-cols-2">
      <Panel mode="light" />
      <Panel mode="dark" />
    </div>
  );
}
