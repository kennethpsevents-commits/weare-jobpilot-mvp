import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as any));

    // Voorbeeld: stuur door naar jouw webhook of sla voorlopig niets op
    // const hook = process.env.NEXT_PUBLIC_EMPLOYERS_WEBHOOK_URL;
    // if (hook) {
    //   await fetch(hook, {
    //     method: "POST",
    //     headers: { "content-type": "application/json" },
    //     body: JSON.stringify(body),
    //   });
    // }

    return NextResponse.json({ ok: true, received: body }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { ok: false, error: String(err?.message || err) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, service: "employers-create" }, { status: 200 });
}
