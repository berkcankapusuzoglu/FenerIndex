"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SentimentGauge } from "./sentiment-gauge";
import type { Rumor, VoteType } from "@/lib/supabase/types";

interface RumorCardProps {
  rumor: Rumor;
  expanded?: boolean;
}

export function RumorCard({ rumor, expanded = false }: RumorCardProps) {
  const [believeCount, setBelieveCount] = useState(rumor.believe_count);
  const [capCount, setCapCount] = useState(rumor.cap_count);
  const [userVote, setUserVote] = useState<VoteType | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const [showVoteMessage, setShowVoteMessage] = useState(false);

  useEffect(() => {
    if (!showVoteMessage) return;
    const timer = setTimeout(() => setShowVoteMessage(false), 2000);
    return () => clearTimeout(timer);
  }, [showVoteMessage]);

  async function handleVote(voteType: VoteType) {
    setIsVoting(true);

    // Optimistic update
    if (userVote === voteType) {
      // Toggle off
      if (voteType === "believe") setBelieveCount((c) => Math.max(c - 1, 0));
      else setCapCount((c) => Math.max(c - 1, 0));
      setUserVote(null);
    } else if (userVote) {
      // Switch
      if (voteType === "believe") {
        setBelieveCount((c) => c + 1);
        setCapCount((c) => Math.max(c - 1, 0));
      } else {
        setCapCount((c) => c + 1);
        setBelieveCount((c) => Math.max(c - 1, 0));
      }
      setUserVote(voteType);
      setShowVoteMessage(true);
    } else {
      // New vote
      if (voteType === "believe") setBelieveCount((c) => c + 1);
      else setCapCount((c) => c + 1);
      setUserVote(voteType);
      setShowVoteMessage(true);
    }

    // Try server action if Supabase is configured
    try {
      const { castVote } = await import("@/app/rumors/actions");
      await castVote(rumor.id, voteType);
    } catch {
      // Demo mode — vote stays client-side only
    }

    setIsVoting(false);
  }

  const categoryColors: Record<string, string> = {
    transfer: "bg-primary/20 text-primary",
    manager: "bg-blue-500/20 text-blue-400",
    injury: "bg-red-500/20 text-red-400",
    contract: "bg-green-500/20 text-green-400",
    other: "bg-muted text-muted-foreground",
  };

  const timeAgo = getTimeAgo(rumor.created_at);
  const total = believeCount + capCount;
  const believePct = total > 0 ? Math.round((believeCount / total) * 100) : 50;

  function getCredibilityLabel(): { text: string; className: string } | null {
    if (total < 100) return null;
    if (believePct >= 90) return { text: "LEGIT", className: "text-green-400" };
    if (believePct >= 70) return { text: "LIKELY", className: "text-primary" };
    if (believePct >= 40) return { text: "50/50", className: "text-muted-foreground" };
    if (believePct >= 20) return { text: "DOUBTFUL", className: "text-orange-400" };
    return { text: "CAP", className: "text-red-400" };
  }

  const credibility = getCredibilityLabel();

  const voteMessages = [
    "Your vote counts!",
    "The fans have spoken!",
    "Voice heard!",
    "Locked in!",
  ];

  return (
    <Card className="group relative overflow-hidden border-border/50 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 before:absolute before:inset-0 before:rounded-[inherit] before:p-[1px] before:bg-gradient-to-br before:from-transparent before:via-transparent before:to-transparent before:transition-all before:duration-300 hover:before:from-primary/40 hover:before:via-primary/10 hover:before:to-primary/40 before:-z-10">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
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
              {total > 500 && (
                <Badge variant="secondary" className="bg-orange-500/20 text-orange-400 text-[10px]">
                  HOT
                </Badge>
              )}
              {credibility && (
                <span className={`text-[10px] font-bold tracking-wider ${credibility.className}`}>
                  {credibility.text}
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

        <SentimentGauge believeCount={believeCount} capCount={capCount} />

        <div className="flex gap-2">
          <Button
            size="sm"
            variant={userVote === "believe" ? "default" : "outline"}
            className={`flex-1 gap-1.5 transition-all duration-200 ${
              userVote === "believe" ? "scale-[1.02] shadow-md shadow-primary/20" : ""
            }`}
            onClick={() => handleVote("believe")}
            disabled={isVoting}
          >
            <span className="text-xs">&#x1F525;</span>
            <span>BELIEVE</span>
            <span className="text-xs opacity-70">{believeCount}</span>
          </Button>
          <Button
            size="sm"
            variant={userVote === "cap" ? "secondary" : "outline"}
            className={`flex-1 gap-1.5 transition-all duration-200 ${
              userVote === "cap" ? "scale-[1.02] shadow-md" : ""
            }`}
            onClick={() => handleVote("cap")}
            disabled={isVoting}
          >
            <span className="text-xs">&#x1F9E2;</span>
            <span>CAP</span>
            <span className="text-xs opacity-70">{capCount}</span>
          </Button>
        </div>

        {showVoteMessage && (
          <p className="text-center text-xs font-medium text-primary animate-in fade-in duration-300">
            {voteMessages[Math.floor(Math.random() * voteMessages.length)]}
          </p>
        )}

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
