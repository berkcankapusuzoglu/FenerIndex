"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { HotTake } from "@/lib/supabase/types";

interface HotTakeCardProps {
  hotTake: HotTake;
}

export function HotTakeCard({ hotTake }: HotTakeCardProps) {
  const [agreeCount, setAgreeCount] = useState(hotTake.agree_count);
  const [disagreeCount, setDisagreeCount] = useState(hotTake.disagree_count);
  const [userVote, setUserVote] = useState<"agree" | "disagree" | null>(null);
  const [isVoting, setIsVoting] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    if (!showMessage) return;
    const timer = setTimeout(() => setShowMessage(false), 2000);
    return () => clearTimeout(timer);
  }, [showMessage]);

  function handleVote(voteType: "agree" | "disagree") {
    setIsVoting(true);

    if (userVote === voteType) {
      if (voteType === "agree") setAgreeCount((c) => Math.max(c - 1, 0));
      else setDisagreeCount((c) => Math.max(c - 1, 0));
      setUserVote(null);
    } else if (userVote) {
      if (voteType === "agree") {
        setAgreeCount((c) => c + 1);
        setDisagreeCount((c) => Math.max(c - 1, 0));
      } else {
        setDisagreeCount((c) => c + 1);
        setAgreeCount((c) => Math.max(c - 1, 0));
      }
      setUserVote(voteType);
      setShowMessage(true);
    } else {
      if (voteType === "agree") setAgreeCount((c) => c + 1);
      else setDisagreeCount((c) => c + 1);
      setUserVote(voteType);
      setShowMessage(true);
    }

    setIsVoting(false);
  }

  const total = agreeCount + disagreeCount;
  const agreePct = total > 0 ? Math.round((agreeCount / total) * 100) : 50;
  const timeAgo = getTimeAgo(hotTake.created_at);

  const categoryColors: Record<string, string> = {
    transfer: "bg-primary/20 text-primary",
    manager: "bg-blue-500/20 text-blue-400",
    injury: "bg-red-500/20 text-red-400",
    contract: "bg-green-500/20 text-green-400",
    other: "bg-muted text-muted-foreground",
  };

  function getSplitLabel(): { text: string; className: string } | null {
    if (total < 100) return null;
    const diff = Math.abs(agreePct - 50);
    if (diff <= 5) return { text: "SPLIT", className: "text-orange-400" };
    if (agreePct >= 80) return { text: "CONSENSUS", className: "text-green-400" };
    if (agreePct <= 20) return { text: "REJECTED", className: "text-red-400" };
    return null;
  }

  const splitLabel = getSplitLabel();

  return (
    <Card className="group relative overflow-hidden border-border/50 transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
      <CardContent className="p-5 space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="secondary"
                className={categoryColors[hotTake.category] ?? categoryColors.other}
              >
                {hotTake.category}
              </Badge>
              {total > 3000 && (
                <Badge variant="secondary" className="bg-orange-500/20 text-orange-400 text-[10px]">
                  HOT
                </Badge>
              )}
              {splitLabel && (
                <span className={`text-[10px] font-bold tracking-wider ${splitLabel.className}`}>
                  {splitLabel.text}
                </span>
              )}
            </div>
            <p className="text-base font-semibold leading-snug sm:text-lg">
              &ldquo;{hotTake.statement}&rdquo;
            </p>
          </div>
          <span className="shrink-0 text-xs text-muted-foreground">{timeAgo}</span>
        </div>

        {/* Agree/Disagree bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-medium">
            <span className="text-green-400">Agree {agreePct}%</span>
            <span className="text-muted-foreground">{total.toLocaleString()} votes</span>
            <span className="text-red-400">Disagree {100 - agreePct}%</span>
          </div>
          <div className="flex h-3 rounded-full overflow-hidden bg-muted/50">
            <div
              className="bg-green-500 transition-all duration-500 ease-out"
              style={{ width: `${agreePct}%` }}
            />
            <div
              className="bg-red-500/60 transition-all duration-500 ease-out"
              style={{ width: `${100 - agreePct}%` }}
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            size="sm"
            variant={userVote === "agree" ? "default" : "outline"}
            className={`flex-1 gap-1.5 transition-all duration-200 ${
              userVote === "agree"
                ? "scale-[1.02] shadow-md bg-green-600 hover:bg-green-700 text-white"
                : "hover:border-green-500/50 hover:text-green-400"
            }`}
            onClick={() => handleVote("agree")}
            disabled={isVoting}
          >
            <span className="text-xs">&#x1F44D;</span>
            <span>AGREE</span>
            <span className="text-xs opacity-70">{agreeCount.toLocaleString()}</span>
          </Button>
          <Button
            size="sm"
            variant={userVote === "disagree" ? "secondary" : "outline"}
            className={`flex-1 gap-1.5 transition-all duration-200 ${
              userVote === "disagree"
                ? "scale-[1.02] shadow-md bg-red-600 hover:bg-red-700 text-white"
                : "hover:border-red-500/50 hover:text-red-400"
            }`}
            onClick={() => handleVote("disagree")}
            disabled={isVoting}
          >
            <span className="text-xs">&#x1F44E;</span>
            <span>DISAGREE</span>
            <span className="text-xs opacity-70">{disagreeCount.toLocaleString()}</span>
          </Button>
        </div>

        {showMessage && (
          <p className="text-center text-xs font-medium text-primary animate-in fade-in duration-300">
            Opinion registered!
          </p>
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
