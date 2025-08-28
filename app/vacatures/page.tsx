"use client";
import { useEffect, useState } from "react";
import JobCard from "@/components/JobCard";

type Job = {
  id: string;
  title: string;
  company: string;
  location?: string;
  remote: boolean;
  applyUrl: string;
  description?: string;
  createdAt: string;
};

export default function VacaturesPage() {
  const [jobs, setJobs] = useState<Job[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        // ✅ Nu lezen uit live endpoint
        const r = await fetch("/api/jobs", { cache: "no-store" });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const d = await r.json();
        setJobs(Array.isArray(d) ? d : []);
      } catch (e: any) {
        setErr(e?.message ?? "Kon niet laden");
        setJobs([]);
      }
    })();
  }, []);

  return (
    <main className="max-w-5xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold mb-2">Vacatures</h1>
      {!jobs && !err && <p>Laden…</p>}
      {err && <p className="text-red-600">Fout: {err}</p>}
      {jobs && jobs.length === 0 && <p>Geen vacatures gevonden.</p>}
      {jobs && jobs.length > 0 && (
        <section className="grid gap-4 sm:grid-cols-2">
          {jobs.map((j) => (
            <JobCard key={j.id} job={j} />
          ))}
        </section>
      )}
    </main>
  );
}
