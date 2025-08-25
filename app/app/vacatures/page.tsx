"use client";

import { useEffect, useMemo, useState } from "react";
import JobCard from "@/components/JobCard";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  remote: boolean;
  url: string;
  createdAt: string; // ISO
  source: string;
};

export default function VacaturesPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [q, setQ] = useState("");
  const [loc, setLoc] = useState("");
  const [type, setType] = useState<"" | "remote" | "hybrid" | "onsite">("");

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const res = await fetch("/api/crawl/greenhouse?limit=200", { cache: "no-store" });
        const data = await res.json();
        if (alive) setJobs(Array.isArray(data) ? data : []);
      } catch {
        if (alive) setJobs([]);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  const filtered = useMemo(() => {
    const text = q.trim().toLowerCase();
    const place = loc.trim().toLowerCase();
    return jobs.filter(j => {
      const passQ = !text || (j.title + " " + j.company).toLowerCase().includes(text);
      const passLoc = !place || (j.location || "").toLowerCase().includes(place);
      const passType =
        !type ? true :
        type === "remote" ? j.remote :
        type === "onsite" ? !j.remote :
        type === "hybrid" ? j.remote : true; // MVP: treat hybrid as remote
      return passQ && passLoc && passType;
    });
  }, [jobs, q, loc, type]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Vacatures</h1>

      <div className="grid md:grid-cols-4 gap-3 mb-6">
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Zoek functie of bedrijf…"
          className="border rounded-xl p-2"
          aria-label="Zoekfunctie of bedrijf"
        />
        <input
          value={loc}
          onChange={e => setLoc(e.target.value)}
          placeholder="Locatie (Amsterdam, Remote)…"
          className="border rounded-xl p-2"
          aria-label="Locatie"
        />
        <select
          value={type}
          onChange={e => setType(e.target.value as any)}
          className="border rounded-xl p-2"
          aria-label="Type werk"
        >
          <option value="">Type (alles)</option>
          <option value="remote">Remote/Hybrid</option>
          <option value="onsite">On‑site</option>
          <option value="hybrid">Hybrid (MVP=remote)</option>
        </select>
        <div className="self-center text-sm opacity-70">
          {loading ? "Laden…" : `${filtered.length} resultaten`}
        </div>
      </div>

      {loading ? (
        <p className="opacity-70">Vacatures laden…</p>
      ) : filtered.length === 0 ? (
        <p className="opacity-70">Geen resultaten. Probeer andere zoektermen of filters.</p>
      ) : (
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map(job => <JobCard key={job.id} job={job} />)}
        </section>
      )}
    </main>
  );
}
