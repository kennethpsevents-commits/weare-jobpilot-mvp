import { NextResponse } from "next/server";
import { Job, normalizeGreenhouseJob } from "@/lib/jobs";
import companies from "@/data/greenhouse.json";

export const revalidate = 300;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit") ?? "50");

  try {
    const slugs: string[] = (companies as any).companies ?? [];
    const all: Job[] = [];

    await Promise.all(
      slugs.map(async (slug) => {
        const url = `https://boards-api.greenhouse.io/v1/boards/${slug}/jobs`;
        const res = await fetch(url, { next: { revalidate: 300 } });
        if (!res.ok) return;
        const data = await res.json();
        const items = (data.jobs ?? []).map((j: any) =>
          normalizeGreenhouseJob(j, slug)
        );
        all.push(...items);
      })
    );

    all.sort((a,b)=>new Date(b.createdAt).getTime()-new Date(a.createdAt).getTime());
    return NextResponse.json(all.slice(0, limit));
  } catch (e:any) {
    return NextResponse.json({ error:"crawl_failed", message:e.message }, { status:500 });
  }
}
