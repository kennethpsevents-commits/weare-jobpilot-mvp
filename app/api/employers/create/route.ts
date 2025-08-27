import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

type Payload = {
  company?: string;
  contactName?: string;
  email?: string;
  title?: string;
  description?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Payload;

    if (!body?.email) {
      return NextResponse.json({ ok: false, error: "email required" }, { status: 400 });
    }

    // Optioneel doorsturen naar een webhook (laat deze 3 regels zo staan of vul je URL in):
    // const hook = process.env.EMPLOYERS_WEBHOOK_URL;
    // if (hook) await fetch(hook, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ source: "weare-jobpilot", ...body }) });

    return NextResponse.json(
      { ok: true, received: body, ts: new Date().toISOString() },
      { status: 200, headers: { "cache-control": "no-store" } }
    );
  } catch {
    return NextResponse.json({ ok: false, error: "invalid JSON" }, { status: 400 });
  }
}
