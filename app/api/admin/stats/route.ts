// app/api/admin/stats/route.ts
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

export async function GET() {
  return NextResponse.json({
    ok: true,
    service: 'admin-stats-stub',
    ts: new Date().toISOString(),
    note: 'Firebase-admin disabled to unblock builds.',
  });
}

