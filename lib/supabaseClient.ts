// lib/supabaseClient.ts
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing Supabase env vars: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY'
  );
}

// Eén singleton client, géén export function createClient() meer.
export const supabase = createSupabaseClient(supabaseUrl, supabaseKey);

// Helper (optioneel)
export function getSupabaseClient() {
  return supabase;
}

export default supabase;
