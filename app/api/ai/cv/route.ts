// app/api/ai/cv/route.ts
import { NextResponse } from 'next/server';
import { pipeline } from '@xenova/transformers';

export async function POST(req: Request) {
  const { cvText, jobDesc } = await req.json();
  const classifier = await pipeline('zero-shot-classification');
  const result = await classifier(cvText, [jobDesc]);
  return NextResponse.json({ result });
}
