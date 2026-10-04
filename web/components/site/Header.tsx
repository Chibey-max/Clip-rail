import Link from "next/link";
import { LinkButton } from "@/components/ui/Button";

export function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-bg/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
        <Link href="/" className="flex items-center gap-2 font-bold tracking-tight">
          <span aria-hidden className="grid size-7 place-items-center rounded-lg bg-accent text-sm text-accent-fg">▶</span>
          Cliprail
        </Link>
        <nav className="flex items-center gap-1 text-sm">
          <Link href="/campaigns" className="rounded-md px-3 py-2 text-muted hover:text-fg">Campaigns</Link>
          <Link href="/leaderboard" className="hidden rounded-md px-3 py-2 text-muted hover:text-fg sm:block">Leaderboard</Link>
          {/* Auth (D-1.5 / P-1.5): replaced by David's SignInButton once H2 lands */}
          <LinkButton href="/campaigns" className="ml-1 min-h-9 px-3">Start clipping</LinkButton>
        </nav>
      </div>
    </header>
  );
}
