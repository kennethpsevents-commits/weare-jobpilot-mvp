import { NextResponse } from "next/server";

export async function GET() {
  // placeholder zodat build groen is
  return NextResponse.json({ ok: true, source: "greenhouse", items: [] });
}
