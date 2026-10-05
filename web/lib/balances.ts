"use client";

/** MON and USDC balances of the signed-in account (playbook D-1.5). Polls every 15 s. */
import { useQuery } from "@tanstack/react-query";
import { erc20Abi } from "@/lib/abi";
import { publicClient } from "@/lib/chains";
import { NETWORK, USDC } from "@/lib/network";
import { useAuth } from "@/lib/auth";

export interface Balances {
  /** wei */
  mon: bigint;
  /** USDC units (6 decimals) */
  usdc: bigint;
}

export function useBalances() {
  const { address, isMock } = useAuth();
  return useQuery({
    queryKey: ["balances", NETWORK, address],
    enabled: !!address && !isMock,
    refetchInterval: 15_000,
    queryFn: async (): Promise<Balances> => {
      const client = publicClient();
      const [mon, usdc] = await Promise.all([
        client.getBalance({ address: address! }),
        client.readContract({ address: USDC, abi: erc20Abi, functionName: "balanceOf", args: [address!] }),
      ]);
      return { mon, usdc };
    },
  });
}
