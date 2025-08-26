import { NextResponse } from "next/server";
import { Job, sanitizeJob } from "@/lib/jobs";

let JOBS: Job[] = [];

export async function GET() {
  return NextResponse.json(JOBS);
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const res = sanitizeJob(data);
    if (!res.ok) {
      return NextResponse.json({ message: res.error }, { status: 400 });
    }
    JOBS.unshift(res.job);
    return NextResponse.json(res.job, { status: 201 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Server error" },
      { status: 500 }
    );
  }
}

