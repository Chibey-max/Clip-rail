"use client";

/**
 * Transaction hooks (playbook D-3.3, D-5.1, D-5.2). MOCK implementations with the final interface:
 * each returns { run, status, txHash, error }. David swaps the body of `mockSend` calls for real
 * viem + Mera transactions / relayer calls; pages stay the same.
 */
import { useCallback, useState } from "react";
import type { Address } from "@/lib/types";

export type TxStatus = "idle" | "signing" | "pending" | "success" | "error";

export interface CampaignParams {
  token: Address;
  budget: bigint; // token units (USDC: 6 decimals)
  cpm: bigint; // token units per 1,000 views
  maxPerClip: bigint;
  maxViewsPerReport: bigint;
  minLikeBps: number;
  holdSecs: number;
  startsAt: number;
  endsAt: number;
  minTier: 0 | 1 | 2;
  briefHash: `0x${string}`;
}

function fakeHash(): `0x${string}` {
  const hex = Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("");
  return `0x${hex}`;
}

function useTx<A extends unknown[]>() {
  const [status, setStatus] = useState<TxStatus>("idle");
  const [txHash, setTxHash] = useState<`0x${string}` | null>(null);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(async (..._args: A) => {
    void _args;
    setError(null);
    setTxHash(null);
    try {
      setStatus("signing");
      await new Promise((r) => setTimeout(r, 700));
      setStatus("pending");
      await new Promise((r) => setTimeout(r, 900));
      const hash = fakeHash();
      setTxHash(hash);
      setStatus("success");
      return hash;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setStatus("error");
      return null;
    }
  }, []);

  const reset = useCallback(() => {
    setStatus("idle");
    setTxHash(null);
    setError(null);
  }, []);

  return { run, status, txHash, error, reset };
}

/** approve + createCampaign (or createCampaignWithPermit). */
export const useCreateCampaign = () => useTx<[CampaignParams]>();
/** sign RegisterClip typed data → POST /relay/register. Gasless for the clipper. */
export const useRegisterClip = () => useTx<[campaignId: string, videoId: string]>();
/** sign TransferWithAuthorization → POST /relay/transfer. Gasless send-out. */
export const useSendOut = () => useTx<[to: Address, amountUnits: bigint]>();
/** sign SetPayout → POST /relay/payout-address. */
export const useSetPayout = () => useTx<[payout: Address]>();
export const useFlag = () => useTx<[clipId: string, reason: string]>();
export const useResolve = () => useTx<[clipId: string, reject: boolean]>();
export const useTopUp = () => useTx<[campaignId: string, amountUnits: bigint]>();
export const useClose = () => useTx<[campaignId: string]>();
/** testnet only: POST /sandbox/fund (0.1 MON + 1,000 MockUSDC). */
export const useSandboxFund = () => useTx<[]>();
