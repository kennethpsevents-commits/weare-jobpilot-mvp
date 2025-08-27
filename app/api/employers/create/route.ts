// app/api/employers/create/route.ts
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// Optioneel: zet een webhook URL in Vercel env als je wil doorsturen.
// EMPLOYERS_WEBHOOK_URL=https://example.com/webhook
const WEBHOOK = process.env.EMPLOYERS_WEBHOOK_URL;

type EmployerPayload = {
  company: string;
  contactEmail: string;
  jobTitle: string;
  jobDesc?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => ({}))) as Partial<EmployerPayload>;

    const missing: string[] = [];
    if (!body.company) missing.push("company");
    if (!body.contactEmail) missing.push("contactEmail");
    if (!body.jobTitle) missing.push("jobTitle");

    if (missing.length) {
      return NextResponse.json(
        { ok: false, error: "missing_fields", fields: missing },
        { status: 400, headers: { "cache-control": "no-store" } }
      );
    }

    // Optioneel doorsturen naar je webhook
    if (WEBHOOK) {
      await fetch(WEBHOOK, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ type: "employer.create", payload: body }),
      });
    }

    return NextResponse.json(
      { ok: true, received: body },
      { status: 200, headers: { "cache-control": "no-store" } }
    );
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: "server_error" },
      { status: 500, headers: { "cache-control": "no-store" } }
    );
  }
}
