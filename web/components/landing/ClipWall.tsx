import { ShortThumb } from "@/components/ui/ShortThumb";

const clips = [
  ["the 2-second hook", 262, 18420], ["paid in 24 hours", 150, 12330], ["escrow explained", 28, 9100], ["bots earn nothing", 340, 22000],
  ["clip of the week", 200, 31000], ["why brands love this", 48, 7400], ["face id sign up", 290, 5600], ["verified onchain", 190, 14800],
] as const;

/** Auto-scrolling wall of clips (Clipping.net's creator wall, with our own drawn thumbnails). */
export function ClipWall() {
  const row = [...clips, ...clips];
  return (
    <section className="overflow-hidden py-16">
      <p className="eyebrow text-center">Paid this week</p>
      <h2 className="mt-3 text-center text-4xl font-bold sm:text-5xl">Real clips. Real payouts.</h2>
      <div className="relative mt-10 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="flex w-max animate-marquee gap-4">
          {row.map(([c, h, v], i) => (
            <ShortThumb key={i} caption={c} hue={h} views={v} paid={i % 3 === 0 ? `+$${(v / 1000).toFixed(2)}` : undefined} className="w-36 sm:w-44" />
          ))}
        </div>
      </div>
    </section>
  );
}
