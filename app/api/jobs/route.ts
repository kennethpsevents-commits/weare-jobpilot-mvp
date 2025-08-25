import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const revalidate = 0;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // query params
    const q = searchParams.get("q");         // zoeken
    const sort = searchParams.get("sort");   // new | relevance
    const limit = parseInt(searchParams.get("limit") || "20");

    let query = supabaseAdmin.from("jobs").select("*");

    // zoeken in titel/bedrijf
    if (q) {
      query = query.ilike("title", `%${q}%`).ilike("company", `%${q}%`);
    }

    // sorteren
    if (sort === "new") {
      query = query.order("posted_at", { ascending: false });
    } else if (sort === "relevance") {
      query = query.order("relevance", { ascending: false });
    }

    // limiet
    query = query.limit(limit);

    const { data, error } = await query;
    if (error) throw error;

    return NextResponse.json({ items: data, total: data.length });
  } catch (e: any) {
    return NextResponse.json(
      { error: String(e?.message || e) },
      { status: 500 }
    );
  }
}
