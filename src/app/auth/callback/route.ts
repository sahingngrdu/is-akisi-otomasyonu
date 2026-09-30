import { NextRequest, NextResponse } from "next/server";
import { isAdminEmail } from "@/lib/admin-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function safeNextPath(value: string | null) {
  return value?.startsWith("/") && !value.startsWith("//") ? value : "/admin";
}

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const destination = new URL("/admin/login?error=link", request.nextUrl.origin);

  if (code) {
    try {
      const supabase = await createSupabaseServerClient();
      const { error } = await supabase.auth.exchangeCodeForSession(code);
      const { data: { user } } = await supabase.auth.getUser();
      if (!error && user && isAdminEmail(user.email)) {
        return NextResponse.redirect(new URL(safeNextPath(request.nextUrl.searchParams.get("next")), request.nextUrl.origin));
      }
      await supabase.auth.signOut();
    } catch (error) {
      console.error("admin_callback_failed", error);
    }
  }

  return NextResponse.redirect(destination);
}
