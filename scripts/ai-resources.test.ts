// AI Resources: the skill and its discovery index, the HTTP discovery relations, the Copy page
// menu strings and the pages themselves.

import { describe, expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import {
  AGENT_SKILL_URL,
  AGENT_SKILLS_SCHEMA,
  agentSkillDigest,
  buildAgentSkillsIndex,
  readAgentSkillBytes,
} from "../apps/docs/lib/agent-skills";
import { ar } from "../apps/docs/lib/dictionary/ar";
import { en } from "../apps/docs/lib/dictionary/en";
import {
  discoveryLink,
  markdownAlternateLink,
  markdownRoutePath,
  markdownTwinPath,
} from "../apps/docs/lib/discovery";
import { ROOT } from "./tokens/source";

const CONTENT = join(ROOT, "apps", "docs", "content", "docs");

describe("agent skill", () => {
  const file = join(ROOT, "skills", "platform-code", "SKILL.md");

  test("the index digest is the sha256 of the exact SKILL.md bytes", () => {
    const hex = createHash("sha256").update(readFileSync(file)).digest("hex");
    const index = buildAgentSkillsIndex();
    expect(index.$schema).toBe(AGENT_SKILLS_SCHEMA);
    expect(index.$schema).toBe("https://schemas.agentskills.io/discovery/0.2.0/schema.json");
    expect(index.skills).toHaveLength(1);
    expect(index.skills[0]).toMatchObject({
      name: "platform-code",
      type: "skill-md",
      url: AGENT_SKILL_URL,
      digest: `sha256:${hex}`,
    });
    expect(agentSkillDigest(readAgentSkillBytes())).toBe(`sha256:${hex}`);
    expect(AGENT_SKILL_URL).toBe("/.well-known/agent-skills/platform-code/SKILL.md");
  });

  test("the frontmatter name is the folder name, with a one-line description", () => {
    const text = readFileSync(file, "utf8");
    expect(text).toMatch(/^---\nname: platform-code\ndescription: .{20,}\n---\n/);
  });

  test("it teaches the rules an agent needs", () => {
    const text = readFileSync(file, "utf8");
    for (const needle of [
      "npx shadcn@latest init https://dga.omqkhafi.dev/r/dga.json",
      "npx shadcn@latest add @dga/<name>",
      "/{lang}/llms.txt",
      "/{lang}/docs/<slug>.md",
      "RTL",
      "logical properties",
      "DGA tokens only",
      "Western digits",
      "Arabic-Indic",
      "Never mix",
      "Deviations",
      "Never invent",
      "Field",
    ]) {
      expect(text.toLowerCase()).toContain(needle.toLowerCase());
    }
  });
});

describe("AGENTS.md and CLAUDE.md downloads", () => {
  for (const [name, body] of [
    ["AGENTS.md", "Platform Code"],
    ["CLAUDE.md", "@AGENTS.md"],
  ] as const) {
    test(`${name} is one managed block`, () => {
      const text = readFileSync(join(ROOT, "apps/docs/public/agents", name), "utf8");
      expect(text.startsWith("<!-- BEGIN PLATFORM-CODE -->\n")).toBe(true);
      expect(text.trimEnd().endsWith("<!-- END PLATFORM-CODE -->")).toBe(true);
      expect(text).toContain(body);
    });
  }
});

describe("discovery links", () => {
  test("the Link header names llms.txt, the sitemap and the skills index", () => {
    const link = discoveryLink("en");
    expect(link).toContain('</en/llms.txt>; rel="describedby"');
    expect(link).toContain('</sitemap.xml>; rel="sitemap"');
    expect(link).toContain('</.well-known/agent-skills/index.json>; rel="agent-skills"');
    expect(discoveryLink("ar")).toContain('</ar/llms.txt>; rel="describedby"');
  });

  test("a docs page names its Markdown twin", () => {
    expect(markdownAlternateLink("/en/docs/installation")).toBe(
      '</en/docs/installation.md>; rel="alternate"; type="text/markdown"',
    );
    expect(markdownTwinPath("/ar/docs")).toBe("/ar/docs/index.md");
    expect(markdownTwinPath("/en/docs/ai/skills/")).toBe("/en/docs/ai/skills.md");
    expect(markdownRoutePath("/en/docs/ai/skills")).toBe("/en/llms.mdx/ai/skills");
    expect(markdownRoutePath("/en/docs")).toBe("/en/llms.mdx/index");
  });

  test("only docs pages have a twin", () => {
    for (const path of ["/", "/en", "/en/changelog", "/en/llms.txt", "/fr/docs/x", "/docs/x"]) {
      expect(markdownAlternateLink(path)).toBeUndefined();
    }
  });
});

describe("Copy page menu", () => {
  const keys = [
    "copy.page",
    "copy.markdown",
    "copy.view",
    "copy.chatgpt",
    "copy.codex",
    "copy.claude",
    "copy.claudeCode",
    "copy.cursor",
    "copy.prompt",
  ] as const;

  test("every item has a label in English and Arabic", () => {
    for (const key of keys) {
      expect(en[key].length).toBeGreaterThan(0);
      expect(ar[key].length).toBeGreaterThan(0);
    }
    expect(en["copy.markdown"]).toBe("Copy Markdown");
    expect(en["copy.view"]).toBe("View Markdown");
    expect(en["copy.cursor"]).toBe("Open in Cursor");
  });

  test("the prompt points at the page's Markdown URL", () => {
    expect(en["copy.prompt"]).toContain("{url}");
    expect(ar["copy.prompt"]).toContain("{url}");
  });
});

describe("AI Resources pages", () => {
  for (const slug of ["skills", "llm", "mcp"]) {
    test(`ai/${slug} exists in English and Arabic`, () => {
      expect(existsSync(join(CONTENT, "ai", `${slug}.mdx`))).toBe(true);
      expect(existsSync(join(CONTENT, "ai", `${slug}.ar.mdx`))).toBe(true);
    });
  }

  test("the sidebar group is titled in both languages and listed after Components", () => {
    const meta = (name: string) => JSON.parse(readFileSync(join(CONTENT, name), "utf8"));
    expect(meta("ai/meta.json")).toEqual({
      title: "AI Resources",
      pages: ["skills", "llm", "mcp"],
    });
    expect(meta("ai/meta.ar.json")).toEqual({
      title: "موارد الذكاء الاصطناعي",
      pages: ["skills", "llm", "mcp"],
    });
    for (const name of ["meta.json", "meta.ar.json"]) {
      const pages: string[] = meta(name).pages;
      expect(pages.indexOf("...ai")).toBeGreaterThan(pages.indexOf("...components"));
    }
  });

  test("the MCP page shows the registry, init commands and manual configs", () => {
    for (const file of ["mcp.mdx", "mcp.ar.mdx"]) {
      const text = readFileSync(join(CONTENT, "ai", file), "utf8");
      expect(text).toContain('"@dga": "https://dga.omqkhafi.dev/r/{name}.json"');
      for (const client of ["claude", "cursor", "vscode"]) {
        expect(text).toContain(`npx shadcn@latest mcp init --client ${client}`);
      }
      for (const config of [".mcp.json", ".cursor/mcp.json", ".vscode/mcp.json"]) {
        expect(text).toContain(config);
      }
      expect(text).toContain('"args": ["shadcn@latest", "mcp"]');
    }
  });
});
