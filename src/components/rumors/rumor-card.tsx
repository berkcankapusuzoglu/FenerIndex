"use client";

import { useOptimistic, useTransition } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SentimentGauge } from "./sentiment-gauge";
import { castVote } from "@/app/rumors/actions";
import type { Rumor, VoteType } from "@/lib/supabase/types";

interface RumorCardProps {
  rumor: Rumor;
  expanded?: boolean;
}

type OptimisticState = {
  believe_count: number;
  cap_count: number;
  userVote: VoteType | null;
};

export function RumorCard({ rumor, expanded = false }: RumorCardProps) {
  const [isPending, startTransition] = useTransition();
  const [optimistic, setOptimistic] = useOptimistic<OptimisticState, VoteType>(
    {
      believe_count: rumor.believe_count,
      cap_count: rumor.cap_count,
      userVote: null,
    },
    (state, voteType) => {
      if (state.userVote === voteType) {
        // Toggle off
        return {
          believe_count:
            voteType === "believe"
              ? Math.max(state.believe_count - 1, 0)
              : state.believe_count,
          cap_count:
            voteType === "cap"
              ? Math.max(state.cap_count - 1, 0)
              : state.cap_count,
          userVote: null,
        };
      } else if (state.userVote) {
        // Switch
        return {
          believe_count:
            voteType === "believe"
              ? state.believe_count + 1
              : Math.max(state.believe_count - 1, 0),
          cap_count:
            voteType === "cap"
              ? state.cap_count + 1
              : Math.max(state.cap_count - 1, 0),
          userVote: voteType,
        };
      } else {
        // New vote
        return {
          believe_count:
            voteType === "believe"
              ? state.believe_count + 1
              : state.believe_count,
          cap_count:
            voteType === "cap" ? state.cap_count + 1 : state.cap_count,
          userVote: voteType,
        };
      }
    }
  );

  function handleVote(voteType: VoteType) {
    startTransition(async () => {
      setOptimistic(voteType);
      await castVote(rumor.id, voteType);
    });
  }

  const categoryColors: Record<string, string> = {
    transfer: "bg-primary/20 text-primary",
    manager: "bg-blue-500/20 text-blue-400",
    injury: "bg-red-500/20 text-red-400",
    contract: "bg-green-500/20 text-green-400",
    other: "bg-muted text-muted-foreground",
  };

  const timeAgo = getTimeAgo(rumor.created_at);

  return (
    <Card className="overflow-hidden border-border/50 transition-colors hover:border-primary/30">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className={categoryColors[rumor.category] ?? categoryColors.other}
              >
                {rumor.category}
              </Badge>
              {rumor.player_name && (
                <span className="text-xs font-medium text-muted-foreground">
                  {rumor.player_name}
                </span>
              )}
            </div>
            {expanded ? (
              <CardTitle className="text-xl leading-tight">
                {rumor.title}
              </CardTitle>
            ) : (
              <Link href={`/rumors/${rumor.id}`}>
                <CardTitle className="text-lg leading-tight hover:text-primary transition-colors cursor-pointer">
                  {rumor.title}
                </CardTitle>
              </Link>
            )}
          </div>
          <span className="shrink-0 text-xs text-muted-foreground">{timeAgo}</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {expanded && rumor.description && (
          <p className="text-sm text-muted-foreground leading-relaxed">
            {rumor.description}
          </p>
        )}

        <SentimentGauge
          believeCount={optimistic.believe_count}
          capCount={optimistic.cap_count}
        />

        <div className="flex gap-2">
          <Button
            size="sm"
            variant={optimistic.userVote === "believe" ? "default" : "outline"}
            className="flex-1 gap-1.5"
            onClick={() => handleVote("believe")}
            disabled={isPending}
          >
            <span>BELIEVE</span>
            <span className="text-xs opacity-70">{optimistic.believe_count}</span>
          </Button>
          <Button
            size="sm"
            variant={optimistic.userVote === "cap" ? "secondary" : "outline"}
            className="flex-1 gap-1.5"
            onClick={() => handleVote("cap")}
            disabled={isPending}
          >
            <span>CAP</span>
            <span className="text-xs opacity-70">{optimistic.cap_count}</span>
          </Button>
        </div>

        {expanded && rumor.source_url && (
          <a
            href={rumor.source_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-xs text-muted-foreground underline hover:text-primary"
          >
            Source
          </a>
        )}
      </CardContent>
    </Card>
  );
}

function getTimeAgo(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = now - then;
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}
