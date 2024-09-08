import { TypedSupabaseClient } from "../../utils/types";

export async function getConditions(supabaseClient: TypedSupabaseClient) {
  const { data, error } = await supabaseClient.from("Condition").select("*");

  if (error) {
    throw error;
  }

  return data;
}
