import Link from "next/link";
import { DEMO_RUMORS, isDemoMode } from "@/lib/demo-data";
import { DEMO_HOT_TAKES } from "@/lib/demo-hot-takes";
import { DEMO_NEWS } from "@/lib/demo-news";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SentimentGauge } from "@/components/rumors/sentiment-gauge";
import { AdUnit } from "@/components/ads/ad-unit";
import { AD_SLOTS } from "@/components/ads/ad-config";
import type { Rumor } from "@/lib/supabase/types";

async function getRumors(): Promise<Rumor[]> {
  if (isDemoMode()) return DEMO_RUMORS;

  try {
    const { getSupabaseServerClient } = await import("@/lib/supabase/server");
    const supabase = await getSupabaseServerClient();
    const { data } = await supabase
      .from("rumors")
      .select("*")
      .eq("status", "active")
      .order("created_at", { ascending: false });
    return (data as Rumor[]) ?? DEMO_RUMORS;
  } catch {
    return DEMO_RUMORS;
  }
}

export default async function Home() {
  const rumors = await getRumors();
  const activeRumors = rumors.filter((r) => r.status === "active");
  const totalVotes = rumors.reduce(
    (sum, r) => sum + r.believe_count + r.cap_count,
    0
  );
  const topRumors = [...rumors]
    .sort((a, b) => b.believe_count + b.cap_count - (a.believe_count + a.cap_count))
    .slice(0, 3);

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/30">
        {/* Background glow effects */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-80 w-[600px] -translate-x-1/2 rounded-full bg-primary/15 blur-[100px]" />
          <div className="absolute -bottom-20 right-0 h-60 w-[400px] rounded-full bg-fb-navy-light/20 blur-[80px]" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 pb-16 pt-20 text-center sm:pb-24 sm:pt-28">
          <Badge variant="secondary" className="mb-6 px-3 py-1 text-xs uppercase tracking-widest">
            Fan-Powered Intelligence
          </Badge>

          <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            The Pulse of{" "}
            <span className="text-primary">Fenerbahce</span>{" "}
            Fans
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
            Every rumor. Every opinion. One index. Vote on transfer whispers,
            call cap on fake news, and see what the hive mind really thinks.
          </p>

          {/* CTA Button */}
          <div className="mt-10">
            <Link
              href="/rumors"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-4 text-base font-bold text-primary-foreground transition-all hover:bg-primary/90 hover:shadow-[0_0_30px_rgba(255,204,0,0.3)] active:translate-y-px sm:text-lg"
            >
              Enter Rumor Radar
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:translate-x-1"
              >
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Live Stats */}
          <div className="mx-auto mt-14 flex max-w-sm items-center justify-center gap-8 sm:gap-12">
            <div className="text-center">
              <div className="text-3xl font-extrabold tabular-nums text-primary sm:text-4xl">
                {totalVotes.toLocaleString()}
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Total Votes
              </div>
            </div>
            <div className="h-10 w-px bg-border" />
            <div className="text-center">
              <div className="text-3xl font-extrabold tabular-nums text-primary sm:text-4xl">
                {activeRumors.length}
              </div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Active Rumors
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top Rumors Preview */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Trending Right Now
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              The hottest rumors by total fan engagement
            </p>
          </div>
          <Link
            href="/rumors"
            className="hidden text-sm font-medium text-primary hover:underline sm:block"
          >
            View all rumors &rarr;
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {topRumors.map((rumor, i) => {
            const total = rumor.believe_count + rumor.cap_count;

            return (
              <Link key={rumor.id} href={`/rumors/${rumor.id}`} className="group">
                <Card className="relative h-full cursor-pointer border-border/50 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 hover:scale-[1.02]">
                  <CardHeader>
                    <div className="mb-1 flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {i + 1}
                      </span>
                      <Badge variant="outline" className="text-[10px] uppercase">
                        {rumor.category}
                      </Badge>
                    </div>
                    <CardTitle className="line-clamp-2 text-sm leading-snug transition-colors duration-200 group-hover:text-primary">
                      {rumor.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {rumor.player_name && (
                      <p className="text-xs font-medium text-muted-foreground">
                        {rumor.player_name}
                      </p>
                    )}

                    {/* Mini sentiment bar */}
                    <SentimentGauge
                      believeCount={rumor.believe_count}
                      capCount={rumor.cap_count}
                    />

                    <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                      <span className="font-semibold text-orange-400">
                        &#x1F525; {total.toLocaleString()} votes
                      </span>
                      <span>Vote to see results</span>
                    </div>

                    <div className="flex items-center justify-end pt-1 text-xs font-medium text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                      Vote now &rarr;
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/rumors"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all rumors &rarr;
          </Link>
        </div>
      </section>

      {/* Ad between sections */}
      <AdUnit
        slot={AD_SLOTS.HEADER_BANNER}
        format="auto"
        className="mx-auto max-w-5xl px-4"
      />

      {/* Hot Takes Preview */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Hot Takes
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Spicy opinions — do you agree?
            </p>
          </div>
          <Link
            href="/hot-takes"
            className="hidden text-sm font-medium text-primary hover:underline sm:block"
          >
            View all takes &rarr;
          </Link>
        </div>

        <div className="grid gap-3">
          {DEMO_HOT_TAKES.slice(0, 3).map((take) => {
            const total = take.agree_count + take.disagree_count;
            const agreePct = total > 0 ? Math.round((take.agree_count / total) * 100) : 50;

            return (
              <Link key={take.id} href="/hot-takes" className="group">
                <Card className="border-border/50 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium leading-snug truncate group-hover:text-primary transition-colors">
                        &ldquo;{take.statement}&rdquo;
                      </p>
                      <div className="mt-2 flex h-2 rounded-full overflow-hidden bg-muted/50">
                        <div className="bg-green-500 transition-all" style={{ width: `${agreePct}%` }} />
                        <div className="bg-red-500/60 transition-all" style={{ width: `${100 - agreePct}%` }} />
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <div className="text-sm font-bold text-green-400">{agreePct}%</div>
                      <div className="text-[10px] text-muted-foreground">{total.toLocaleString()} votes</div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/hot-takes"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all takes &rarr;
          </Link>
        </div>
      </section>

      {/* Latest News Preview */}
      <section className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Latest Analysis
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              In-depth breakdowns of the biggest rumors
            </p>
          </div>
          <Link
            href="/news"
            className="hidden text-sm font-medium text-primary hover:underline sm:block"
          >
            View all articles &rarr;
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {DEMO_NEWS.slice(0, 3).map((article) => (
            <Link key={article.id} href={`/news/${article.slug}`} className="group">
              <Card className="h-full border-border/50 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                <CardHeader>
                  <div className="mb-1 flex items-center gap-2">
                    <Badge variant="outline" className="text-[10px] uppercase">
                      {article.category}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground">
                      {article.readingTime} min read
                    </span>
                  </div>
                  <CardTitle className="line-clamp-2 text-sm leading-snug transition-colors duration-200 group-hover:text-primary">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 text-xs text-muted-foreground leading-relaxed">
                    {article.excerpt}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-6 text-center sm:hidden">
          <Link
            href="/news"
            className="text-sm font-medium text-primary hover:underline"
          >
            View all articles &rarr;
          </Link>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-border/30">
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:py-20">
          <h2 className="text-xl font-bold sm:text-2xl">
            Every vote shapes the narrative.
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Join thousands of Fenerbahce fans making their voices heard.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/rumors"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90 active:translate-y-px"
            >
              Vote on Rumors
            </Link>
            <Link
              href="/hot-takes"
              className="inline-flex items-center gap-2 rounded-xl bg-secondary px-6 py-3 text-sm font-bold text-secondary-foreground transition-all hover:bg-secondary/80 active:translate-y-px"
            >
              Drop Hot Takes
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
