"use client";

import { Spinner } from "@/registry/bases/base/ui/spinner";
import { Bi, useUi } from "./bi";
import { OnColorSurface, Row, Stack } from "./kit";

const SIZES = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const;

export function SpinnerSizes() {
  const label = useUi()("ui.loading");
  return (
    <Stack>
      <Row label={<Bi en="Primary" ar="أساسي" />}>
        {SIZES.map((size) => (
          <Spinner key={size} size={size} label={label} />
        ))}
      </Row>
      <Row label={<Bi en="Neutral" ar="محايد" />}>
        {SIZES.map((size) => (
          <Spinner key={size} size={size} variant="neutral" label={label} />
        ))}
      </Row>
      <OnColorSurface>
        {SIZES.map((size) => (
          <Spinner key={size} size={size} variant="on-color" label={label} />
        ))}
      </OnColorSurface>
    </Stack>
  );
}
