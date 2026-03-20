export function Footer() {
  return (
    <footer className="border-t border-border/50 py-8">
      <div className="mx-auto max-w-5xl px-4 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-[10px] font-bold text-primary-foreground">
              FI
            </div>
            <span className="text-sm font-medium">FenerIndex</span>
          </div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a
              href="https://twitter.com/intent/tweet?text=Check%20out%20FenerIndex%20-%20vote%20on%20Fenerbahce%20transfer%20rumors!&url=https://fenerindex.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Share on X
            </a>
            <a
              href="https://github.com/berkcankapusuzoglu/FenerIndex"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              GitHub
            </a>
          </div>
        </div>
        <p className="text-center text-xs text-muted-foreground/60">
          Fan sentiment, not news. Not affiliated with Fenerbahce SK.
        </p>
      </div>
    </footer>
  );
}
