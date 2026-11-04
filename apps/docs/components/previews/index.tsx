import type { ComponentType } from "react";
import {
  ButtonDestructive,
  ButtonIcons,
  ButtonOnColor,
  ButtonSizes,
  ButtonStates,
  ButtonVariants,
} from "./button";
import {
  IconsDemo,
  RadiusDemo,
  ShadowsDemo,
  SpacingDemo,
  TypographyDemo,
  WeightsDemo,
} from "./foundations";
import { ServiceCard } from "./service-card";
import { SpinnerSizes } from "./spinner";
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
  "button-variants": ButtonVariants,
  "button-on-color": ButtonOnColor,
  "button-destructive": ButtonDestructive,
  "button-sizes": ButtonSizes,
  "button-icons": ButtonIcons,
  "button-states": ButtonStates,
  "spinner-sizes": SpinnerSizes,
} satisfies Record<string, ComponentType>;

export const previewNames = Object.keys(previews);
