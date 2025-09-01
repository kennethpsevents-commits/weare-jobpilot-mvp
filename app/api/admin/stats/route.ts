// app/api/admin/stats/route.ts
import { NextResponse } from 'next/server';
import { getAdmin } from '@/lib/firebaseAdmin';

export const runtime = 'nodejs';

export async function GET() {
  const admin = await getAdmin();
  const ts = new Date().toISOString();

  // Example Firestore read (safe on Node.js runtime)
  const db = admin.firestore();
  const count = (await db.collection('counters').doc('stats').get()).exists ? 1 : 0;

  return NextResponse.json({ ok: true, ts, count });
}
