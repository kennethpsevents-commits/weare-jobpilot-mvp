// app/api/employers/create/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

// heel simpele e-mail check
const emailOk = (e: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e ?? "");

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({} as any));
    const {
      company = "",
      contactName = "",
      email = "",
      jobTitle = "",
      location = "",
      type = "",       // Remote | Hybrid | On-site
      description = "",
      website = "",    // honeypot (moet leeg zijn)
    } = body || {};

    // honeypot tegen bots
    if (website) {
      return NextResponse.json({ ok: false, reason: "spam" }, { status: 400 });
    }

    // minimale validatie
    if (!company || !emailOk(email) || !jobTitle) {
      return NextResponse.json(
        { ok: false, reason: "invalid", fields: { company, email, jobTitle } },
        { status: 400 }
      );
    }

    const payload = {
      receivedAt: new Date().toISOString(),
      company,
      contactName,
      email,
      jobTitle,
      location,
      type,
      description,
    };

    // Optioneel: forward naar webhook (bijv. Slack/Make/Zapier)
    // Zet in Vercel: EMPLOYERS_WEBHOOK_URL = https://...
    const hook = process.env.EMPLOYERS_WEBHOOK_URL;
    if (hook) {
      try {
        await fetch(hook, {
          method: "POST",
          headers: { "
