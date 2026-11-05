import { buildAgentSkillsIndex } from "@/lib/agent-skills";

export const revalidate = false;

/** The skill index, open to browser agents on another origin. */
export function GET() {
  return new Response(JSON.stringify(buildAgentSkillsIndex()), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
