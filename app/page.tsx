import "./globals.css";
import { fetchJobsFromAllBoards } from "@/lib/getJobs";
import type { Job } from "@/lib/types";

export const revalidate = 0;

function JobCard({ job }: { job: Job }) {
  return (
    <li className="rounded-2xl border p-4 hover:shadow-sm transition">
      <div className="font-semibold">{job.title}</div>
      <div className="text-sm opacity-70">
        {job.company} {job.location ? `• ${job.location}` : ""} {job.remote ? "• Remote" : ""}
      </div>
      <a className="underline mt-2 inline-block" href={job.applyUrl} target="_blank" rel="noreferrer">
        Apply
      </a>
    </li>
  );
}

export default async function Page() {
  const jobs = await fetchJobsFromAllBoards();

  return (
    <main className="max-w-5xl mx-auto p-6 space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold">WeAre JobPilot</h1>
        <p className="opacity-80">Live vacatures verzameld via Greenhouse boards.</p>
      </header>

      {!jobs.length ? (
        <p className="opacity-70">Geen vacatures gevonden. Probeer later opnieuw.</p>
      ) : (
        <>
          <div className="text-sm opacity-70">{jobs.length} vacatures gevonden</div>
          <ul className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map((j) => (
              <JobCard key={`${j.id}-${j.applyUrl}`} job={j} />
            ))}
          </ul>
        </>
      )}
    </main>
  );
}
