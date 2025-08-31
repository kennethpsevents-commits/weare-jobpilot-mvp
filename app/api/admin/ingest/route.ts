// app/api/admin/ingest/route.ts
import { NextResponse } from 'next/server';
import { getGreenhouse, getLever } from '@/lib/connectors';

export const dynamic = 'force-dynamic';

// MVP: haalt jobs op en retourneert ze (later: persist via Prisma)
export async function POST(request: Request) {
  const { sources = ['greenhouse','lever'], boards = ['stripe'] } = await request.json().catch(() => ({}));

  const tasks: Promise<any[]>[] = [];
  for (const b of boards) {
    if (sources.includes('greenhouse')) tasks.push(getGreenhouse(b));
    if (sources.includes('lever')) tasks.push(getLever(b));
  }

  const jobs = (await Promise.all(tasks)).flat();
  // TODO(v1.1): upsert naar DB
  return NextResponse.json({ ok: true, ingested: jobs.length, jobs });
}
