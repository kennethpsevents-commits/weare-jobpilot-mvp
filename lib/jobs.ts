export type Job = {
  id: string;
  title: string;
  company: string;
  location?: string;
  remote?: boolean;
  applyUrl: string;
  createdAt: string;
};

export function sanitizeJob(x: any) {
  const need = ["title","company","applyUrl"];
  for (const k of need) {
    if (!x?.[k]) {
      return { ok: false as const, error: `Missing field: ${k}` };
    }
  }

  const job: Job = {
    id: x.id || (globalThis.crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2)),
    title: String(x.title),
    company: String(x.company),
    location: x.location ? String(x.location) : undefined,
    remote: Boolean(x.remote),
    applyUrl: String(x.applyUrl),
    createdAt: x.createdAt || new Date().toISOString()
  };

  return { ok: true as const, job };
}
