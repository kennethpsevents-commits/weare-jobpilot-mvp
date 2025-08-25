import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const revalidate = 0;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);

    // query parameters
    const q = searchParams.get("q");                // zoekterm
    const sort = searchParams.get("sort") || "new"; // "new" | "relevance"
    const page = parseInt(searchParams.get("page") || "1"); 
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = (page - 1) * limit;

    // start query
    let query = supabaseAdmin.from("jobs").select("*", { count: "exact" });

    // zoeken in titel + bedrijf + locatie
    if (q) {
      query = query.or(
        `title.ilike.%${q}%,company.ilike.%${q}%,location.ilike.%${q}%`
      );
    }

    // sorteren
    if (sort === "new") {
      query = query.order("posted_at", { ascending: false });
    } else if (sort === "relevance") {
      // voorbeeld: hier zou je een echte relevance-ranking kunnen doen
      query = query.order("title", { ascending: true });
    }

    // paginatie
    query = query.range(offset, offset + limit - 1);

    // run query
    const { data, count, error } = await query;
    if (error) throw error;

    return NextResponse.json({
      items: data || [],
      page,
      limit,
      total: count || 0,
      hasMore: count ? page * limit < count : false,
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: String(e?.message || e) },
      { status: 500 }
    );
  }
}
