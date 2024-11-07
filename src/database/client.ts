import { createClient } from "@supabase/supabase-js";
import { Database } from "./schema.gen";
import { TypedSupabaseClient } from "../lib/types";
import { useMemo } from "react";
import { customStorageAdapter } from "@/lib/customStorageAdapter";

const anonKey = process.env["SUPABASE_ANON_KEY"];
const supabaseUrl = process.env["SUPABASE_URL"];

let client: TypedSupabaseClient | undefined;

function getSupabaseClient() {
  if (client) {
    return client;
  }

  if (!anonKey) {
    throw new Error("Missing SUPABASE_ANON_KEY");
  }

  if (!supabaseUrl) {
    throw new Error("Missing SUPABASE_URL");
  }

  client = createClient<Database>(supabaseUrl, anonKey, {
    // auth: {
    //   detectSessionInUrl: true,
    //   flowType: "pkce",
    //   storage: customStorageAdapter,
    // },
    // db: {
    //   schema: "public",
    // },
  });
  return client;
}

export default function useSupabaseBrowser() {
  return useMemo(getSupabaseClient, []);
}
