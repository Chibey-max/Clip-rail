"use client";

import { RequireAuth } from "@/components/auth/RequireAuth";

/** Server-component friendly wrapper: children don't need the address. */
export function RequireAuthClient({ title, children }: { title: string; children: React.ReactNode }) {
  return <RequireAuth title={title}>{() => children}</RequireAuth>;
}
