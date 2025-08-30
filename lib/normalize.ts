import type { Job } from "@/lib/types";

export function normId(s: string) {
  return s.replace(/\s+/g, "-").toLowerCase().slice(0, 200);
}

export function mkJob(p: Partial<Job> & Pick<Job, "title" | "company" | "applyUrl">): Job {
  const now = new Date().toISOString();
  const id = p.id ?? normId(`${p.company}-${p.title}-${p.applyUrl}`);
  return {
    id,
    title: p.title,
    company: p.company,
    location: p.location,
    remote: !!p.remote,
    applyUrl: p.applyUrl,
    createdAt: p.createdAt ?? now,
    board: p.board
  };
}

export function dedupe(jobs: Job[]): Job[] {
  const seen = new Map<string, Job>();
  for (const j of jobs) seen.set(j.id, j);
  return Array.from(seen.values());
}
