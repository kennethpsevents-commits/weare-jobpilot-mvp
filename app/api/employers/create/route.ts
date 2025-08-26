import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const b = await req.json().catch(() => ({}));
    if (!b.title || !b.company || !b.applyUrl) {
      return NextResponse.json(
        { message: "title, company en applyUrl verplicht" },
        { status: 400 }
      );
    }
    // hier kun je later opslaan in DB
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
