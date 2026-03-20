"use client";

import { useEffect, useState } from "react";
import { RumorCard } from "./rumor-card";
import { Badge } from "@/components/ui/badge";
import type { Rumor } from "@/lib/supabase/types";

type SortOption = "hot" | "newest" | "most-believed" | "most-cap";
type CategoryFilter = "all" | "transfer" | "contract" | "manager" | "injury" | "other";

interface RumorListProps {
  initialRumors: Rumor[];
}

export function RumorList({ initialRumors }: RumorListProps) {
  const [rumors, setRumors] = useState<Rumor[]>(initialRumors);
  const [sort, setSort] = useState<SortOption>("hot");
  const [category, setCategory] = useState<CategoryFilter>("all");

  useEffect(() => {
    // Skip realtime in demo mode
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
    if (!url || url.includes("placeholder") || url.startsWith("<")) return;

    let cleanup: (() => void) | undefined;

    import("@/lib/supabase/client").then(({ getSupabaseBrowserClient }) => {
      const supabase = getSupabaseBrowserClient();
      const channel = supabase
        .channel("rumors-realtime")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "rumors",
            filter: "status=eq.active",
          },
          (payload) => {
            if (payload.eventType === "UPDATE") {
              const updated = payload.new as Rumor;
              setRumors((prev) =>
                prev.map((r) => (r.id === updated.id ? updated : r))
              );
            } else if (payload.eventType === "INSERT") {
              const inserted = payload.new as Rumor;
              setRumors((prev) => [inserted, ...prev]);
            } else if (payload.eventType === "DELETE") {
              const deleted = payload.old as { id: string };
              setRumors((prev) => prev.filter((r) => r.id !== deleted.id));
            }
          }
        )
        .subscribe();

      cleanup = () => {
        supabase.removeChannel(channel);
      };
    });

    return () => cleanup?.();
  }, []);

  if (rumors.length === 0) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        <p className="text-lg">No active rumors right now.</p>
        <p className="text-sm mt-1">Check back soon for the latest transfer buzz.</p>
      </div>
    );
  }

  const totalVotes = rumors.reduce(
    (sum, r) => sum + r.believe_count + r.cap_count,
    0
  );

  // Get unique categories from rumors
  const categories = Array.from(new Set(rumors.map((r) => r.category)));

  // Filter
  const filtered = category === "all" ? rumors : rumors.filter((r) => r.category === category);

  // Sort
  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case "hot":
        return (b.believe_count + b.cap_count) - (a.believe_count + a.cap_count);
      case "newest":
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      case "most-believed": {
        const aPct = a.believe_count + a.cap_count > 0 ? a.believe_count / (a.believe_count + a.cap_count) : 0;
        const bPct = b.believe_count + b.cap_count > 0 ? b.believe_count / (b.believe_count + b.cap_count) : 0;
        return bPct - aPct;
      }
      case "most-cap": {
        const aCapPct = a.believe_count + a.cap_count > 0 ? a.cap_count / (a.believe_count + a.cap_count) : 0;
        const bCapPct = b.believe_count + b.cap_count > 0 ? b.cap_count / (b.believe_count + b.cap_count) : 0;
        return bCapPct - aCapPct;
      }
      default:
        return 0;
    }
  });

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "hot", label: "Hottest" },
    { value: "newest", label: "Newest" },
    { value: "most-believed", label: "Most Believed" },
    { value: "most-cap", label: "Most Cap" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
          <span>{rumors.length} active rumors</span>
        </div>
        <div className="h-4 w-px bg-border" />
        <span>{totalVotes.toLocaleString()} total votes</span>
      </div>

      {/* Filter & Sort Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={category === "all" ? "default" : "outline"}
            className="cursor-pointer transition-colors"
            onClick={() => setCategory("all")}
          >
            All
          </Badge>
          {categories.map((cat) => (
            <Badge
              key={cat}
              variant={category === cat ? "default" : "outline"}
              className="cursor-pointer capitalize transition-colors"
              onClick={() => setCategory(cat as CategoryFilter)}
            >
              {cat}
            </Badge>
          ))}
        </div>
        <div className="flex gap-1.5">
          {sortOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSort(opt.value)}
              className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                sort === opt.value
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {sorted.map((rumor) => (
          <RumorCard key={rumor.id} rumor={rumor} />
        ))}
      </div>

      {sorted.length === 0 && (
        <div className="py-12 text-center text-muted-foreground">
          <p>No rumors in this category yet.</p>
        </div>
      )}
    </div>
  );
}
