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
  const body = await req.json().catch(() => ({} as any));
  if (!body?.title || !body?.company || !body?.applyUrl) {
    return NextResponse.json(
      { message: "title, company en applyUrl verplicht" },
      { status: 400 }
    );
  }
  const job: Job = {
    id: crypto.randomUUID(),
    title: String(body.title),
    company: String(body.company),
    location: body.location ? String(body.location) : undefined,
    remote: Boolean(body.remote),
    applyUrl: String(body.applyUrl),
    createdAt: new Date().toISOString()
  };
  return NextResponse.json({ message: "created", job }, { status: 201 });
}
