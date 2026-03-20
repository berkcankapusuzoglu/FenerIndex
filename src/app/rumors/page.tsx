import { RumorList } from "@/components/rumors/rumor-list";
import { DEMO_RUMORS, isDemoMode } from "@/lib/demo-data";
import type { Rumor } from "@/lib/supabase/types";

export const metadata = {
  title: "Rumor Radar | FenerIndex",
  description: "Vote on the latest Fenerbahce transfer rumors",
};

async function getRumors(): Promise<Rumor[]> {
  if (isDemoMode()) return DEMO_RUMORS;

  const { getSupabaseServerClient } = await import("@/lib/supabase/server");
  const supabase = await getSupabaseServerClient();
  const { data } = await supabase
    .from("rumors")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false });

  return (data as Rumor[]) ?? [];
}

export default async function RumorsPage() {
  const rumors = await getRumors();

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Rumor <span className="text-primary">Radar</span>
        </h1>
        <p className="mt-2 text-muted-foreground">
          Do you believe it or is it cap? Cast your vote.
        </p>
      </div>
      <RumorList initialRumors={rumors} />
    </div>
  );
}
