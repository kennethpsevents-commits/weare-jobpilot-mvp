import { NextResponse } from "next/server";
import { sanitizeJob, addJob } from "@/lib/jobs";

export const runtime = "nodejs";

// Compat: accepteert { jobs:[...] } OF enkele job OF array van jobs
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const arr =
      Array.isArray(body?.jobs) ? body.jobs :
      Array.isArray(body) ? body :
      [body];

    let imported = 0;
    for (const raw of arr) {
      const res = sanitizeJob(raw);
      if (!res.ok) continue;
      addJob(res.job);
      imported++;
    }
    return NextResponse.json({ ok: true, imported }, { status: 201 });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "bad request" }, { status: 400 });
  }
}
