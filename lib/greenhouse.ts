// lib/greenhouse.ts
// Minimale, werkende helpers voor Greenhouse boards.

export type GHJob = {
  id: number;
  title: string;
  absolute_url: string;
  location?: { name?: string };
  updated_at?: string;
};

export type JPJob = {
  id: string;
  title: string;
  company: string;
  location?: string;
  remote: boolean;
  applyUrl: string;
  createdAt: string;
};

async function fetchBoardJobs(board: string): Promise<GHJob[]> {
  const url = `https://boards-api.greenhouse.io/v1/boards/${encodeURIComponent(
    board
  )}/jobs`;
  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`Greenhouse fetch failed: ${res.status}`);
  const json = await res.json();
  // Greenhouse shape: { jobs: [...] }
  return Array.isArray(json?.jobs) ? (json.jobs as GHJob[]) : [];
}

export async function crawlGreenhouse(board: string): Promise<GHJob[]> {
  return fetchBoardJobs(board);
}

export async function listGreenhouseMapped(board: string): Promise<JPJob[]> {
  const jobs = await fetchBoardJobs(board);
  return jobs.map((j) => ({
    id: String(j.id),
    title: j.title ?? "Untitled",
    company: board,
    location: j.location?.name ?? undefined,
    remote: (j.location?.name ?? "").toLowerCase().includes("remote"),
    applyUrl: j.absolute_url,
    createdAt: j.updated_at ?? new Date().toISOString(),
  }));
}

/**
 * “Import” betekent hier: haal op en geef gemapt terug.
 * Als je wilt, kun je hier ook naar /data/greenhouse.json schrijven (server-side).
 */
export async function importGreenhouseBoard(board: string): Promise<JPJob[]> {
  return listGreenhouseMapped(board);
}
