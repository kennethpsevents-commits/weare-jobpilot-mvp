// lib/greenhouse.ts
// Doel: Greenhouse-board inladen, normaliseren en naar onze centrale API posten.
// Belangrijk: we posten NIET meer naar /api/jobs/save maar naar /api/jobs (één job per POST).

import { sanitizeJob, type Job } from "@/lib/jobs";

// Minimale shape van het Greenhouse boards API antwoord
// Voorbeeld endpoint: https://boards-api.greenhouse.io/v1/boards/<board>/jobs?content=true
type GHJob = {
  id: number;
  title?: string;
  absolute_url?: string;
  location?: { name?: string };
  updated_at?: string;
  content?: string; // HTML
};

type GHResponse = {
  jobs?: GHJob[];
};

/**
 * Haal jobs op van een Greenhouse board.
 * @param board bv. "stripe", "opensea", etc.
 * @param limit maximaal aantal items dat we meenemen
 */
export async function fetchGreenhouseJobs(board: string, limit = 50): Promise<GHJob[]> {
  const url = `https://boards-api.greenhouse.io/v1/boards/${encodeURIComponent(board)}/jobs?content=true`;
  const r = await fetch(url, { cache: "no-store" });
  if (!r.ok) throw new Error(`greenhouse fetch failed (${r.status})`);
  const data: GHResponse = await r.json();
  const items = Array.isArray(data?.jobs) ? data.jobs! : [];
  return items.slice(0, limit);
}

/**
 * Map een GHJob naar onze interne Job-shape (partial) en sanitize.
 */
function mapAndSanitize(gh: GHJob): Job | null {
  const mapped = {
    title: gh.title ?? "Unknown",
    company: "Greenhouse", // echte bedrijfsnaam zit niet in elke job; desnoods overschrijven upstream
    location: gh.location?.name ?? undefined,
    remote: (gh.location?.name || "").toLowerCase().includes("remote"),
    applyUrl: gh.absolute_url ?? "#",
    description: gh.content, // mag HTML bevatten; frontend kan strippen
    createdAt: gh.updated_at ?? new Date().toISOString(),
  };
  const res = sanitizeJob(mapped);
  return res.ok ? res.job : null;
}

/**
 * Importeer een Greenhouse board en POST elke gevalideerde job naar /api/jobs.
 * @param board bv. "stripe"
 * @param basePath optioneel; laat leeg om relatief naar dezelfde host te posten
 */
export async function importGreenhouseBoard(
  board: string,
  basePath = ""
): Promise<{ ok: true; source: "greenhouse"; board: string; imported: number }> {
  const ghJobs = await fetchGreenhouseJobs(board);
  let imported = 0;
  for (const gh of ghJobs) {
    const job = mapAndSanitize(gh);
    if (!job) continue;

    // Eén job per POST naar onze centrale route
    await fetch(`${basePath}/api/jobs`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(job),
    }).catch(() => {});
    imported++;
  }
  return { ok: true, source: "greenhouse", board, imported };
}

/**
 * Convenience: alleen normaliseren en teruggeven (zonder POST).
 */
export async function listGreenhouseMapped(board: string, limit = 50): Promise<Job[]> {
  const gh = await fetchGreenhouseJobs(board, limit);
  const out: Job[] = [];
  for (const item of gh) {
    const j = mapAndSanitize(item);
    if (j) out.push(j);
  }
  return out;
}
