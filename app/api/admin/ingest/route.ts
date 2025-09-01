import { NextResponse } from "next/server";
import { listGreenhouseMapped } from "../../../../lib/connectors";
import { setJobs } from "../../../../lib/store";
import type { IngestResult } from "../../../../lib/types";

// Start klein; later voeg je meer toe (bijv. "openai","airbnb","notion","datadog")
const DEFAULT_BOARDS = ["stripe"];

async function ingest(boards: string[]): Promise<IngestResult> {
  const jobs = await listGreenhouseMapped(boards);
  setJobs(jobs);
  return { count: jobs.length, boards };
}

export async function GET() {
  const res = await ingest(DEFAULT_BOARDS);
  return NextResponse.json(res);
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { boards?: string[] };
  const boards = Array.isArray(body.boards) && body.boards.length > 0 ? body.boards : DEFAULT_BOARDS;
  const res = await ingest(boards);
  return NextResponse.json(res);
}
