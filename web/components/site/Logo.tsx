import { cn } from "@/lib/cn";

/** Wordmark: a play-shaped rail mark + "Cliprail". */
export function Logo({ className, inverted }: { className?: string; inverted?: boolean }) {
  return (
    <span className={cn("flex items-center gap-2 font-display text-lg font-bold tracking-tight", inverted ? "text-white" : "text-fg", className)}>
      <svg viewBox="0 0 28 28" className="size-7" aria-hidden>
        <rect width="28" height="28" rx="8" fill="var(--color-accent)" />
        <path d="M10 8.5v11l9-5.5-9-5.5Z" fill="white" />
        <path d="M6 21.5h16" stroke="white" strokeOpacity=".55" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
      Cliprail
    </span>
  );
}
