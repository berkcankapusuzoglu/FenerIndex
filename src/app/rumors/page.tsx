import { getSupabaseServerClient } from "@/lib/supabase/server";
import { RumorList } from "@/components/rumors/rumor-list";

export const metadata = {
  title: "Rumor Radar | FenerIndex",
  description: "Vote on the latest Fenerbahce transfer rumors",
};

export default async function RumorsPage() {
  const supabase = await getSupabaseServerClient();

  const { data: rumors } = await supabase
    .from("rumors")
    .select("*")
    .eq("status", "active")
    .order("created_at", { ascending: false });

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
      <RumorList initialRumors={rumors ?? []} />
    </div>
  );
}
