import { StatusBadge } from "@/components/ui/Badge";
import { ShortThumb } from "@/components/ui/ShortThumb";
import { count, usd } from "@/lib/format";

const rows = [
  { caption: "the hook that pays", hue: 262, title: "The 2-second hook that pays", views: 18420, earned: 18_420_000, status: "Active" as const },
  { caption: "paid in seconds", hue: 150, title: "Paid in seconds, not weeks", views: 12330, earned: 12_330_000, status: "Active" as const },
  { caption: "escrow in 30s", hue: 28, title: "Escrow explained in 30s", views: 0, earned: 0, status: "Pending" as const },
];

/** A browser-framed miniature of the clipper dashboard (Airaa-style product shot), built from our real components. */
export function ProductWindow() {
  return (
    <div className="overflow-hidden rounded-[22px] border border-white/80 bg-white/70 p-1.5 dark:border-white/10 dark:bg-white/5 shadow-[0_30px_80px_-30px_rgb(18_18_22/0.35)] backdrop-blur">
      <div className="flex items-center gap-1.5 px-3 py-2">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" />
        <span className="size-2.5 rounded-full bg-[#febc2e]" />
        <span className="size-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-3 hidden rounded-full bg-surface-2 px-3 py-0.5 font-mono text-[11px] text-muted sm:block">cliprail.app/me</span>
      </div>
      <div className="grid gap-4 rounded-[18px] border border-line bg-surface p-4 text-left sm:grid-cols-[1fr_15rem] sm:p-6">
        <div className="min-w-0">
          <div className="flex items-center justify-between">
            <div>
              <div className="eyebrow">My earnings</div>
              <div className="font-display text-xl font-bold">Good evening, Tobi</div>
            </div>
            <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">Tier 1</span>
          </div>
          <div className="tabular mt-4 grid grid-cols-3 gap-2">
            {[
              ["Verified", usd(30_750_000), "text-fg"],
              ["Holding", usd(6_420_000), "text-holding"],
              ["Paid", usd(24_330_000), "text-money"],
            ].map(([label, value, tone]) => (
              <div key={label} className="rounded-xl border border-line p-3">
                <div className="text-[10px] font-medium tracking-wide text-muted uppercase">{label}</div>
                <div className={`mt-0.5 font-display text-lg font-bold sm:text-2xl ${tone}`}>{value}</div>
              </div>
            ))}
          </div>
          <ul className="mt-4 divide-y divide-line">
            {rows.map((r) => (
              <li key={r.title} className="flex items-center gap-3 py-2.5">
                <ShortThumb caption={r.caption} hue={r.hue} className="w-9 shrink-0 rounded-lg !shadow-none [&_span]:!text-[5px]" />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{r.title}</div>
                  <div className="tabular text-xs text-muted">{count(r.views)} verified views</div>
                </div>
                <StatusBadge status={r.status} />
                <span className="tabular hidden w-16 text-right text-sm font-semibold sm:block">{usd(r.earned)}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden flex-col gap-3 rounded-2xl bg-night p-4 text-white sm:flex">
          <div className="text-xs text-white/60">Available balance</div>
          <div className="tabular font-display text-3xl font-bold">$24.33</div>
          <div className="text-xs text-white/50">USDC on Monad</div>
          <div className="mt-auto flex flex-col gap-2">
            <span className="rounded-full bg-white py-2 text-center text-sm font-semibold text-ink">Send USDC</span>
            <span className="text-center text-[11px] text-white/40">No fees. No seed phrase.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
