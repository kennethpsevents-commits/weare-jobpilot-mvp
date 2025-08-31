// app/api/admin/ingest/route.ts
import { NextResponse } from 'next/server';
import { getGreenhouse, getLever } from '@/lib/connectors';
import { adminDb } from '@/lib/firebaseAdmin';

type Body = {
  sources?: ('greenhouse' | 'lever')[];
  boards?: string[];
};

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const { sources = ['greenhouse', 'lever'], boards = ['stripe'] } as Body =
    await req.json().catch(() => ({}));

  const tasks: Promise<any[]>[] = [];
  for (const b of boards) {
    if (sources.includes('greenhouse')) tasks.push(getGreenhouse(b));
    if (sources.includes('lever')) tasks.push(getLever(b));
  }

  const jobs = (await Promise.all(tasks)).flat();

  // persist (upsert) in Firestore
  const batch = adminDb.batch();
  const col = adminDb.collection('jobs');

  for (const j of jobs) {
    const ref = col.doc(j.id);
    batch.set(ref, j, { merge: true });
  }
  await batch.commit();

  return NextResponse.json({ ok: true, ingested: jobs.length });
}
