import { usd } from "@/lib/format";

/** Stacked bar: paid (money) / reserved, still in the hold window (holding) / free. */
export function BudgetMeter({ budget, reserved, paid, compact }: { budget: number; reserved: number; paid: number; compact?: boolean }) {
  const free = Math.max(budget - reserved - paid, 0);
  const pct = (x: number) => (budget > 0 ? (x / budget) * 100 : 0);
  return (
    <div>
      <div
        className="flex h-2.5 w-full overflow-hidden rounded-full bg-line"
        role="img"
        aria-label={`Budget ${usd(budget)}: ${usd(paid)} paid, ${usd(reserved)} holding, ${usd(free)} free`}
      >
        <div className="bg-money" style={{ width: `${pct(paid)}%` }} />
        <div className="bg-holding" style={{ width: `${pct(reserved)}%` }} />
      </div>
      {!compact && (
        <dl className="tabular mt-2 grid grid-cols-3 gap-2 text-xs">
          <div>
            <dt className="flex items-center gap-1.5 text-muted"><span className="size-2 rounded-full bg-money" />Paid</dt>
            <dd className="font-semibold text-money">{usd(paid)}</dd>
          </div>
          <div>
            <dt className="flex items-center gap-1.5 text-muted"><span className="size-2 rounded-full bg-holding" />Holding</dt>
            <dd className="font-semibold text-holding">{usd(reserved)}</dd>
          </div>
          <div>
            <dt className="flex items-center gap-1.5 text-muted"><span className="size-2 rounded-full bg-line" />Free</dt>
            <dd className="font-semibold">{usd(free)}</dd>
          </div>
        </dl>
      )}
    </div>
  );
}
