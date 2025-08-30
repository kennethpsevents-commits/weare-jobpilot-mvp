import { NextResponse } from "next/server";
import {
  getGreenhouse,
  getLever,
  getAshby,
  getWorkable,
  getTeamtailor,
} from "@/lib/connectors";
import boards from "@/data/greenhouse.json";

export async function GET() {
  try {
    const items: any[] = [];

    // Loop door alle greenhouse boards
    for (const b of boards) {
      const jobs = await getGreenhouse(b.board);
      items.push(...jobs);
    }

    // Eventueel: voeg andere ATS bronnen toe (lever, ashby, workable, teamtailor)
    // const leverJobs = await getLever("example");
    // items.push(...leverJobs);

    return NextResponse.json({ items, source: "aggregate" });
  } catch (err: any) {
    console.error("Aggregate error:", err);
    return NextResponse.json(
      { error: "Failed to aggregate jobs" },
      { status: 500 }
    );
  }
}
