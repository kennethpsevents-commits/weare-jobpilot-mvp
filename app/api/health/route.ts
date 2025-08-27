import { NextResponse } from "next/server";
import jobs from "@/data/jobs.json";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
export const revalidate = 0;

export async function GET() {
  return NextResponse.json(
    {
      ok: true,
      service: "weare-jobpilot-mvp",
      jobsCount: Array.isArray(jobs) ? jobs.length : 0,
      baseUrlSet: Boolean(process.env.NEXT_PUBLIC_BASE_URL),
      time: new Date().toISOString(),
    },
    { status: 200, headers: { "cache-control": "no-store" } }
  );
}
