import { ImageResponse } from "next/og";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { renderShareCard } from "@/lib/share-card-renderer";

export const runtime = "nodejs";
export const alt = "FenerIndex Rumor";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await getSupabaseServerClient();
  const { data: rumor } = await supabase
    .from("rumors")
    .select("*")
    .eq("id", id)
    .single();

  if (!rumor) {
    return new ImageResponse(
      (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "1200px",
            height: "630px",
            background: "#00205B",
            color: "#FFD700",
            fontSize: "48px",
            fontWeight: 700,
          }}
        >
          FenerIndex
        </div>
      ),
      { ...size }
    );
  }

  return new ImageResponse(renderShareCard(rumor), { ...size });
}
