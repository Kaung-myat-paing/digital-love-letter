import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co";
const supabaseServiceKey =
  process.env.SUPABASE_SERVICE_ROLE_KEY || "placeholder-key";

export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabaseServiceKey,
  { auth: { persistSession: false } }
);

export type LetterRow = {
  id: string;
  slug: string;
  password: string;
  author_name: string;
  content: string;
  created_at: string;
};
