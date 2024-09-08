import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../database/database.types";

export type TypedSupabaseClient = SupabaseClient<Database>;
