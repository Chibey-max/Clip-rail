/**
 * Hero backdrop, drawn procedurally (no images) but aiming for a photographic look.
 * Day: a real sky photo (public/sky/day.webp), colour-graded per phase (morning / afternoon / evening).
 * Night: dark sky, seeded stars with a soft milky way band, NASA moon render (public/sky/moon-gibbous.webp),
 * rare shooting star, film grain.
 * All phases always render and crossfade when <html data-sky> changes (see ThemeToggle).
 */

// Deterministic PRNG so server and client render identical skies (no hydration mismatch).
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const W = 1440;
const H = 1024;
// Milky way band: centre and tilt, shared by the star generator and the glow mask.
const MW = { cx: 760, cy: 470, tilt: -26 };

type Star = { x: number; y: number; r: number; o: number; c: string; tw: boolean; d: number; glow: boolean };

const STARS: Star[] = (() => {
  const rand = mulberry32(20261013);
  const tint = () => {
    const t = rand();
    return t < 0.08 ? "#ffd2a1" : t < 0.4 ? "#d6e2ff" : t < 0.46 ? "#fff1dc" : "#ffffff";
  };
  const out: Star[] = [];
  // Field stars: long-exposure look, so lots of tiny faint points and only a handful of bright ones.
  for (let i = 0; i < 1100; i++) {
    const m = Math.pow(rand(), 4);
    out.push({ x: rand() * W, y: rand() * H * 0.95, r: 0.45 + m * 1.3, o: 0.35 + m * 0.65, c: tint(), tw: m > 0.2 && rand() < 0.3, d: rand() * 6, glow: m > 0.82 });
  }
  // Dense dim stars packed into the milky way (roughly normal across the band).
  const a = (MW.tilt * Math.PI) / 180;
  for (let i = 0; i < 380; i++) {
    const along = rand() * (W + 800) - (W + 800) / 2;
    const across = (rand() + rand() + rand() - 1.5) * 110;
    const x = MW.cx + along * Math.cos(a) - across * Math.sin(a);
    const y = MW.cy + along * Math.sin(a) + across * Math.cos(a);
    if (x < 0 || x > W || y < 0 || y > H) continue;
    out.push({ x, y, r: 0.35 + rand() * 0.4, o: 0.25 + rand() * 0.45, c: rand() < 0.2 ? "#ffe6c8" : "#eef2ff", tw: false, d: 0, glow: false });
  }
  // A planet: one warm, steady, brighter point (like Mars/Jupiter in the reference shots).
  out.push({ x: 300, y: 330, r: 2.1, o: 1, c: "#ffc58a", tw: false, d: 0, glow: true });
  return out;
})();

// Stars that keep going down the page below the hero, thinning out as they go.
const TRAIL_H = 1600;
const TRAIL: Star[] = (() => {
  const rand = mulberry32(7331);
  const out: Star[] = [];
  for (let i = 0; i < 900; i++) {
    const m = Math.pow(rand(), 4);
    out.push({ x: rand() * W, y: Math.pow(rand(), 1.5) * TRAIL_H, r: 0.45 + m * 1.2, o: 0.3 + m * 0.6, c: rand() < 0.35 ? "#d6e2ff" : "#ffffff", tw: m > 0.2 && rand() < 0.3, d: rand() * 6, glow: m > 0.85 });
  }
  return out;
})();

function StarField({ stars, h, className }: { stars: Star[]; h: number; className: string }) {
  return (
    <svg viewBox={`0 0 ${W} ${h}`} preserveAspectRatio="xMidYMin slice" className={className} aria-hidden>
      {stars.map((s, i) => (
        <circle
          key={i}
          cx={s.x.toFixed(1)}
          cy={s.y.toFixed(1)}
          r={s.r.toFixed(2)}
          fill={s.c}
          opacity={s.o.toFixed(2)}
          filter={s.glow ? "url(#star-glow)" : undefined}
          className={s.tw ? "animate-twinkle" : undefined}
          style={s.tw ? { animationDelay: `${s.d.toFixed(2)}s` } : undefined}
        />
      ))}
    </svg>
  );
}

/** Fine film grain so large gradients don't band. */
function Grain({ opacity }: { opacity: number }) {
  return (
    <svg className="absolute inset-0 h-full w-full mix-blend-overlay" style={{ opacity }} aria-hidden>
      <filter id={`grain-${opacity}`}>
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
      </filter>
      <rect width="100%" height="100%" filter={`url(#grain-${opacity})`} />
    </svg>
  );
}

