"use client";

import { useEffect, useState } from "react";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { RumorCard } from "./rumor-card";
import type { Rumor } from "@/lib/supabase/types";

interface RumorListProps {
  initialRumors: Rumor[];
}

export function RumorList({ initialRumors }: RumorListProps) {
  const [rumors, setRumors] = useState<Rumor[]>(initialRumors);

  useEffect(() => {
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

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  if (rumors.length === 0) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        <p className="text-lg">No active rumors right now.</p>
        <p className="text-sm mt-1">Check back soon for the latest transfer buzz.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {rumors.map((rumor) => (
        <RumorCard key={rumor.id} rumor={rumor} />
      ))}
    </div>
  );
}
