import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const anonKey     = Deno.env.get("SUPABASE_ANON_KEY")!; // mag public
const sb = createClient(supabaseUrl, anonKey);

Deno.serve(async (req) => {
  const url = new URL(req.url);
  const sort = url.searchParams.get("sort") || "title";   // title | salary | posted_at
  const order = url.searchParams.get("order") || "asc";   // asc | desc
  const q = sb.from("jobs").select("*");
  if (sort === "salary") (q as any).order("salary", { ascending: order==="asc" });
  else if (sort === "posted_at") (q as any).order("posted_at", { ascending: order==="asc", nullsFirst: false });
  else (q as any).order("title", { ascending: order==="asc" });

  const { data, error } = await q.limit(200);
  if (error) return new Response(JSON.stringify({ jobs: [], error: error.message }), { status: 500 });
  return new Response(JSON.stringify({ jobs: data }), { headers: { "content-type": "application/json" } });
});
