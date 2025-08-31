// app/api/admin/status/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    ok: true,
    time: new Date().toISOString(),
    services: ['api', 'connectors', 'ai'],
  });
}
