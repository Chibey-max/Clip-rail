import Link from "next/link";
import { SignInButton } from "@/components/auth/SignInButton";

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
          <div className="ml-1"><SignInButton /></div>
        </nav>
      </div>
    </header>
  );
}
