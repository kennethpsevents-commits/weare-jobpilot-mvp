import { NextResponse } from "next/server";
import { fetchGreenhouseBoard, mapToCommonJobs } from "@/lib/greenhouse";
import boards from "@/data/greenhouse.json";

export const runtime = "nodejs";

export async function GET() {
  try {
    const list = Array.isArray((boards as any)?.boards) ? (boards as any).boards : [];
    const chunks = await Promise.all(
      list.map(async (b: string) => mapToCommonJobs(b, await fetchGreenhouseBoard(b)))
    );
    const flat = chunks.flat();
    return NextResponse.json(flat, {
      headers: {
        "Cache-Control": "no-store",
        "CDN-Cache-Control": "no-store",
        "Vercel-CDN-Cache-Control": "no-store"
      }
    });
  } catch {
    return NextResponse.json([], { headers: { "Cache-Control": "no-store" } });
  }
}
