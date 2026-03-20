import { ImageResponse } from "next/og";
import { renderShareCard } from "@/lib/share-card-renderer";
import { DEMO_RUMORS, isDemoMode } from "@/lib/demo-data";
import type { Rumor } from "@/lib/supabase/types";

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

  let rumor: Rumor | null = null;

  if (isDemoMode()) {
    rumor = DEMO_RUMORS.find((r) => r.id === id) ?? null;
  } else {
    const { getSupabaseServerClient } = await import("@/lib/supabase/server");
    const supabase = await getSupabaseServerClient();
    const { data } = await supabase
      .from("rumors")
      .select("*")
      .eq("id", id)
      .single();
    rumor = data as Rumor | null;
  }

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
