import { USDC_DECIMALS } from "@cliprail/shared";

/** "12.5" → 12_500_000n. Returns null for invalid input. */
export function parseUsd(input: string): bigint | null {
  const s = input.trim().replace(/[$,\s]/g, "");
  if (!/^\d+(\.\d{0,6})?$/.test(s)) return null;
  const [whole, frac = ""] = s.split(".");
  return BigInt(whole) * 10n ** BigInt(USDC_DECIMALS) + BigInt(frac.padEnd(USDC_DECIMALS, "0"));
}

export const toNumberUnits = (v: bigint) => Number(v);
