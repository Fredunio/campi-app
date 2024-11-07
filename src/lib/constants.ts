import { Position } from "@capacitor/geolocation";

export const MAX_IMAGES_SIZE_BYTES = 5_242_880; // 5MB
export const MAX_LOCATION_IMAGES_SIZE_BYTES = MAX_IMAGES_SIZE_BYTES;
export const IMAGE_TYPES = [
  "image/png",
  "image/gif",
  "image/jpeg",
  "image/gif",
];
export const IMAGE_MIME_TYPES = IMAGE_TYPES.map((type) => type.split("/")[1]);
export const MAX_LOCATION_IMAGES = 10;
export const MAX_EVENT_IMAGES = 10;
// image/png, image/gif, image/jpeg, image/gif

export const feedTypes = {
  all: "all",
  locations: "locations",
  events: "events",
  trips: "trips",
  posts: "posts",
  journals: "journals",
  equipments: "equipments",
  // campers are people who e.g are looking for
  // other people to go camping with
  campers: "campers",
} as const;

// offline default position
export const defaultPosition: Position = {
  coords: {
    latitude: 52.237049,
    longitude: 21.017532,
    accuracy: 0,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    speed: null,
  },
  timestamp: 0,
};
