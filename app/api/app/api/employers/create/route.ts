import { NextResponse } from "next/server";

// Legacy-pad per ongeluk aangemaakt; we maken 'm veilig en kort.
// Later verwijderen we de hele /app/api/app/ tree.

export async function GET() {
  return NextResponse.json({ ok: true, legacy: true });
}

export async function POST() {
  return NextResponse.json({ ok: true, legacy: true }, { status: 201 });
}
