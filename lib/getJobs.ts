import type { Job } from "@/lib/types";
import boards from "@/data/greenhouse.json" assert { type: "json" };

function siteOrigin() {
  const env =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "");
  return env || "http://localhost:3000";
}

export async function fetchJobsFromAllBoards(): Promise<Job[]> {
  const origin = siteOrigin();
  const urls = (boards as Array<{ board: string; name: string }>).map(
    (b) => `${origin}/api/import/greenhouse/${encodeURIComponent(b.board)}`
  );

  const resps = await Promise.allSettled(
    urls.map((u) => fetch(u, { cache: "no-store" }))
  );

  const jsons = await Promise.all(
    resps.map(async (r) => {
      if (r.status !== "fulfilled") return [];
      if (!r.value.ok) return [];
      try {
        const j = await r.value.json();
        return Array.isArray(j) ? j : [];
      } catch {
        return [];
      }
    })
  );

  const flat = jsons.flat() as Job[];
  const byId = new Map<string, Job>();
  for (const job of flat) {
    const id = job.id ?? `${job.company}-${job.title}-${job.applyUrl}`;
    byId.set(id, { ...job });
  }
  return Array.from(byId.values());
}
