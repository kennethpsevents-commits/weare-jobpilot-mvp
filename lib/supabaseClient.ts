// lib/supabaseClient.ts
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

// Eén singleton client
export const supabase = createSupabaseClient(supabaseUrl, supabaseKey);

// Helper voor compatibiliteit
export function getSupabaseClient() {
  return supabase;
}

export default supabase;
