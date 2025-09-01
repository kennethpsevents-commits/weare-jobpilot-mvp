import { NextResponse } from "next/server";

export async function GET() {
  try {
    const url = process.env.NEXT_PUBLIC_SUPABASE_FUNCTIONS_URL || "https://YOUR_PROJECT.functions.supabase.co";
    const res = await fetch(`${url}/get-jobs?sort=title&order=asc`, {
      headers: { apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "" }
    });
    const data = await res.json();
    return NextResponse.json({ jobs: data.jobs || [] });
  } catch {
    return NextResponse.json({ jobs: [] }, { status: 200 });
  }
}
