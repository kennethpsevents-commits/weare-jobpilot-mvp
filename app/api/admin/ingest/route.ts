import { NextResponse } from "next/server";
import {
  getGreenhouse,
  getLever,
  getAshby,
  getWorkable,
  getTeamtailor,
} from "@/lib/connectors";
import sources from "@/data/sources.json";

export async function POST() {
  try {
    const results: Record<string, any[]> = {};

    // Greenhouse boards
    for (const board of sources.greenhouse) {
      results[board] = await getGreenhouse(board);
    }

    // Andere ATS kan later toegevoegd worden:
    // for (const leverBoard of sources.lever) {
    //   results[leverBoard] = await getLever(leverBoard);
    // }

    return NextResponse.json({ results, source: "ingest" });
  } catch (err: any) {
    console.error("Ingest error:", err);
    return NextResponse.json(
      { error: "Failed to ingest jobs" },
      { status: 500 }
    );
  }
}
