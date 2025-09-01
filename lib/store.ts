import type { Job } from "./types";

type Cache = {
  jobs: Job[];
  lastIngest?: string;
};

const globalAny = globalThis as any;
if (!globalAny.__JOBPILOT_CACHE__) {
  globalAny.__JOBPILOT_CACHE__ = { jobs: [] } as Cache;
}
export const cache: Cache = globalAny.__JOBPILOT_CACHE__;

export function setJobs(jobs: Job[]) {
  cache.jobs = jobs;
  cache.lastIngest = new Date().toISOString();
}
export function getJobs(): Job[] {
  return cache.jobs || [];
}
