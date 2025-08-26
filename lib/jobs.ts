export type Job = {
  id: string;
  title: string;
  company: string;
  location?: string;
  remote?: boolean;
  applyUrl: string;
  createdAt?: string;
};

export function normalizeJob(input: any): Job {
  return {
    id: input?.id ?? (globalThis.crypto?.randomUUID?.() ?? String(Date.now())),
    title: String(input?.title ?? ""),
    company: String(input?.company ?? ""),
    location: input?.location ?? undefined,
    remote: Boolean(input?.remote ?? false),
    applyUrl: String(input?.applyUrl ?? ""),
    createdAt: input?.createdAt ?? new Date().toISOString(),
  };
}
