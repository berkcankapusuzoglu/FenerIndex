import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-1.5 sm:gap-2">
          <div className="flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-lg bg-primary">
            <span className="text-[10px] sm:text-sm font-bold text-primary-foreground">FI</span>
          </div>
          <span className="text-sm sm:text-lg font-bold tracking-tight">
            Fener<span className="text-primary">Index</span>
          </span>
        </Link>

        <nav className="flex items-center gap-0.5 sm:gap-1">
          <Link
            href="/rumors"
            className="rounded-md px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Rumor Radar
          </Link>
          <Link
            href="/hot-takes"
            className="rounded-md px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            Hot Takes
          </Link>
          <Link
            href="/news"
            className="rounded-md px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            News
          </Link>
        </nav>
      </div>
    </header>
  );
}
