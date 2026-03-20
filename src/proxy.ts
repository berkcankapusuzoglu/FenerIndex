import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";

  // Skip Supabase auth refresh in demo mode
  if (!supabaseUrl || supabaseUrl.includes("placeholder") || supabaseUrl.startsWith("<")) {
    return NextResponse.next({ request });
  }

  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { createServerClient } = require("@supabase/ssr");

  let supabaseResponse = NextResponse.next({ request });

  createServerClient(
    supabaseUrl,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: Array<{ name: string; value: string; options?: Record<string, unknown> }>) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  return supabaseResponse;
}
