/**
 * Live (unverified) preview of a Short, from the ops Worker's GET /yt/preview (playbook I-3.3).
 * Falls back to a deterministic mock while NEXT_PUBLIC_OPS_URL is not set.
 */
export interface Preview {
  videoId: string;
  title: string;
  channel: string;
  thumb: string;
  views: number;
  likes: number;
  publishedAt: number;
  durationSec: number;
  public: boolean;
  codeFound: boolean;
}

export async function fetchPreview(videoId: string, code: string): Promise<Preview> {
  const ops = process.env.NEXT_PUBLIC_OPS_URL;
  if (ops) {
    const res = await fetch(`${ops}/yt/preview?id=${encodeURIComponent(videoId)}&code=${encodeURIComponent(code)}`);
    if (!res.ok) throw new Error(res.status === 404 ? "We couldn't find that video. Is it public?" : "Preview failed. Try again.");
    return res.json();
  }
  await new Promise((r) => setTimeout(r, 500));
  const seed = [...videoId].reduce((s, ch) => s + ch.charCodeAt(0), 0);
  return {
    videoId,
    title: "Your Short (preview mock)",
    channel: "your channel",
    thumb: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
    views: (seed * 37) % 5000,
    likes: (seed * 3) % 300,
    publishedAt: Math.floor(Date.now() / 1000) - 3600,
    durationSec: 42,
    public: true,
    codeFound: seed % 4 !== 0, // sometimes "missing", so the error state can be seen in dev
  };
}
