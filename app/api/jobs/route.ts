import { NextResponse } from "next/server";
import jobs from "@/data/jobs.json";

export const dynamic = "force-dynamic"; // MVP: geen cache
export const runtime = "nodejs";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type"); // Remote | Hybrid | On-site

  let out = Array.isArray(jobs) ? [...(jobs as any[])] : [];
  if (type && ["Remote", "Hybrid", "On-site"].includes(type)) {
    out = out.filter(j => j.type === type);
  }

  out.sort((a: any, b: any) =>
    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return NextResponse.json(out, { headers: { "cache-control": "no-store" } });
}
