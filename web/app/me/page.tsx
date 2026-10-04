"use client";

import { RequireAuth } from "@/components/auth/RequireAuth";
import { MeDashboard } from "@/components/me/MeDashboard";

export default function MePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <RequireAuth title="Your earnings">
        {(address) => (
          <>
            <h1 className="mb-6 text-3xl font-bold">My earnings</h1>
            <MeDashboard address={address} />
          </>
        )}
      </RequireAuth>
    </div>
  );
}
