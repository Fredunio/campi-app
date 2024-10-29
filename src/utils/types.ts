import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "../database/database.types";
import { Circle, Polygon } from "leaflet";

export type TypedSupabaseClient = SupabaseClient<Database>;

export type LocationIQAutocompleteResult = {
  place_id: string;
  osm_id: string;
  osm_type: string;
  licence: string;
  lat: string;
  lon: string;
  boundingbox: [string, string, string, string]; // Array with 4 strings representing the bounding box
  class: string;
  type: string;
  display_name: string;
  display_place: string;
  display_address: string;
  address: {
    name: string;
    county: string;
    state: string;
    country: string;
    country_code: string;
  };
};

export type LocationIQForwardResult = {
  place_id: string;
  licence: string;
  osm_type: string;
  osm_id: string;
  boundingbox: [string, string, string, string]; // Array with 4 strings representing the bounding box
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
};

export type LocationIQReverseResult = {
  place_id: string;
  licence: string;
  osm_type: string;
  osm_id: string;
  lat: string;
  lon: string;
  display_name: string;
  address: {
    government: string;
    house_number: string;
    road: string;
    quarter: string;
    suburb: string;
    city: string;
    state_district: string;
    state: string;
    postcode: string;
    country: string;
    country_code: string;
  };
  boundingbox: [string, string, string, string]; // Array with 4 strings representing the bounding box
};

export type TSelectedArea = Circle<any> | Polygon<any>;

export function isCircle(layer: object): layer is Circle<any> {
  return (layer as Circle<any>).getRadius !== undefined;
}

export function isPolygon(layer: object): layer is Polygon<any> {
  return (layer as Polygon<any>).getLatLngs !== undefined;
}
