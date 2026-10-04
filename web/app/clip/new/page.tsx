import { notFound } from "next/navigation";
import { RequireAuthClient } from "@/components/auth/RequireAuthClient";
import { PageHeader } from "@/components/site/PageHeader";
import { RegisterClip } from "@/components/clip/RegisterClip";
import { LinkButton } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { getCampaign } from "@/lib/data";
import { usd } from "@/lib/format";

export const metadata = { title: "Register a clip · Cliprail" };

export default async function RegisterClipPage({ searchParams }: { searchParams: Promise<{ c?: string }> }) {
  const { c } = await searchParams;
  if (!c) {
    return (
      <>
        <PageHeader title="Register a clip" width="max-w-2xl" />
        <div className="mx-auto max-w-2xl px-4 py-10">
          <EmptyState title="Pick a campaign first, then get your claim code there." action={<LinkButton href="/campaigns">Browse campaigns</LinkButton>} />
        </div>
      </>
    );
  }
  const campaign = await getCampaign(c);
  if (!campaign) notFound();

  return (
    <>
    <PageHeader eyebrow={campaign.brandName} title={campaign.title} width="max-w-2xl">
      Earn {usd(campaign.cpm)} per 1,000 verified views, up to {usd(campaign.maxPerClip)} per clip.
    </PageHeader>
    <div className="mx-auto max-w-2xl px-4 py-10">
      <div>
        {campaign.status !== "Active" ? (
          <EmptyState title="This campaign is closed and isn't taking new clips." action={<LinkButton href="/campaigns">Find an open one</LinkButton>} />
        ) : (
          <RequireAuthClient title="Sign in to get your claim code">
            <RegisterClip campaign={campaign} />
          </RequireAuthClient>
        )}
      </div>
    </div>
    </>
  );
}
