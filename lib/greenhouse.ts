export type GhJob = {
  id: number;
  title: string;
  location?: { name?: string };
  absolute_url?: string;
  updated_at?: string;
};

export async function fetchGreenhouseBoard(board: string) {
  const url = `https://boards-api.greenhouse.io/v1/boards/${encodeURIComponent(board)}/jobs`;
  const r = await fetch(url, { cache: "no-store" });
  if (!r.ok) return [];
  const data = (await r.json()) as { jobs?: GhJob[] };
  return Array.isArray(data.jobs) ? data.jobs : [];
}

export function mapToCommonJobs(board: string, jobs: GhJob[]) {
  return jobs.map((j) => ({
    id: `gh-${board}-${j.id}`,
    title: j.title ?? "Untitled",
    company: board,
    location: j.location?.name,
    remote: (j.location?.name || "").toLowerCase().includes("remote"),
    applyUrl: j.absolute_url ?? "#",
    description: undefined as string | undefined,
    createdAt: j.updated_at ?? new Date().toISOString(),
  }));
}
