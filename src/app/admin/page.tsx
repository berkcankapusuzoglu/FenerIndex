import { cookies } from "next/headers";
import { DEMO_RUMORS, isDemoMode } from "@/lib/demo-data";
import { AdminDashboard } from "./admin-dashboard";
import { LoginForm } from "./login-form";
import type { Rumor } from "@/lib/supabase/types";

export const metadata = {
  title: "Admin",
};

async function getRumors(): Promise<Rumor[]> {
  if (isDemoMode()) return DEMO_RUMORS;

  const { getSupabaseServerClient } = await import("@/lib/supabase/server");
  const supabase = await getSupabaseServerClient();
  const { data } = await supabase
    .from("rumors")
    .select("*")
    .order("created_at", { ascending: false });

  return (data as Rumor[]) ?? [];
}

export default async function AdminPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("fener_admin_session");
  const isAuthenticated = session?.value === "authenticated";

  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const rumors = await getRumors();

  return <AdminDashboard rumors={rumors} />;
}
