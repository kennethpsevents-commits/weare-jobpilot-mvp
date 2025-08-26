import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL!;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE!;
const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

export async function POST(req: NextRequest) {
  let payload: any;
  try { payload = await req.json(); } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  const jobs = Array.isArray(payload) ? payload : payload?.jobs;
  if (!Array.isArray(jobs) || jobs.length === 0) {
    return NextResponse.json({ error: "Expected array of jobs" }, { status: 400 });
  }

  const rows = jobs.map((j: any) => ({
    ext_id: j.extId,
    source: j.source,
    title: j.title,
    company: j.company,
    location: j.location ?? null,
    remote: !!j.remote,
    apply_url: j.applyUrl,
    description: j.description ?? null,
    created_at: j.createdAt ? new Date(j.createdAt).toISOString() : null,
    tags: j.tags ?? null,
    salary_min: j.salaryMin ?? null,
    salary_max: j.salaryMax ?? null,
    currency: j.currency ?? null,
    country_code: j.countryCode ?? null,
    city: j.city ?? null,
  }));

  const { data, error } = await supabase
    .from("jobs")
    .upsert(rows, { onConflict: "source,ext_id" })
    .select("id");

  if (error) return NextResponse.json({ error: error.me
