"use client";

import { RequireAuth } from "@/components/auth/RequireAuth";
import { MeDashboard } from "@/components/me/MeDashboard";
import { PageHeader } from "@/components/site/PageHeader";

export default function MePage() {
  return (
    <>
    <PageHeader title="My earnings" width="max-w-5xl" />
    <div className="mx-auto max-w-5xl px-4 py-10">
      <RequireAuth title="Your earnings">{(address) => <MeDashboard address={address} />}</RequireAuth>
    </div>
    </>
  );
}
