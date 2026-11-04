import { Spinner } from "@/registry/bases/base/ui/spinner";
import { OnColorSurface, Row, Stack } from "./kit";

const SIZES = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const;

export function SpinnerSizes() {
  return (
    <Stack>
      <Row label="Primary">
        {SIZES.map((size) => (
          <Spinner key={size} size={size} />
        ))}
      </Row>
      <Row label="Neutral">
        {SIZES.map((size) => (
          <Spinner key={size} size={size} variant="neutral" />
        ))}
      </Row>
      <OnColorSurface>
        {SIZES.map((size) => (
          <Spinner key={size} size={size} variant="on-color" />
        ))}
      </OnColorSurface>
    </Stack>
  );
}
