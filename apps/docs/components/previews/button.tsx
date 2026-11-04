"use client";

import {
  Add01Icon,
  ArrowRight02Icon,
  Delete02Icon,
  Download04Icon,
  Search01Icon,
  Settings02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { Button, type ButtonProps } from "@/registry/bases/base/ui/button";
import { Bi } from "./bi";
import { OnColorSurface, Row, Stack } from "./kit";

type Variant = NonNullable<ButtonProps["variant"]>;
const VARIANTS: { value: Variant; en: string; ar: string }[] = [
  { value: "primary", en: "Primary", ar: "أساسي" },
  { value: "neutral", en: "Neutral", ar: "محايد" },
  { value: "secondary", en: "Secondary", ar: "ثانوي" },
  { value: "outline", en: "Outline", ar: "محدد" },
  { value: "subtle", en: "Subtle", ar: "خفيف" },
  { value: "transparent", en: "Transparent", ar: "شفاف" },
];
const DESTRUCTIVE = VARIANTS.filter((v) => v.value !== "neutral");

/** Directional icons mirror in RTL. */
const Arrow = () => (
  <HugeiconsIcon icon={ArrowRight02Icon} data-icon="inline-end" className="rtl:-scale-x-100" />
);

export function ButtonVariants() {
  return (
    <Row>
      {VARIANTS.map((v) => (
        <Button key={v.value} variant={v.value}>
          <Bi en={v.en} ar={v.ar} />
        </Button>
      ))}
    </Row>
  );
}

export function ButtonOnColor() {
  return (
    <Stack>
      <OnColorSurface>
        {VARIANTS.map((v) => (
          <Button key={v.value} variant={v.value} onColor>
            <Bi en={v.en} ar={v.ar} />
          </Button>
        ))}
      </OnColorSurface>
      <OnColorSurface tone="nav">
        {DESTRUCTIVE.map((v) => (
          <Button key={v.value} variant={v.value} onColor destructive>
            <Bi en="Delete" ar="حذف" />
          </Button>
        ))}
      </OnColorSurface>
    </Stack>
  );
}

export function ButtonDestructive() {
  return (
    <Row>
      {DESTRUCTIVE.map((v) => (
        <Button key={v.value} variant={v.value} destructive>
          <HugeiconsIcon icon={Delete02Icon} data-icon="inline-start" />
          <Bi en="Delete" ar="حذف" />
        </Button>
      ))}
    </Row>
  );
}

export function ButtonSizes() {
  return (
    <Stack>
      {(["sm", "md", "lg"] as const).map((size) => (
        <Row key={size} label={`size="${size}"`}>
          <Button size={size}>
            <HugeiconsIcon icon={Add01Icon} data-icon="inline-start" />
            <Bi en="New request" ar="طلب جديد" />
          </Button>
          <Button size={size} variant="outline">
            <Bi en="Continue" ar="متابعة" />
            <Arrow />
          </Button>
          <Button size={size} variant="secondary" iconOnly aria-label="Settings">
            <HugeiconsIcon icon={Settings02Icon} />
          </Button>
        </Row>
      ))}
    </Stack>
  );
}

export function ButtonIcons() {
  return (
    <Stack>
      <Row label="Leading and trailing icons">
        <Button>
          <HugeiconsIcon icon={Download04Icon} data-icon="inline-start" />
          <Bi en="Download" ar="تنزيل" />
        </Button>
        <Button variant="secondary">
          <Bi en="Next" ar="التالي" />
          <Arrow />
        </Button>
      </Row>
      <Row label="Icon only (aria-label required)">
        {VARIANTS.map((v) => (
          <Button key={v.value} variant={v.value} iconOnly aria-label="Search">
            <HugeiconsIcon icon={Search01Icon} />
          </Button>
        ))}
      </Row>
    </Stack>
  );
}

export function ButtonStates() {
  const [pressed, setPressed] = useState(true);
  const [loading, setLoading] = useState(false);
  return (
    <Stack>
      <Row label="Selected (aria-pressed): click to toggle">
        {VARIANTS.map((v) => (
          <Button
            key={v.value}
            variant={v.value}
            aria-pressed={pressed}
            onClick={() => setPressed((p) => !p)}
          >
            <Bi en={v.en} ar={v.ar} />
          </Button>
        ))}
      </Row>
      <Row label="Disabled">
        {VARIANTS.map((v) => (
          <Button key={v.value} variant={v.value} disabled>
            <Bi en={v.en} ar={v.ar} />
          </Button>
        ))}
      </Row>
      <Row label="Loading: click to start">
        <Button
          loading={loading}
          onClick={() => {
            setLoading(true);
            setTimeout(() => setLoading(false), 2000);
          }}
        >
          <HugeiconsIcon icon={Download04Icon} data-icon="inline-start" />
          <Bi en="Download" ar="تنزيل" />
        </Button>
        <Button variant="outline" loading>
          <Bi en="Saving" ar="جارٍ الحفظ" />
        </Button>
        <Button variant="secondary" iconOnly loading aria-label="Search">
          <HugeiconsIcon icon={Search01Icon} />
        </Button>
      </Row>
    </Stack>
  );
}
