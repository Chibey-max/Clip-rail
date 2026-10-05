/**
 * Monad chains and the public client (playbook D-1.2). RPCs come from env so a dedicated
 * endpoint (QuickNode perk, Alchemy) can replace the public one without a code change.
 */
import { createPublicClient, defineChain, http, type PublicClient } from "viem";
import type { Network } from "@cliprail/abi";
import { NETWORK } from "@/lib/network";

export const monadTestnet = defineChain({
  id: 10143,
  name: "Monad Testnet",
  nativeCurrency: { name: "Monad", symbol: "MON", decimals: 18 },
  rpcUrls: {
    default: { http: [process.env.NEXT_PUBLIC_MONAD_TESTNET_RPC || "https://testnet-rpc.monad.xyz"] },
  },
  blockExplorers: {
    default: { name: "MonadVision", url: "https://testnet.monadvision.com" },
    monadscan: { name: "Monadscan", url: "https://testnet.monadscan.com" },
  },
  testnet: true,
});

export const monadMainnet = defineChain({
  id: 143,
  name: "Monad",
  nativeCurrency: { name: "Monad", symbol: "MON", decimals: 18 },
  rpcUrls: {
    default: { http: [process.env.NEXT_PUBLIC_MONAD_MAINNET_RPC || "https://rpc.monad.xyz"] },
  },
  blockExplorers: {
    default: { name: "MonadVision", url: "https://monadvision.com" },
    monadscan: { name: "Monadscan", url: "https://monadscan.com" },
  },
});

export const CHAINS = { testnet: monadTestnet, mainnet: monadMainnet } as const;

/** The chain this deployment talks to (NEXT_PUBLIC_NETWORK). */
export const chain = CHAINS[NETWORK];

const clients: Partial<Record<Network, PublicClient>> = {};

export function publicClient(network: Network = NETWORK): PublicClient {
  return (clients[network] ??= createPublicClient({ chain: CHAINS[network], transport: http() }) as PublicClient);
}
