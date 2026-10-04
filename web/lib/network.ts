import { addressesFor, type Network } from "@cliprail/abi";

export const NETWORK: Network = process.env.NEXT_PUBLIC_NETWORK === "mainnet" ? "mainnet" : "testnet";
export const ADDR = addressesFor(NETWORK);
export const USDC = ADDR.usdc as `0x${string}`;
