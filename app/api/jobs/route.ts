import { NextResponse } from 'next/server';
import { Client } from 'pg';

export const revalidate = 60; // cache 60s

type Job = {
  slug: string;
  title: string;
  company: string;
  location: string;
  work_mode: 'remote' | 'hybrid' | 'onsite';
  seniority: string;
  keywords: string[] | null;
  description: string | null;
  apply_url: string | null;
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = (searchParams.get('q') || '').toLowerCase();
    const mode = searchParams.get('mode');
    const seniority = searchParams.get('seniority');

    // Verbind met Postgres (Supabase) via je .env(.local) POSTGRES_URL
    const client = new Client({
      connectionString: process.env.POSTGRES_URL,
      ssl: { rejectUnauthorized: false },
    });
    await client.connect();

    const { rows } = await client.query<Job>(`
      select slug, title, company, location, work_mode, seniority, keywords, description, apply_url
      from jobs
    `);

    await client.end();

    let data = rows;

    if (mode && mode !== 'all') data = data.filter(j => j.work_mode === mode);
    if (seniority) data = data.filter(j => j.seniority === seniority);

    if (q) {
      data = data.filter(j =>
        [
          j.title,
          j.company,
          j.location,
          (j.keywords || []).join(' '),
          j.description || '',
        ]
          .join(' ')
          .toLowerCase()
          .includes(q),
      );
    }

    return NextResponse.json({ jobs: data });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
