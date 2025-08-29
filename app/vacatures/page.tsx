import { fetchJobsFromAllBoards } from "@/lib/getJobs";
import type { Job } from "@/lib/types";

export const revalidate = 0;

export default async function Vacatures() {
  const jobs = await fetchJobsFromAllBoards();

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Vacatures</h1>

      {jobs.length === 0 ? (
        <p className="opacity-70">Geen vacatures gevonden.</p>
      ) : (
        <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((j: Job) => (
            <li key={`${j.id}-${j.applyUrl}`} className="rounded-2xl border p-4 hover:shadow-sm transition">
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
