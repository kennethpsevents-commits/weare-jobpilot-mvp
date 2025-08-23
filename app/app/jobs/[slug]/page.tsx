import fs from 'node:fs';
import path from 'node:path';
import Link from 'next/link';

export const revalidate = 60; // cache 60s

function readJobs() {
  const file = path.join(process.cwd(), 'public', 'jobs.json');
  return JSON.parse(fs.readFileSync(file, 'utf-8')) as any[];
}

export default async function JobDetail({ params }: { params: { slug: string } }) {
  const jobs = readJobs();
  const data = jobs.find(j => j.slug === params.slug);
  if (!data) {
    return <main className="p-6">Vacature niet gevonden. <Link className="underline" href="/">Terug</Link></main>;
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-semibold">{data.title}</h1>
      <p className="text-sm text-neutral-500 mt-1">
        {data.company} • {data.location} • {data.work_mode}
      </p>

      <article className="prose mt-6">
        <p><strong>Seniority:</strong> {data.seniority}</p>
        <p><strong>Tags:</strong> {(data.keywords || []).join(', ')}</p>
        <div className="whitespace-pre-wrap">{data.description}</div>
      </article>

      <div className="mt-8 flex gap-3">
        {data.apply_url ? (
          <a className="px-4 py-2 rounded bg-black text-white"
             href={data.apply_url} target="_blank" rel="noopener noreferrer">
            Solliciteer (externe link)
          </a>
        ) : (
          <Link className="px-4 py-2 rounded bg-black text-white"
                href={`/apply?job=${encodeURIComponent(data.slug)}`}>
            Solliciteer (intern)
          </Link>
        )}
        <Link className="px-4 py-2 rounded border" href="/">Terug naar overzicht</Link>
      </div>

      {/* SEO: JobPosting JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context':'https://schema.org','@type':'JobPosting',
            title: data.title,
            hiringOrganization:{'@type':'Organization', name: data.company},
            jobLocation: [{ '@type':'Place', address: data.location }],
            datePosted: new Date().toISOString(),
            employmentType: data.seniority,
            description: data.description
          })
        }}
      />
    </main>
  );
}
