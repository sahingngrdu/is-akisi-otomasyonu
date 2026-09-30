import { redirect } from "next/navigation";
import AdminDashboard from "@/components/admin-dashboard";
import { isAdminEmail } from "@/lib/admin-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Başvuru yönetimi | Akış",
  robots: { index: false, follow: false },
};

export default async function AdminPage() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) {
    return <main className="admin-auth-page"><section className="admin-auth-card"><h1>Giriş yapılandırması eksik</h1><p>NEXT_PUBLIC_SUPABASE_URL ve NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ortam değişkenlerini ekleyin.</p></section></main>;
  }

  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
  if (!isAdminEmail(user.email)) redirect("/admin/login?error=unauthorized");

  return <AdminDashboard email={user.email ?? ""} />;
}
