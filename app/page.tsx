import fs from 'node:fs';
import path from 'node:path';
import Link from 'next/link';

export const revalidate = 60; // cache homepage 60s

type Job = {
  slug: string;
  title: string;
  company: string;
  location: string;
  work_mode: 'remote' | 'hybrid' | 'onsite' | string;
  seniority: string;
  keywords?: string[];
  description?: string;
  apply_url?: string;
};

function readJobs(): Job[] {
  const file = path.join(process.cwd(), 'public', 'jobs.json');
  const raw = fs.readFileSync(file, 'utf-8');
  return JSON.parse(raw) as Job[];
}

export default async function Home() {
  const jobs = readJobs();

  return (
    <main className="mx-auto max-w-5xl p-6">
      <header className="mb-6">
        <h1 className="text-3xl font-semibold">We Are JobPilot — Vacatures</h1>
        <p className="text-neutral-600 mt-1">
          Klik op een vacature om details te bekijken en te solliciteren.
        </p>
      </header>

      {/* Vacatures */}
      <section className="grid gap-4 sm:grid-cols-2">
        {jobs.map((job) => (
          <Link
            key={job.slug}
            href={`/jobs/${job.slug}`}
            className="block rounded border p-4 hover:bg-neutral-50 transition"
          >
            <h2 className="text-lg font-medium">{job.title}</h2>
            <p className="text-sm text-neutral-600 mt-1">
              {job.company} • {job.location} • {job.seniority}
            </p>
            {job.keywords?.length ? (
              <p className="text-xs text-neutral-500 mt-2">
                Tags: {job.keywords.join(', ')}
              </p>
            ) : null}
            <div className="mt-3">
              <span className="inline-block text-sm bg-black text-white px-3 py-1 rounded">
                Bekijk & solliciteer
              </span>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
