"use client";

import { Tag01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useState } from "react";
import { StatusTag, Tag, type TagProps } from "@/registry/bases/base/ui/tag";
import { Bi, useDirection } from "./bi";
import { OnColorSurface, Row, Stack } from "./kit";

type Variant = NonNullable<TagProps["variant"]>;
const COLORS: { value: Exclude<Variant, "on-color">; en: string; ar: string }[] = [
  { value: "neutral", en: "Neutral", ar: "محايد" },
  { value: "success", en: "Success", ar: "نجاح" },
  { value: "info", en: "Info", ar: "معلومة" },
  { value: "warning", en: "Warning", ar: "تنبيه" },
  { value: "error", en: "Error", ar: "خطأ" },
];

export function TagVariants() {
  return (
    <Stack>
      <Row label="Filled">
        {COLORS.map((c) => (
          <Tag key={c.value} variant={c.value}>
            <HugeiconsIcon icon={Tag01Icon} />
            <Bi en={c.en} ar={c.ar} />
          </Tag>
        ))}
      </Row>
      <Row label="Outlined, rounded">
        {COLORS.map((c) => (
          <Tag key={c.value} variant={c.value} outlined rounded>
            <Bi en={c.en} ar={c.ar} />
          </Tag>
        ))}
      </Row>
      <Row label="Sizes xs, sm, md and icon-only">
        {(["xs", "sm", "md"] as const).map((size) => (
          <Tag key={size} size={size} variant="info">
            <Bi en="Label" ar="وسم" />
          </Tag>
        ))}
        {(["xs", "sm", "md"] as const).map((size) => (
          <Tag key={size} size={size} variant="info" iconOnly aria-label="Tag">
            <HugeiconsIcon icon={Tag01Icon} />
          </Tag>
        ))}
      </Row>
      <OnColorSurface>
        <Tag variant="on-color">
          <Bi en="On colour" ar="على لون" />
        </Tag>
        <Tag variant="on-color" outlined>
          <Bi en="Outlined" ar="محدد" />
        </Tag>
      </OnColorSurface>
    </Stack>
  );
}

const FILTERS = [
  { id: "riyadh", en: "Riyadh", ar: "الرياض" },
  { id: "open", en: "Open", ar: "مفتوح" },
  { id: "2026", en: "2026", ar: "٢٠٢٦" },
];

export function TagDismiss() {
  const rtl = useDirection() === "rtl";
  const [items, setItems] = useState(FILTERS);
  return (
    <Row label="Removable filters">
      {items.map((f) => (
        <Tag
          key={f.id}
          size="md"
          onDismiss={() => setItems((all) => all.filter((x) => x.id !== f.id))}
          dismissLabel={rtl ? `إزالة ${f.ar}` : `Remove ${f.en}`}
        >
          {rtl ? f.ar : f.en}
        </Tag>
      ))}
      {items.length === 0 ? (
        <button
          type="button"
          className="text-sm text-link-primary underline"
          onClick={() => setItems(FILTERS)}
        >
          <Bi en="Reset" ar="إعادة" />
        </button>
      ) : null}
    </Row>
  );
}

const STATUSES = [
  { value: "neutral", en: "Draft", ar: "مسودة" },
  { value: "success", en: "Completed", ar: "مكتمل" },
  { value: "info", en: "In review", ar: "قيد المراجعة" },
  { value: "warning", en: "Pending", ar: "معلّق" },
  { value: "error", en: "Rejected", ar: "مرفوض" },
] as const;

export function StatusTags() {
  return (
    <Stack>
      {(["subtle", "inverted", "ghost"] as const).map((appearance) => (
        <Row key={appearance} label={`appearance="${appearance}"`}>
          {STATUSES.map((s) => (
            <StatusTag key={s.value} variant={s.value} appearance={appearance}>
              <Bi en={s.en} ar={s.ar} />
            </StatusTag>
          ))}
        </Row>
      ))}
      <Row label="Sizes xs, sm, md">
        {(["xs", "sm", "md"] as const).map((size) => (
          <StatusTag key={size} size={size} variant="success">
            <Bi en="Completed" ar="مكتمل" />
          </StatusTag>
        ))}
      </Row>
    </Stack>
  );
}
