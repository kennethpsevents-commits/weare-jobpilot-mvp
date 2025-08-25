"use client";
import { useState } from "react";

export default function EmployerPostPage() {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true); setMsg(null);

    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd.entries());

    const res = await fetch("/api/employers/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();

    if (res.ok) {
      (e.target as HTMLFormElement).reset();
      setMsg("✔️ Vacature geplaatst. Bekijk op /jobs");
    } else {
      setMsg("❌ " + (data?.message || "kon niet opslaan"));
    }

    setLoading(false);
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold mb-2">Plaats een vacature</h1>

      <form onSubmit={onSubmit} className="grid gap-4">
        <input
          name="title"
          required
          className="border rounded-xl p-2"
          placeholder="Functietitel *"
        />
        <input
          name="company"
          required
          className="border rounded-xl p-2"
          placeholder="Bedrijf *"
        />
        <input
          name="location"
          className="border rounded-xl p-2"
          placeholder="Locatie (bijv. Remote)"
        />
        <select name="remote" className="border rounded-xl p-2">
          <option value="">Remote?</option>
          <option value="true">Ja</option>
          <option value="false">Nee</option>
        </select>
        <input
          name="applyUrl"
          required
          className="border rounded-xl p-2"
          placeholder="Sollicitatielink *"
        />
        <textarea
          name="description"
          className="border rounded-xl p-2"
          rows={5}
          placeholder="Beschrijving (optioneel)"
        />
        <button
          disabled={loading}
          className="border rounded-xl px-4 py-2 hover:shadow-sm transition"
        >
          {loading ? "Bezig…" : "Plaats"}
        </button>
        {msg && <p className="mt-2">{msg}</p>}
      </form>
    </main>
  );
}
