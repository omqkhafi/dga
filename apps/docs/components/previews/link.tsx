"use client";

import { Link } from "@/registry/bases/base/ui/link";
import { Bi, useDirection } from "./bi";
import { OnColorSurface, Row, Stack } from "./kit";

export function LinkVariants() {
  const rtl = useDirection() === "rtl";
  const external = rtl ? "(يفتح في علامة تبويب جديدة)" : undefined;
  return (
    <Stack>
      {(["md", "sm"] as const).map((size) => (
        <Row key={size} label={`size="${size}"`}>
          <Link href="#" size={size}>
            <Bi en="Primary link" ar="رابط أساسي" />
          </Link>
          <Link href="#" size={size} variant="neutral">
            <Bi en="Neutral link" ar="رابط محايد" />
          </Link>
          <Link href="https://dga.gov.sa" size={size} external externalLabel={external}>
            <Bi en="External" ar="رابط خارجي" />
          </Link>
          <Link size={size} disabled>
            <Bi en="Disabled" ar="معطّل" />
          </Link>
        </Row>
      ))}
      <OnColorSurface>
        <Link href="#" variant="on-color">
          <Bi en="On-colour link" ar="رابط على لون" />
        </Link>
        <Link href="https://dga.gov.sa" variant="on-color" external externalLabel={external}>
          <Bi en="External" ar="رابط خارجي" />
        </Link>
        <Link variant="on-color" disabled>
          <Bi en="Disabled" ar="معطّل" />
        </Link>
      </OnColorSurface>
    </Stack>
  );
}

export function LinkInline() {
  return (
    <p className="max-w-prose text-md text-text-primary-paragraph">
      <Bi en="Read the " ar="اقرأ " />
      <Link href="#" inline>
        <Bi en="service terms" ar="شروط الخدمة" />
      </Link>
      <Bi
        en=" before you submit. Inline links are always underlined so they do not rely on colour alone."
        ar=" قبل الإرسال. الروابط داخل النص مسطّرة دائمًا حتى لا تعتمد على اللون وحده."
      />
    </p>
  );
}
