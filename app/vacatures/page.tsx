"use client";
import { useEffect, useState } from "react";
import JobCard from "@/components/JobCard";
import type { Job } from "@/lib/jobs";

export default function VacaturesPage() {
  const [jobs, setJobs] = useState<Job[] | null>(null);

  useEffect(() => {
    (async () => {
      const r = await fetch("/api/jobs", { cache: "no-store" });
      const d = await r.json();
      setJobs(Array.isArray(d) ? d : []);
    })();
  }, []);

  return (
    <main className="max-w-5xl mx-auto px-6 py-8 space-y-4">
      <h1 className="text-2xl font-semibold">Vacatures</h1>
      {!jobs && <p>Laden…</p>}
      {jobs && jobs.length === 0 && <p>Nog geen vacatures.</p>}
      {jobs && jobs.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {jobs.map((j) => <JobCard key={j.id} job={j} />)}
        </div>
      )}
      <p className="text-xs text-gray-500 mt-6">
        Gevuld door externe remote-job feeds (Himalayas/Remotive).
      </p>
    </main>
  );
}
