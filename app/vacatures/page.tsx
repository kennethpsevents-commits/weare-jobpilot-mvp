"use client";
import { useEffect, useState } from "react";
import JobCard from "@/components/JobCard";

type Job = {
  slug: string; title: string; company: string;
  location?: string; type?: "Remote" | "Hybrid" | "On-site";
  applyUrl: string; createdAt: string;
};

export default function VacaturesPage() {
  const [jobs, setJobs] = useState<Job[] | null>(null);

  useEffect(() => {
    (async () => {
      const r = await fetch("/api/jobs", { cache: "no-store" });
      const d = await r.json().catch(() => []);
      setJobs(Array.isArray(d) ? d : []);
    })();
  }, []);

  return (
    <main className="container py-10 space-y-6">
      <h1 className="text-2xl font-semibold">Vacatures</h1>
      {!jobs && <p>Laden…</p>}
      {jobs && jobs.length === 0 && <p className="text-gray-500">Nog geen vacatures.</p>}
      {jobs && jobs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {jobs.map((j) => (<JobCard key={j.slug} job={j} />))}
        </div>
      )}
    </main>
  );
}
