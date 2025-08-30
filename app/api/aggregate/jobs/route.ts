import { NextResponse } from "next/server";
// Let op: pad vanaf /app/api/aggregate/jobs/ naar /lib/types.ts = ../../../../lib/types
import type { Job } from "../../../../lib/types";

// Voorbeeld implementatie: combineer jobs uit data/greenhouse.json
import boards from "../../../../data/greenhouse.json";

export const revalidate = 0;

export async function GET() {
  try {
    // simpele health/output; vervang later door echte aggregatie
    const list = Array.isArray(boards) ? boards.map((b: any) => b.board) : [];
    const result: Job[] = list.map((board: string, i: number) => ({
      id: String(i + 1),
      title: `Sample from ${board}`,
      company: board,
      location: "Remote",
      remote: true,
      applyUrl: `https://boards.greenhouse.io/${board}`,
      createdAt: new Date().toISOString(),
      board,
    }));

    return NextResponse.json({ count: result.length, items: result }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Unknown error" }, { status: 500 });
  }
}
