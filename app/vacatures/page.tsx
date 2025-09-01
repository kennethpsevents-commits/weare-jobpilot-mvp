// app/vacatures/page.tsx
"use client";
import useSWR from "swr";

type JobItem = { id: number; title: string; location: string; url: string; };
const fetcher = (url: string) => fetch(url).then(r => r.json());

export default function VacaturesPage() {
  const { data, error, isLoading } = useSWR<{ jobs: JobItem[] }>("/api/jobs", fetcher, { revalidateOnFocus: false });
  if (error) return <div className="p-6">Kon vacatures niet laden.</div>;
  if (isLoading || !data) return <div className="p-6">Laden…</div>;

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Vacatures</h1>
      <div className="grid gap-3">
        {data.jobs.map(job => (
          <a key={job.id} href={job.url} target="_blank" rel="noreferrer"
             className="rounded-2xl p-4 border hover:shadow transition">
            <div className="text-lg font-semibold">{job.title}</div>
            <div className="text-sm opacity-70">{job.location}</div>
          </a>
        ))}
      </div>
    </main>
  );
}
