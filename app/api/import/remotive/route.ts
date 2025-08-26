import { NextResponse } from "next/server";
import { sanitizeJob } from "@/lib/jobs";

type RemotiveItem = {
  title?: string;
  company_name?: string;
  candidate_required_location?: string;
  url?: string;
};

export async function GET() {
  try {
    const r = await fetch("https://remotive.com/api/remote-jobs?limit=20", { cache: "no-store" });
    if (!r.ok) return NextResponse.json({ error: "remotive fetch failed" }, { status: 502 });
    const data = await r.json();
    const items: RemotiveItem[] = Array.isArray(data?.jobs) ? data.jobs : [];

    let imported = 0;
    for (const item of items) {
      const mapped = {
        title: item.title ?? "Unknown",
        company: item.company_name ?? "Unknown",
        location: item.candidate_required_location ?? "Remote",
        remote: true,
        applyUrl: item.url ?? "#",
      };
      const res = sanitizeJob(mapped);
      if (!res.ok) continue;

      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/jobs`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(res.job),
      }).catch(() => {});
      imported++;
    }

    return NextResponse.json({ ok: true, source: "remotive", imported });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "import error" }, { status: 500 });
  }
}
