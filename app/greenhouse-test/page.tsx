"use client";
import { useEffect, useState } from "react";

type Job = {
  id: string;
  title: string;
  company: string;
  location?: string;
  remote: boolean;
  applyUrl: string;
  createdAt: string;
};

export default function Page() {
  const [jobs, setJobs] = useState<Job[] | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("/api/import/greenhouse/stripe", { cache: "no-store" });
        const d = await r.json();
        if (!Array.isArray(d)) throw new Error(d?.error ?? "Unexpected response");
        setJobs(d);
      } catch (e: any) {
        setErr(e?.message ?? String(e));
      }
    })();
  }, []);

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Greenhouse Test (stripe)</h1>
      {err && <p className="text-red-600">Error: {err}</p>}
      {!jobs && !err && <p>Laden…</p>}
      {jobs && (
        <ul className="space-y-2">
          {jobs.map((j) => (
            <li key={j.id} className="border rounded p-3">
              <div className="font-medium">{j.title}</div>
              <div className="text-sm opacity-70">
                {j.company} • {j.location ?? "—"} {j.remote ? "• Remote" : ""}
              </div>
              <a className="underline text-blue-600" href={j.applyUrl} target="_blank">Apply</a>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
