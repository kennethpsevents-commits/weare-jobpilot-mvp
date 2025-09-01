// lib/greenhouse.ts
export type JobItem = {
  id: number;
  title: string;
  location: string;
  url: string;
  updated_at?: string;
};

export async function listGreenhouseMapped(board: string): Promise<JobItem[]> {
  const res = await fetch(
    `https://boards-api.greenhouse.io/v1/boards/${board}/jobs`,
    { next: { revalidate: 300 } }
  );
  if (!res.ok) throw new Error(`Greenhouse fetch failed: ${res.status} ${res.statusText}`);
  const data = await res.json();
  const jobs = Array.isArray(data.jobs) ? data.jobs : [];
  return jobs.map((job: any) => ({
    id: job.id,
    title: job.title,
    location: job.location?.name ?? "Unknown",
    url: job.absolute_url,
    updated_at: job.updated_at,
  }));
}
