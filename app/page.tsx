'use client';

import { useMemo, useState } from 'react';

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  salary?: string;
  tags: string[];
  description: string;
  posted: string;
};

const JOBS: Job[] = [
  { id: "jp-001", title: "AI Search Engineer", company: "JobPilot Labs", location: "Wrocław / Remote", type: "Full-time", salary: "18–26k PLN / mnd B2B", tags: ["AI","Search","TypeScript","Next.js"], description: "Bouw semantische zoekfunctionaliteit (RAG, embeddings) en performance indexing (caching, sharding).", posted: "2 days ago" },
  { id: "jp-002", title: "React/Next.js Frontend Developer", company: "JobPilot", location: "Remote (EU)", type: "Contract", salary: "100–140 PLN / uur", tags: ["React","Next.js","Tailwind"], description: "Ontwerp de UX van een moderne job-zoekervaring met filters, profile cards en onboarding flows.", posted: "1 day ago" },
  { id: "jp-003", title: "Product Designer (UX/UI)", company: "JobPilot Studio", location: "Warszawa / Hybrid", type: "Full-time", tags: ["Figma","Design System","WCAG"], description: "Maak een toegankelijk design system (WCAG 2.2 AA), component‑bibliotheek en mobile-first flows.", posted: "5 days ago" },
];

export default function Home() {
  const [q, setQ] = useState('');
  const [tag, setTag] = useState<string | null>(null);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    return JOBS.filter((j) => {
      const hay = `${j.title} ${j.company} ${j.location} ${j.description} ${j.tags.join(" ")}`.toLowerCase();
      const matchesQuery = !s || hay.includes(s);
      const matchesTag = !tag || j.tags.map(t=>t.toLowerCase()).includes(tag.toLowerCase());
      return matchesQuery && matchesTag;
    });
  }, [q, tag]);

  const allTags = useMemo(() => Array.from(new Set(JOBS.flatMap(j=>j.tags))).sort(), []);

  return (
    <main>
      <header className="border-b border-neutral-800">
        <div className="container py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-emerald-500 grid place-items-center font-extrabold text-neutral-900">JP</div>
            <div>
              <h1 className="text-xl font-semibold">We Are JobPilot</h1>
              <p className="text-sm text-neutral-400">Vind sneller werk. Slimmer zoeken. Minder ruis.</p>
            </div>
          </div>
          <nav className="text-sm text-neutral-400 flex gap-6">
            <a href="#" className="hover:text-neutral-100">Jobs</a>
            <a href="#" className="hover:text-neutral-100">Companies</a>
            <a href="#" className="hover:text-neutral-100">Sign in</a>
          </nav>
        </div>
      </header>

      <section className="container py-10">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold">Zoek vacatures</h2>
          <p className="text-neutral-400">MVP – client-side filter op mock data.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Zoek op titel, bedrijf, locatie of skill…" className="input" />
          <select value={tag ?? ""} onChange={(e)=>setTag(e.target.value || null)} className="select sm:w-56">
            <option value="">Alle tags</option>
            {allTags.map((t)=>(<option key={t} value={t}>{t}</option>))}
          </select>
        </div>

        <div className="mt-6 grid gap-4">
          {results.length === 0 && (<div className="card p-6 text-neutral-300">Geen resultaten. Probeer een andere term of tag.</div>)}
          {results.map((job)=>(
            <article key={job.id} className="card p-6 hover:border-emerald-600 transition">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-semibold">{job.title}</h3>
                  <p className="text-neutral-400">{job.company} • {job.location} • {job.type}</p>
                </div>
                <div className="text-sm text-neutral-300">{job.salary ?? ""}</div>
              </div>
              <p className="mt-3 text-neutral-300">{job.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {job.tags.map((t)=>(
                  <button key={t} onClick={()=>setTag(t)} className="tag hover:border-emerald-600">#{t}</button>
                ))}
              </div>
              <div className="mt-4 text-xs text-neutral-500">Geplaatst: {job.posted}</div>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-neutral-800">
        <div className="container py-8 text-neutral-400 text-sm">
          © {new Date().getFullYear()} We Are JobPilot — MVP
        </div>
      </footer>
    </main>
  );
}
