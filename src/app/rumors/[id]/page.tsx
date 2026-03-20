import Link from "next/link";
import { notFound } from "next/navigation";
import { RumorCard } from "@/components/rumors/rumor-card";
import { ShareButton } from "@/components/rumors/share-button";
import { DEMO_RUMORS, isDemoMode } from "@/lib/demo-data";
import type { Rumor } from "@/lib/supabase/types";

interface Props {
  params: Promise<{ id: string }>;
}

async function getRumor(id: string): Promise<Rumor | null> {
  if (isDemoMode()) {
    return DEMO_RUMORS.find((r) => r.id === id) ?? null;
  }

  const { getSupabaseServerClient } = await import("@/lib/supabase/server");
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
      <Link
        href="/rumors"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M19 12H5" />
          <path d="m12 19-7-7 7-7" />
        </svg>
        Back to rumors
      </Link>

      <RumorCard rumor={rumor} expanded />

      <div className="mt-8 rounded-lg border border-border/50 bg-card/50 px-6 py-5 text-center">
        <p className="text-sm font-medium text-foreground">
          Think your friends would agree? Share this rumor!
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Spread the word and see if others believe it too.
        </p>
        <div className="mt-4 flex justify-center">
          <ShareButton rumor={rumor} />
        </div>
      </div>
    </div>
  );
}
