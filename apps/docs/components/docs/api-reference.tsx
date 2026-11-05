import api from "@/lib/generated/api.json";
import type { Api } from "../../../../scripts/api-types";
import { PropsTable } from "./props-table";

/**
 * One props table per part, generated from the TypeScript types (`bun run api`). Add
 * `<ApiReference component="button" />` under the "API Reference" heading.
 */
export function ApiReference({ component }: { component: string }) {
  const parts = (api as Api)[component];
  if (!parts) throw new Error(`No API data for ${component}. Run \`bun run api\`.`);
  return (
    <div className="not-prose">
      {parts.map((part) => (
        <section key={part.name} className="mb-4 last:mb-0">
          <h3
            id={`api-${part.name.toLowerCase()}`}
            className="mt-4 text-lg font-semibold text-text-default"
          >
            {part.name}
          </h3>
          {part.description ? (
            <p className="mt-1 text-sm text-text-primary-paragraph">{part.description}</p>
          ) : null}
          {part.props.length > 0 ? (
            <PropsTable caption={`${part.name} props`} props={part.props} />
          ) : null}
          <p className="text-[0.8125rem] text-text-secondary-paragraph">
            {part.inherits ? (
              <>
                Also accepts every prop of the{" "}
                <a
                  className="underline underline-offset-4 hover:text-text-default"
                  href={part.inherits.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Base UI {part.inherits.name}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
                .
              </>
            ) : (
              <>Also accepts the props of the element it renders.</>
            )}
          </p>
        </section>
      ))}
    </div>
  );
}
