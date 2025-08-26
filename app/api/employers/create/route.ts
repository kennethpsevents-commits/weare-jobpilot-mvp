import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const b = await req.json();

    if (!b.title || !b.company || !b.applyUrl) {
      return NextResponse.json(
        { message: "title, company en applyUrl verplicht" },
        { status: 400 }
      );
    }

    // TODO: opslaan in Supabase of andere DB
    return NextResponse.json(
      { message: "Vacature succesvol ontvangen", job: b },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json(
      { message: "Server error", error: (err as Error).message },
      { status: 500 }
    );
  }
}
