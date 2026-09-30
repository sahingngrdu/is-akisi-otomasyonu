import { NextRequest, NextResponse } from "next/server";
import { adminEmailSchema } from "@/lib/admin-schema";
import { isAdminEmail } from "@/lib/admin-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    return NextResponse.json({ ok: false, message: "Supabase Auth ayarları eksik." }, { status: 503 });
  }
  if (!process.env.SUPABASE_ADMIN_EMAILS) {
    return NextResponse.json({ ok: false, message: "Yönetici e-posta allowlist'i henüz ayarlanmamış." }, { status: 503 });
  }

  const rawBody = await request.text().catch(() => "");
  if (new TextEncoder().encode(rawBody).byteLength > 1_000) {
    return NextResponse.json({ ok: false, message: "İstek boyutu sınırı aşıldı." }, { status: 413 });
  }
  let body: unknown;
  try { body = JSON.parse(rawBody); } catch { body = null; }
  const parsed = adminEmailSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: "Geçerli bir e-posta adresi yazın." }, { status: 422 });
  }
  if (!isAdminEmail(parsed.data.email)) {
    return NextResponse.json({ ok: false, message: "Bu e-posta yönetici erişim listesinde değil." }, { status: 403 });
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signInWithOtp({
      email: parsed.data.email.toLowerCase(),
      options: {
        emailRedirectTo: new URL("/auth/callback?next=/admin", request.nextUrl.origin).toString(),
        shouldCreateUser: true,
      },
    });
    if (error) {
      console.error("admin_magic_link_failed", error.message);
      return NextResponse.json({ ok: false, message: "Giriş bağlantısı gönderilemedi. Supabase Auth e-posta ayarlarını kontrol edin." }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("admin_auth_unavailable", error);
    return NextResponse.json({ ok: false, message: "Giriş servisi şu anda kullanılamıyor." }, { status: 503 });
  }
}
