import { NextResponse } from "next/server";

// Voorbeeld: Greenhouse board van Stripe
const GREENHOUSE_URL = "https://boards-api.greenhouse.io/v1/boards/stripe/jobs";

export async function GET() {
  try {
    const res = await fetch(GREENHOUSE_URL, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json({ error: "Fout bij ophalen vacatures" }, { status: 502 });
    }

    const data = await res.json();

    // Map alleen de belangrijkste velden
    const jobs = (data.jobs || []).map((j: any) => ({
      id: j.id,
      title: j.title,
      location: j.location?.name || "Onbekend",
      url: j.absolute_url,
      updated: j.updated_at,
    }));

    return NextResponse.json({ jobs });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Onbekende fout" }, { status: 500 });
  }
}
