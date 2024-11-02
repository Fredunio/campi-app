import { TypedSupabaseClient } from "../../lib/types";

export async function getLocationCategories(
  supabaseClient: TypedSupabaseClient
) {
  const { data, error } = await supabaseClient
    .from("LocationCategory")
    .select("*");

  if (error) {
    throw error;
  }

  return data;
}

export async function getLocationTypes(supabaseClient: TypedSupabaseClient) {
  const { data, error } = await supabaseClient.from("LocationType").select("*");

  if (error) {
    throw error;
  }

  return data;
}

export async function getLocationSizes(supabaseClient: TypedSupabaseClient) {
  const { data, error } = await supabaseClient.from("LocationSize").select("*");

  if (error) {
    throw error;
  }

  return data;
}
