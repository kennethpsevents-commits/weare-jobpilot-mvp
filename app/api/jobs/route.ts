import nl from "@/data/jobs.nl.json";
import en from "@/data/jobs.en.json";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("query") || "").toLowerCase().trim();
  const type = searchParams.get("type");
  const lang = (searchParams.get("lang") || "nl") as "nl"|"en";

  const items = (lang === "en" ? en : nl).filter(j => {
    const matchesType = !type || type === "all" || j.type === type;
    const matchesQuery = !q || `${j.title} ${j.company} ${j.branch} ${j.location}`.toLowerCase().includes(q);
    return matchesType && matchesQuery;
  }).sort((a,b) => (a.createdAt < b.createdAt ? 1 : -1));

  return Response.json({ items, total: items.length });
}
