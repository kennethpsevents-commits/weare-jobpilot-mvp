import { NextResponse } from "next/server";

export async function GET() {
  // Placeholder zodat de build groen is. Crawler voegen we hierna toe.
  return NextResponse.json({ ok: true, source: "greenhouse", items: [] });
}
