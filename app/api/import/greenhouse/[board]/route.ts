import { NextResponse } from "next/server";

// Standalone route: geen afhankelijkheid van "@/lib/greenhouse".
type GHJob = {
  id: number;
  title: string;
  absolute_url: string;
  location?: { name?: string };
  updated_at?: string;
};

type JPJob = {
  id: string;
  title: string;
  company: string;
  location?: string;
  remote: boolean;
  applyUrl: string;
  createdAt: string;
};

async function fetchBoardJobs(board: string): Promise<GHJob[]> {
  const url = `https://boards-api.greenhouse.io/v1/boards/${encodeURIComponent(board)}/jobs`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`Greenhouse fetch failed: ${res.status}`);
  const json = await res.json();
  return Array.isArray(json?.jobs) ? (json.jobs as GHJob[]) : [];
}

function mapJobs(board: string, jobs: GHJob[]): JPJob[] {
  return jobs.map((j) => ({
    id: String(j.id),
    title: j.title ?? "Untitled",
    company: board,
    location: j.location?.name ?? undefined,
    remote: (j.location?.name ?? "").toLowerCase().includes("remote"),
    applyUrl: j.absolute_url,
    createdAt: j.updated_at ?? new Date().toISOString()
  }));
}

export const revalidate = 0;

export async function GET(_req: Request, ctx: { params: { board: string } }) {
  try {
    const board = ctx?.params?.board;
    if (!board) return NextResponse.json({ error: "Missing board" }, { status: 400 });
    const gh = await fetchBoardJobs(board);
    const data = mapJobs(board, gh);
    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Unknown error" }, { status: 500 });
  }
}
