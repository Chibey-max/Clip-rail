/**
 * The only place pages get data from. Today it reads mocks; on Day 3 (P-3.2) each function
 * switches to an Envio GraphQL query and the pages don't change.
 * All functions are async on purpose so the swap is a drop-in.
 */
import type { Address, Campaign, Clip, Clipper, Receipt, Tier, Totals } from "@/lib/types";
import * as mock from "@/mocks/data";

export const now = () => mock.NOW; // switch to Math.floor(Date.now() / 1000) with live data

export async function getCampaigns(): Promise<Campaign[]> {
  return mock.campaigns;
}

export async function getCampaign(id: string): Promise<Campaign | undefined> {
  return mock.getCampaign(id);
}

export async function getCampaignsByBrand(brand: Address): Promise<Campaign[]> {
  return mock.campaigns.filter((c) => c.brand.toLowerCase() === brand.toLowerCase());
}

export async function getClipsForCampaign(id: string): Promise<Clip[]> {
  return mock.clipsForCampaign(id);
}

export async function getClipsByClipper(clipper: Address): Promise<Clip[]> {
  return mock.clips.filter((c) => c.clipper.toLowerCase() === clipper.toLowerCase());
}

export async function getReceiptsByClipper(clipper: Address): Promise<Receipt[]> {
  return mock.receipts
    .filter((r) => r.clipper.toLowerCase() === clipper.toLowerCase())
    .sort((a, b) => b.timestamp - a.timestamp);
}

export async function getClipper(address: Address): Promise<Clipper> {
  const found = mock.clipperProfiles.find((c) => c.id.toLowerCase() === address.toLowerCase());
  return (
    found ?? { id: address, paidViews: 0, earned: 0, clipsPaid: 0, rejections: 0, brands: 0, firstSeen: 0, tier: 0 as Tier }
  );
}

export async function getLeaderboard(limit = 20): Promise<Clipper[]> {
  return [...mock.clipperProfiles].sort((a, b) => b.paidViews - a.paidViews).slice(0, limit);
}

export async function getTotals(): Promise<Totals> {
  return mock.totals;
}

/** Earnings split for a clipper: verified (accrued), holding (accrued, not released), paid (released). */
export function earningsSummary(clips: Clip[]) {
  const verified = clips.reduce((s, c) => s + c.accrued, 0);
  const paid = clips.reduce((s, c) => s + c.released, 0);
  return { verified, paid, holding: verified - paid };
}
