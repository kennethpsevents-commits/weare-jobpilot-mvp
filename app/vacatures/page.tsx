"use client";
import { useEffect, useState } from "react";
import JobCard from "../../components/JobCard";

type Job = {
  id: string; title: string; company: string;
  location?: string; remote?: boolean;
  applyUrl: string; createdAt: string;
};

export default function VacaturesPage() {
  const [jobs, setJobs] = useState<Job[] | null>(null);
  useEffect(() => { (async () => {
    const r = await fetch("/api/employers/create", { cache: "no-store" });
    const d = await r.json();
    setJobs(Array.isArray(d) ? d : []);
  })(); }, []);
  return (
    <main className="max-w-5xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Vacatures</h1>
      {!jobs && <p>Laden…</p>}
      {jobs && jobs.length === 0 && <p>Geen vacatures.</p>}
      {jobs && jobs.length > 0 && (
        <div className="grid gap-4">
          {jobs.map(j => <JobCard key={j.id} job={j} />)}
        </div>
      )}
    </main>
  );
}
