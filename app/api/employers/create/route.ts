import { NextResponse } from "next/server";

type Job = {
  id: string;
  title: string;
  company: string;
  location?: string;
  remote: boolean;
  applyUrl: string;
  description?: string;
  createdAt: string;
};

let jobs: Job[] = [
  {
    id: "emp-001",
    title: "Frontend Developer (Next.js)",
    company: "WeAre JobPilot",
    location: "Remote (EU)",
    remote: true,
    applyUrl: "https://wearejobpilot.com/apply/frontend",
    description: "Bouw mee aan snelle, schone RSC-interfaces.",
    createdAt: new Date().toISOString(),
  },
];

export async function GET() {
  return NextResponse.json(jobs, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const job: Job = {
      id: "emp-" + (jobs.length + 1).toString().padStart(3, "0"),
      ...body,
    };
    jobs.unshift(job);
    return NextResponse.json(job, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }
}
