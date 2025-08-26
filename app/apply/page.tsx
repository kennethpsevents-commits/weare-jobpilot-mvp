"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type Application = {
  id: string;
  createdAt: string;
  name: string;
  email: string;
  phone?: string;
  cvUrl?: string;
  message?: string;
  jobId?: string;
  jobTitle?: string;
};

const STORAGE_KEY = "jobpilot_applications";

export default function ApplyPage() {
  const router = useRouter();
  const qs = useSearchParams();
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    cvUrl: "",
    message: "",
    jobId: qs.get("jobId") ?? "",
    jobTitle: qs.get("jobTitle") ?? "",
  });

  useEffect(() => {
    // prefills from querystring (?jobId=123&jobTitle=Frontend%20Developer)
    setForm((f) => ({
      ...f,
      jobId: qs.get("jobId") ?? f.jobId,
      jobTitle: qs.get("jobTitle") ?? f.jobTitle,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function saveLocally(app: Application) {
    const raw = localStorage.getItem(STORAGE_KEY);
    const list: Application[] = raw ? JSON.parse(raw) : [];
    list.unshift(app); // newest first
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    // Build application object
    const app: Application = {
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim() || undefined,
      cvUrl: form.cvUrl.trim() || undefined,
      message: form.message.trim() || undefined,
      jobId: form.jobId || undefined,
      jobTitle: form.jobTitle || undefined,
    };

    // ✅ MVP: lokaal opslaan (geen server nodig)
    saveLocally(app);

    // 🔜 Later: opsturen naar API / e-mail (Supabase / Resend)
    // await fetch("/api/apply", { method: "POST", body: JSON.stringify(app) })

    setSubmitting(false);
    router.push("/apply/success");
  }

  return (
    <main className="max-w-xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-semibold mb-1">Aanmelden / Solliciteren</h1>
      <p className="text-sm text-gray-500 mb-6">
        {form.jobTitle ? `Voor: ${form.jobTitle}${form.jobId ? ` (ID: ${form.jobId})` : ""}` : "Algemene aanmelding"}
      </p>

      <form onSubmit={onSubmit} className="space-y-4">
        <div>
          <label className="block text-sm mb-1">Naam *</label>
          <input
            className="w-full border rounded-lg px-3 py-2"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">E-mail *</label>
          <input
            type="email"
            className="w-full border rounded-lg px-3 py-2"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Telefoon</label>
          <input
            className="w-full border rounded-lg px-3 py-2"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">CV / LinkedIn URL</label>
          <input
            type="url"
            placeholder="https://linkedin.com/in/… of https://mijncv.com/…"
            className="w-full border rounded-lg px-3 py-2"
            value={form.cvUrl}
            onChange={(e) => setForm({ ...form, cvUrl: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Motivatie / Bericht</label>
          <textarea
            rows={5}
            className="w-full border rounded-lg px-3 py-2"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
          />
        </div>

        {/* Verborgen velden voor context */}
        <input type="hidden" value={form.jobId} readOnly />
        <input type="hidden" value={form.jobTitle} readOnly />

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-2xl px-4 py-2 bg-black text-white disabled:opacity-60"
        >
          {submitting ? "Verzenden…" : "Verzenden"}
        </button>

        <p className="text-xs text-gray-500">
          Door te verzenden ga je akkoord met verwerking volgens onze privacyverklaring.
        </p>
      </form>
    </main>
  );
}
