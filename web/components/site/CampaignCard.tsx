import Link from "next/link";
import { BudgetMeter } from "@/components/ui/BudgetMeter";
import { StatusBadge, TierBadge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { compact, cpmLabel, timeLeft, usd } from "@/lib/format";
import type { Campaign } from "@/lib/types";

export function CampaignCard({ campaign: c, now }: { campaign: Campaign; now: number }) {
  const free = Math.max(c.budget - c.reserved - c.paid, 0);
  return (
    <Link href={`/campaigns/${c.id}`} className="block rounded-[var(--radius-card)]">
      <Card interactive className="flex h-full flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-xs text-muted">{c.brandName}</div>
            <h3 className="mt-0.5 font-semibold leading-snug">{c.title}</h3>
          </div>
          <StatusBadge status={c.status} />
        </div>
        <div className="flex items-baseline gap-2">
          <span className="tabular text-2xl font-bold">{usd(c.cpm)}</span>
          <span className="text-sm text-muted">per 1,000 views</span>
        </div>
        <BudgetMeter budget={c.budget} reserved={c.reserved} paid={c.paid} compact />
        <div className="tabular mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted">
          <span><b className="text-fg">{usd(free, { cents: false })}</b> left</span>
          <span>{c.clipsCount} clips</span>
          <span>{compact(c.verifiedViews)} verified views</span>
          <span>{c.status === "Active" ? timeLeft(c.endsAt, now) : "closed"}</span>
          {c.minTier > 0 && <TierBadge tier={c.minTier} />}
        </div>
        <span className="sr-only">{cpmLabel(c.cpm)}</span>
      </Card>
    </Link>
  );
}
