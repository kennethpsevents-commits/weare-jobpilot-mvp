import { NextResponse } from "next/server";
import { Job } from "@/lib/jobs";
import companies from "@/data/lever.json";

export const revalidate = 300;

function normalizeLeverJob(j:any, slug:string): Job {
  const loc = j.categories?.location ?? "";
  const remote = /remote|anywhere|hybrid/i.test(loc);
  return {
    id: `lv_${slug}_${j.id}`,
    title: j.text || "Untitled",
    company: slug,
    location: loc,
    remote,
    url: j.hostedUrl,
    createdAt: j.createdAt || new Date().toISOString(),
    source: `lever:${slug}`,
  };
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit") ?? "50");
  try {
    const slugs: string[] = (companies as any).companies ?? [];
    const all: Job[] = [];

    await Promise.all(
      slugs.map(async (slug) => {
        const url = `https://api.lever.co/v0/postings/${slug}?mode=json`;
        const res = await fetch(url, { next: { revalidate: 300 } });
        if (!res.ok) return;
        const data = await res.json();
        const items = (data ?? []).map((j:any) => normalizeLeverJob(j, slug));
        all.push(...items);
      })
    );

    all.sort((a,b)=>new Date(b.createdAt).getTime()-new Date(a.createdAt).getTime());
    return NextResponse.json(all.slice(0, limit));
  } catch (e:any) {
    return NextResponse.json({ error:"lever_failed", message:e.message }, { status:500 });
  }
}
