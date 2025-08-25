import { NextResponse } from "next/server";
import { crawlALL } from "@/lib/monstre";

export const revalidate = 0;

export async function GET() {
  try {
    const { count } = await crawlALL();
    return NextResponse.json({ inserted_or_updated: count });
  } catch (e: any) {
    return NextResponse.json(
      { error: String(e?.message || e) },
      { status: 500 }
    );
  }
}
