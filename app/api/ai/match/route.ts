// app/api/ai/match/route.ts
import { NextResponse } from "next/server";
import jobs from "@/data/jobs.json";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  const { target, skills = "", location = "", seniority = "" } = await req.json().catch(() => ({}));
  const terms = [target, skills, location, seniority]
    .join(" ").toLowerCase().split(/[,\s]+/).filter(Boolean);

  const scored = (jobs as any[]).map(j => {
    const hay = `${j.title} ${j.company} ${j.location} ${j.description}`.toLowerCase();
    const score = terms.reduce((acc, t) => acc + (hay.includes(t) ? 1 : 0), 0);
    return { job: j, score };
  }).sort((a, b) => b.score - a.score);

  return NextResponse.json(scored.slice(0, 3).map(s => s.job), { headers: { "cache-control": "no-store" } });
}
