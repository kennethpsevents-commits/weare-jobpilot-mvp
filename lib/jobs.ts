export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  remote: boolean;
  url: string;
  createdAt: string;
  source: string;
};

export function normalizeGreenhouseJob(j: any, companySlug: string): Job {
  const loc = j?.location?.name ?? "";
  const remote = /remote|anywhere|hybrid/i.test(loc);
  return {
    id: `gh_${companySlug}_${j.id}`,
    title: j?.title ?? "Untitled",
    company: j?.departments?.[0]?.name || j?.offices?.[0]?.name || companySlug,
    location: loc,
    remote,
    url: j?.absolute_url ?? `https://boards.greenhouse.io/${companySlug}/jobs/${j.id}`,
    createdAt: j?.updated_at ?? j?.created_at ?? new Date().toISOString(),
    source: `greenhouse:${companySlug}`,
  };
}
