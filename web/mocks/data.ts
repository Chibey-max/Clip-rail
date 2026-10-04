import type { Campaign, Clip, Clipper, Receipt, Totals } from "@/lib/types";

/**
 * Mock data for building UI before the indexer exists (playbook P-1.3).
 * Every value is invented. Replace with Envio queries in P-3.3.
 */
/** Mock source videos use "mock:" ids so the UI shows a placeholder instead of embedding a real video. */
export const NOW = 1_759_600_000; // fixed "now" so server and client render the same thing

const H = 3600;
const D = 86400;

export const campaigns: Campaign[] = [
  {
    id: "1",
    brand: "0x8a1f2c3d4e5f60718293a4b5c6d7e8f901234567",
    brandName: "Cliprail",
    title: "Clip the Cliprail launch talk",
    brief:
      "Cut the best 20–60 second moments from our launch talk into vertical Shorts. Hooks in the first 2 seconds, captions on, put your claim code in the description.",
    sourceVideoId: "mock:launch",
    token: "USDC",
    budget: 150_000_000,
    reserved: 18_400_000,
    paid: 41_250_000,
    cpm: 1_000_000,
    maxPerClip: 20_000_000,
    maxViewsPerReport: 20_000,
    minLikeBps: 50,
    holdSecs: 1 * D,
    startsAt: NOW - 3 * D,
    endsAt: NOW + 20 * D,
    minTier: 0,
    status: "Active",
    clipsCount: 14,
    verifiedViews: 59_650,
    createdAt: NOW - 3 * D,
  },
  {
    id: "2",
    brand: "0x2b3c4d5e6f708192a3b4c5d6e7f8091a2b3c4d5e",
    brandName: "Northwind Games",
    title: "Indie trailer cuts for launch week",
    brief: "Turn our gameplay trailer into punchy Shorts. Gameplay only, no reaction faces, keep the logo visible at the end.",
    sourceVideoId: "mock:trailer",
    token: "USDC",
    budget: 400_000_000,
    reserved: 52_000_000,
    paid: 96_000_000,
    cpm: 1_500_000,
    maxPerClip: 40_000_000,
    maxViewsPerReport: 30_000,
    minLikeBps: 100,
    holdSecs: 2 * D,
    startsAt: NOW - 6 * D,
    endsAt: NOW + 8 * D,
    minTier: 1,
    status: "Active",
    clipsCount: 31,
    verifiedViews: 98_660,
    createdAt: NOW - 6 * D,
  },
  {
    id: "3",
    brand: "0x9c8b7a6f5e4d3c2b1a0f9e8d7c6b5a4f3e2d1c0b",
    brandName: "Lagos Studio Sessions",
    title: "Studio session highlights",
    brief: "Clip the strongest vocal moments from the session. Credit the artist in the description along with your claim code.",
    sourceVideoId: "mock:session",
    token: "USDC",
    budget: 80_000_000,
    reserved: 4_100_000,
    paid: 71_900_000,
    cpm: 800_000,
    maxPerClip: 10_000_000,
    maxViewsPerReport: 15_000,
    minLikeBps: 50,
    holdSecs: 1 * D,
    startsAt: NOW - 12 * D,
    endsAt: NOW + 5 * H,
    minTier: 0,
    status: "Active",
    clipsCount: 22,
    verifiedViews: 95_000,
    createdAt: NOW - 12 * D,
  },
  {
    id: "4",
    brand: "0x1d2e3f405162738495a6b7c8d9e0f1a2b3c4d5e6",
    brandName: "Orbit Wallet",
    title: "Explainer clips (closed)",
    brief: "Short explainers from our product walkthrough.",
    sourceVideoId: "mock:explainer",
    token: "USDC",
    budget: 60_000_000,
    reserved: 0,
    paid: 60_000_000,
    cpm: 1_000_000,
    maxPerClip: 15_000_000,
    maxViewsPerReport: 20_000,
    minLikeBps: 50,
    holdSecs: 1 * D,
    startsAt: NOW - 25 * D,
    endsAt: NOW - 4 * D,
    minTier: 0,
    status: "Closed",
    clipsCount: 9,
    verifiedViews: 60_000,
    createdAt: NOW - 25 * D,
  },
];

const clippers: [string, `0x${string}`][] = [
  ["@tobi.cuts", "0x4f1e2d3c4b5a69788796a5b4c3d2e1f0a9b8c7d6"],
  ["@adaeze.edits", "0x5e6d7c8b9a0f1e2d3c4b5a69788796a5b4c3d2e1"],
  ["@clipsbykay", "0x6a7b8c9d0e1f2a3b4c5d6e7f8091a2b3c4d5e6f7"],
  ["@vertical.vibes", "0x7b8c9d0e1f2a3b4c5d6e7f8091a2b3c4d5e6f708"],
  ["@shortsmith", "0x8c9d0e1f2a3b4c5d6e7f8091a2b3c4d5e6f70819"],
];

