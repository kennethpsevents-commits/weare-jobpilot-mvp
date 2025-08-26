import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const revalidate = 0;

export async function GET() {
  return NextResponse.json(
    { ok: true, service: "weare-jobpilot-mvp", time: new Date().toISOString() },
    { status: 200 }
  );
}
