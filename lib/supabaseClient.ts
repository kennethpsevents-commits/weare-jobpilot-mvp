// lib/supabaseClient.ts
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

// Eén singleton client — let op: GEEN "export function createClient()" hier.
export const supabase = createSupabaseClient(supabaseUrl, supabaseKey);

// Compatibiliteitshelper: bestaande code kan dit aanroepen.
export function getSupabaseClient() {
  return supabase;
}

// Optioneel: default export
export default supabase;
