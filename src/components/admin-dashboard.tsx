"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  applicationPriorities,
  applicationStatuses,
  type AdminApplication,
  type ApplicationEvent,
  type ApplicationPriority,
  type ApplicationStatus,
} from "@/lib/admin-schema";

const statusNames: Record<ApplicationStatus, string> = {
  new: "Yeni",
  reviewing: "İnceleniyor",
  contacted: "İletişime geçildi",
  proposal: "Teklif aşaması",
  won: "Kazanıldı",
  lost: "Kapatıldı",
};

const priorityNames: Record<ApplicationPriority, string> = {
  low: "Düşük",
  normal: "Normal",
  high: "Yüksek",
};

const serviceNames: Record<string, string> = {
  "is-akisi-otomasyonu": "İş akışı otomasyonu",
  "sistem-entegrasyonu": "Sistem entegrasyonu",
  "surec-analizi": "Süreç analizi",
  diger: "Diğer / henüz emin değil",
};

type Draft = Pick<AdminApplication, "status" | "priority" | "follow_up_at" | "internal_note">;

function toLocalInput(value: string | null) {
  if (!value) return "";
  const date = new Date(value);
  const offset = date.getTimezoneOffset() * 60_000;
  return new Date(date.getTime() - offset).toISOString().slice(0, 16);
}

function fromLocalInput(value: string) {
  return value ? new Date(value).toISOString() : null;
}

