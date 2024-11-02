import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";
import { TypedSupabaseClient } from "../lib/types";
import { useMemo } from "react";

const anonKey = process.env["ANON_KEY"];
const supabaseUrl = process.env["SUPABASE_URL"];

let client: TypedSupabaseClient | undefined;

function getSupabaseClient() {
  if (client) {
    return client;
  }

  if (!anonKey) {
    throw new Error("Missing ANON_KEY");
  }

  if (!supabaseUrl) {
    throw new Error("Missing SUPABASE_URL");
  }

  client = createClient<Database>(supabaseUrl, anonKey);

  return client;
}

export default function useSupabaseBrowser() {
  return useMemo(getSupabaseClient, []);
}
