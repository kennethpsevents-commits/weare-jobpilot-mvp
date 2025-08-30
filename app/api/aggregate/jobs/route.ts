import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

// Relative import naar lib ipv alias
import type { Job } from "../../../lib/types";

export const revalidate = 0;

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "data", "greenhouse.json");
    const file = await fs.readFile(filePath, "utf8");
    const boards = JSON.parse(file);

    const results: Job[] = [];

    for (const board of boards) {
      results.push({
        id: board.board,
        title: `Dummy ${board.name}`,
        company: board.name,
        location: "Remote",
        remote: true,
        applyUrl: `https://boards.greenhouse.io/${board.board}`,
        createdAt: new Date().toISOString(),
        board: board.board,
      });
    }

    return NextResponse.json(results, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
