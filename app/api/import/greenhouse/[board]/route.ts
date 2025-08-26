import { NextResponse } from "next/server";
import { importGreenhouseBoard, listGreenhouseMapped } from "@/lib/greenhouse";

// GET /api/import/greenhouse/[board]?dry=1  -> alleen MAP (geen opslag)
// GET /api/import/greenhouse/[board]        -> IMPORT (opslaan in /api/jobs)
export async function GET(req: Request, ctx: { params: { board: string } }) {
  const board = ctx.params.board;
  const url = new URL(req.url);
  const isDry = url.searchParams.has("dry") || url.searchParams.get("mode") === "map";

  try {
    if (isDry) {
      const preview = await listGreenhouseMapped(board, 20);
      return NextResponse.json({ ok: true, mode: "dry", board, count: preview.length, preview });
    }

    // absolute base naar dezelfde host (geen ENV nodig)
    const origin = new URL(req.url).origin;
    const res = await importGreenhouseBoard(board, origin);
    return NextResponse.json(res);
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "import error", board }, { status: 500 });
  }
}
