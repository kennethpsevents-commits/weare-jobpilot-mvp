// app/lib/supabaseAdmin.ts
import "server-only"; // garandeert server-only gebruik in Next.js
import { createClient } from "@supabase/supabase-js";

// LET OP: dit gebruikt SERVICE_ROLE; nooit in client importeren!
export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE!,
  {
    auth: { persistSession: false },
  }
);
