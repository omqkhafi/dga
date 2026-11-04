import { CodeBlock, Pre } from "fumadocs-ui/components/codeblock";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { TypeTable } from "fumadocs-ui/components/type-table";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import { ComponentContrast } from "./docs/contrast";
import { ComponentDeviations } from "./docs/deviations";
import { ComponentInstall } from "./docs/install";
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
    // Every code block gets a file header, like the owner's other docs sites.
    pre: ({ title, ...props }) => (
      <CodeBlock title={title ?? "Code"} {...props}>
        <Pre>{props.children}</Pre>
      </CodeBlock>
    ),
    Step,
    Steps,
    Tab,
    Tabs,
    Preview,
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
