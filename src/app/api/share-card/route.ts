import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { renderShareCard } from "@/lib/share-card-renderer";

export async function GET(request: NextRequest) {
  const rumorId = request.nextUrl.searchParams.get("rumorId");

  if (!rumorId) {
    return new Response("Missing rumorId parameter", { status: 400 });
  }

  const supabase = await getSupabaseServerClient();
  const { data: rumor } = await supabase
    .from("rumors")
    .select("*")
    .eq("id", rumorId)
    .single();

  if (!rumor) {
    return new Response("Rumor not found", { status: 404 });
  }

  return new ImageResponse(renderShareCard(rumor), {
    width: 1200,
    height: 630,
  });
}
