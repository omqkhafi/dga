import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { siteUrl } from "@/lib/shared";

/** Install command for a registry item, with the @dga namespace and the URL form. */
export function ComponentInstall({ name }: { name: string }) {
  return (
    <Tabs items={["@dga namespace", "URL"]}>
      <Tab value="@dga namespace">
        <DynamicCodeBlock lang="bash" code={`npx shadcn@latest add @dga/${name}`} />
      </Tab>
      <Tab value="URL">
        <DynamicCodeBlock lang="bash" code={`npx shadcn@latest add ${siteUrl}/r/${name}.json`} />
      </Tab>
    </Tabs>
  );
}
