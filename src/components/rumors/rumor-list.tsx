"use client";

import { useEffect, useState } from "react";
import { RumorCard } from "./rumor-card";
import type { Rumor } from "@/lib/supabase/types";

interface RumorListProps {
  initialRumors: Rumor[];
}

export function RumorList({ initialRumors }: RumorListProps) {
  const [rumors, setRumors] = useState<Rumor[]>(initialRumors);

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

      <div className="grid gap-4 sm:grid-cols-2">
        {rumors.map((rumor) => (
          <RumorCard key={rumor.id} rumor={rumor} />
        ))}
      </div>
    </div>
  );
}
