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
    if (!Array.isArray(boards)) {
      return NextResponse.json({ items: [], source: "empty" }, { status: 200 });
    }

    const items = [];
    for (const b of boards as any[]) {
      const jobs = await getGreenhouse(b.board);
      items.push(...jobs);
    }

    // Voor later:
    // items.push(...(await getLever("example")));
    // items.push(...(await getAshby("example")));
    // items.push(...(await getWorkable("example")));
    // items.push(...(await getTeamtailor("example")));

    return NextResponse.json({ items, source: "aggregate" }, { status: 200 });
  } catch (err) {
    console.error("Aggregate error:", err);
    return NextResponse.json(
      { error: "Failed to aggregate jobs" },
      { status: 500 }
    );
  }
}
