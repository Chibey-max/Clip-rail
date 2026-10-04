import { LinkButton } from "@/components/ui/Button";
import { ShortThumb } from "@/components/ui/ShortThumb";

export function FinalCta() {
  return (
    <section className="px-3">
      <div className="relative mx-auto grid max-w-6xl overflow-hidden rounded-[32px] bg-accent px-6 py-14 text-white sm:grid-cols-[1.3fr_1fr] sm:px-12">
        <div>
          <h2 className="max-w-md text-4xl font-bold sm:text-5xl">Your next clip could pay tonight.</h2>
          <p className="mt-3 max-w-md text-white/80">Pick a campaign, post a Short, get paid per verified view.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <LinkButton href="/campaigns" variant="secondary" className="!border-white">Start clipping →</LinkButton>
            <LinkButton href="/brand/new" variant="ink">Launch a campaign</LinkButton>
          </div>
        </div>
        <div className="pointer-events-none hidden items-center justify-end gap-4 sm:flex">
          <ShortThumb caption="get paid tonight" hue={150} views={9100} paid="+$9.10" className="w-32 -rotate-6" />
          <ShortThumb caption="verified views only" hue={28} views={14800} className="mt-10 w-32 rotate-6" />
        </div>
      </div>
    </section>
  );
}
