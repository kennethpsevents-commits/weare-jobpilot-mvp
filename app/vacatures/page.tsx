import { JobCard } from "../../components/JobCard";

type JobsPayload = { jobs: Array<{
  id: string; title: string; company: string; location: string; url: string; source: string;
}>; count: number; };

async function getJobs() {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const res = await fetch(`${base}/api/jobs`, { cache: "no-store" });
  if (!res.ok) return { jobs: [], count: 0 } as JobsPayload;
  return (await res.json()) as JobsPayload;
}

export default async function VacaturesPage() {
  const { jobs, count } = await getJobs();

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-bold mb-4">Vacatures ({count})</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {jobs.map((j) => (
          <JobCard key={j.id} job={j as any} />
        ))}
      </div>
      {count === 0 && (
        <p className="text-sm text-gray-600 mt-6">
          Nog geen data. Bezoek eerst <code>/api/admin/ingest</code>.
        </p>
      )}
    </main>
  );
}
