import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const b = (await req.json().catch(() => ({}))) as any;
    if (!b?.title || !b?.company || !b?.applyUrl) {
      return NextResponse.json({ message: "title, company en applyUrl verplicht" }, { status: 400 });
    }
    return NextResponse.json({ ok: true, job: b });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "unknown error" }, { status: 500 });
  }
}