function formatDate(value: string | null) {
  if (!value) return "Planlanmadı";
  return new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

export default function AdminDashboard({ email }: { email: string }) {
  const [applications, setApplications] = useState<AdminApplication[]>([]);
  const [events, setEvents] = useState<ApplicationEvent[]>([]);
  const [drafts, setDrafts] = useState<Record<string, Draft>>({});
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);

  const loadApplications = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/applications", { cache: "no-store" });
      const result = await response.json().catch(() => null) as {
        ok?: boolean; message?: string; applications?: AdminApplication[]; events?: ApplicationEvent[];
      } | null;
      if (!response.ok || !result?.ok || !result.applications) {
        throw new Error(result?.message ?? "Başvurular yüklenemedi.");
      }
      setApplications(result.applications);
      setEvents(result.events ?? []);
      setDrafts(Object.fromEntries(result.applications.map((application) => [application.id, {
        status: application.status,
        priority: application.priority,
        follow_up_at: application.follow_up_at,
        internal_note: application.internal_note ?? "",
      }])));
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Başvurular yüklenemedi.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void loadApplications(); }, [loadApplications]);

  const visibleApplications = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("tr-TR");
    return applications.filter((application) => {
      const draft = drafts[application.id];
      const matchesStatus = filter === "all" || draft?.status === filter;
      const matchesQuery = !needle || [application.name, application.email, application.description]
        .some((value) => value.toLocaleLowerCase("tr-TR").includes(needle));
      return matchesStatus && matchesQuery;
    });
  }, [applications, drafts, filter, query]);

  const counts = useMemo(() => ({
    total: applications.length,
    new: applications.filter((application) => application.status === "new").length,
    open: applications.filter((application) => !["won", "lost"].includes(application.status)).length,
    due: applications.filter((application) => application.follow_up_at && new Date(application.follow_up_at) < new Date() && !["won", "lost"].includes(application.status)).length,
  }), [applications]);

  function updateDraft(id: string, changes: Partial<Draft>) {
    setDrafts((current) => ({ ...current, [id]: { ...current[id], ...changes } }));
  }

  async function saveApplication(application: AdminApplication) {
    const draft = drafts[application.id];
    if (!draft) return;
    setSavingId(application.id);
    setNotice("");
    setError("");
    try {
      const response = await fetch("/api/admin/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...draft, id: application.id, follow_up_at: fromLocalInput(toLocalInput(draft.follow_up_at)) }),
      });
      const result = await response.json().catch(() => null) as { ok?: boolean; message?: string } | null;
      if (!response.ok || !result?.ok) throw new Error(result?.message ?? "Değişiklikler kaydedilemedi.");
      setNotice(`${application.name} için değişiklikler kaydedildi.`);
      await loadApplications();
    } catch (saveError) {
      setError(saveError instanceof Error ? saveError.message : "Değişiklikler kaydedilemedi.");
    } finally {
      setSavingId(null);
    }
  }

  async function logout() {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
    } finally {
      window.location.assign("/admin/login");
    }
  }

  return (
    <main className="admin-page">
      <header className="admin-topbar">
        <div className="admin-topbar-inner">
          <Link className="brand" href="/" aria-label="Akış ana sayfa">
            <span className="brand-mark" aria-hidden="true"><i /><i /><i /></span>
            <span>akış<span className="brand-period">.</span></span>
          </Link>
          <div className="admin-account"><span>{email}</span><button type="button" onClick={logout}>Çıkış yap</button></div>
        </div>
      </header>

      <div className="admin-content">
        <div className="admin-heading">
          <div><p className="eyebrow"><span className="eyebrow-mark" /> AKIŞ / BAŞVURULAR</p><h1>İş fırsatlarını takip et.</h1><p>Gelen talepleri incele, sonraki adımı belirle ve takibini unutma.</p></div>
          <button className="admin-refresh" type="button" onClick={() => void loadApplications()} disabled={loading}>↻ <span>Yenile</span></button>
        </div>

        <section className="admin-metrics" aria-label="Başvuru özeti">
          <article><span>Toplam başvuru</span><strong>{counts.total}</strong></article>
          <article><span>Yeni</span><strong>{counts.new}</strong></article>
          <article><span>Açık fırsat</span><strong>{counts.open}</strong></article>
          <article className={counts.due ? "metric-alert" : ""}><span>Takip zamanı geçen</span><strong>{counts.due}</strong></article>
        </section>

        <section className="admin-inbox">
          <div className="admin-inbox-heading"><div><h2>Başvuru gelen kutusu</h2><p>{visibleApplications.length} kayıt gösteriliyor</p></div></div>
          <div className="admin-toolbar">
            <label className="admin-search"><span aria-hidden="true">⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="İsim, e-posta veya açıklamada ara" /></label>
            <label className="sr-only" htmlFor="status-filter">Duruma göre filtrele</label>
            <select id="status-filter" value={filter} onChange={(event) => setFilter(event.target.value)}>
              <option value="all">Tüm durumlar</option>
              {applicationStatuses.map((status) => <option value={status} key={status}>{statusNames[status]}</option>)}
            </select>
          </div>

          {notice && <p className="admin-alert is-success" role="status">{notice}</p>}
          {error && <p className="admin-alert is-error" role="alert">{error}</p>}
          {loading ? <div className="admin-state">Başvurular yükleniyor…</div> : visibleApplications.length === 0 ? (
            <div className="admin-state"><span aria-hidden="true">✳</span><h3>{applications.length === 0 ? "Henüz başvuru yok" : "Bu filtrede sonuç bulunamadı"}</h3><p>{applications.length === 0 ? "Formdan gelen yeni talepler burada görünecek." : "Arama metnini veya durum filtresini değiştirebilirsiniz."}</p></div>
          ) : (
            <div className="application-list">
              {visibleApplications.map((application) => {
                const draft = drafts[application.id];
                const history = events.filter((event) => event.application_id === application.id);
                return (
                  <article className="application-card" key={application.id}>
                    <div className="application-card-head">
                      <div><div className="application-title-row"><h3>{application.name}</h3><span className={`status-pill status-${draft?.status}`}>{statusNames[draft?.status ?? application.status]}</span></div><a href={`mailto:${application.email}`}>{application.email}</a></div>
                      <time dateTime={application.created_at}>{formatDate(application.created_at)}</time>
                    </div>
                    <div className="application-summary"><span>{serviceNames[application.service_type] ?? application.service_type}</span><p>{application.description}</p></div>
                    {draft && <div className="workflow-fields">
                      <label>Durum<select value={draft.status} onChange={(event) => updateDraft(application.id, { status: event.target.value as ApplicationStatus })}>{applicationStatuses.map((status) => <option key={status} value={status}>{statusNames[status]}</option>)}</select></label>
                      <label>Öncelik<select value={draft.priority} onChange={(event) => updateDraft(application.id, { priority: event.target.value as ApplicationPriority })}>{applicationPriorities.map((priority) => <option key={priority} value={priority}>{priorityNames[priority]}</option>)}</select></label>
                      <label>Sonraki takip<input type="datetime-local" value={toLocalInput(draft.follow_up_at)} onChange={(event) => updateDraft(application.id, { follow_up_at: event.target.value ? new Date(event.target.value).toISOString() : null })} /></label>
                      <label className="note-field">İç not<textarea rows={2} maxLength={3000} value={draft.internal_note} onChange={(event) => updateDraft(application.id, { internal_note: event.target.value })} placeholder="Yalnızca yönetim panelinde görünür" /><small>{draft.internal_note.length}/3000</small></label>
                    </div>}
                    <div className="application-card-foot"><span>Takip: <strong>{formatDate(draft?.follow_up_at ?? null)}</strong>{draft?.priority === "high" && <em className="priority-label">Yüksek öncelik</em>}</span><button className="button button-dark save-workflow" onClick={() => void saveApplication(application)} disabled={savingId === application.id}>{savingId === application.id ? "Kaydediliyor…" : "Değişiklikleri kaydet"}</button></div>
                    <details className="application-history"><summary>Aktivite geçmişi <span>{history.length}</span></summary><ol>{history.map((event) => <li key={event.id}><time dateTime={event.created_at}>{formatDate(event.created_at)}</time><span>{event.event_type === "submitted" ? "Başvuru alındı" : event.event_type === "status_changed" ? `Durum değişti: ${statusNames[event.previous_status ?? "new"]} → ${statusNames[event.next_status ?? "new"]}` : "Takip bilgileri güncellendi"}{event.actor_email ? ` · ${event.actor_email}` : ""}</span></li>)}</ol></details>
                  </article>
                );
              })}
            </div>
          )}
        </section>
        <p className="admin-demo-note">Değerlendirme demosu · Yalnızca kurgu başvurular kullanın.</p>
      </div>
    </main>
  );
}
