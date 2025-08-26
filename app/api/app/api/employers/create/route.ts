import { NextResponse } from "next/server";
export async function GET()  { return NextResponse.json({ ok: true, legacy: true }); }
export async function POST() { return NextResponse.json({ ok: true, legacy: true }, { status: 201 }); }
