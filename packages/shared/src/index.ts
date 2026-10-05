/** A YouTube video id: exactly 11 characters of [A-Za-z0-9_-]. Matches the vault's on-chain check. */
export const YT_ID = /^[A-Za-z0-9_-]{11}$/;

/**
 * Extracts the video id from a pasted link or a bare id.
 * Accepts youtube.com/shorts/ID, youtu.be/ID, youtube.com/watch?v=ID, m./www./music. hosts, and a bare ID.
 * Returns null when nothing valid is found.
 */
export function parseVideoId(input: string): string | null {
  const raw = input.trim();
  if (YT_ID.test(raw)) return raw;
  let url: URL;
  try {
    url = new URL(raw.startsWith("http") ? raw : `https://${raw}`);
  } catch {
    return null;
  }
  const host = url.hostname.replace(/^(www|m|music)\./, "");
  let id: string | null = null;
  if (host === "youtu.be") id = url.pathname.split("/")[1] ?? null;
  else if (host === "youtube.com" || host === "youtube-nocookie.com") {
    const parts = url.pathname.split("/").filter(Boolean);
    if (parts[0] === "shorts" || parts[0] === "embed" || parts[0] === "live") id = parts[1] ?? null;
    else if (parts[0] === "watch") id = url.searchParams.get("v");
  }
  return id && YT_ID.test(id) ? id : null;
}

export { claimCode, descriptionHasCode, FLAG_OWNERSHIP_OK, FLAG_UNAVAILABLE } from "./claim.ts";

/** EIP-712 types frozen in PRD §5.4 and playbook §C. */
export const EIP712_DOMAIN_NAME = "Cliprail";
export const EIP712_DOMAIN_VERSION = "1";

/** EIP-712 domain for vault signatures (RegisterClip, SetPayout). Web signs it; ops verifies it. */
export function cliprailDomain(chainId: number, vault: `0x${string}`) {
  return { name: EIP712_DOMAIN_NAME, version: EIP712_DOMAIN_VERSION, chainId, verifyingContract: vault } as const;
}

export const registerClipTypes = {
  RegisterClip: [
    { name: "campaignId", type: "uint256" },
    { name: "videoId", type: "string" },
    { name: "clipper", type: "address" },
    { name: "nonce", type: "uint256" },
    { name: "deadline", type: "uint256" },
  ],
} as const;

export const setPayoutTypes = {
  SetPayout: [
    { name: "clipper", type: "address" },
    { name: "payout", type: "address" },
    { name: "nonce", type: "uint256" },
    { name: "deadline", type: "uint256" },
  ],
} as const;

/** USDC EIP-3009, used for gasless send-out via /relay/transfer. */
export const transferWithAuthorizationTypes = {
  TransferWithAuthorization: [
    { name: "from", type: "address" },
    { name: "to", type: "address" },
    { name: "value", type: "uint256" },
    { name: "validAfter", type: "uint256" },
    { name: "validBefore", type: "uint256" },
    { name: "nonce", type: "bytes32" },
  ],
} as const;

export const USDC_DECIMALS = 6;
