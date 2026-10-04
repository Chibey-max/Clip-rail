import { CampaignCard } from "@/components/site/CampaignCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { campaigns, NOW } from "@/mocks/data";

export const metadata = { title: "Campaigns · Cliprail" };

export default function CampaignsPage() {
  const active = campaigns.filter((c) => c.status === "Active");
  const closed = campaigns.filter((c) => c.status === "Closed");
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-3xl font-bold">Campaigns</h1>
      <p className="mt-2 text-muted">Every budget below is already locked in escrow. Pick one, clip it, get paid per verified view.</p>

      <h2 className="mt-10 text-sm font-semibold uppercase tracking-wide text-muted">Open now</h2>
      {active.length > 0 ? (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {active.map((c) => (
            <CampaignCard key={c.id} campaign={c} now={NOW} />
          ))}
        </div>
      ) : (
        <div className="mt-4"><EmptyState title="No open campaigns right now. Check back soon." /></div>
      )}

      {closed.length > 0 && (
        <>
          <h2 className="mt-12 text-sm font-semibold uppercase tracking-wide text-muted">Closed</h2>
          <div className="mt-4 grid gap-4 opacity-70 sm:grid-cols-2 lg:grid-cols-3">
            {closed.map((c) => (
              <CampaignCard key={c.id} campaign={c} now={NOW} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
