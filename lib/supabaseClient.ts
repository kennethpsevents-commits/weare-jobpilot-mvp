// lib/supabaseClient.ts
import { createClient as supabaseCreateClient } from "@supabase/supabase-js";

let _client: ReturnType<typeof supabaseCreateClient> | null = null;

/** Singleton client – geen naamconflict meer met "createClient" uit het pakket. */
export function getSupabaseClient() {
  if (_client) return _client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error("Missing Supabase env vars: NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }

  _client = supabaseCreateClient(url, key);
  return _client;
}
