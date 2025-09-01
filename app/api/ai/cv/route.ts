import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { ok: false, message: "CV AI endpoint is tijdelijk uitgeschakeld (coming soon)." },
    { status: 501 }
  );
}
