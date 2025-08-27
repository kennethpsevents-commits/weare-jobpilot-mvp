import JobCard from "@/components/JobCard";

async function getJobs() {
  const base = process.env.NEXT_PUBLIC_BASE_URL ?? "";
  const r = await fetch(`${base}/api/jobs`, { cache: "no-store" });
  return r.ok ? (await r.json()) : [];
}

export default async function HomePage() {
  const jobs = await getJobs();
  return (
    <>
      {/* ... overige hero/filters ... */}
      <section id="jobs" className="py-16">
        <div className="container space-y-8">
          <h2 className="text-2xl font-bold">Nieuw toegevoegde vacatures</h2>
          {jobs.length === 0 ? (
            <p className="text-gray-500">Er zijn nog geen vacatures. Voeg data toe in <code>data/jobs.json</code>.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {jobs.slice(0, 6).map((j: any) => (<JobCard key={j.slug} job={j} />))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
