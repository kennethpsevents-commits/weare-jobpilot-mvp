// lib/adapters/lever.ts
import { fetchWithTimeout } from "../fetcher";

export async function fetchLeverJobs(company: string) {
  const url = `https://api.lever.co/v0/postings/${company}?mode=json`;
  const res = await fetchWithTimeout(url);

  if (!res.ok) {
    throw new Error(`Lever fetch failed: ${res.status}`);
  }

  const jobs = await res.json();

  return jobs.map((job: any) => ({
    slug: job.id,
    title: job.text,
    company,
    location: job.categories?.location || "Unknown",
    work_mode: "onsite", // Lever heeft dit niet expliciet
    seniority: job.categories?.commitment || null,
    keywords: job.categories?.team || null,
    description: job.descriptionPlain || "",
    apply_url: job.hostedUrl,
    posted_at: job.createdAt ? new Date(job.createdAt).toISOString() : null,
  }));
}

