import type { Job } from "./types";

type Cache = {
  jobs: Job[];
  lastIngest?: string;
};

const g = globalThis as any;
if (!g.__JOBPILOT_CACHE__) {
  g.__JOBPILOT_CACHE__ = { jobs: [] } as Cache;
}
export const cache: Cache = g.__JOBPILOT_CACHE__;

export function setJobs(jobs: Job[]) {
  cache.jobs = jobs;
  cache.lastIngest = new Date().toISOString();
}
export function getJobs(): Job[] {
  return cache.jobs || [];
}
