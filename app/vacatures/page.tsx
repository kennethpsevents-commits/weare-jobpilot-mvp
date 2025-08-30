export const revalidate = 0;

type Job = {
  id: string; title: string; company: string;
  location?: string; remote: boolean; applyUrl: string; createdAt: string;
};

async function getAll() {
  const base = process.env.NEXT_PUBLIC_SITE_URL
    || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "")
    || "http://localhost:3000";
  const r = await fetch(`${base}/api/aggregate/jobs`, { cache: "no-store" });
  return (await r.json()) as Job[];
}

export default async function Vacatures() {
  const jobs = await getAll();
  return (
    <main className="max-w-6xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Vacatures</h1>
      <div className="text-sm opacity-70">{jobs.length} resultaten</div>
      {jobs.length === 0 ? (
        <p className="opacity-70">Geen vacatures gevonden.</p>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((j) => (
            <li key={j.id} className="rounded-2xl border p-4 hover:shadow-sm transition">
              <div className="font-medium">{j.title}</div>
              <div className="text-sm opacity-70">
                {j.company} {j.location ? `• ${j.location}` : ""} {j.remote ? "• Remote" : ""}
              </div>
              <a className="underline mt-2 inline-block" href={j.applyUrl} target="_blank" rel="noreferrer">
                Apply
              </a>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
