import JobCard from "@/components/JobCard";

async function getJobs(type?: string) {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const url = base ? `${base}/api/jobs${type ? `?type=${type}` : ""}` : `/api/jobs${type ? `?type=${type}` : ""}`;
  const r = await fetch(url, { cache: "no-store" });
  return r.ok ? (await r.json()) : [];
}

export default async function VacaturesPage({ searchParams }: { searchParams: { type?: string } }) {
  const jobs = await getJobs(searchParams?.type);
  return (
    <main className="container py-10 space-y-6">
      <h1 className="text-2xl font-semibold">Vacatures</h1>
      <div className="flex gap-3">
        <a href="/vacatures" className="btn btn-outline">Alle</a>
        <a href="/vacatures?type=Remote" className="btn btn-outline">Remote</a>
        <a href="/vacatures?type=Hybrid" className="btn btn-outline">Hybrid</a>
        <a href="/vacatures?type=On-site" className="btn btn-outline">On-site</a>
      </div>
      {jobs.length === 0 ? (
        <p className="text-gray-500">Geen vacatures gevonden.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {jobs.map((j: any) => (<JobCard key={j.slug} job={j} />))}
        </div>
      )}
    </main>
  );
}
