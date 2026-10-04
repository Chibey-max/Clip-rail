import { CopyButton } from "./CopyButton";

/** The most important UI for clippers: the code that proves they own the Short. */
export function ClaimCodeBox({ code }: { code: string }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-accent/40 bg-accent/10 p-4">
      <div className="text-xs font-medium uppercase tracking-wide text-muted">Your claim code</div>
      <div className="mt-2 flex items-center justify-between gap-3">
        <code className="font-mono text-2xl font-bold tracking-wider sm:text-3xl">{code}</code>
        <CopyButton text={code} className="bg-surface-2 px-3 py-2 text-sm text-fg" />
      </div>
      <p className="mt-2 text-sm text-muted">Paste this in your Short&apos;s description. It&apos;s how we know the clip is yours.</p>
    </div>
  );
}
