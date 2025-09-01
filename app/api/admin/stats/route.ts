// app/api/admin/stats/route.ts
import { NextResponse } from 'next/server';

export const runtime = 'nodejs'; // forceer Node runtime

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: 'admin-stats-stub',
    ts: new Date().toISOString(),
    note: 'firebase-admin disabled to unblock builds.',
  });
}
