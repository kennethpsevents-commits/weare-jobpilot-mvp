export type Job = {
  id: string;
  title: string;
  company: string;
  location?: string;
  remote?: boolean;
  applyUrl: string;
  createdAt: string;
};

export function sanitizeJob(data: any):
  { ok: true; job: Job } | { ok: false; error: string } {
  for (const k of ["title", "company", "applyUrl"]) {
    if (!data?.[k]) return { ok: false, error: `Missing field: ${k}` };
  }
  const job: Job = {
    id: data.id || crypto.randomUUID(),
    title: String(data.title),
    company: String(data.company),
    location: data.location ? String(data.location) : undefined,
    remote: Boolean(data.remote),
    applyUrl: String(data.applyUrl),
    createdAt: data.createdAt || new Date().toISOString()
  };
  return { ok: true, job };
}
