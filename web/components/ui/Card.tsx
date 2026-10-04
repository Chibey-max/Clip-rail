import { cn } from "@/lib/cn";

export function Card({ className, interactive, ...rest }: React.HTMLAttributes<HTMLDivElement> & { interactive?: boolean }) {
  return (
    <div
      className={cn(
        "rounded-[var(--radius-card)] border border-line bg-surface p-4 sm:p-6",
        interactive && "transition hover:-translate-y-0.5 hover:border-muted/60",
        className,
      )}
      {...rest}
    />
  );
}
