"use client";

import { usePathname } from "next/navigation";
import { SkyBackdrop } from "@/components/landing/SkyBackdrop";

/**
 * The live sky behind every inner page (the landing page draws its own, bigger one). Full strength behind the page
 * title, then softened under the content so text stays readable (blue all the way down by day, dimmed stars at night); it only fades into the page over the last few rem, fading
 * into the page just above the footer.
 */
export function PageSky() {
  const path = usePathname();
  if (path === "/") return null;
  return (
    <div aria-hidden className="cr-page-sky pointer-events-none absolute inset-x-0 -top-[4.5rem] bottom-0 -z-10">
      <SkyBackdrop variant="band" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_11rem,rgb(70_135_220/0.3)_22rem,rgb(90_150_225/0.38)_calc(100%-6rem),var(--color-bg))] dark:bg-[linear-gradient(to_bottom,transparent_17rem,color-mix(in_srgb,var(--color-bg)_35%,transparent)_30rem,color-mix(in_srgb,var(--color-bg)_45%,transparent)_calc(100%-6rem),var(--color-bg))]" />
    </div>
  );
}
