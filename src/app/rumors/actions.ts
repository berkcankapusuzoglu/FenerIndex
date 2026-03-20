"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import type { VoteType } from "@/lib/supabase/types";

export async function castVote(rumorId: string, voteType: VoteType) {
  const supabase = await getSupabaseServerClient();

  // Use a simple anonymous session ID from cookies
  const cookieStore = await cookies();
  let userId = cookieStore.get("fener_uid")?.value;

  if (!userId) {
    userId = crypto.randomUUID();
    cookieStore.set("fener_uid", userId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      path: "/",
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data, error } = await (supabase.rpc as any)("cast_vote", {
    p_rumor_id: rumorId,
    p_user_id: userId,
    p_vote_type: voteType,
  });

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath("/rumors");
  revalidatePath(`/rumors/${rumorId}`);

  return { newVoteType: data as VoteType | null };
}
