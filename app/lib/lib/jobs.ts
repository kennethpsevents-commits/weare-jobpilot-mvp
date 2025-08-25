export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  remote: boolean;
  url: string;
  createdAt: string; // ISO
  source: string;    // 'greenhouse:<slug>'
};

export function normalizeGreenhouseJob(j: any, companySlug: string): Job {
  const loc = j.location?.name ?? "";
  const remote = /remote|anywhere|hybrid/i.test(loc);
  return {
    id: `gh_${companySlug}_${j.id}`,
    title: j.title ?? "Untitled",
    company: j?.departments?.[0]?.name || j?.offices?.[0]?.name || companySlug,
    location: loc,
    remote,
    url: j.absolute_url ?? `https://boards.greenhouse.io/${companySlug}/jobs/${j.id}`,
    createdAt: j.updated_at ?? j.created_at ?? new Date().toISOString(),
    source: `greenhouse:${companySlug}`,
  };
}

export function filterJobs(
  jobs: Job[],
  q?: string,
  type?: "remote" | "hybrid" | "onsite",
  locationQ?: string
) {
  let out = [...jobs];
  if (q && q.trim()) {
    const s = q.toLowerCase();
    out = out.filter(j =>
      (j.title + " " + j.company).toLowerCase().includes(s)
    );
  }
  if (locationQ && locationQ.trim()) {
    const s = locationQ.toLowerCase();
    out = out.filter(j => (j.location || "").toLowerCase().includes(s));
  }
  if (type === "remote") out = out.filter(j => j.remote);
  if (type === "onsite") out = out.filter(j => !j.remote);
  if (type === "hybrid") out = out.filter(j => j.remote);

  return out.sort(
    (a, b) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
