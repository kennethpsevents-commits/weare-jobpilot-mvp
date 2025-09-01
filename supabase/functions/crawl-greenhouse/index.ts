// deno-lint-ignore-file no-explicit-any
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const serviceKey  = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!; // zet in Supabase Secrets
const sb = createClient(supabaseUrl, serviceKey);

const BOARDS = ["stripe", "github", "meta"]; // voeg later meer toe

async function fetchBoard(board: string) {
  const url = `https://boards-api.greenhouse.io/v1/boards/${board}/jobs`;
  const res = await fetch(url, { headers: { "User-Agent": "jobpilot-crawler" } });
  if (!res.ok) return [];
  const data = await res.json();
  return (data.jobs || []).map((j: any) => ({
    source: "greenhouse",
    external_id: String(j.id),
    title: j.title ?? "",
    company: board,
    location: j.location?.name ?? "",
    url: j.absolute_url ?? "",
    posted_at: j.updated_at ? new Date(j.updated_at).toISOString() : null,
    salary: null
  }));
}

Deno.serve(async () => {
  let all: any[] = [];
  for (const b of BOARDS) {
    const items = await fetchBoard(b);
    all = all.concat(items);
  }
  if (all.length) {
    const { error } = await sb.from("jobs")
      .upsert(all, { ignoreDuplicates: false, onConflict: "source,external_id" });
    if (error) return new Response(JSON.stringify({ ok: false, error: error.message }), { status: 500 });
  }
  return new Response(JSON.stringify({ ok: true, inserted: all.length }), { headers: { "content-type": "application/json" } });
});
