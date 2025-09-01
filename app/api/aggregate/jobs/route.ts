import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("https://your-crawler-service-url.com/jobs");
    const jobs = await res.json();
    return NextResponse.json({ jobs });
  } catch (e) {
    return NextResponse.json({ jobs: [], error: "Crawler API not reachable" });
  }
}
