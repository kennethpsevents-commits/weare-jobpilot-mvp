import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

// Singleton client
export const supabase = createSupabaseClient(supabaseUrl, supabaseKey);

// Helper om compatibel te blijven
export function getSupabaseClient() {
  return supabase;
}