function NightSky() {
  const bandT = `rotate(${MW.tilt} ${MW.cx} ${MW.cy})`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMin slice" className="absolute inset-x-0 top-0 h-[72rem] w-full [mask-image:linear-gradient(to_bottom,black_55%,transparent_92%)]" aria-hidden>
      <defs>
        <radialGradient id="mw-shape" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff" stopOpacity="1" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="0.6" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <mask id="mw-mask" maskContentUnits="userSpaceOnUse">
          <ellipse cx={MW.cx} cy={MW.cy} rx={W * 0.7} ry="125" fill="url(#mw-shape)" transform={bandT} />
        </mask>
        <filter id="star-glow" x="-300%" y="-300%" width="700%" height="700%">
          <feGaussianBlur stdDeviation="1.3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* milky way: just a smooth, faint glow along the band; the dense band stars give it its shape */}
      <rect width={W} height={H} fill="#c9d3ff" opacity="0.07" mask="url(#mw-mask)" />

      {STARS.map((s, i) => (
        <circle
          key={i}
          cx={s.x.toFixed(1)}
          cy={s.y.toFixed(1)}
          r={s.r.toFixed(2)}
          fill={s.c}
          opacity={s.o.toFixed(2)}
          filter={s.glow ? "url(#star-glow)" : undefined}
          className={s.tw ? "animate-twinkle" : undefined}
          style={s.tw ? { animationDelay: `${s.d.toFixed(2)}s` } : undefined}
        />
      ))}

    </svg>
  );
}

const PHOTO = "absolute inset-x-0 top-0 h-[72rem] [mask-image:linear-gradient(to_bottom,black_55%,transparent)]";

