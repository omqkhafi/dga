import NextLink from "next/link";

/** DGA UI wordmark: the SA flag green mark and the name. */
export function Logo() {
  return (
    <NextLink
      href="/"
      className="inline-flex items-center gap-2 rounded-xs font-bold text-text-default focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-border-black"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-6">
        <rect width="24" height="24" rx="4" className="fill-background-primary" />
        <path d="M6 7h5a5 5 0 0 1 0 10H6z" className="fill-text-oncolor-primary" />
        <rect
          x="14.5"
          y="7"
          width="3.5"
          height="10"
          rx="1"
          className="fill-text-oncolor-primary"
          opacity="0.7"
        />
      </svg>
      <span className="text-md">DGA UI</span>
    </NextLink>
  );
}
