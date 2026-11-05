import { readAgentSkillBytes } from "@/lib/agent-skills";

export const revalidate = false;

/** The exact bytes the index digest covers. */
export function GET() {
  return new Response(readAgentSkillBytes(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
