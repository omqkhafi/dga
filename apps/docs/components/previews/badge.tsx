"use client";

import { CheckmarkCircle02Icon, StarIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { Badge, type BadgeProps } from "@/registry/bases/base/ui/badge";
import { Bi } from "./bi";
import { OnColorSurface, Row, Stack } from "./kit";

type Variant = NonNullable<BadgeProps["variant"]>;
const COLORS: { value: Variant; en: string; ar: string }[] = [
  { value: "neutral", en: "Draft", ar: "مسودة" },
  { value: "success", en: "Approved", ar: "مقبول" },
  { value: "error", en: "Rejected", ar: "مرفوض" },
  { value: "warning", en: "Pending", ar: "قيد الانتظار" },
  { value: "info", en: "New", ar: "جديد" },
  { value: "purple", en: "Beta", ar: "تجريبي" },
  { value: "orange", en: "Updated", ar: "محدّث" },
];

export function BadgeVariants() {
  return (
    <Stack>
      <Row label="Filled">
        {COLORS.map((c) => (
          <Badge key={c.value} variant={c.value}>
            <Bi en={c.en} ar={c.ar} />
          </Badge>
        ))}
      </Row>
      <Row label="Outlined">
        {COLORS.map((c) => (
          <Badge key={c.value} variant={c.value} outlined>
            <Bi en={c.en} ar={c.ar} />
          </Badge>
        ))}
      </Row>
      <OnColorSurface>
        <Badge variant="on-color">
          <Bi en="On colour" ar="على لون" />
        </Badge>
        <Badge variant="on-color" outlined>
          <Bi en="Outlined" ar="محدد" />
        </Badge>
      </OnColorSurface>
    </Stack>
  );
}

export function BadgeSizes() {
  return (
    <Stack>
      {(["sm", "md", "lg"] as const).map((size) => (
        <Row key={size} label={`size="${size}"`}>
          <Badge size={size} variant="success">
            <HugeiconsIcon icon={CheckmarkCircle02Icon} />
            <Bi en="Verified" ar="موثّق" />
          </Badge>
          <Badge size={size} variant="info" rounded>
            12
          </Badge>
          <Badge size={size} variant="warning" iconOnly aria-label="Featured">
            <HugeiconsIcon icon={StarIcon} />
          </Badge>
          <Badge size={size} variant="purple" iconOnly rounded aria-label="Featured">
            <HugeiconsIcon icon={StarIcon} />
          </Badge>
        </Row>
      ))}
    </Stack>
  );
}
