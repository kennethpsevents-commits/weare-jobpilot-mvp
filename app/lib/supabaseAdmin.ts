// app/lib/supabaseAdmin.ts
import "server-only";
import { createClient } from "@supabase/supabase-js";

// LET OP: gebruikt SERVICE_ROLE -> nooit client-side importeren.
export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!,
  { auth: { persistSession: false } }
);
