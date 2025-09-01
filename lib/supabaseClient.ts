// lib/supabaseClient.ts
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing Supabase env vars: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY'
  );
}

// Eén singleton client, geen dubbele "createClient" namen meer.
export const supabase = createSupabaseClient(supabaseUrl, supabaseKey);

// Optioneel helper; gebruik elders: import { supabase } from '@/lib/supabaseClient'
export default supabase;
