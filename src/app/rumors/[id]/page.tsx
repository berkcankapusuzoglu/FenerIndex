import { notFound } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { RumorCard } from "@/components/rumors/rumor-card";
import { ShareButton } from "@/components/rumors/share-button";
import type { Rumor } from "@/lib/supabase/types";

interface Props {
  params: Promise<{ id: string }>;
}

async function getRumor(id: string): Promise<Rumor | null> {
  const supabase = await getSupabaseServerClient();
  const { data } = await supabase
    .from("rumors")
    .select("*")
    .eq("id", id)
    .single();
  return data as Rumor | null;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const rumor = await getRumor(id);

  if (!rumor) return { title: "Rumor Not Found" };

  const total = rumor.believe_count + rumor.cap_count;
  const pct = total > 0 ? Math.round((rumor.believe_count / total) * 100) : 50;

  return {
    title: `${rumor.title} | FenerIndex`,
    description: `${pct}% of fans believe this rumor. Cast your vote!`,
    openGraph: {
      title: rumor.title,
      description: `${pct}% of fans believe this rumor`,
    },
  };
}

export default async function RumorDetailPage({ params }: Props) {
  const { id } = await params;
  const rumor = await getRumor(id);

  if (!rumor) notFound();

  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <RumorCard rumor={rumor} expanded />
      <div className="mt-4 flex justify-center">
        <ShareButton rumor={rumor} />
      </div>
    </div>
  );
}
