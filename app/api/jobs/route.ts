import { NextResponse } from 'next/server';
import fs from 'node:fs';
import path from 'node:path';

export async function GET(req: Request) {
  try {
    const file = path.join(process.cwd(), 'public', 'jobs.json');
    const raw = fs.readFileSync(file, 'utf-8');
    const all = JSON.parse(raw) as any[];

    const { searchParams } = new URL(req.url);
    const q = (searchParams.get('q') || '').toLowerCase();
    const mode = searchParams.get('mode');
    const seniority = searchParams.get('seniority');

    let data = all;
    if (mode && mode !== 'all') data = data.filter(j => j.work_mode === mode);
    if (seniority) data = data.filter(j => j.seniority === seniority);
    if (q) {
      data = data.filter(j =>
        [j.title, j.company, j.location, (j.keywords||[]).join(' '), j.description||'']
          .join(' ').toLowerCase().includes(q)
      );
    }
    return NextResponse.json({ jobs: data });
  } catch (e:any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
