import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: Request) {
  try {
    const payload = await req.json().catch(() => ({}));
    const hook = process.env.NEXT_PUBLIC_BASE_URL
      ? `${process.env.NEXT_PUBLIC_BASE_URL}/api/health`
      : "https://example.org/health"; // tijdelijk: voorkomt lege URL

    // Voorbeeld POST (deze call mag je later aanpassen/weghalen)
    await fetch(hook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ping: "ok", payload }),
    }).catch(() => { /* negeren in MVP */ });

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: String(e?.message || e) },
      { status: 500 }
    );
  }
}

export async function GET() {
  // simpele check zodat de route bestaat
  return NextResponse.json({ ok: true, route: "/api/employers/create" });
}
