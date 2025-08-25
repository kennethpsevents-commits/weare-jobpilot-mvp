"use client";
import { useEffect, useState } from "react";
import JobCard from "@/components/JobCard";
import type { Job } from "@/lib/jobs";

export default function VacaturesPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [q, setQ] = useState("");
  const [loc, setLoc] = useState("");
  const [type, setType] = useState<"" | "remote" | "hybrid" | "onsite">("");

  useEffect(() => {
    fetch("/api/crawl/greenhouse?limit=200")
      .then(r => r.json())
      .then(setJobs)
      .catch(() => setJobs([]));
  }, []);

  const filtered = jobs.filter(j => {
    const passQ = !q || (j.title + " " + j.company).toLowerCase().includes(q.toLowerCase());
    const passLoc = !loc || (j.location || "").toLowerCase().includes(loc.toLowerCase());
    const passType =
      !type ? true :
      type === "remote" ? j.remote :
      type === "onsite" ? !j.remote :
      type === "hybrid" ? j.remote : true;
    return passQ && passLoc && passType;
  });

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Vacatures</h1>

      <div className="grid md:grid-cols-4 gap-3 mb-6">
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Zoek functie of bedrijf…"
          className="border rounded-xl p-2"
        />
        <input
          value={loc}
          onChange={e => setLoc(e.target.value)}
          placeholder="Locatie (Wrocław, Amsterdam, Remote)…"
          className="border rounded-xl p-2"
        />
        <select value={type} onChange={e => setType(e.target.value as any)} className="border rounded-xl p-2">
          <option value="">Type (alles)</option>
          <option value="remote">Remote/Hybrid</option>
          <option value="onsite">On-site</option>
          <option value="hybrid">Hybrid (MVP=remote)</option>
        </select>
        <span className="self-center text-sm opacity-70">{filtered.length} resultaten</span>
      </div>

      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(job => <JobCard key={job.id} job={job} />)}
      </section>
    </main>
  );
}
