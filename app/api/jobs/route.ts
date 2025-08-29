import { NextResponse } from "next/server";
import { listGreenhouseMapped } from "@/lib/greenhouse";
import boards from "@/data/greenhouse.json";

export const runtime = "nodejs";

export async function GET() {
  try {
    // boards is bv. ["stripe","databricks", ...]
    const names = Array.isArray(boards) ? boards : [];
    const chunks = await Promise.all(
      names.map((b) =>
        listGreenhouseMapped(b).catch(() => [])
      )
    );
    // vlak maken
    const all = chunks.flat();
    return NextResponse.json(all, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Unknown error" }, { status: 500 });
  }
}
