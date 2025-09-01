// lib/supabaseClient.ts
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Fail fast met duidelijke fout als env mist (maar geen non-null assertions gebruiken)
if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing Supabase env vars: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY'
  );
}

/**
 * Singleton Supabase client voor browser + RSC-compatibele omgevingen.
 * Voor server-side admin use-cases: maak een apart server-only client.
 */
export const supabase = createSupabaseClient(supabaseUrl, supabaseKey);

/** Backward-compatible helper; sommige files kunnen dit verwachten. */
export function getSupabaseClient() {
  return supabase;
}

export default supabase;
