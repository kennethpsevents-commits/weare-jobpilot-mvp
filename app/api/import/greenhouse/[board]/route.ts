// app/api/import/greenhouse/[board]/route.ts
import { NextResponse } from "next/server";
import { importGreenhouseBoard } from "@/lib/greenhouse";

export const revalidate = 0; // altijd vers bij handmatig triggeren

export async function GET(
  _req: Request,
  ctx: { params: { board: string } }
) {
  try {
    const board = ctx?.params?.board;
    if (!board) {
      return NextResponse.json({ error: "Missing board" }, { status: 400 });
    }
    const data = await importGreenhouseBoard(board);
    return NextResponse.json(data, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message ?? "Unknown error" },
      { status: 500 }
    );
  }
}
