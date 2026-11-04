import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
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
import { Preview } from "./preview/preview";

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Step,
    Steps,
    Tab,
    Tabs,
    Preview,
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
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
