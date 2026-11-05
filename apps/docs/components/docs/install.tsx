import { readFileSync } from "node:fs";
import { join } from "node:path";
import { highlight } from "fumadocs-core/highlight";
import { gitConfig, siteUrl } from "@/lib/shared";
import { CodeBlock } from "./code-block";
import { InstallTabs } from "./install-tabs";

type RegistryItem = {
  name: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: { path: string }[];
};

const REGISTRY = join(process.cwd(), "public", "r");
const SOURCE = join(process.cwd(), "registry");

async function Source({ path }: { path: string }) {
  const code = readFileSync(join(SOURCE, path), "utf8").trimEnd();
  const node = await highlight(code, {
    lang: "tsx",
    themes: { light: "github-light-high-contrast", dark: "github-dark-high-contrast" },
    components: {
      pre: ({ children, className, style }) => (
        <CodeBlock
          title={path}
          lang="tsx"
          lines={code.split("\n").length}
          className={className}
          style={style}
        >
          <pre className="min-w-full w-max *:flex *:flex-col">{children}</pre>
        </CodeBlock>
      ),
    },
  });
  return node;
}

/** Install block for a registry item: CLI (bun, npm, pnpm, yarn) or Manual. */
export function ComponentInstall({ name }: { name: string }) {
  const item = JSON.parse(readFileSync(join(REGISTRY, `${name}.json`), "utf8")) as RegistryItem;
  const deps = item.dependencies ?? [];
  const registryDeps = (item.registryDependencies ?? []).map((url) =>
    url.replace(`${siteUrl}/r/`, "").replace(/\.json$/, ""),
  );
  const manual = (
    <ol className="flex list-decimal flex-col gap-4 ps-5 text-sm marker:text-text-secondary-paragraph">
      {deps.length > 0 ? (
        <li>
          <p className="mb-2">Install the dependencies:</p>
          <p
            className="rounded-sm bg-background-white px-3 py-2 font-mono text-[0.8125rem]"
            dir="ltr"
          >
            npm install {deps.join(" ")}
          </p>
        </li>
      ) : null}
      <li>
        <p>
          Set up the DGA tokens and style (
          <code className="font-mono text-[0.8125rem]">
            npx shadcn@latest init {siteUrl}/r/dga.json
          </code>
          {registryDeps.length > 0 ? (
            <>
              ), and copy{" "}
              {registryDeps.map((d, i) => (
                <span key={d}>
                  {i > 0 ? ", " : ""}
                  <code className="font-mono text-[0.8125rem]">{d}</code>
                </span>
              ))}{" "}
              from the registry.
            </>
          ) : (
            <>).</>
          )}
        </p>
      </li>
      <li>
        <p className="mb-2">
          Copy the source into your project and fix the import paths. It is also on{" "}
          <a
            href={`https://github.com/${gitConfig.user}/${gitConfig.repo}/blob/${gitConfig.branch}/registry/${item.files[0]?.path}`}
          >
            GitHub
          </a>
          .
        </p>
        {item.files.map((file) => (
          <Source key={file.path} path={file.path} />
        ))}
      </li>
    </ol>
  );
  return <InstallTabs item={name} manual={manual} />;
}
