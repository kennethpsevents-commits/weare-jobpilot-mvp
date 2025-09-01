// lib/supabaseClient.ts
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

// Eén singleton client — LET OP: GEEN `export function createClient()` meer.
export const supabase = createSupabaseClient(supabaseUrl, supabaseKey);

// Compatibiliteitshelper voor bestaande aanroepen
export function getSupabaseClient() {
  return supabase;
}

export default supabase;
