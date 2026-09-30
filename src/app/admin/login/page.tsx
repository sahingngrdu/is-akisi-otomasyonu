import Link from "next/link";
import AdminLoginForm from "@/components/admin-login-form";

export const metadata = {
  title: "Yönetici girişi | Akış",
  robots: { index: false, follow: false },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  return (
    <main className="admin-auth-page">
      <div className="admin-auth-card">
        <Link className="brand" href="/" aria-label="Akış ana sayfa">
          <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
          <span>akış<span className="brand-period">.</span></span>
        </Link>
        <p className="eyebrow"><span className="eyebrow-mark" /> YÖNETİM ALANI</p>
        <h1>Başvurularınızı yönetin.</h1>
        <p className="admin-auth-copy">Yönetici e-posta adresinize tek kullanımlık giriş bağlantısı gönderelim.</p>
        {params.error === "link" && <p className="admin-form-alert" role="alert">Bağlantı geçersiz veya süresi dolmuş. Yeni bir bağlantı isteyin.</p>}
        {params.error === "unauthorized" && <p className="admin-form-alert" role="alert">Bu hesap yönetici olarak yetkilendirilmemiş.</p>}
        <AdminLoginForm />
        <Link href="/" className="admin-back-link">← Ana sayfaya dön</Link>
      </div>
    </main>
  );
}
