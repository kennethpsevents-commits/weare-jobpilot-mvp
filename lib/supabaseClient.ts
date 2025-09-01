// lib/supabaseClient.ts
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

// Single, shared client (no exported "createClient" function anywhere).
export const supabase = createSupabaseClient(supabaseUrl, supabaseKey);

// Optional helper for existing call sites
export function getSupabaseClient() {
  return supabase;
}

export default supabase;
