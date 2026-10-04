import { cn } from "@/lib/cn";

const HUES = [262, 200, 150, 28, 340, 190, 48, 290];

function hueFor(seed: string) {
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return HUES[h % HUES.length];
}

/** Initials avatar with a stable gradient per name. No stock photos. */
export function Avatar({ name, size = 36, className, ring }: { name: string; size?: number; className?: string; ring?: boolean }) {
  const hue = hueFor(name);
  const initials = name.replace(/[^A-Za-z0-9 ]/g, "").split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase() || "?";
  return (
    <span
      className={cn("inline-grid shrink-0 place-items-center rounded-full font-semibold text-white", ring && "ring-2 ring-white", className)}
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
        background: `linear-gradient(135deg, hsl(${hue} 85% 62%), hsl(${(hue + 40) % 360} 80% 48%))`,
      }}
      aria-hidden
    >
      {initials}
    </span>
  );
}

export function AvatarStack({ names, size = 28 }: { names: string[]; size?: number }) {
  return (
    <span className="flex -space-x-2">
      {names.map((n) => (
        <Avatar key={n} name={n} size={size} ring />
      ))}
    </span>
  );
}
