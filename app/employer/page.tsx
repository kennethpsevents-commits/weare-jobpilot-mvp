"use client";
import { useState } from "react";

export default function EmployerPage() {
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("Bezig met opslaan…");
    const form = e.currentTarget;
    const data = {
      title: (form.title as any).value,
      company: (form.company as any).value,
      location: (form.location as any).value,
      remote: (form.remote as any).checked,
      applyUrl: (form.applyUrl as any).value,
      description: (form.description as any).value,
      createdAt: new Date().toISOString(),
    };
    try {
      const res = await fetch("/api/employers/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("API fout");
      setStatus("Vacature opgeslagen ✅");
      form.reset();
    } catch {
      setStatus("Er ging iets mis ❌");
    }
  }

  return (
    <main className="max-w-xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold mb-4">Plaats een vacature</h1>
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input name="title" placeholder="Functietitel" required className="border p-2 rounded" />
        <input name="company" placeholder="Bedrijfsnaam" required className="border p-2 rounded" />
        <input name="location" placeholder="Locatie" className="border p-2 rounded" />
        <label className="flex items-center gap-2"><input type="checkbox" name="remote" /> Remote</label>
        <input name="applyUrl" placeholder="Sollicitatielink" required className="border p-2 rounded" />
        <textarea name="description" placeholder="Beschrijving" rows={4} className="border p-2 rounded" />
        <button type="submit" className="rounded-xl bg-blue-600 text-white px-4 py-2 hover:bg-blue-700">Opslaan</button>
      </form>
      {status && <p className="mt-4">{status}</p>}
    </main>
  );
}
