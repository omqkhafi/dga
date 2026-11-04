import type { ComponentType } from "react";
import {
  IconsDemo,
  RadiusDemo,
  ShadowsDemo,
  SpacingDemo,
  TypographyDemo,
  WeightsDemo,
} from "./foundations";
import { ServiceCard } from "./service-card";
import { StatusColors } from "./status";

export const previews = {
  "service-card": ServiceCard,
  "status-colors": StatusColors,
  typography: TypographyDemo,
  weights: WeightsDemo,
  spacing: SpacingDemo,
  radius: RadiusDemo,
  shadows: ShadowsDemo,
  icons: IconsDemo,
} satisfies Record<string, ComponentType>;

export const previewNames = Object.keys(previews);
