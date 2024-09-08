import axios from "axios";

const LOCATIONIQ_ACCESS_TOKEN = process.env.LOCATIONIQ_ACCESS_TOKEN;

if (!LOCATIONIQ_ACCESS_TOKEN) {
  throw new Error("LOCATIONIQ_ACCESS_TOKEN is required");
}

const geo_autocomplete_options = {
  method: "GET",
  url: `https://us1.locationiq.com/v1/autocomplete`,
  headers: { accept: "application/json" },
};

export async function autocompleteGeolocationSearch(query: string) {
  const options = {
    ...geo_autocomplete_options,
    params: {
      key: LOCATIONIQ_ACCESS_TOKEN,
      q: query,
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
