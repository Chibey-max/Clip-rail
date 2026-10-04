import { shortAddress, txUrl } from "@/lib/format";

export function TxLink({ hash, label }: { hash: string; label?: string }) {
  return (
    <a href={txUrl(hash)} target="_blank" rel="noreferrer" className="font-mono text-xs text-accent-hover hover:underline">
      {label ?? shortAddress(hash)} ↗
    </a>
  );
}
