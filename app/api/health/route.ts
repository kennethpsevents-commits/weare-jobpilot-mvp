import { NextResponse } from "next/server";
import jobs from "@/data/jobs.json";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const revalidate = 0;

export async function GET(req: Request) {
  const host = new URL(req.url).host;
  return NextResponse.json(
    {
      ok: true,
      host,
      env: process.env.VERCEL_ENV ?? null,
      commit: process.env.VERCEL_GIT_COMMIT_SHA?.slice(0,7) ?? null,
      jobsCount: Array.isArray(jobs) ? jobs.length : 0,
      baseUrlSet: Boolean(process.env.NEXT_PUBLIC_BASE_URL),
      time: new Date().toISOString()
    },
    { status: 200, headers: { "cache-control": "no-store" } }
  );
}
