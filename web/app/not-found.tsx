import { LinkButton } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center gap-4 px-4 py-24 text-center">
      <span className="text-5xl font-bold text-muted">404</span>
      <h1 className="text-2xl font-bold">We couldn&apos;t find that page</h1>
      <p className="text-muted">The campaign or profile may not exist, or the link is wrong.</p>
      <LinkButton href="/campaigns">Browse campaigns</LinkButton>
    </div>
  );
}
