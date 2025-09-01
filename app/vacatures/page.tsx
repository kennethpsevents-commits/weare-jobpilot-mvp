"use client";

import { useEffect, useState } from "react";

type Job = { id: string; title: string; company: string; location: string; url: string };

export default function VacaturesPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/aggregate/jobs", { cache: "no-store" });
        const data = await res.json();
        setJobs(data.jobs || []);
      } catch (e) {
        console.error(e);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Vacatures</h1>

      {loading && <p>Vacatures laden...</p>}
      {!loading && jobs.length === 0 && <p>Geen vacatures gevonden.</p>}

      <div className="grid gap-4">
        {jobs.map((job) => (
          <a
            key={job.id}
            href={job.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 border rounded-lg hover:bg-gray-50 transition"
          >
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.company}</p>
            <p className="text-gray-500 text-sm">{job.location}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
