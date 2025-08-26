import { Job } from "@/lib/db/types";

export async function crawlGreenhouse(boardToken: string): Promise<Job[]> {
  const url = `https://boards-api.greenhouse.io/v1/boards/${boardToken}/jobs`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Greenhouse fetch failed: ${res.status}`);
  const data = await res.json();

  const jobs: Job[] = (data?.jobs ?? []).map((j: any) => ({
    extId: String(j.id),
    source: "greenhouse",
    title: j.title,
    company: boardToken,
    location: j.location?.name ?? null,
    remote: (j.location?.name ?? "").toLowerCase().includes("remote"),
    applyUrl: j.absolute_url,
    description: j.content ?? null,
    createdAt: j.updated_at ?? null,
  }));

  // naar onze DB pushen
  await fetch("/api/jobs/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ jobs }),
  });

  return jobs;
}
