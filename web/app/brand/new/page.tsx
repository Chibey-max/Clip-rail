import { RequireAuthClient } from "@/components/auth/RequireAuthClient";
import { CampaignWizard } from "@/components/brand/CampaignWizard";

export const metadata = { title: "Launch a campaign · Cliprail" };

export default function NewCampaignPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-bold">Launch a campaign</h1>
      <p className="mt-2 text-muted">Lock a budget, set your rules, and pay only for views that are verified.</p>
      <div className="mt-8">
        <RequireAuthClient title="Sign in to launch a campaign">
          <CampaignWizard />
        </RequireAuthClient>
      </div>
    </div>
  );
}
