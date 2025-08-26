// app/api/jobs/route.ts
import { NextResponse } from "next/server";
import { addJob, listJobs, sanitizeJob } from "@/lib/jobs";

// Optioneel: draai op Node runtime (niet verplicht, wel veilig voor fetch limieten)
export const runtime = "nodejs";

export async function GET() {
  return NextResponse.json(listJobs(), { status: 200 });
}

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const res = sanitizeJob(payload);
    if (!res.ok) return NextResponse.json({ error: res.error }, { status: 400 });
    addJob(res.job);
    return NextResponse.json({ ok: true, job: res.job }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "bad request" }, { status: 400 });
  }
}
