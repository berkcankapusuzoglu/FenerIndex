"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { isDemoMode } from "@/lib/demo-data";
import type { RumorCategory, RumorStatus } from "@/lib/supabase/types";

const SESSION_COOKIE = "fener_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24; // 24 hours

export async function loginAdmin(
  _prevState: { error?: string; success?: boolean },
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  const password = formData.get("password") as string;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword) {
    return { error: "ADMIN_PASSWORD is not configured on the server." };
  }

  if (password !== adminPassword) {
    return { error: "Invalid password. Try again." };
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });

  return { success: true };
}

export async function logoutAdmin(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  redirect("/admin");
}

export async function addRumor(
  _prevState: { error?: string; success?: boolean },
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  if (isDemoMode()) {
    return { error: "Connect Supabase to add rumors. The app is running in demo mode." };
  }

  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim() || null;
  const player_name = (formData.get("player_name") as string)?.trim() || null;
  const category = (formData.get("category") as RumorCategory) || "other";
  const source_url = (formData.get("source_url") as string)?.trim() || null;

  if (!title) {
    return { error: "Title is required." };
  }

  try {
    const { getSupabaseServerClient } = await import("@/lib/supabase/server");
    const supabase = await getSupabaseServerClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from("rumors") as any).insert({
      title,
      description,
      player_name,
      category,
      source_url,
      image_url: null,
      status: "active" as RumorStatus,
    });

    if (error) {
      return { error: `Database error: ${error.message}` };
    }

    revalidatePath("/rumors");
    revalidatePath("/admin");
    return { success: true };
  } catch (e) {
    return { error: `Failed to add rumor: ${e instanceof Error ? e.message : "Unknown error"}` };
  }
}

export async function updateRumor(
  _prevState: { error?: string; success?: boolean },
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  if (isDemoMode()) {
    return { error: "Connect Supabase to update rumors. The app is running in demo mode." };
  }

  const id = formData.get("id") as string;
  const title = (formData.get("title") as string)?.trim();
  const description = (formData.get("description") as string)?.trim() || null;
  const player_name = (formData.get("player_name") as string)?.trim() || null;
  const category = (formData.get("category") as RumorCategory) || "other";
  const source_url = (formData.get("source_url") as string)?.trim() || null;

  if (!id || !title) {
    return { error: "ID and title are required." };
  }

  try {
    const { getSupabaseServerClient } = await import("@/lib/supabase/server");
    const supabase = await getSupabaseServerClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from("rumors") as any)
      .update({ title, description, player_name, category, source_url })
      .eq("id", id);

    if (error) {
      return { error: `Database error: ${error.message}` };
    }

    revalidatePath("/rumors");
    revalidatePath(`/rumors/${id}`);
    revalidatePath("/admin");
    return { success: true };
  } catch (e) {
    return { error: `Failed to update rumor: ${e instanceof Error ? e.message : "Unknown error"}` };
  }
}

export async function deleteRumor(
  _prevState: { error?: string; success?: boolean },
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  if (isDemoMode()) {
    return { error: "Connect Supabase to delete rumors. The app is running in demo mode." };
  }

  const id = formData.get("id") as string;

  if (!id) {
    return { error: "Rumor ID is required." };
  }

  try {
    const { getSupabaseServerClient } = await import("@/lib/supabase/server");
    const supabase = await getSupabaseServerClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from("rumors") as any).delete().eq("id", id);

    if (error) {
      return { error: `Database error: ${error.message}` };
    }

    revalidatePath("/rumors");
    revalidatePath("/admin");
    return { success: true };
  } catch (e) {
    return { error: `Failed to delete rumor: ${e instanceof Error ? e.message : "Unknown error"}` };
  }
}

export async function updateRumorStatus(
  _prevState: { error?: string; success?: boolean },
  formData: FormData
): Promise<{ error?: string; success?: boolean }> {
  if (isDemoMode()) {
    return { error: "Connect Supabase to update status. The app is running in demo mode." };
  }

  const id = formData.get("id") as string;
  const status = formData.get("status") as RumorStatus;

  if (!id || !status) {
    return { error: "Rumor ID and status are required." };
  }

  const validStatuses: RumorStatus[] = ["active", "confirmed", "denied", "expired"];
  if (!validStatuses.includes(status)) {
    return { error: "Invalid status value." };
  }

  try {
    const { getSupabaseServerClient } = await import("@/lib/supabase/server");
    const supabase = await getSupabaseServerClient();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase.from("rumors") as any)
      .update({ status })
      .eq("id", id);

    if (error) {
      return { error: `Database error: ${error.message}` };
    }

    revalidatePath("/rumors");
    revalidatePath(`/rumors/${id}`);
    revalidatePath("/admin");
    return { success: true };
  } catch (e) {
    return { error: `Failed to update status: ${e instanceof Error ? e.message : "Unknown error"}` };
  }
}
