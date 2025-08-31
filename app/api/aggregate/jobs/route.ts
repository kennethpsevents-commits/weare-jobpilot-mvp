// app/api/aggregate/jobs/route.ts
import { NextResponse } from 'next/server';
import { getGreenhouse, getLever, getAshby, getWorkable, getTeamtailor } from '@/lib/connectors';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const source = (searchParams.get('source') ?? 'greenhouse,lever').split(',').map(s => s.trim());
  const board = searchParams.get('board') ?? 'stripe';

  const tasks: Promise<any[]>[] = [];
  if (source.includes('greenhouse')) tasks.push(getGreenhouse(board));
  if (source.includes('lever')) tasks.push(getLever(board));
  if (source.includes('ashby')) tasks.push(getAshby(board));
  if (source.includes('workable')) tasks.push(getWorkable(board));
  if (source.includes('teamtailor')) tasks.push(getTeamtailor(board));

  const results = (await Promise.all(tasks)).flat();
  return NextResponse.json({ count: results.length, board, source, jobs: results });
}
