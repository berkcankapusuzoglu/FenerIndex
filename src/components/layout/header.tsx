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
          <span className="cursor-not-allowed rounded-md px-2 py-1 sm:px-3 sm:py-1.5 text-xs sm:text-sm font-medium text-muted-foreground">
            Hot Takes
            <span className="ml-1 rounded-full bg-primary/20 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
              SOON
            </span>
          </span>
        </nav>
      </div>
    </header>
  );
}
