/**
 * Runtime-neutral helpers shared with the CRE oracle (no DOM or Node globals: it runs in QuickJS/WASM).
 * Import as "@cliprail/shared/claim" from the workflow.
 */
import { encodePacked, keccak256 } from "viem";

/**
 * Claim code a clipper puts in the Short's description to prove ownership.
 * "CR-" + first 8 hex chars (upper case) of keccak256(abi.encodePacked(uint256 campaignId, address clipper)).
 * Must stay identical to CampaignVault.claimCode() and the CRE workflow.
 */
export function claimCode(campaignId: bigint | number | string, clipper: `0x${string}`): string {
  const hash = keccak256(encodePacked(["uint256", "address"], [BigInt(campaignId), clipper]));
  return `CR-${hash.slice(2, 10).toUpperCase()}`;
}

/** Case-insensitive check that a description contains the claim code. */
export function descriptionHasCode(description: string, code: string): boolean {
  return description.toUpperCase().includes(code.toUpperCase());
}

/** Report flags (PRD §5.2). */
export const FLAG_OWNERSHIP_OK = 1;
export const FLAG_UNAVAILABLE = 2;
