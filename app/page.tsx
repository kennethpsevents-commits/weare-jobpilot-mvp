import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export const revalidate = 60; // cache homepage 60s

type Job = {
  slug: string;
  title: string;
  company: string;
  location: string;
  work_mode: 'remote' | 'hybrid' | 'onsite';
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
        <h1 className="text-3xl font-semibold">We Are JobPilot – Vacatures</h1>
        <p className="text-neutral-600 mt-1">
          Klik op een vacature om details te bekijken en te solliciteren.
        </p>
      </header>

      <ul className="space-y-4">
        {jobs.map((job) => (
          <li key={job.slug} className="border p-4 rounded-lg hover:bg-neutral-50">
            <Link href={`/jobs/${job.slug}`}>
              <h2 className="text-xl font-bold">{job.title}</h2>
              <p className="text-sm text-neutral-600">
                {job.company} – {job.location} ({job.work_mode})
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
