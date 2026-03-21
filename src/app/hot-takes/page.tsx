import { HotTakeList } from "@/components/hot-takes/hot-take-list";
import { AdUnit } from "@/components/ads/ad-unit";
import { AD_SLOTS } from "@/components/ads/ad-config";
import { DEMO_HOT_TAKES } from "@/lib/demo-hot-takes";
import { isDemoMode } from "@/lib/demo-data";
import type { HotTake } from "@/lib/supabase/types";

export const metadata = {
  title: "Hot Takes",
  description: "Fenerbahce hot takes — agree or disagree with the fanbase",
};

async function getHotTakes(): Promise<HotTake[]> {
  if (isDemoMode()) return DEMO_HOT_TAKES;

  const { getSupabaseServerClient } = await import("@/lib/supabase/server");
  const supabase = await getSupabaseServerClient();
  const { data } = await supabase
    .from("hot_takes")
    .select("*")
    .order("created_at", { ascending: false });

  return (data as HotTake[]) ?? [];
}

export default async function HotTakesPage() {
  const hotTakes = await getHotTakes();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Hot <span className="text-primary">Takes</span>
        </h1>
        <p className="mt-2 text-muted-foreground">
          Spicy opinions. Do you agree or disagree?
        </p>
      </div>
      <HotTakeList initialHotTakes={hotTakes} />
      <AdUnit
        slot={AD_SLOTS.ARTICLE_BOTTOM}
        format="auto"
        className="mt-8"
      />
    </div>
  );
}
