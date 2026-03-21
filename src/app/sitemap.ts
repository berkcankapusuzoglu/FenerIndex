import type { MetadataRoute } from "next";
import { DEMO_RUMORS, isDemoMode } from "@/lib/demo-data";
import { DEMO_NEWS } from "@/lib/demo-news";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://fenerindex.vercel.app";

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/rumors`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.9 },
    { url: `${baseUrl}/hot-takes`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.8 },
    { url: `${baseUrl}/news`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.2 },
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

  const newsRoutes: MetadataRoute.Sitemap = DEMO_NEWS.map((article) => ({
    url: `${baseUrl}/news/${article.slug}`,
    lastModified: new Date(article.publishedAt),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...rumorRoutes, ...newsRoutes];
}
