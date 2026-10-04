"use client";

import { SignInButton } from "@/components/auth/SignInButton";
import { useAuth } from "@/lib/auth";
import type { Address } from "@/lib/types";

/** Renders children with the signed-in address, or a sign-in prompt. */
export function RequireAuth({ title, children }: { title: string; children: (address: Address) => React.ReactNode }) {
  const { address } = useAuth();
  if (!address) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-muted">Sign in with your passkey to continue.</p>
        <SignInButton />
      </div>
    );
  }
  return <>{children(address)}</>;
}
