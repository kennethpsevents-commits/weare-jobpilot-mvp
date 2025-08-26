import { NextResponse } from "next/server";

type Job = {
  id: string;
  title: string;
  company: string;
  location?: string;
  remote?: boolean;
  applyUrl: string;
  createdAt: string;
};

export async function GET() {
  const demo: Job[] = [{
    id: "demo-1",
    title: "Frontend Developer",
    company: "WeAre JobPilot",
    location: "Remote",
    remote: true,
    applyUrl: "https://wearejobpilot.com/apply",
    createdAt: new Date().toISOString()
  }];
  return NextResponse.json(demo);
}

export async function POST(req: Request) {
  const b = await req.json().catch(() => ({} as any));
  if (!b?.title || !b?.company || !b?.applyUrl) {
    return NextResponse.json(
      { message: "title, company en applyUrl verplicht" },
      { status: 400 }
    );
  }
  const job: Job = {
    id: crypto.randomUUID(),
    title: String(b.title),
    company: String(b.company),
    location: b.location ? String(b.location) : undefined,
    remote: Boolean(b.remote),
    applyUrl: String(b.applyUrl),
    createdAt: new Date().toISOString()
  };
  return NextResponse.json({ message: "created", job }, { status: 201 });
}
