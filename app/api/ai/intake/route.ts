import { NextResponse } from "next/server";
import { headers } from "next/headers";

type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  remote: boolean;
  url: string;
  createdAt: string;
  source: string;
};

type MatchInput = {
  role?: string;
  skills?: string;       // comma/space separated
  location?: string;
  seniority?: string;    // junior/mid/senior/lead (free text ok)
};

function tokenize(s?: string) {
  return (s ?? "")
    .toLowerCase()
    .split(/[,/|\s]+/)
    .map(x => x.trim())
    .filter(Boolean);
}

function scoreJob(job: Job, q: MatchInput) {
  let score = 0;

  const title = job.title?.toLowerCase() ?? "";
  const company = job.company?.toLowerCase() ?? "";
  const loc = (job.location ?? "").toLowerCase();

  const roleTokens = tokenize(q.role);
  const skillTokens = tokenize(q.skills);
  const seniorityTokens = tokenize(q.seniority);

  // role match
  for (const t of roleTokens) if (title.includes(t)) score += 6;

  // skills match
  for (const t of skillTokens) if (title.includes(t)) score += 4;

  // seniority hints (junior/mid/senior/lead/principal)
  for (const t of seniorityTokens) if (title.includes(t)) score += 2;

  // location: exact-ish containment (MVP)
  if (q.location && loc.includes(q.location.toLowerCase())) score += 3;

  // Remote bonus als titel/loc dit suggereert
  if (job.remote && (roleTokens.includes("remote") || skillTokens.includes("remote"))) score += 1;

  // kleine bedrijf‑naam boost
  for (const t of roleTokens) if (company.includes(t)) score += 1;

  // recency bonus
  const ageDays = Math.max(1, (Date.now() - new Date(job.createdAt).getTime()) / 86400000);
  score += Math.max(0, 5 - Math.min(5, Math.round(ageDays / 7))); // tot +5 voor heel nieuw

  return score;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as MatchInput;

    // Base URL afleiden (werkt op Vercel en lokaal)
    const hdrs = headers();
    const host = hdrs.get("host") ?? "localhost:3000";
    const proto = host.includes("localhost") ? "http" : "https";
    const base = `${proto}://${host}`;

    // Haal jobs op via onze bestaande crawler
    const res = await fetch(`${base}/api/crawl/greenhouse?limit=400`, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json({ error: "crawl_failed" }, { status: 502 });
    }
    const jobs = (await res.json()) as Job[];

    // Score + sorteren
    const scored = jobs
      .map(j => ({ job: j, score: scoreJob(j, body) }))
      .sort((a, b) => b.score - a.score);

    // Pak top 3, maar zorg dat ze niet allemaal dezelfde titel zijn
    const unique: Job[] = [];
    const seen = new Set<string>();
    for (const s of scored) {
      const key = (s.job.title + "|" + s.job.company).toLowerCase();
      if (!seen.has(key)) {
        unique.push(s.job);
        seen.add(key);
      }
      if (unique.length >= 3) break;
    }

    return NextResponse.json({
      input: body,
      count: unique.length,
      results: unique
    });
  } catch (e: any) {
    return NextResponse.json({ error: "bad_request", message: e?.message ?? "unknown" }, { status: 400 });
  }
}
