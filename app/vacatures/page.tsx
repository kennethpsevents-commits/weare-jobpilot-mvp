"use client";
import { useEffect, useMemo, useState } from "react";
import JobCard from "@/components/JobCard";
import type { Job } from "@/lib/jobs";

type RemoteFilter = "all" | "remote" | "onsite";

export default function VacaturesPage() {
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [q, setQ] = useState("");
  const [remote, setRemote] = useState<RemoteFilter>("all");
  const [company, setCompany] = useState("");

  useEffect(() => {
    fetch("/api/crawl/greenhouse?limit=200")
      .then(r => r.json())
      .then(d => Array.isArray(d) ? setAllJobs(d) : setAllJobs([]))
      .catch(() => setAllJobs([]));
  }, []);

  const companies = useMemo(() => {
    const s = new Set(allJobs.map(j => j.company).filter(Boolean));
    return ["", ...Array.from(s).sort()];
  }, [allJobs]);

  const filtered = useMemo(() => {
    const ql = q.trim().toLowerCase();
    return allJobs.filter(j => {
      const matchesQ =
        !ql || j.title.toLowerCase().includes(ql) ||
        j.company.toLowerCase().includes(ql) ||
        (j.location || "").toLowerCase().includes(ql);
      const matchesRemote = remote === "all" ? true : remote === "remote" ? j.remote : !j.remote;
      const matchesCompany = !company || j.company === company;
      return matchesQ && matchesRemote && matchesCompany;
    });
  }, [allJobs, q, remote, company]);

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold mb-4">Vacatures</h1>
      <section className="mb-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Zoek op titel, bedrijf of locatie…" className="border rounded-xl px-3 py-2" />
        <select value={remote} onChange={(e)=>setRemote(e.target.value as RemoteFilter)} className="border rounded-xl px-3 py-2">
          <option value="all">Alle (Remote + On-site)</option>
          <option value="remote">Alleen Remote/Hybrid</option>
          <option value="onsite">Alleen On-site</option>
        </select>
        <select value={company} onChange={(e)=>setCompany(e.target.value)} className="border rounded-xl px-3 py-2">
          {companies.map(c => <option key={c} value={c}>{c || "Alle bedrijven"}</option>)}
        </select>
        <div className="flex items-center text-sm opacity-70">Resultaten: {filtered.length}</div>
      </section>
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(j => <JobCard key={j.id} job={j} />)}
      </section>
    </main>
  );
}
