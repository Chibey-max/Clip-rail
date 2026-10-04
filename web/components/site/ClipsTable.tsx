import { StatusBadge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { count, usd } from "@/lib/format";
import type { Clip } from "@/lib/types";

export function ClipsTable({ clips }: { clips: Clip[] }) {
  if (clips.length === 0) {
    return <EmptyState title="No clips yet. Be the first to post one and start earning." />;
  }
  return (
    <div className="overflow-hidden rounded-[var(--radius-card)] border border-line">
      {/* Desktop table */}
      <table className="tabular hidden w-full text-sm sm:table">
        <thead className="bg-surface-2 text-left text-xs text-muted">
          <tr>
            <th className="px-4 py-2 font-medium">Clip</th>
            <th className="px-4 py-2 font-medium">Status</th>
            <th className="px-4 py-2 text-right font-medium">Verified views</th>
            <th className="px-4 py-2 text-right font-medium">Earned</th>
            <th className="px-4 py-2 text-right font-medium">Paid out</th>
          </tr>
        </thead>
        <tbody>
          {clips.map((c) => (
            <tr key={c.id} className="border-t border-line hover:bg-surface-2/60">
              <td className="px-4 py-3">
                <a href={`https://youtube.com/shorts/${c.videoId}`} target="_blank" rel="noreferrer" className="font-medium hover:text-accent-hover">
                  {c.title}
                </a>
                <div className="text-xs text-muted">{c.clipperHandle}</div>
              </td>
              <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
              <td className="px-4 py-3 text-right">{count(c.lastViews)}</td>
              <td className="px-4 py-3 text-right">{usd(c.accrued)}</td>
              <td className={c.released > 0 ? "px-4 py-3 text-right text-money" : "px-4 py-3 text-right text-muted"}>{usd(c.released)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Mobile stacked rows */}
      <ul className="divide-y divide-line sm:hidden">
        {clips.map((c) => (
          <li key={c.id} className="flex flex-col gap-2 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <a href={`https://youtube.com/shorts/${c.videoId}`} target="_blank" rel="noreferrer" className="font-medium">
                  {c.title}
                </a>
                <div className="text-xs text-muted">{c.clipperHandle}</div>
              </div>
              <StatusBadge status={c.status} />
            </div>
            <div className="tabular flex gap-4 text-xs text-muted">
              <span>{count(c.lastViews)} views</span>
              <span>{usd(c.accrued)} earned</span>
              <span className={c.released > 0 ? "text-money" : undefined}>{usd(c.released)} paid</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
