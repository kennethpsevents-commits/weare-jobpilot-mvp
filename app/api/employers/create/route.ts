import { NextResponse } from "next/server";
import { type Job, sanitizeJob } from "@/lib/jobs";

export async function GET() {
  const demo: Job[] = [
    {
      id: "demo-1",
      title: "Frontend Developer",
      company: "WeAre JobPilot",
      location: "Remote",
      remote: true,
      applyUrl: "https://wearejobpilot.com/apply",
      createdAt: new Date().toISOString()
    }
  ];
  return NextResponse.json(demo);
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const parsed = sanitizeJob(body);
  if (!parsed.ok) {
    return NextResponse.json({ message: parsed.error }, { status: 400 });
  }
  return NextResponse.json({ message: "created", job: parsed.job }, { status: 201 });
}
