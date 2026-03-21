import type { MetadataRoute } from "next";
import { DEMO_RUMORS, isDemoMode } from "@/lib/demo-data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://fenerindex.vercel.app";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/rumors`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.9 },
    { url: `${baseUrl}/hot-takes`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.8 },
  ];

  let rumorRoutes: MetadataRoute.Sitemap = [];

  if (isDemoMode()) {
    rumorRoutes = DEMO_RUMORS.map((rumor) => ({
      url: `${baseUrl}/rumors/${rumor.id}`,
      lastModified: new Date(rumor.created_at),
      changeFrequency: "daily" as const,
      priority: 0.7,
    }));
  } else {
    try {
      const { getSupabaseServerClient } = await import("@/lib/supabase/server");
      const supabase = await getSupabaseServerClient();
      const { data } = await supabase
        .from("rumors")
        .select("id, created_at")
        .eq("status", "active");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rumorRoutes = ((data as any[]) ?? []).map((rumor) => ({
        url: `${baseUrl}/rumors/${rumor.id}`,
        lastModified: new Date(rumor.created_at),
        changeFrequency: "daily" as const,
        priority: 0.7,
      }));
    } catch {
      // Fall back to empty if Supabase fails
    }
  }

  return [...staticRoutes, ...rumorRoutes];
}
