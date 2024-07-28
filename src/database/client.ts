import { createClient } from "@supabase/supabase-js";

const anonKey = process.env["ANON_KEY"];
const supabaseUrl = process.env["SUPABASE_URL"];

if (!anonKey) {
  throw new Error("Missing ANON_KEY");
}

if (!supabaseUrl) {
  throw new Error("Missing SUPABASE_URL");
}

export const supabaseClient = createClient(supabaseUrl, anonKey);
