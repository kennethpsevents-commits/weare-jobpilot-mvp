// app/api/jobs/route.ts
import { NextResponse } from "next/server";
import { listGreenhouseMapped } from "@/lib/greenhouse";

export async function GET() {
  try {
    const stripeJobs = await listGreenhouseMapped("stripe");
    const jobs = stripeJobs.sort((a, b) => a.title.localeCompare(b.title)); // baseline sort
    return NextResponse.json(
      { jobs },
      { status: 200, headers: { "Cache-Control": "s-maxage=300, stale-while-revalidate=60" } }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Unknown error" }, { status: 500 });
  }
}
