// Shape of apps/docs/lib/generated/api.json (see build-api.ts).

export type ApiProp = {
  name: string;
  type: string;
  default: string | null;
  required: boolean;
  description: string;
};

export type ApiPart = {
  name: string;
  description: string;
  /** Base UI part whose props are also accepted, for the "also accepts" note. */
  inherits: { name: string; url: string } | null;
  props: ApiProp[];
};

export type Api = Record<string, ApiPart[]>;
