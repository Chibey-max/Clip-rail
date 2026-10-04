"use client";

import { useAsync } from "@/lib/useAsync";
import { count } from "@/lib/format";
import { fetchPreview } from "@/lib/youtube";

/** Live view count (never shown below the verified count, which it can only trail) straight from YouTube. Always labelled unverified, never mixed with paid numbers. */
export function LiveViews({ videoId, code, verified }: { videoId: string; code: string; verified: number }) {
  const { data, loading } = useAsync(() => fetchPreview(videoId, code), [videoId, code]);
  if (loading) return <span className="text-xs text-muted">live: …</span>;
  if (!data) return null;
  return <span className="tabular text-xs text-muted">live: {count(Math.max(data.views, verified))} (unverified)</span>;
}
