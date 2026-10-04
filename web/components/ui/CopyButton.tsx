"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

export function CopyButton({ text, label = "Copy", className }: { text: string; label?: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className={cn("rounded-md px-2 py-1 text-xs font-semibold text-muted hover:bg-surface-2 hover:text-fg", className)}
      aria-live="polite"
    >
      {copied ? "Copied" : label}
    </button>
  );
}
