import { NextResponse } from "next/server";

// Deze file bestaat alleen om de oude, per ongeluk aangemaakte route te neutraliseren.
// Verwijderen kan later; nu eerst zorgen dat de build groen wordt.

export async function GET() {
  return NextResponse.json({ ok: true, legacy: true, path: "/app/api/app/api/..." });
}

export async function POST() {
  return NextResponse.json({ ok: true, message: "legacy placeholder" }, { status: 201 });
}
