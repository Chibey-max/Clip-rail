/**
 * Campaign brief text (brand name, title, brief, source video) lives off-chain; only its hash is on-chain.
 * Until the ops Worker serves briefs (GET /briefs/:campaignId), this returns a neutral fallback.
 */
export interface Brief {
  brandName: string;
  title: string;
  brief: string;
  sourceVideoId: string;
}

export async function getBrief(campaignId: string): Promise<Brief> {
  const ops = process.env.NEXT_PUBLIC_OPS_URL;
  if (ops) {
    try {
      const res = await fetch(`${ops}/briefs/${campaignId}`, { next: { revalidate: 60 } });
      if (res.ok) return (await res.json()) as Brief;
    } catch {
      // fall through to the fallback
    }
  }
  return { brandName: "Brand", title: `Campaign #${campaignId}`, brief: "Brief coming soon.", sourceVideoId: "" };
}
