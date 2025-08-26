// lib/jobs.ts
export type Job = {
  id: string;
  title: string;
  company: string;
  location?: string;
  remote: boolean;
  applyUrl: string;
  description?: string;
  createdAt: string; // ISO
};

// Eenvoudige in-memory store (verdwijnt bij redeploy). Later: DB.
const _jobs: Job[] = [];

// Klein hulpfunctietje om payload veilig te maken
export function sanitizeJob(input: Partial<Job>): { ok: true; job: Job } | { ok: false; error: string } {
  const title = (input.title ?? "").toString().trim();
  const company = (input.company ?? "").toString().trim();
  const applyUrl = (input.applyUrl ?? "").toString().trim();
  if (!title || !company || !applyUrl) return { ok: false, error: "missing fields" };

  const job: Job = {
    id: input.id ?? `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title,
    company,
    location: input.location?.toString().trim() || undefined,
    remote: Boolean(input.remote),
    applyUrl,
    description: input.description?.toString(),
    createdAt: input.createdAt ?? new Date().toISOString(),
  };
  return { ok: true, job };
}

export function listJobs(): Job[] {
  // nieuw→oud
  return _jobs.slice().sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1));
}

export function addJob(j: Job) {
  // de-dupe op applyUrl + title + company
  const exists = _jobs.find(
    x => x.applyUrl === j.applyUrl && x.title === j.title && x.company === j.company
  );
  if (!exists) _jobs.push(j);
}
