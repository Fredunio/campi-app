import { TypedSupabaseClient } from "../../utils/types";

export async function getFeatures(supabaseClient: TypedSupabaseClient) {
  const { data, error } = await supabaseClient.from("Feature").select("*");

  if (error) {
    throw error;
  }

  return data;
}
