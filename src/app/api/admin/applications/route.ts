import { NextRequest, NextResponse } from "next/server";
import { isAdminEmail } from "@/lib/admin-auth";
import { workflowUpdateSchema } from "@/lib/admin-schema";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

async function getAuthorizedAdmin() {
  const supabase = await createSupabaseServerClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error || !user || !isAdminEmail(user.email)) return null;
  return { email: user.email!, supabase };
}

export async function GET() {
  try {
    const admin = await getAuthorizedAdmin();
    if (!admin) return NextResponse.json({ ok: false, message: "Yönetici girişi gerekli." }, { status: 401 });

    const database = createSupabaseAdminClient();
    const { data: applications, error } = await database
      .from("applications")
      .select("id, name, email, service_type, description, status, priority, follow_up_at, internal_note, created_at, updated_at")
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) throw error;

    const ids = (applications ?? []).map((application) => application.id);
    const { data: events, error: eventError } = ids.length
      ? await database
        .from("application_events")
        .select("id, application_id, event_type, previous_status, next_status, actor_email, note, created_at")
        .in("application_id", ids)
        .order("created_at", { ascending: false })
      : { data: [], error: null };
    if (eventError) throw eventError;

    return NextResponse.json({ ok: true, applications, events });
  } catch (error) {
    console.error("admin_applications_load_failed", error);
    return NextResponse.json({ ok: false, message: "Başvurular yüklenemedi. Migration ve Supabase ayarlarını kontrol edin." }, { status: 503 });
  }
}

export async function PATCH(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin || new URL(origin).host !== request.headers.get("host")) {
    return NextResponse.json({ ok: false, message: "İstek kaynağı doğrulanamadı." }, { status: 403 });
  }

  const rawBody = await request.text().catch(() => "");
  if (new TextEncoder().encode(rawBody).byteLength > 16_000) {
    return NextResponse.json({ ok: false, message: "İstek boyutu sınırı aşıldı." }, { status: 413 });
  }
  let body: unknown;
  try { body = JSON.parse(rawBody); } catch { body = null; }
  const parsed = workflowUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: "Güncelleme alanlarını kontrol edin." }, { status: 422 });
  }

  try {
    const admin = await getAuthorizedAdmin();
    if (!admin) return NextResponse.json({ ok: false, message: "Yönetici girişi gerekli." }, { status: 401 });
    const database = createSupabaseAdminClient();
    const { error } = await database.rpc("update_application_workflow", {
      p_application_id: parsed.data.id,
      p_status: parsed.data.status,
      p_priority: parsed.data.priority,
      p_follow_up_at: parsed.data.follow_up_at,
      p_internal_note: parsed.data.internal_note,
      p_actor_email: admin.email,
    });
    if (error) throw error;

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("admin_application_update_failed", error);
    return NextResponse.json({ ok: false, message: "Başvuru güncellenemedi." }, { status: 503 });
  }
}
