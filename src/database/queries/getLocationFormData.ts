import { getConditions } from "@/database/models/condition";
import { getEquipments } from "@/database/models/equipment";
import { getFeatures } from "@/database/models/feature";
import {
  getLocationCategories,
  getLocationSizes,
  getLocationTypes,
} from "@/database/models/location";
import { TypedSupabaseClient } from "@/lib/types";

export async function getLocationFormData(supabaseClient: TypedSupabaseClient) {
  const [categories, types, sizes, conditions, features, equipments] =
    await Promise.all([
      getLocationCategories(supabaseClient),
      getLocationTypes(supabaseClient),
      getLocationSizes(supabaseClient),
      getConditions(supabaseClient),
      getFeatures(supabaseClient),
      getEquipments(supabaseClient),
    ]);

  return { categories, types, sizes, conditions, features, equipments };
}