export const clips: Clip[] = [
  { id: "11", campaignId: "1", clipper: clippers[0][1], clipperHandle: clippers[0][0], videoId: "Ab3dEf6hIj9", title: "The 2-second hook that pays", status: "Active", lastViews: 18_420, likes: 1_240, accrued: 18_420_000, released: 12_000_000, registeredAt: NOW - 2 * D },
  { id: "12", campaignId: "1", clipper: clippers[1][1], clipperHandle: clippers[1][0], videoId: "Kl2mNo5pQr8", title: "Why clippers wait weeks to get paid", status: "Active", lastViews: 15_900, likes: 980, accrued: 15_900_000, released: 15_900_000, registeredAt: NOW - 2 * D },
  { id: "13", campaignId: "1", clipper: clippers[2][1], clipperHandle: clippers[2][0], videoId: "St4uVw7xYz1", title: "Escrow explained in 30s", status: "Pending", lastViews: 0, likes: 0, accrued: 0, released: 0, registeredAt: NOW - 40 * 60 },
  { id: "14", campaignId: "1", clipper: clippers[3][1], clipperHandle: clippers[3][0], videoId: "Bc5dEf8gHi2", title: "Botted views get nothing", status: "Flagged", lastViews: 22_000, likes: 31, accrued: 9_000_000, released: 0, registeredAt: NOW - 30 * H },
  { id: "15", campaignId: "1", clipper: clippers[4][1], clipperHandle: clippers[4][0], videoId: "Jk6lMn9oPq3", title: "Paid in seconds, not weeks", status: "Active", lastViews: 12_330, likes: 640, accrued: 12_330_000, released: 6_000_000, registeredAt: NOW - 20 * H },
  { id: "16", campaignId: "1", clipper: clippers[0][1], clipperHandle: clippers[0][0], videoId: "Rs7tUv0wXy4", title: "Repost of someone else's clip", status: "Rejected", lastViews: 4_100, likes: 90, accrued: 0, released: 0, registeredAt: NOW - 44 * H },
];

export const clipperProfiles: Clipper[] = clippers.map(([handle, id], i) => ({
  id,
  handle,
  paidViews: [32_400, 27_750, 9_800, 6_100, 18_330][i],
  earned: [33_900_000, 28_100_000, 9_800_000, 6_100_000, 18_330_000][i],
  clipsPaid: [5, 4, 2, 1, 3][i],
  rejections: [1, 0, 0, 1, 0][i],
  brands: [2, 2, 1, 1, 2][i],
  firstSeen: NOW - [9, 7, 4, 3, 6][i] * D,
  tier: ([1, 1, 1, 0, 1] as const)[i],
}));

export const receipts: Receipt[] = [
  { id: "r1", clipId: "11", campaignId: "1", clipper: clippers[0][1], round: 412, totalViews: 18_420, deltaViews: 2_310, likes: 1_240, amount: 2_310_000, unlockAt: NOW + 20 * H, timestamp: NOW - 4 * H, txHash: "0x9f2c41d0a8e7b3c5d6e7f8091a2b3c4d5e6f708192a3b4c5d6e7f8091a2b3c4d", released: false },
  { id: "r2", clipId: "11", campaignId: "1", clipper: clippers[0][1], round: 398, totalViews: 16_110, deltaViews: 4_110, likes: 1_090, amount: 4_110_000, unlockAt: NOW + 2 * H, timestamp: NOW - 22 * H, txHash: "0x1a2b3c4d5e6f708192a3b4c5d6e7f8091a2b3c4d5e6f708192a3b4c5d6e7f80", released: false },
  { id: "r3", clipId: "11", campaignId: "1", clipper: clippers[0][1], round: 371, totalViews: 12_000, deltaViews: 12_000, likes: 800, amount: 12_000_000, unlockAt: NOW - 6 * H, timestamp: NOW - 30 * H, txHash: "0x2b3c4d5e6f708192a3b4c5d6e7f8091a2b3c4d5e6f708192a3b4c5d6e7f8091", released: true },
];

export const totals: Totals = {
  campaigns: campaigns.length,
  clippers: 41,
  verifiedViews: campaigns.reduce((s, c) => s + c.verifiedViews, 0),
  paid: campaigns.reduce((s, c) => s + c.paid, 0),
  payouts: 187,
};

export function getCampaign(id: string) {
  return campaigns.find((c) => c.id === id);
}

export function clipsForCampaign(id: string) {
  return clips.filter((c) => c.campaignId === id);
}
