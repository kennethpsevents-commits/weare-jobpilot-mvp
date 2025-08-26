import { NextResponse } from "next/server";
import { sanitizeJob, Job } from "@/lib/jobs";

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
  try {
    const body = await req.json();
    const result = sanitizeJob(body);
    if (!result.ok) {
      return NextResponse.json({ message: result.error }, { status: 400 });
    }
    const { job } = result;
    // TODO: opslaan in database
    return NextResponse.json({ message: "created", job }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message ?? "Server error" },
      { status: 500 }
    );
  }
}
