import { cn } from "cn";
import NextLink from "next/link";

/**
 * The DGA UI mark: an eight-point star with a star at its centre, the geometric base of Saudi
 * and Islamic ornament. It is not the DGA logo and does not imitate it. Drawn on a 24px grid.
 */
export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={cn("size-6 shrink-0", className)}>
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M12.00 1.00 L14.95 4.89 L19.78 4.22 L19.11 9.05 L23.00 12.00 L19.11 14.95 L19.78 19.78 L14.95 19.11 L12.00 23.00 L9.05 19.11 L4.22 19.78 L4.89 14.95 L1.00 12.00 L4.89 9.05 L4.22 4.22 L9.05 4.89Z M12.00 7.40 L13.11 9.32 L15.25 8.75 L14.68 10.89 L16.60 12.00 L14.68 13.11 L15.25 15.25 L13.11 14.68 L12.00 16.60 L10.89 14.68 L8.75 15.25 L9.32 13.11 L7.40 12.00 L9.32 10.89 L8.75 8.75 L10.89 9.32Z"
      />
    </svg>
  );
}

/** The mark and the name. The mark is the brand green; that is the only colour in the header. */
export function Logo() {
  return (
    <NextLink
      href="/"
      className="inline-flex min-h-9 items-center gap-2 rounded-sm font-bold tracking-tight text-text-default"
    >
      <Mark className="text-primary dark:text-text-primary" />
      <span className="text-md">DGA UI</span>
    </NextLink>
  );
}
