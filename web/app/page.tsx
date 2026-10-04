import Link from "next/link";
import { CampaignCard } from "@/components/site/CampaignCard";
import { LinkButton } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import { StatTile } from "@/components/ui/StatTile";
import { campaigns, NOW, totals } from "@/mocks/data";

const steps = [
  { n: "1", title: "Sign up with your face or fingerprint", body: "No app to install, no seed phrase. Your account is a passkey on your phone." },
  { n: "2", title: "Clip and post a Short", body: "Pick a campaign, cut a Short from the source video, and put your claim code in the description." },
  { n: "3", title: "Get paid per verified view", body: "Chainlink verifies your real views. After a short fraud hold, USDC lands in your account automatically." },
];

export default function Home() {
  const live = campaigns.filter((c) => c.status === "Active").slice(0, 3);
  return (
    <>
      <section className="mx-auto max-w-6xl px-4 pt-14 pb-10 sm:pt-20">
        <p className="text-sm font-semibold text-accent-hover">Clipping that pays on time</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-bold tracking-tight sm:text-6xl">
          Get paid for every <span className="text-money">verified</span> view.
        </h1>
        <p className="mt-5 max-w-2xl text-lg text-muted">
          Brands lock their budget in escrow before you post. Real views are verified, bot views earn nothing, and you&apos;re paid in
          USDC within a day, not after a month of &quot;upcoming&quot;.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <LinkButton href="/campaigns">Browse campaigns</LinkButton>
          <LinkButton href="/brand/new" variant="secondary">Launch a campaign</LinkButton>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <StatTile label="Paid to clippers" value={<Counter value={totals.paid} kind="usd" />} tone="money" />
          <StatTile label="Verified views" value={<Counter value={totals.verifiedViews} />} />
          <StatTile label="Clippers" value={<Counter value={totals.clippers} />} />
          <StatTile label="Payouts" value={<Counter value={totals.payouts} />} hint="every one is an onchain transaction" />
        </div>
      </section>

      <section className="border-y border-line bg-surface/40">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n}>
              <span className="grid size-8 place-items-center rounded-full bg-accent/15 text-sm font-bold text-accent-hover">{s.n}</span>
              <h2 className="mt-3 font-semibold">{s.title}</h2>
              <p className="mt-1 text-sm text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-2xl font-bold">Live campaigns</h2>
          <Link href="/campaigns" className="text-sm text-accent-hover hover:underline">See all →</Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {live.map((c) => (
            <CampaignCard key={c.id} campaign={c} now={NOW} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="grid gap-6 rounded-[var(--radius-card)] border border-line bg-surface p-6 sm:grid-cols-[1fr_auto] sm:items-center sm:p-10">
          <div>
            <h2 className="text-2xl font-bold">Brands: pay only for views that are real</h2>
            <p className="mt-2 max-w-xl text-muted">
              Set your rate per 1,000 views, a like-ratio floor and a per-clip cap. Flag anything suspicious during the hold window. Whatever
              isn&apos;t earned comes back to you when you close the campaign.
            </p>
          </div>
          <LinkButton href="/brand/new">Launch a campaign</LinkButton>
        </div>
      </section>
    </>
  );
}
