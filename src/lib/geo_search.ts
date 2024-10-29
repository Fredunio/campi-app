import axios, { AxiosRequestConfig } from "axios";
import {
  LocationIQAutocompleteResult,
  LocationIQReverseResult,
} from "../utils/types";

const LOCATIONIQ_ACCESS_TOKEN = process.env.LOCATIONIQ_ACCESS_TOKEN;

if (!LOCATIONIQ_ACCESS_TOKEN) {
  throw new Error("LOCATIONIQ_ACCESS_TOKEN is required");
}

const geo_autocomplete_options: AxiosRequestConfig = {
  method: "GET",
  url: `https://us1.locationiq.com/v1/autocomplete`,
  headers: { accept: "application/json" },
};

export async function autocompleteGeolocationSearch(query: string) {
  const options: AxiosRequestConfig = {
    ...geo_autocomplete_options,
    params: {
      key: LOCATIONIQ_ACCESS_TOKEN,
      q: query,
    },
  };

  try {
    const response =
      await axios.request<LocationIQAutocompleteResult[]>(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export async function reverseGeocode(lat: string, lon: string) {
  const options: AxiosRequestConfig = {
    method: "GET",
    url: `https://us1.locationiq.com/v1/reverse`,
    headers: { accept: "application/json" },
    params: {
      key: LOCATIONIQ_ACCESS_TOKEN,
      lat,
      lon,
      format: "json",
      normalizeaddress: 1,
    },
  };

  try {
    const response = await axios.request<LocationIQReverseResult>(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
