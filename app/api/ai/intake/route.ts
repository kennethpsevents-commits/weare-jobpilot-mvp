import nl from "@/data/jobs.nl.json";
import en from "@/data/jobs.en.json";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const body = await request.json().catch(()=>null) as any;
  const role = (body?.role || "").toLowerCase();
  const skills = String(body?.skills || "").toLowerCase();
  const location = String(body?.location || "").toLowerCase();

  const pool = [...nl, ...en];
  const scored = pool.map(j => {
    let score = 0;
    const hay = `${j.title} ${j.company} ${j.branch} ${j.location} ${j.tags?.join(" ") || ""}`.toLowerCase();
    if (role && hay.includes(role)) score += 3;
    if (skills) {
      for (const s of skills.split(",").map((x:string)=>x.trim()).filter(Boolean)) {
        if (hay.includes(s)) score += 1;
      }
    }
    if (location && hay.includes(location)) score += 1;
    return { j, score };
  }).sort((a,b)=>b.score - a.score);

  const top = scored.slice(0,3).map(x => x.j);
  return Response.json({ suggestions: top });
}
