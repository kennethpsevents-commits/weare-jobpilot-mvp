import { NextResponse } from "next/server";

export async function GET() {
  // Placeholder zodat build werkt. Echte crawler komt hierna.
  return NextResponse.json({ ok: true, source: "greenhouse", items: [] });
}
