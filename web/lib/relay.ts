/**
 * Client for the ops Worker relayer (Isaac, playbook I-3.x). The relayer only pays gas; it never holds
 * user funds. Bodies carry bigints as decimal strings.
 */
import type { Hex } from "viem";

export async function postRelay(path: string, body: Record<string, string>): Promise<Hex> {
  const ops = process.env.NEXT_PUBLIC_OPS_URL;
  if (!ops) throw new Error("The relayer isn't configured (NEXT_PUBLIC_OPS_URL).");
  let res: Response;
  try {
    res = await fetch(`${ops}${path}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error("Couldn't reach the relayer. Check your connection and try again.");
  }
  const json = (await res.json().catch(() => ({}))) as { txHash?: Hex; error?: string };
  if (res.status === 429) throw new Error("Too many requests. Wait a minute and try again.");
  if (!res.ok || !json.txHash) throw new Error(json.error ?? `The relayer refused the request (${res.status}).`);
  return json.txHash;
}
