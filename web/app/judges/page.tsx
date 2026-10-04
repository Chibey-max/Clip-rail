import { JudgeSandbox } from "@/components/judges/JudgeSandbox";

export const metadata = { title: "Judges · Cliprail" };

export default function JudgesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <p className="text-sm font-semibold text-accent-hover">For judges</p>
      <h1 className="mt-2 text-3xl font-bold">Try Cliprail in under 5 minutes</h1>
      <p className="mt-2 text-muted">Works best on an iPhone (Safari) or Chrome with Google Password Manager. No wallet or gas needed.</p>
      <div className="mt-8"><JudgeSandbox /></div>
    </div>
  );
}
