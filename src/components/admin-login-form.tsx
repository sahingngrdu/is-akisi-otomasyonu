"use client";

import { FormEvent, useState } from "react";

export default function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const result = await response.json().catch(() => null) as { ok?: boolean; message?: string } | null;
      if (!response.ok || !result?.ok) {
        setMessage(result?.message ?? "Giriş bağlantısı gönderilemedi.");
        return;
      }
      setSent(true);
      setMessage("Giriş bağlantısı gönderildi. E-postanızdaki bağlantıyı bu tarayıcıda açın.");
    } catch {
      setMessage("Sunucuya ulaşılamadı. Biraz sonra yeniden deneyin.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form className="admin-login-form" onSubmit={handleSubmit}>
      <label htmlFor="admin-email">Yönetici e-posta adresi</label>
      <input
        id="admin-email"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="adiniz@ornek.com"
        required
        maxLength={254}
        disabled={busy || sent}
      />
      <button className="button button-primary" type="submit" disabled={busy || sent}>
        {busy ? "Gönderiliyor…" : sent ? "Bağlantı gönderildi" : "Giriş bağlantısı gönder"}
        {!busy && !sent && <span aria-hidden="true">↗</span>}
      </button>
      <p className={`admin-form-message ${message && !sent ? "is-error" : ""}`} role="status" aria-live="polite">{message}</p>
      <p className="admin-auth-footnote">Bu bağlantı yalnızca yapılandırılmış yönetici adreslerine gönderilir.</p>
    </form>
  );
}
