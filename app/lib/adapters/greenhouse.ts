
import { monstreFetch } from "../fetcher";

export async function fetchGreenhouse(company: string) {
  const url = `https://boards-api.greenhouse.io/v1/boards/${company}/jobs`;
  const res = await monstreFetch(url);
  if (!res.ok) return [];
  const json = await res.json();
  return (json.jobs || []).map((j: any) => ({
    source: "greenhouse",
    source_id: String(j.id),
    company,
    title: j.title,
    url: j.absolute_url,
    location: j.location?.name || null,
    country: null,
    remote: /remote/i.test(j.location?.name || ""),
    posted_at: j.updated_at ? new Date(j.updated_at).toISOString() : null,
    description: null,
    tags: []
  }));
}
