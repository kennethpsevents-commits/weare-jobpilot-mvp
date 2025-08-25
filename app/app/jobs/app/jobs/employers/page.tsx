"use client";
import { useEffect, useState } from "react";

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

export default function EmployerJobsPage() {
  const [jobs, setJobs] = useState<Job[] | null>(null);

  useEffect(() => {
    (async () => {
      const r = await fetch("/api/employers/create", { cache: "no-store" });
      const d = await r.json();
      setJobs(Array.isArray(d) ? d : []);
    })();
  }, []);

  return (
    <main className="max-w-5xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-semibold mb-2">Vacatures geplaatst door werkgevers</h1>
      {!jobs && <p>Laden…</p>}
      {jobs && jobs.length === 0 && <p>Nog geen vacatures geplaatst.</p>}
      {jobs && jobs.length > 0 && (
        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {jobs.map(j => (
            <article key={j.id} className="border rounded-2xl p-4 shadow-sm">
              <h3 className="font-semibold">{j.title}</h3>
              <p className="opacity-80">
                {j.company} • {j.location || (j.remote ? "Remote" : "On-site")}
              </p>
              {j.description && <p className="mt-2 text-sm">{j.description}</p>}
              <a
                href={j.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 border rounded-xl px-3 py-2"
              >
                Solliciteer
              </a>
              <p className="text-xs opacity-60 mt-2">
                Geplaatst: {new Date(j.createdAt).toLocaleString()}
              </p>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}
