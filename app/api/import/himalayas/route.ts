import { NextResponse } from "next/server";
import { sanitizeJob } from "@/lib/jobs";

type HimaItem = {
  title?: string;
  companyName?: string;
  applicationLink?: string;
  locationRestrictions?: string[];
};

export async function GET() {
  try {
    const r = await fetch("https://himalayas.app/jobs/api?limit=20", { cache: "no-store" });
    if (!r.ok) return NextResponse.json({ error: "himalayas fetch failed" }, { status: 502 });
    const data: HimaItem[] = await r.json();

    let imported = 0;
    for (const item of data) {
      const mapped = {
        title: item.title ?? "Unknown",
        company: item.companyName ?? "Unknown",
        applyUrl: item.applicationLink ?? "#",
        location: item.locationRestrictions?.join(", "),
        remote: true,
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

    return NextResponse.json({ ok: true, source: "himalayas", imported });
  } catch (e: any) {
    return NextResponse.json({ error: e?.message ?? "import error" }, { status: 500 });
  }
}
