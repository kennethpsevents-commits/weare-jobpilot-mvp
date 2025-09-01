import type { Job } from "../types";

type GHJob = {
  id: number;
  title: string;
  absolute_url: string;
  updated_at?: string;
  offices?: { name?: string }[];
  location?: { name?: string };
};

export async function fetchGreenhouseBoard(boardToken: string): Promise<Job[]> {
  const url = `https://boards-api.greenhouse.io/v1/boards/${boardToken}/jobs`;
  const res = await fetch(url, { next: { revalidate: 3600 } });
  if (!res.ok) {
    console.error(`Greenhouse ${boardToken} -> HTTP ${res.status}`);
    return [];
  }
  const data = (await res.json()) as { jobs: GHJob[] };
  return (data.jobs || []).map((j) => ({
    id: `gh_${boardToken}_${j.id}`,
    title: j.title ?? "Untitled",
    company: boardToken,
    location:
      j.location?.name ||
      j.offices?.[0]?.name ||
      "Remote / Unspecified",
    url: j.absolute_url,
    source: "greenhouse" as const,
    updatedAt: j.updated_at,
  }));
}

export async function fetchGreenhouseBoards(tokens: string[]): Promise<Job[]> {
  const lists = await Promise.all(tokens.map((t) => fetchGreenhouseBoard(t)));
  return lists.flat();
}
