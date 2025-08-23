import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export const revalidate = 60; // cache 60s

type Job = {
  slug: string;
  title: string;
  company: string;
  location: string;
  work_mode: string;
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

export default async function JobDetail({ params }: { params: { slug: string } }) {
  const jobs = readJobs();
  const data = jobs.find((j) => j.slug === params.slug);

  if (!data) {
    return (
      <main className="p-6">
        <p>Vacature niet gevonden.</p>
        <Link href="/" className="underline text-green-600">Terug</Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl p-6">
      <h1 className="text-2xl font-semibold">{data.title}</h1>
      <p className="text-neutral-600">{data.company} – {data.location} ({data.work_mode})</p>

      <article className="prose mt-4">
        <p><strong>Seniority:</strong> {data.seniority}</p>
        <p><strong>Tags:</strong> {(data.keywords || []).join(', ')}</p>
        <p className="whitespace-pre-wrap">{data.description}</p>
      </article>

      {data.apply_url && (
        <a
          href={data.apply_url}
          className="bg-green-600 text-white px-4 py-2 rounded-lg inline-block mt-6"
        >
          Solliciteer nu
        </a>
      )}

      <div className="mt-6">
        <Link href="/" className="underline text-green-600">← Terug naar overzicht</Link>
      </div>
    </main>
  );
}
