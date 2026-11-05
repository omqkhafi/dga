import type { ComponentType } from "react";
import { BadgeSizes, BadgeVariants } from "./badge";
import {
  ButtonDestructive,
  ButtonIcons,
  ButtonOnColor,
  ButtonSizes,
  ButtonStates,
  ButtonVariants,
} from "./button";
import {
  AvatarDemo,
  DividerDemo,
  FeaturedIconDemo,
  SkeletonDemo,
  SkeletonLayouts,
} from "./display";
import {
  CheckboxGroupDemo,
  CheckboxSizes,
  CheckboxStates,
  FieldAnatomy,
  FileUploadDemo,
  FileUploadStates,
  InputAdornments,
  InputSizes,
  InputStates,
  NumberInputDemo,
  NumberInputStates,
  RadioGroupDemo,
  RadioStates,
  SearchBoxDemo,
  SearchBoxStates,
  SelectBasic,
  SelectGroups,
  SelectStates,
  SwitchStates,
  SwitchTrailing,
  TextareaStates,
} from "./forms";
import {
  IconsDemo,
  RadiusDemo,
  ShadowsDemo,
  SpacingDemo,
  TypographyDemo,
  WeightsDemo,
} from "./foundations";
import { LinkInline, LinkVariants } from "./link";
import { ServiceCard } from "./service-card";
import { ServiceRequestForm } from "./service-request";
import { SpinnerSizes } from "./spinner";
import { StatusColors } from "./status";
import { StatusTags, TagDismiss, TagVariants } from "./tag";

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
  "link-variants": LinkVariants,
  "link-inline": LinkInline,
  "badge-variants": BadgeVariants,
  "badge-sizes": BadgeSizes,
  "tag-variants": TagVariants,
  "tag-dismiss": TagDismiss,
  "status-tags": StatusTags,
  divider: DividerDemo,
  avatar: AvatarDemo,
  "featured-icon": FeaturedIconDemo,
  skeleton: SkeletonDemo,
  "skeleton-layouts": SkeletonLayouts,
  "field-anatomy": FieldAnatomy,
  "service-request": ServiceRequestForm,
  "input-sizes": InputSizes,
  "input-states": InputStates,
  "input-adornments": InputAdornments,
  "textarea-states": TextareaStates,
  "select-basic": SelectBasic,
  "select-states": SelectStates,
  "select-groups": SelectGroups,
  "number-input-demo": NumberInputDemo,
  "number-input-states": NumberInputStates,
  "search-box-demo": SearchBoxDemo,
  "search-box-states": SearchBoxStates,
  "checkbox-states": CheckboxStates,
  "checkbox-sizes": CheckboxSizes,
  "checkbox-group": CheckboxGroupDemo,
  "radio-group": RadioGroupDemo,
  "radio-states": RadioStates,
  "switch-states": SwitchStates,
  "switch-trailing": SwitchTrailing,
  "file-upload-demo": FileUploadDemo,
  "file-upload-states": FileUploadStates,
} satisfies Record<string, ComponentType>;

export const previewNames = Object.keys(previews);
