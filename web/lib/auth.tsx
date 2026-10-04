"use client";

/**
 * Auth contract for the app (playbook D-1.5). This file is a MOCK so screens can be built now.
 * David replaces the internals with Mera (createPasskeyWithPrfOutput / getPasskeyPrfOutput) and
 * keeps this exact interface, so no page has to change.
 */
import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { Address } from "@/lib/types";
import { MOCK_BRAND, MOCK_CLIPPER } from "@/mocks/data";

type Status = "signed-out" | "signing-in" | "signed-in";

interface AuthValue {
  address: Address | null;
  status: Status;
  signUp: (handle: string) => Promise<void>;
  signIn: () => Promise<void>;
  signOut: () => void;
  /** Dev-only: switch the mock identity between clipper and brand. */
  mockAs?: (who: "clipper" | "brand") => void;
}

const AuthContext = createContext<AuthValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // Dev only: NEXT_PUBLIC_MOCK_AUTH=clipper|brand starts signed in (build-time, so server and client agree).
  const preset = process.env.NEXT_PUBLIC_MOCK_AUTH;
  const initial = preset === "brand" ? MOCK_BRAND : preset === "clipper" ? MOCK_CLIPPER : null;
  const [address, setAddress] = useState<Address | null>(initial);
  const [status, setStatus] = useState<Status>(initial ? "signed-in" : "signed-out");
  const [as, setAs] = useState<"clipper" | "brand">(preset === "brand" ? "brand" : "clipper");

  const fakeSign = useCallback(async () => {
    setStatus("signing-in");
    await new Promise((r) => setTimeout(r, 600));
    setAddress(as === "brand" ? MOCK_BRAND : MOCK_CLIPPER);
    setStatus("signed-in");
  }, [as]);

  const value = useMemo<AuthValue>(
    () => ({
      address,
      status,
      signUp: async () => fakeSign(),
      signIn: fakeSign,
      signOut: () => {
        setAddress(null);
        setStatus("signed-out");
      },
      mockAs: (who) => {
        setAs(who);
        if (address) setAddress(who === "brand" ? MOCK_BRAND : MOCK_CLIPPER);
      },
    }),
    [address, status, fakeSign],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