export function SkyBackdrop({ variant = "full" }: { variant?: "full" | "band" }) {
  // Four skies, crossfaded by <html data-sky>. The sky spans the hero and the sections under it, so it trickles down the page.
  return (
    <div aria-hidden className={`cr-sky pointer-events-none absolute inset-0 -z-10 overflow-hidden ${variant === "band" ? "cr-sky-band" : ""}`}>
      {/* ---------- Daylight photo: morning / afternoon / evening are the same photo, graded differently ---------- */}
      <div className="absolute inset-0 opacity-100 transition-opacity duration-[1400ms] sky-night:opacity-0">
        {/* base gradients under and below the photo, one per phase */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#0b3f9c_0px,#1458b8_700px,#3a86d4_1150px,#8dbcea_1550px,#cfe2f5_1850px,var(--color-bg)_100%)] opacity-0 transition-opacity duration-[1400ms] sky-afternoon:opacity-100" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#4a8ad6_0px,#6fa6e2_650px,#a9cbee_1100px,#f1dccb_1450px,#f7ece2_1750px,var(--color-bg)_100%)] opacity-0 transition-opacity duration-[1400ms] sky-morning:opacity-100" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#1a1f4d_0px,#3a2d6b_500px,#8a4775_850px,#c86a5e_1050px,#3a2840_1450px,var(--color-bg)_100%)] opacity-0 transition-opacity duration-[1400ms] sky-evening:opacity-100" />

        <div className={PHOTO + " w-full"}>
          {/* eslint-disable-next-line @next/next/no-img-element -- decorative, fetched eagerly so the hero never flashes empty */}
          <img
            src="/sky/day.webp"
            alt=""
            fetchPriority="high"
            className="size-full object-cover object-top transition-[filter] duration-[1400ms] sky-morning:[filter:brightness(1.2)_saturate(0.9)_hue-rotate(-12deg)] sky-evening:[filter:brightness(0.75)_saturate(0.5)_contrast(1.05)]"
          />
          {/* morning: pale haze up top, golden sunrise glow low on the left */}
          <div className="absolute inset-0 opacity-0 transition-opacity duration-[1400ms] sky-morning:opacity-100">
            <div className="absolute inset-0 bg-white/25 mix-blend-soft-light" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_10%_75%,rgb(255_190_130/0.6),transparent_55%)] mix-blend-screen" />
          </div>
          {/* evening: dusk colour grade, clouds catch orange and pink light near the horizon */}
          <div className="absolute inset-0 opacity-0 transition-opacity duration-[1400ms] sky-evening:opacity-100">
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#4a50a8_0%,#8a5aa6_38%,#ec8a86_62%,#ffc58e_85%)] mix-blend-multiply" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_80%,rgb(255_150_90/0.55),transparent_60%)] mix-blend-screen" />
          </div>
        </div>

        {/* civil twilight: the pink Belt of Venus over the grey-blue band of Earth's shadow, low in the east (left) */}
        <div className="absolute inset-x-0 top-[30rem] h-[18rem] bg-[linear-gradient(180deg,transparent,rgb(236_150_170/0.22)_40%,rgb(70_80_120/0.35)_75%,transparent)] [mask-image:linear-gradient(to_right,black,transparent_55%)] opacity-0 transition-opacity duration-[1400ms] sky-evening:opacity-100" />
        {/* first stars at dusk: only the brightest */}
        <div className="absolute inset-0 opacity-0 transition-opacity duration-[1400ms] sky-evening:opacity-70">
          <StarField stars={STARS.filter((st) => st.glow).slice(0, 30)} h={H} className="absolute inset-x-0 top-0 h-[64rem] w-full [mask-image:linear-gradient(to_bottom,black,transparent_38%)]" />
        </div>
        <div className="cr-bottom-fade absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-bg to-transparent" />
        <Grain opacity={0.06} />
      </div>

      {/* ---------- Night ---------- */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-[1400ms] sky-night:opacity-100 sky-night:delay-300">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#040917_0px,#081530_300px,#0d2448_650px,#123762_1000px,#143a66_1500px,#0f2a50_2000px,var(--color-bg)_100%)]" />
        {/* airglow / light pollution band low in the sky */}
        <div className="absolute inset-x-[-10%] top-[44rem] h-[22rem] bg-[radial-gradient(ellipse_at_center,rgb(214_110_190/0.28)_0%,rgb(140_90_220/0.14)_40%,transparent_70%)] blur-2xl" />
        <NightSky />
        <StarField stars={TRAIL} h={TRAIL_H} className="absolute inset-x-0 top-[44rem] h-[110rem] w-full [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_70%,transparent)]" />
        <span className="absolute top-[8rem] right-[30%] h-px w-28 animate-shoot bg-gradient-to-r from-white/90 to-transparent [animation-duration:14s]" />
        <div className="cr-bottom-fade absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-bg to-transparent" />
        <Grain opacity={0.1} />
      </div>

      {/* ---------- Sun and moon on one turning wheel (see .cr-wheel in globals.css) ---------- */}
      {/* glow layer: not masked, so after sunset the sun's light still rises from behind the horizon */}
      <div className="cr-wheel">
        <div className="cr-arm-sun">
          <div className="cr-sun-glow relative -translate-x-1/2 -translate-y-1/2 mix-blend-screen">
            <div className="cr-sun-day absolute top-1/2 left-1/2 size-[44rem] -translate-1/2 rounded-full bg-[radial-gradient(circle,rgb(255_255_250/0.45)_0%,rgb(220_236_255/0.16)_20%,transparent_60%)]" />
            <div className="cr-sun-dusk absolute top-1/2 left-1/2 size-[60rem] -translate-1/2 rounded-full bg-[radial-gradient(circle,rgb(255_160_90/0.5)_0%,rgb(255_110_90/0.18)_25%,transparent_60%)]" />
          </div>
        </div>
      </div>
      {/* bodies: masked below the horizon, so they really set and rise */}
      <div className="cr-below-horizon">
        <div className="cr-wheel">
          <div className="cr-arm-sun">
            <div className="relative size-20 -translate-x-1/2 -translate-y-1/2 mix-blend-screen">
              <div className="cr-sun-day absolute inset-0 rounded-full bg-[radial-gradient(circle,#ffffff_0%,#ffffff_26%,rgb(255_255_255/0.45)_46%,transparent_70%)] blur-[2px]" />
              <div className="cr-sun-dusk absolute inset-0 rounded-full bg-[radial-gradient(circle,#fff0d0_0%,#ffbf73_24%,rgb(255_130_70/0.5)_46%,transparent_70%)] blur-[2px]" />
            </div>
          </div>
        </div>
        <div className="cr-wheel cr-wheel-moon">
          <div className="cr-arm-moon">
            <div>
              <div className="cr-moon-upright">
                <div className="cr-moon relative size-[4.5rem] -translate-x-1/2 -translate-y-1/2 mix-blend-screen">
                  <div className="cr-moon-glow absolute top-1/2 left-1/2 size-[22rem] -translate-1/2 rounded-full bg-[radial-gradient(circle,rgb(232_238_255/0.2)_0%,rgb(200_212_255/0.06)_35%,transparent_65%)]" />
                  {/* NASA SVS Dial-a-Moon render (public domain), black sky removed so only the lit disc remains */}
                  {/* eslint-disable-next-line @next/next/no-img-element -- decorative */}
                  <img src="/sky/moon-gibbous.webp" alt="" className="relative size-full max-w-none" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
