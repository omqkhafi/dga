/**
 * Agent Skills discovery index. The artifact bytes and the digest come from the same read,
 * so the index cannot advertise a hash the file does not have.
 */

import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

/** Discovery schema the index names. */
export const AGENT_SKILLS_SCHEMA = "https://schemas.agentskills.io/discovery/0.2.0/schema.json";

/** Skill name: lowercase, and equal to the frontmatter `name`. */
export const AGENT_SKILL_NAME = "platform-code";

/** Path-absolute URL of the skill file. */
export const AGENT_SKILL_URL = `/.well-known/agent-skills/${AGENT_SKILL_NAME}/SKILL.md`;

/** The index URL. */
export const AGENT_SKILLS_INDEX_URL = "/.well-known/agent-skills/index.json";

// `next build` and `next start` run from apps/docs, tests from the repository root; the skill
// lives at the repository root.
const SKILL_PATH = [
  join(process.cwd(), "../../skills/platform-code/SKILL.md"),
  join(process.cwd(), "skills/platform-code/SKILL.md"),
].find((path) => existsSync(path)) as string;

export type AgentSkillEntry = {
  name: string;
  type: "skill-md";
  description: string;
  url: string;
  digest: string;
};

/** Raw skill file, served unchanged. */
export function readAgentSkillBytes(path = SKILL_PATH): Uint8Array<ArrayBuffer> {
  return new Uint8Array(readFileSync(path));
}

/** `description` from the skill frontmatter. */
export function agentSkillDescription(bytes: Uint8Array = readAgentSkillBytes()): string {
  const text = new TextDecoder().decode(bytes);
  const line = text.split("\n").find((entry) => entry.startsWith("description:"));
  if (line === undefined) throw new Error("platform-code skill is missing description");
  const value = line.slice("description:".length).trim();
  if (value.length === 0 || value.length > 1024) {
    throw new Error("platform-code skill description must be 1 to 1024 characters");
  }
  return value;
}

/** SHA-256 of the skill bytes, as `sha256:` plus 64 lowercase hex digits. */
export function agentSkillDigest(bytes: Uint8Array = readAgentSkillBytes()): string {
  return `sha256:${createHash("sha256").update(bytes).digest("hex")}`;
}

/** The discovery index document. */
export function buildAgentSkillsIndex(bytes: Uint8Array = readAgentSkillBytes()): {
  $schema: string;
  skills: AgentSkillEntry[];
} {
  return {
    $schema: AGENT_SKILLS_SCHEMA,
    skills: [
      {
        name: AGENT_SKILL_NAME,
        type: "skill-md",
        description: agentSkillDescription(bytes),
        url: AGENT_SKILL_URL,
        digest: agentSkillDigest(bytes),
      },
    ],
  };
}
