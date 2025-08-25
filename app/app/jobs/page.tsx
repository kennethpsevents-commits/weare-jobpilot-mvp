'use client';

import { useEffect, useState } from 'react';

type Job = {
  id: string;
  title: string;
  company?: string;
  location?: string;
  remote?: boolean;
  posted_at?: string;
  salary_min?: number | null;
  salary_max?: number | null;
  url?: string;
};

export default function JobsPage() {
  const [q, setQ] = useState('');
  const [sort, setSort] = useState<'new' | 'relevance'>('new');
  const [limit, setLimit] = useState(12);
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<Job[]>([]);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      if (q.trim()) params.set('q', q.trim());
      params.set('sort', sort);
      params.set('limit', String(limit));

      // Relatieve fetch werkt in productie: /api/jobs
      const res = await fetch(`/api/jobs?${params.toString()}`, { cache: 'no-store' });
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      setItems(data.items || []);
    } catch (e: any) {
      setError(e?.message || 'Onbekende fout');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    // eerste load
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold">Vacatures</h1>

      {/* Zoeken + sorteren */}
      <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Zoek vacatures, bedrijven of skills…"
          className="w-full md:w-1/2 rounded-lg border px-3 py-2"
        />
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as 'new' | 'relevance')}
          className="rounded-lg border px-3 py-2 md:w-48"
        >
          <option value="new">Nieuwste eerst</option>
          <option value="relevance">Meest relevant</option>
        </select>
        <button
          onClick={load}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Zoeken
        </button>
      </div>

      {/* Status */}
      {loading && <p className="mt-4 text-sm text-gray-600">Laden…</p>}
      {error && <p className="mt-4 text-sm text-red-600">Fout: {error}</p>}

      {/* Resultaten */}
      <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((job) => (
          <a
            key={job.id}
            href={job.url || '#'}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl border p-4 hover:shadow"
          >
            <div className="text-sm text-gray-500">{job.company || '—'}</div>
            <div className="mt-1 font-semibold">{job.title}</div>
            <div className="mt-1 text-sm">
              {job.location || '—'} {job.remote ? '· Remote' : ''}
            </div>
            <div className="mt-1 text-xs text-gray-500">
              {formatSalary(job.salary_min, job.salary_max)}
            </div>
            <div className="mt-1 text-xs text-gray-400">
              {job.posted_at ? new Date(job.posted_at).toLocaleDateString() : ''}
            </div>
          </a>
        ))}
      </div>

      {/* Geen resultaten */}
      {!loading && !error && items.length === 0 && (
        <p className="mt-6 text-sm text-gray-500">Geen vacatures gevonden.</p>
      )}
    </main>
  );
}

function formatSalary(min?: number | null, max?: number | null) {
  if (!min && !max) return 'Salaris: n.v.t.';
  const f = (n: number) =>
    new Intl.NumberFormat('nl-NL', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
  if (min && max) return `${f(min)} – ${f(max)}`;
  if (max) return `Tot ${f(max)}`;
  return `Vanaf ${f(min as number)}`;
}
