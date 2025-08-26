export type Job = {
  id: string;
  title: string;
  company: string;
  location?: string;
  remote?: boolean;
  applyUrl: string;
  createdAt: string;
};

export function sanitizeJob(
  input: any
): { ok: false; error: string } | { ok: true; job: Job } {
  const required = ["title", "company", "applyUrl"];
  for (const field of required) {
    if (!input?.[field]) return { ok: false, error: `Missing ${field}` };
  }
  const job: Job = {
    id: input.id ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title: String(input.title),
    company: String(input.company),
    location: input.location ? String(input.location) : undefined,
    remote: Boolean(input.remote),
    applyUrl: String(input.applyUrl),
    createdAt: new Date().toISOString()
  };
  return { ok: true, job };
}
