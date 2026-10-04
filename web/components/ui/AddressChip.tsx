import { addressUrl, shortAddress } from "@/lib/format";
import { CopyButton } from "./CopyButton";

export function AddressChip({ address, label }: { address: string; label?: string }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-full border border-line bg-surface-2 py-0.5 pr-1 pl-3 font-mono text-xs">
      <a href={addressUrl(address)} target="_blank" rel="noreferrer" className="hover:text-accent-hover" title={address}>
        {label ?? shortAddress(address)}
      </a>
      <CopyButton text={address} />
    </span>
  );
}
