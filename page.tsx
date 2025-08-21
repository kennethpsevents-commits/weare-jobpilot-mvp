"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Suggestion = { id: string; title: string; company: string; type: string; branch: string; location: string; url?: string };

export default function AIPage() {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Suggestion[]|null>(null);

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const payload = Object.fromEntries(form.entries());
    setLoading(true); setSuggestions(null);
    try {
      const r = await fetch("/api/ai/intake", { method: "POST", headers: { "Content-Type":"application/json" }, body: JSON.stringify(payload) });
      const data = await r.json();
      setSuggestions(data.suggestions);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-extrabold mb-2">AI Career Match</h1>
      <p className="text-gray-600 mb-6">Answer a few questions and we suggest 3 roles that fit.</p>

      <form onSubmit={submit} className="card p-6 space-y-3 max-w-2xl">
        <div>
          <label className="block text-sm mb-1">Target role</label>
          <Input name="role" placeholder="e.g., Data Analyst" required />
        </div>
        <div>
          <label className="block text-sm mb-1">Skills (comma‑separated)</label>
          <Input name="skills" placeholder="python, sql, tableau" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm mb-1">Location</label>
            <Input name="location" placeholder="Poland, Netherlands, Remote" />
          </div>
          <div>
            <label className="block text-sm mb-1">Seniority</label>
            <select name="seniority" className="w-full h-9 rounded-md border border-gray-300 px-3 text-sm">
              <option value="junior">Junior</option>
              <option value="mid">Mid</option>
              <option value="senior">Senior</option>
            </select>
          </div>
        </div>
        <Button variant="primary" disabled={loading}>{loading ? "Matching..." : "Get suggestions"}</Button>
      </form>

      {suggestions && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {suggestions.map(s => (
            <div key={s.id} className="card p-6">
              <h3 className="font-semibold">{s.title}</h3>
              <p className="text-sm text-gray-600">{s.company}</p>
              <p className="text-sm text-gray-500 mt-2">{s.branch} · {s.location} · {s.type}</p>
              {s.url && <a className="btn btn-primary mt-3 inline-flex" href={s.url} target="_blank">Apply</a>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
