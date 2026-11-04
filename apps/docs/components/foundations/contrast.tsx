import { cn } from "cn";

/** WCAG level for a ratio: text needs 4.5 (AA) / 7 (AAA); non-text needs 3. */
export function ContrastBadge({
  ratio,
  min = 4.5,
  label,
  className,
}: {
  ratio: number;
  min?: number;
  label?: string;
  className?: string;
}) {
  const pass = ratio >= min;
  const level = !pass ? "Fail" : min >= 4.5 && ratio >= 7 ? "AAA" : min < 4.5 ? "3:1" : "AA";
  return (
    <span
      title={label}
      className={cn(
        "inline-flex items-center gap-1 rounded-xs px-1.5 py-0.5 font-mono text-xs font-medium whitespace-nowrap",
        pass ? "bg-success-50 text-success" : "bg-error-50 text-error",
        className,
      )}
    >
      {ratio.toFixed(2)}:1 <span className="font-sans font-semibold">{level}</span>
    </span>
  );
}

export function Swatch({ color, className }: { color: string; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-block shrink-0 overflow-hidden rounded-xs border border-border bg-[repeating-conic-gradient(#d2d6db_0_25%,#fff_0_50%)] bg-size-[8px_8px]",
        className,
      )}
    >
      <span className="absolute inset-0" style={{ backgroundColor: color }} />
    </span>
  );
}
