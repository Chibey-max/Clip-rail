import { RequireAuthClient } from "@/components/auth/RequireAuthClient";
import { CampaignWizard } from "@/components/brand/CampaignWizard";
import { PageHeader } from "@/components/site/PageHeader";

export const metadata = { title: "Launch a campaign · Cliprail" };

export default function NewCampaignPage() {
  return (
    <>
    <PageHeader title="Launch a campaign" width="max-w-3xl">Lock a budget, set your rules, and pay only for views that are verified.</PageHeader>
    <div className="mx-auto max-w-3xl px-4 py-10">
      <div>
        <RequireAuthClient title="Sign in to launch a campaign">
          <CampaignWizard />
        </RequireAuthClient>
      </div>
    </div>
    </>
  );
}
