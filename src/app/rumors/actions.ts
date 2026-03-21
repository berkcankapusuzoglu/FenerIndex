"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { isDemoMode } from "@/lib/demo-data";
import type { VoteType } from "@/lib/supabase/types";

// Simple in-memory rate limiter (resets on cold start — good enough for serverless)
const voteTimestamps = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60_000; // 1 minute
const RATE_LIMIT_MAX = 15; // max votes per window

function isRateLimited(userId: string): boolean {
  const now = Date.now();
  const timestamps = voteTimestamps.get(userId) ?? [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);
  if (recent.length >= RATE_LIMIT_MAX) return true;
  recent.push(now);
  voteTimestamps.set(userId, recent);
  return false;
}

export async function castVote(
  rumorId: string,
  voteType: VoteType
): Promise<{ newVoteType: VoteType | null; error?: string }> {
  // Input validation
  if (!rumorId || typeof rumorId !== "string") {
    return { newVoteType: null, error: "Invalid rumor ID" };
  }
  if (voteType !== "believe" && voteType !== "cap") {
    return { newVoteType: null, error: "Invalid vote type" };
  }

  // Demo mode — no server-side persistence
  if (isDemoMode()) {
    return { newVoteType: voteType };
  }

  const cookieStore = await cookies();
  let userId = cookieStore.get("fener_uid")?.value;

  if (!userId) {
    userId = crypto.randomUUID();
    cookieStore.set("fener_uid", userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365,
      path: "/",
    });
  }

  // Rate limit check
  if (isRateLimited(userId)) {
    return { newVoteType: null, error: "Too many votes. Slow down!" };
  }

  try {
    const { getSupabaseServerClient } = await import("@/lib/supabase/server");
    const supabase = await getSupabaseServerClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data, error } = await (supabase.rpc as any)("cast_vote", {
      p_rumor_id: rumorId,
      p_user_id: userId,
      p_vote_type: voteType,
    });

    if (error) {
      console.error("Vote error:", error.message);
      return { newVoteType: null, error: "Failed to save vote. Try again." };
    }

    revalidatePath("/rumors");
    revalidatePath(`/rumors/${rumorId}`);

    return { newVoteType: data as VoteType | null };
  } catch (err) {
    console.error("Vote exception:", err);
    return { newVoteType: null, error: "Something went wrong. Try again." };
  }
}
