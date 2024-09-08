import { TypedSupabaseClient } from "../../utils/types";

export async function getEquipments(supabaseClient: TypedSupabaseClient) {
  const { data, error } = await supabaseClient.from("Equipment").select("*");

  if (error) {
    throw error;
  }

  return data;
}
