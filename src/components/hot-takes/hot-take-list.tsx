"use client";

import { useState } from "react";
import { HotTakeCard } from "./hot-take-card";
import { Badge } from "@/components/ui/badge";
import type { HotTake, RumorCategory } from "@/lib/supabase/types";

type SortOption = "hot" | "newest" | "most-agreed" | "most-split";
type CategoryFilter = "all" | RumorCategory;

interface HotTakeListProps {
  initialHotTakes: HotTake[];
}

export function HotTakeList({ initialHotTakes }: HotTakeListProps) {
  const [hotTakes] = useState<HotTake[]>(initialHotTakes);
  const [sort, setSort] = useState<SortOption>("hot");
  const [category, setCategory] = useState<CategoryFilter>("all");

  if (hotTakes.length === 0) {
    return (
      <div className="py-20 text-center text-muted-foreground">
        <p className="text-lg">No hot takes yet.</p>
        <p className="text-sm mt-1">Check back soon for spicy opinions.</p>
      </div>
    );
  }

  const totalVotes = hotTakes.reduce(
    (sum, ht) => sum + ht.agree_count + ht.disagree_count,
    0
  );

  const categories = Array.from(new Set(hotTakes.map((ht) => ht.category)));

  const filtered =
    category === "all"
      ? hotTakes
      : hotTakes.filter((ht) => ht.category === category);

  const sorted = [...filtered].sort((a, b) => {
    switch (sort) {
      case "hot":
        return (
          b.agree_count +
          b.disagree_count -
          (a.agree_count + a.disagree_count)
        );
      case "newest":
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      case "most-agreed": {
        const aPct =
          a.agree_count + a.disagree_count > 0
            ? a.agree_count / (a.agree_count + a.disagree_count)
            : 0;
        const bPct =
          b.agree_count + b.disagree_count > 0
            ? b.agree_count / (b.agree_count + b.disagree_count)
            : 0;
        return bPct - aPct;
      }
      case "most-split": {
        const aSplit = Math.abs(
          (a.agree_count / Math.max(a.agree_count + a.disagree_count, 1)) * 100 - 50
        );
        const bSplit = Math.abs(
          (b.agree_count / Math.max(b.agree_count + b.disagree_count, 1)) * 100 - 50
        );
        return aSplit - bSplit;
      }
      default:
        return 0;
    }
  });

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "hot", label: "Hottest" },
    { value: "newest", label: "Newest" },
    { value: "most-agreed", label: "Most Agreed" },
    { value: "most-split", label: "Most Split" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <div className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" />
          <span>{hotTakes.length} hot takes</span>
        </div>
        <div className="h-4 w-px bg-border" />
        <span>{totalVotes.toLocaleString()} total votes</span>
      </div>

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

      <div className="grid gap-4">
        {sorted.map((hotTake) => (
          <HotTakeCard key={hotTake.id} hotTake={hotTake} />
        ))}
      </div>

      {sorted.length === 0 && (
        <div className="py-12 text-center text-muted-foreground">
          <p>No hot takes in this category yet.</p>
        </div>
      )}
    </div>
  );
}
