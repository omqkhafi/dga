// Shape of apps/docs/lib/generated/api.json (see build-api.ts).

export type ApiProp = {
  name: string;
  type: string;
  default: string | null;
  required: boolean;
  description: string;
  /** Arabic description, from api-descriptions-ar.ts. */
  descriptionAr: string;
};

export type ApiPart = {
  name: string;
  description: string;
  descriptionAr: string;
  /** Base UI part whose props are also accepted, for the "also accepts" note. */
  inherits: { name: string; url: string } | null;
  props: ApiProp[];
};

export type Api = Record<string, ApiPart[]>;
