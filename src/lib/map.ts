const MAPTILER_API_KEY = process.env["MAPTILER_API_KEY"];

if (!MAPTILER_API_KEY) {
  throw new Error("MAPTILER_API_KEY is not set");
}

export const mapTileProvider = {
  url: `https://api.maptiler.com/maps/landscape/{z}/{x}/{y}.png?key=${MAPTILER_API_KEY}`,
  attribution: `<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>`,
};
