// app/api/admin/stats/route.ts
import { NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebaseAdmin';

export const dynamic = 'force-dynamic';

export async function GET() {
  const snap = await adminDb.collection('jobs').count().get();
  return NextResponse.json({ jobs: snap.data().count ?? 0 });
}
