import { NextRequest, NextResponse } from "next/server";
import { applicationSchema } from "@/lib/application-schema";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (contentLength > 8_000) {
    return NextResponse.json(
      { ok: false, message: "İstek boyutu sınırı aşıldı." },
      { status: 413 },
    );
  }

  let body: unknown;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > 8_000) {
      return NextResponse.json(
        { ok: false, message: "İstek boyutu sınırı aşıldı." },
        { status: 413 },
      );
    }
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json(
      { ok: false, message: "Gönderilen veri okunamadı." },
      { status: 400 },
    );
  }

  const parsed = applicationSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        message: "Formdaki alanları kontrol edip yeniden deneyin.",
        errors: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SECRET_KEY) {
    return NextResponse.json(
      {
        ok: false,
        message: "Başvuru sistemi henüz yapılandırılmamış. Lütfen daha sonra tekrar deneyin.",
      },
      { status: 503 },
    );
  }

  try {
    const supabase = createSupabaseAdminClient();

    const { data, error } = await supabase
      .from("applications")
      .insert({
        name: parsed.data.name,
        email: parsed.data.email.toLowerCase(),
        service_type: parsed.data.service,
        description: parsed.data.description,
      })
      .select("id")
      .single();

    if (error || !data?.id) {
      console.error("application_insert_failed", error?.message ?? "No row returned");
      return NextResponse.json(
        {
          ok: false,
          message: "Başvurunuz kaydedilemedi. Lütfen biraz sonra tekrar deneyin.",
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true, id: data.id }, { status: 201 });
  } catch (error) {
    console.error("application_service_unavailable", error);
    return NextResponse.json(
      {
        ok: false,
        message: "Başvuru sistemi şu anda yanıt vermiyor. Lütfen biraz sonra tekrar deneyin.",
      },
      { status: 503 },
    );
  }
}
