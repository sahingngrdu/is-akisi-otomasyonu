"use client";

import { FormEvent, useState } from "react";
import {
  applicationSchema,
  type ApplicationInput,
} from "@/lib/application-schema";

type FieldErrors = Partial<Record<keyof ApplicationInput, string[]>>;

export default function ApplicationForm() {
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    const parsed = applicationSchema.safeParse(values);

    if (!parsed.success) {
      setFieldErrors(parsed.error.flatten().fieldErrors);
      setStatus("error");
      setStatusMessage("Lütfen işaretli alanları kontrol edin.");
      return;
    }

    setFieldErrors({});
    setStatus("sending");
    setStatusMessage("Başvurunuz güvenli şekilde kaydediliyor…");

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const result = (await response.json().catch(() => null)) as
        | { ok?: boolean; id?: string; message?: string; errors?: FieldErrors }
        | null;

      if (!response.ok || result?.ok !== true || !result.id) {
        setFieldErrors(result?.errors ?? {});
        setStatus("error");
        setStatusMessage(
          result?.message ?? "Başvurunuz kaydedilemedi. Lütfen yeniden deneyin.",
        );
        return;
      }

      form.reset();
      setStatus("success");
      setStatusMessage("Başvurunuz kaydedildi. En kısa sürede sizinle iletişime geçeceğiz.");
    } catch {
      setStatus("error");
      setStatusMessage("Bağlantı kurulamadı. İnternetinizi kontrol edip yeniden deneyin.");
    }
  }

  function errorFor(field: keyof ApplicationInput) {
    return fieldErrors[field]?.[0];
  }

  return (
    <form className="application-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <div className="field-group">
          <label htmlFor="name">Adınız soyadınız</label>
          <input
            id="name"
            name="name"
            autoComplete="name"
            placeholder="Örn. Deniz Yılmaz"
            aria-invalid={Boolean(errorFor("name"))}
            aria-describedby={errorFor("name") ? "name-error" : undefined}
            required
          />
          {errorFor("name") && <span className="field-error" id="name-error">{errorFor("name")}</span>}
        </div>
        <div className="field-group">
          <label htmlFor="email">İş e-posta adresiniz</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="deniz@sirketiniz.com"
            aria-invalid={Boolean(errorFor("email"))}
            aria-describedby={errorFor("email") ? "email-error" : undefined}
            required
          />
          {errorFor("email") && <span className="field-error" id="email-error">{errorFor("email")}</span>}
        </div>
      </div>

      <div className="field-group">
        <label htmlFor="service">Hangi konuda destek arıyorsunuz?</label>
        <select
          id="service"
          name="service"
          defaultValue=""
          aria-invalid={Boolean(errorFor("service"))}
          aria-describedby={errorFor("service") ? "service-error" : undefined}
          required
        >
          <option value="" disabled>Bir hizmet alanı seçin</option>
          <option value="is-akisi-otomasyonu">Tekrarlayan işleri otomatikleştirme</option>
          <option value="sistem-entegrasyonu">Kullandığımız sistemleri birbirine bağlama</option>
          <option value="surec-analizi">Süreç analizi ve yol haritası</option>
          <option value="diger">Henüz emin değilim</option>
        </select>
        {errorFor("service") && <span className="field-error" id="service-error">{errorFor("service")}</span>}
      </div>

      <div className="field-group">
        <label htmlFor="description">Bugün sizi en çok yavaşlatan iş nedir?</label>
        <textarea
          id="description"
          name="description"
          rows={4}
          maxLength={2000}
          placeholder="Örn. Her gün farklı kanallardan gelen talepleri tek tek tabloya aktarıyoruz…"
          aria-invalid={Boolean(errorFor("description"))}
          aria-describedby={errorFor("description") ? "description-error" : "description-hint"}
          required
        />
        {errorFor("description") ? (
          <span className="field-error" id="description-error">{errorFor("description")}</span>
        ) : (
          <span className="field-hint" id="description-hint">Kısa bir açıklama yeterli; 2000 karaktere kadar.</span>
        )}
      </div>

      <button className="button button-primary form-submit" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Kaydediliyor…" : "Ön görüşme talep et"}
        {status !== "sending" && <span aria-hidden="true">↗</span>}
      </button>

      <p className="form-privacy">
        Bu form proje demosudur. Lütfen gerçek kişi veya müşteri verisi girmeyin; örnek bilgiler kullanın.
      </p>

      <p
        className={`form-status ${status === "success" ? "is-success" : ""} ${status === "error" ? "is-error" : ""}`}
        role="status"
        aria-live="polite"
      >
        {statusMessage}
      </p>
    </form>
  );
}
