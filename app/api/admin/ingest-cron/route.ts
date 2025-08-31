// app/api/admin/ingest-cron/route.ts
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  // Call the POST /api/admin/ingest with defaults (server-internal call)
  const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL ?? ''}/api/admin/ingest`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ sources: ['greenhouse','lever'], boards: ['stripe','datadog'] }),
  });

  const data = await res.json().catch(() => ({}));
  return NextResponse.json({ ok: true, cron: 'ran', res: data });
}
