import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { TypeTable } from "fumadocs-ui/components/type-table";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { ApiReference } from "./docs/api-reference";
import { Callout } from "./docs/callout";
import { ComponentContrast } from "./docs/contrast";
import { ContrastReport } from "./docs/contrast-report";
import { ComponentDeviations } from "./docs/deviations";
import { ComponentInstall } from "./docs/install";
import { MdxPre } from "./docs/mdx-pre";
import { DarkNeutrals } from "./foundations/dark-neutrals";
import { DeviationsTable } from "./foundations/deviations-table";
import { IconBrowser } from "./foundations/icon-browser";
import { PrimitivePalettes } from "./foundations/palettes";
import {
  AliasTable,
  BreakpointTable,
  GridTable,
  RadiusTable,
  SemanticColors,
  ShadcnMapping,
  ShadowTable,
  SpacingScale,
  SpacingTokens,
  TypeScaleTable,
  WeightTable,
} from "./foundations/tables";
import { ThemeCompare } from "./foundations/theme-compare";
import { DirectionCompare, Preview } from "./preview/preview";

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    // Every code block gets a file header, like the owner's other docs sites.
    pre: MdxPre,
    Step,
    Steps,
    Tab,
    Tabs,
    Preview,
    DirectionCompare,
    TypeTable,
    PrimitivePalettes,
    SemanticColors,
    ShadcnMapping,
    AliasTable,
    TypeScaleTable,
    WeightTable,
    SpacingScale,
    SpacingTokens,
    BreakpointTable,
    GridTable,
    RadiusTable,
    ShadowTable,
    IconBrowser,
    DeviationsTable,
    DarkNeutrals,
    ThemeCompare,
    ApiReference,
    Callout,
    ContrastReport,
    ComponentInstall,
    ComponentContrast,
    ComponentDeviations,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
