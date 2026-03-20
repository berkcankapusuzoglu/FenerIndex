import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { renderShareCard } from "@/lib/share-card-renderer";
import { DEMO_RUMORS, isDemoMode } from "@/lib/demo-data";
import type { Rumor } from "@/lib/supabase/types";

export async function GET(request: NextRequest) {
  const rumorId = request.nextUrl.searchParams.get("rumorId");

  if (!rumorId) {
    return new Response("Missing rumorId parameter", { status: 400 });
  }

  let rumor: Rumor | null = null;

  if (isDemoMode()) {
    rumor = DEMO_RUMORS.find((r) => r.id === rumorId) ?? null;
  } else {
    const { getSupabaseServerClient } = await import("@/lib/supabase/server");
    const supabase = await getSupabaseServerClient();
    const { data } = await supabase
      .from("rumors")
      .select("*")
      .eq("id", rumorId)
      .single();
    rumor = data as Rumor | null;
  }

  if (!rumor) {
    return new Response("Rumor not found", { status: 404 });
  }

  return new ImageResponse(renderShareCard(rumor), {
    width: 1200,
    height: 630,
  });
}
