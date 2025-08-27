"use client";
import { useState } from "react";
import JobCard from "@/components/JobCard";

export default function AICareerMatch() {
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState<any[]>([]);
  const [form, setForm] = useState({ target: "", skills: "", location: "", seniority: "Junior" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setJobs([]);
    const r = await fetch("/api/ai/match", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(form),
      cache: "no-store"
    });
    const d = r.ok ? await r.json() : [];
    setJobs(d);
    setLoading(false);
  }

  return (
    <main className="container py-10 space-y-6">
      <h1 className="text-2xl font-semibold">AI Career Match</h1>
      <form onSubmit={onSubmit} className="grid gap-3 max-w-xl">
        <input className="border rounded px-3 py-2" placeholder="Target role" value={form.target}
          onChange={e => setForm({ ...form, target: e.target.value })}/>
        <input className="border rounded px-3 py-2" placeholder="Skills (comma-separated)" value={form.skills}
          onChange={e => setForm({ ...form, skills: e.target.value })}/>
        <input className="border rounded px-3 py-2" placeholder="Location" value={form.location}
          onChange={e => setForm({ ...form, location: e.target.value })}/>
        <select className="border rounded px-3 py-2" value={form.seniority}
          onChange={e => setForm({ ...form, seniority: e.target.value })}>
          <option>Junior</option><option>Mid</option><option>Senior</option>
        </select>
        <button className="btn btn-primary" disabled={loading}>{loading ? "Zoeken…" : "Get suggestions"}</button>
      </form>

      {jobs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {jobs.map(j => <JobCard key={j.slug} job={j} />)}
        </div>
      )}
    </main>
  );
}
