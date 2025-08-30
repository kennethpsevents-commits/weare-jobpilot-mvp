import { NextResponse } from "next/server";
import { getGreenhouse, getLever, getAshby, getWorkable, getTeamtailor } from "@/lib/connectors";
import sources from "@/data/sources.json";

export async function POST() {
  try {
    const results: Record<string, any[]> = {};

    if (sources?.greenhouse && Array.isArray(sources.greenhouse)) {
      for (const board of sources.greenhouse) {
        results[board] = await getGreenhouse(board);
      }
    }

    return NextResponse.json({ results, source: "ingest" }, { status: 200 });
  } catch (err) {
    console.error("Ingest error:", err);
    return NextResponse.json({ error: "Failed to ingest jobs" }, { status: 500 });
  }
}
