import { NextResponse } from "next/server";
import * as GH from "@/lib/greenhouse";

export const revalidate = 0;

export async function GET(_req: Request, ctx: { params: { board: string } }) {
  try {
    const board = ctx?.params?.board;
    if (!board) {
      return NextResponse.json({ error: "Missing board" }, { status: 400 });
    }
    // Gebruik namespace → altijd geldig
    if (typeof GH.importGreenhouseBoard !== "function") {
      return NextResponse.json({ error: "importGreenhouseBoard not found in GH" }, { status: 500 });
    }
    const data = await GH.importGreenhouseBoard(board);
    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message ?? "Unknown error" }, { status: 500 });
  }
}
